import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from "axios";

const handler = async (request) => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  const payload = await request.json();
  const headersList = headers();
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  try {
    evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error occured", { status: 400 });
  }

  const eventType = evt.type;
  const { id } = evt.data;
  if (eventType === "user.created") {
    const apiEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/users`;
    const userData = {
      externalId:  id,
      email: evt.data.email_addresses[0].email_address,
      firstName: evt.data.first_name,
      lastName: evt.data.last_name,
    };
    try {
      const response = await axios.post(apiEndpoint, userData);
      console.log("User details added:", response.data);
    } catch (error) {
      console.error(
        "Error adding user:",
        error.response?.data || error.message
      );
    }
  }

  if(eventType=== 'user.deleted'){
    const externalId = evt.data.id;  // Assuming the externalId is stored in the id field of the webhook payload
    
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/users/`, {
        data: { externalId }  // Some APIs may expect the payload in a DELETE request. Adjust as necessary.
      });
      
      if (response.status === 200) {
        console.log(`User with externalId ${externalId} deleted.`);
      } else {
        console.log(`Failed to delete user with externalId ${externalId}. Status code: ${response.status}`);
      }
  
    } catch (error) {
      console.error(`Error deleting user with externalId ${externalId}:`, error);
    }
   
  }

  

  console.log(id);
  console.log(eventType);
  console.log(evt.data.email_addresses[0].email_address);
  console.log(evt.data.first_name);
  console.log(evt.data.last_name);
};
export const GET = handler;
export const POST = handler;
export const PUT = handler;

'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import CarouselDisplay from "@/components/CarouselDisplay";
import Featured from "@/components/Featured";
import Thirdrow from "@/components/Thirdrow";
import FourthRow from "@/components/FourthRow";
import FifthRow from "@/components/FifthRow";



export default function Home() {
  

  // useEffect(() => {
  //   const addUser = async () => {
  //     if (userId) {
  //       const user = await clerkClient.users.getUser(userId);
  //       try {
  //         const response = await axios.post(
  //           `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
  //           { 
  //             email: user.emailAddresses[0].emailAddress, 
  //             firstName: user.firstName, 
  //             lastName: user.lastName 
  //           }
  //         );

  //         if (response.status === 201 || response.status === 200) {
  //           console.log("User added successfully!");
  //         }
  //       } catch (error) {
  //         console.error("Error adding user:", error.response?.data || error.message);
  //       }
  //     }
  //   };

  //   addUser();
  // }, [userId]); // The effect will run only once if userId changes.

  return (
    <main className="relative">
      <CarouselDisplay />
      <Featured />
      <Thirdrow />
      <FourthRow />
      <FifthRow />
     
    </main>
  );
}

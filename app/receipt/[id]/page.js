
import React from 'react'
import Receipt from '@/components/Receipt/Receipt';

const getOrder = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
  
const ReceiptPage = async ({params}) => {
  const {id} = params
  const order = await getOrder(id)
  console.log(order)
  
  return (
    <Receipt />
  )
}

export default ReceiptPage

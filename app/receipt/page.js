
import React from 'react'
// import Receipt from '@/components/Receipt/Receipt';
import Receipt from '@/components/checkout/Receipt';


// const getOrder = async (orderId) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`, { cache: 'no-store' });
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }
  
const ReceiptPage = async () => {
 
  // const order = await getOrder(orderId)
  // console.log(order)
  
  return (
    <Receipt />
  )
}

export default ReceiptPage

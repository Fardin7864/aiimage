import { NextResponse } from "next/server"
import { auth } from "@/libs/firebase";
//import { useAuthState } from 'react-firebase-hooks/auth'
//import { stripe } from '@/libs/stripe'
import Stripe from "stripe";
export async function GET() {
    

    const data =  await getDocs(query(subscriptionRef,where('userId','==',1)))

    const result = data.docs.map(doc => ({...doc.data()}))

  
  
    const ad = {
        name: 'ozor',
        email: 'ozorclinton@gmail.com'
    }
  return new NextResponse(JSON.stringify(result), {status: 200})
}

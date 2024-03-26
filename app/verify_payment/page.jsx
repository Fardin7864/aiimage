"use client"
import Link from 'next/link'
import { addDoc, collection,getDocs, query, where } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { getUrlParameter } from '@/libs/utils';
import { useEffect, useState } from 'react';
import { retrieveSession,updateSubscription } from '@/libs/stripe';
import ModalLoader from '@/components/ModalLoader'
import { notifyInfo } from '@/libs/utils';


export default function VerifyPayment() {

    const [mounted, setMounted] = useState(false);

    const [isLoading,setIsLoading] = useState(true)

    const subscriptionRef = collection(db, 'subscription')

    const user = getUrlParameter('user')



    

    const getSubscription = async () => {

      const data =  await getDocs(query(subscriptionRef,where('userId','==',user)))

      const result = data.docs.map(doc => ({...doc.data()}))

      if(result.length > 0){

        const res = await retrieveSession(result[0].stripeSession)

        if(res != null){

            notifyInfo('PROCESSING','Please stay on the page while we verify your payment. You will be automatically redirected when this is done!',true,20000)

            updateSubscription(user,res)
        }

      }
    }

    if (!mounted) {
            
        getSubscription()
        setMounted(true);
    } 
    



    



  return (
    <div className=' bg-darkcolor-100 text-white'>
        <div className='container mx-auto p-3 md:p-8'>
            <Link href="/" className='text-white cursor-pointer'><img className='inline' height={20} width={20} src="/img/angle-left.png" alt="go back" /> <span className='ml-5'>Back</span></Link>

            <p className='text-center text-sm mt-8'>
                Please wait while we verify your session
            </p>

            {isLoading && <ModalLoader />}
        </div>
    </div>
  )
}

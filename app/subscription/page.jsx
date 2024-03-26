"use client"
import Link from 'next/link'
import { addDoc, collection,getDocs, query, where } from "firebase/firestore";
import { auth,db } from "@/libs/firebase";
import { handleDate } from '@/libs/utils';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { checkoutPortal } from '@/libs/stripe';
import ModalLoader from '@/components/ModalLoader'
import { notifyInfo } from '@/libs/utils';


export default function Subscription() {

    const [mounted, setMounted] = useState(false);

    const [user] = useAuthState(auth)

    const [subscription,setSubscription] = useState(null) 

    const [isLoading,setIsLoading] = useState(true)

    const subscriptionRef = collection(db, 'subscription')

    

    const getSubscription = async () => {

      const data =  await getDocs(query(subscriptionRef,where('userId','==',user.uid)))

      const result = data.docs.map(doc => ({...doc.data()}))

      if(result.length > 0){

        setIsLoading(false)

        setSubscription(result)

      }
    }

    const getInterval = () => {

        const interval = document.querySelector('input[name="togglechecked"]:checked')

        if(interval == null){
            
            return 'month'
       
        }else{

            return 'year'
        }
    }

    const launchCheckout = (event) => {

        setIsLoading(true)
        
        notifyInfo('PROCESSING','wait while we process your request. Make sure you allow page popup and disable ad blocker. Follow the incoming popup to complete your payment',true,20000)

        const interval = getInterval()

        const clickedEl = event.target

        const plan = clickedEl.getAttribute('data-plan')

        const amount = clickedEl.getAttribute('data-amount')

        const total = clickedEl.getAttribute('data-total')

        checkoutPortal(user,plan,amount,interval,total)
    }

    if (!mounted) {
            
        getSubscription()
        setMounted(true);
      } 



  return (
    <div className=' bg-darkcolor-100 text-white'>
    {isLoading && <ModalLoader />}

        <div className='container mx-auto p-3 md:p-8'>
            <Link href="/" className='text-white cursor-pointer'><img className='inline' height={20} width={20} src="/img/angle-left.png" alt="go back" /> <span className='ml-5'>Back</span></Link>

            <p className='text-center text-sm mt-8'>
                <span>Billed monthly</span>
                <span className='mx-6'>
                
                <label><input id="one" name='togglechecked' type="checkbox" /></label>   
                    
                

                </span>
                <span>Billed annually</span>
            </p>

            {subscription != null &&
            <div className='mt-16 flex flex-col lg:flex-row justify-evenly w-full gap-3'>
                <div className={`hover:bg-darkcolor-200 hover:border rounded-md w-full py-16 p-5 ${subscription[0].plan == 'free' && 'bg-darkcolor-200'}`} >
                    <p className='text-xl'>Free</p>
                    <p className='text-bold text-3xl mt-5'>$7.99</p>
                    <button className='text-center p-3 bg-primary-100 w-full px-8 rounded-md mt-3'>Subscribe</button>
                    <p className='text-xs mt-5'>This includes</p>
                    
                    <div className="flex flex-col gap-5 mt-5">
                        <div className='text-xs flex flex-row justify-start'><img src='/img/yes.png' className='inline' alt='checked' /> <span className='inline mx-2'>50 credits/month</span></div>
                        <div className='text-xs flex flex-row justify-start'><img src='/img/yes.png' className='inline' alt='checked' /> <span className='inline mx-2'>Create private images</span></div>
                        <div className='text-xs flex flex-row justify-start'><img src='/img/yes.png' className='inline' alt='checked' /> <span className='inline mx-2'>Unlimited downloads</span></div>
                        <div className='text-xs flex flex-row justify-start'><img src='/img/yes.png' className='inline' alt='checked' /> <span className='inline mx-2'>3 days storage</span></div>
                    </div>

                    
                </div>

                <div onClick={launchCheckout} data-plan="plus" data-amount="1599" data-total="90" className={`hover:bg-darkcolor-200 hover:border rounded-md w-full py-16 p-5 ${subscription[0].plan == 'plus' && 'bg-darkcolor-200'}`}>
                    <p className='text-xl'>Plus</p>
                    <p className='text-bold text-3xl mt-5'>$15.99</p>
                    <button className='text-center p-3 bg-primary-100 w-full px-8 rounded-md mt-3'>Subscribe</button>
                    <p className='text-xs mt-5'>This includes</p>
                    
                    <div className="flex flex-col gap-5 mt-5">
                        <div className='text-xs flex flex-row justify-start'><img src='/img/yes.png' className='inline' alt='checked' /> <span className='inline mx-2'>90 credits/month</span></div>
                        <div className='text-xs flex flex-row justify-start'><img src='/img/yes.png' className='inline' alt='checked' /> <span className='inline mx-2'>Create private images</span></div>
                        <div className='text-xs flex flex-row justify-start'><img src='/img/yes.png' className='inline' alt='checked' /> <span className='inline mx-2'>Unlimited downloads</span></div>
                        <div className='text-xs flex flex-row justify-start'><img src='/img/yes.png' className='inline' alt='checked' /> <span className='inline mx-2'>90 days storage</span></div>
                    </div>

                    
                </div>

                <div onClick={launchCheckout} data-plan="premium" data-amount="1799" data-total="300" className={`hover:bg-darkcolor-200 hover:border rounded-md w-full py-4 p-5 ${subscription[0].plan == 'premium' && 'bg-darkcolor-200'}`}>
                    <small className='text-xs bg-darkcolor-300 px-2 p-1 rounded-sm'>Most popular</small>
                    <p className='mt-5 text-xl'>Premium</p>
                    <p className='text-bold text-3xl mt-5'>$17.99</p>
                    <button className='text-center p-3 bg-primary-100 w-full px-8 rounded-md mt-3'>Subscribe</button>
                    <p className='text-xs mt-5'>This includes</p>
                    
                    <div className="flex flex-col gap-5 mt-5">
                        <div className='text-xs flex flex-row justify-start'><img src='/img/yes.png' className='inline' alt='checked' /> <span className='inline mx-2'>300 credits/month</span></div>
                        <div className='text-xs flex flex-row justify-start'><img src='/img/yes.png' className='inline' alt='checked' /> <span className='inline mx-2'>Create private images</span></div>
                        <div className='text-xs flex flex-row justify-start'><img src='/img/yes.png' className='inline' alt='checked' /> <span className='inline mx-2'>Unlimited downloads</span></div>
                        <div className='text-xs flex flex-row justify-start'><img src='/img/yes.png' className='inline' alt='checked' /> <span className='inline mx-2'>120 days storage</span></div>
                    </div>

                    
                </div>

                <div onClick={launchCheckout} data-plan="enterprise" data-amount="15999" data-total="3000" className={`hover:bg-darkcolor-200 hover:border rounded-md w-full py-16 p-5 ${subscription[0].plan == 'enterprise' && 'bg-darkcolor-200'}`}>
                    <p className='text-xl'>Enterprise</p>
                    <p className='text-bold text-3xl mt-5'>$159.99</p>
                    <button className='text-center p-3 bg-primary-100 w-full px-8 rounded-md mt-3'>Subscribe</button>
                    <p className='text-xs mt-5'>This includes</p>
                    
                    <div className="flex flex-col gap-5 mt-5">
                        <div className='text-xs flex flex-row justify-start'><img src='/img/yes.png' className='inline' alt='checked' /> <span className='inline mx-2'>3000 credits/month</span></div>
                        <div className='text-xs flex flex-row justify-start'><img src='/img/yes.png' className='inline' alt='checked' /> <span className='inline mx-2'>Create private images</span></div>
                        <div className='text-xs flex flex-row justify-start'><img src='/img/yes.png' className='inline' alt='checked' /> <span className='inline mx-2'>Unlimited downloads</span></div>
                        <div className='text-xs flex flex-row justify-start'><img src='/img/yes.png' className='inline' alt='checked' /> <span className='inline mx-2'>365 days storage</span></div>
                    </div>

                    
                </div>
            </div>
            }
        </div>
    </div>
  )
}

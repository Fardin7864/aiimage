import Stripe from "stripe";
import { auth } from "@/libs/firebase";
import { addDoc, collection,getDocs, query, where,updateDoc,doc } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { handleDate,addOneMonth } from '@/libs/utils';
import { useEffect, useState } from 'react';
import { updateCredits } from "./credits";

 const subscriptionRef = collection(db, 'subscription')

const stripe = new Stripe('sk_test_51OtuLD0337xcnUJewiuo006Aj21xwOvlummaajGcI621uYpMx5yJ2pb19X81YShQnJZlcbH4PoLWhj24lW6cfufM00cDTgtYBA',{
    apiVersion: '2023-10-16'
})


export const getSubscription = async () => {

    const data =  await getDocs(query(subscriptionRef,where('userId','==',1)))

    const result = data.docs.map(doc => ({...doc.data()}))

    if(result.length > 0){

      //setSubscription(result)

      console.log(result[0].stripeCustomerId)

    }else{

      //addSubscription()
      console.log(result)
    }
}

export const checkoutPortal = async (user,plan,amount,interval,total) => {

    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `http://localhost:3000/verify_payment?user=${user.uid}`,
        cancel_url: 'http://localhost:300/subscription',
        mode: 'subscription',
        billing_address_collection: 'auto',
        customer_email: user.email,
        line_items: [{
            price_data: {
                currency: "USD",
                product_data: {
                    name: 'pro plan',
                    description: 'subscribe to our image extension services'
                },
                unit_amount: amount,
                recurring: {
                    interval: interval
                }
            },
            quantity: 1
        }],
        metadata: {
            userId: user.uid,
            plan: plan,
            total: total
        }
    })

    //return stripeSession.url
    //console.log(stripeSession)
    addSessionToSubscription(user.uid,stripeSession.id)

    const link = document.createElement('a')

    link.href = stripeSession.url
    link.setAttribute('target','_blank')
    link.setAttribute('id','stripe-link')
    document.body.appendChild(link)
    document.getElementById('stripe-link').click()
    window.close()
}

export const billingPortal = async (stripeCustomerId) => {

    const stripeSession = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: 'http://localhost:3000/subscription'
    })

    return console.log(stripeSession)

}

export const retrieveSession = async (session) => {

    const stripeSession = await stripe.checkout.sessions.retrieve(session)

    return stripeSession
}


const addSubscription = async (userId,total) => {
    await addDoc(creditsRef, {
        userId: userId,
        total: total,
        count: 0,
        startDate: currentTimestamp(),
        endDate: addOneMonth()
    })
}

export  const firstSubscription = async (userId,total) => {
    const result = await addDoc(subscriptionRef, {
        userId: userId,
        plan: 'free',
    })

    window.location = '/'
}

//update the user subscription with stripe details
export const updateSubscription = async (userId,stripe) => {

    const querySnapshot = await getDocs(query(subscriptionRef, where('userId', '==', userId)));
    
    querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
        // Update the specific field in the document
        updateDoc(docRef, {
            stripeCurrentPeriodEnd: stripe.expires_at,
            userId: userId,
            plan: stripe.metadata.plan,
            created: stripe.created,
            stripeCustomerId: stripe.customer,
            stripeSubscriptionId: stripe.subscription
        })
        .then(() => {
            console.log("Document successfully updated!");
            
            //update credits document
            updateCredits(userId,stripe)
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    });
}



//add stripe session to subscription
export const addSessionToSubscription = async (userId,session) => {

    const querySnapshot = await getDocs(query(subscriptionRef, where('userId', '==', userId)));
    
    querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
        // Update the specific field in the document
        updateDoc(docRef, {
            stripeSession: session,
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    });


}


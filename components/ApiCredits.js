import { getCredits,addCredits} from '@/libs/credits'
import { useEffect,useState } from 'react'
import { addDoc, collection,getDocs, query, where } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { firstSubscription,updateSubscription } from '@/libs/stripe';



export default function ApiCredits(props) {

  const [mounted, setMounted] = useState(false);

  const [credits,setCredits] = useState(null)


 const toggleCredits = async (userId,total) => {

  const credit = await getCredits(userId)
  
      if(credit === null){

        await addCredits(userId,total)
        
        await firstSubscription(userId)

      }else{
        
        setCredits(credit)

        
      }
  }

  if(props.user != null){

    if (!mounted) {
          
        toggleCredits(props.user.uid,50)
        setMounted(true);
    } 
    
  }

  



  //setTimeout(() => getSubscription(),5000)
  return (
    <>
    {credits != null && 
      <div className="bg-creditgreen-100 w-full p-3 rounded-md mt-1 mb-4">
        <p className="mt-3 text-black">{ credits[0].count }/{ credits[0].total } credits</p>
        <div className="w-full h-2 min-h-2 bg-white rounded-md">
            <div className=" w-1/3 min-w-1/3 h-2 min-h-2 bg-darkcolor-200 rounded-md"></div>
        </div>
        <div className="flex justify-center w-full p-3">
            <button onClick={props.toggleUpgrade} className="bg-white text-black text-center p-1 mt-6 text-sm rounded-md px-6 w-full">Upgrade now</button>
        </div>
      </div>
    }
    </>
  )
}

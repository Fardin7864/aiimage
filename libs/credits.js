import { addDoc, collection,getDocs, query, where,updateDoc,doc } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { addOneMonth,currentTimestamp } from '@/libs/utils';

const creditsRef = collection(db, 'credits')

export const getCredits = async (userId) => {

  const data =  await getDocs(query(creditsRef,where('userId','==',userId)))

  const result = data.docs.map(doc => ({...doc.data()}))

  if(result.length > 0){

    return result

  }else{

    return null
  }
}

export const addCredits = async (userId,total) => {
  await addDoc(creditsRef, {
      userId: userId,
      total: total,
      count: 0,
      startDate: currentTimestamp(),
      endDate: addOneMonth()
  })
}

export const toggleCredits = async (userId,total) => {

  const credit = await getCredits(userId)
  
      if(credit != null){
  
        console.log(credit)
  
      }else{
        
        const add = await addCredits(userId,total)
  
        console.log(add)
      }
}

//update the user subscription with stripe details
export const updateCredits = async (userId,stripe) => {

  const querySnapshot = await getDocs(query(creditsRef, where('userId', '==', userId)));
  
  querySnapshot.forEach((doc) => {
      const docRef = doc.ref;
      // Update the specific field in the document
      updateDoc(docRef, {
          count: 0,
          startDate: stripe.created,
          endDate: stripe.expires_at,
          total: stripe.metadata.total,
      })
      .then(() => {
          console.log("Document successfully updated!");
          window.location = '/'
      })
      .catch((error) => {
          console.error("Error updating document: ", error);
      });
  });
}
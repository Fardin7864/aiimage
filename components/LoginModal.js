import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth,provider } from '@/libs/firebase'

export default function LoginModal(props) {

  const signInWithGoogle = async () => {

    const result = await signInWithPopup(auth,provider)
    // data.name = result.user.displayName
    // data.email = result.user.email

    if(result) props.setLogin()
    
  }

  return (
    <div className="overlay z-50">
        <div className="modal w-3/4 md:w-1/3 rounded-md border border-l-1 text-white">
          <div className="flex justify-end">
            <span onClick={props.toggleLaunchSignIn} className="mr-2 mt-1"><img src="img/close.png" alt="close" /></span>
          </div>
            <h2 className="text-2xl font-semibold mb-3 text-center mt-10">Sign in with Google</h2>
            <div className="flex justify-center">
            <button onClick={signInWithGoogle} className="p-2 mt-10 mb-10 bg-white text-xs text-black rounded-md"><img className="inline" src="img/google.png" alt="google" /><span className="px-6"> Continue with Google</span></button>
            </div>
        </div>
    </div>
  )
}

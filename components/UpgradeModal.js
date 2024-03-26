import React from 'react'
import { useRouter } from 'next/navigation'

export default function UpgradeModal(props) {

  const router = useRouter()

  const toggle = () => {

    router.push('/subscription')

  }
  return (
    <div className="overlay z-50">
        <div className="modal w-3/4 md:w-1/3 rounded-md border border-l-1 text-white p-5 px-8">
          <div className="flex justify-end">
            <span onClick={props.toggleUpgrade} className=""><img src="img/close.png" alt="close" /></span>
          </div>
           <div className='mx-auto w-5/6'>
            <h2 className="text-2xl font-semibold mb-3 mt-5">Upgrade your plan</h2>
              <p className='mt-5'>You need to upgrade your plan to perform this action.</p>
              <div className="flex justify-center">
              <button onClick={toggle} className="p-2 mt-10 mb-4 py-3 text-white bg-primary-100 w-full rounded-md">Upgrade now</button>
              </div>
           </div>
        </div>
    </div>
  )
}

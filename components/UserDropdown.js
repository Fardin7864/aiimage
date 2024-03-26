import { useRouter } from 'next/navigation'

export default function UserDropdown(props) {

  const router = useRouter()

  const upgrade = () => router.push('/subscription')
  return (
    <div className="flex flex-col rounded-md gap-3 z-20 mt-11 justify-end absolute w-3/4 md:w-full lg:w-1/6 sm:w-3/4 right-4 md:right-8 p-4 border bg-darkcolor-100">
        <div className='hover:bg-darkcolor-300 p-1 px-2 rounded-md'><img src="img/settings.png" alt="billing" className="inline" /> <span className="text-xs ml-2">Billing</span></div>
        <div onClick={upgrade} className='hover:bg-darkcolor-300 p-1 px-1 rounded-md'><img src="img/clipboard.png" alt="plans" className="inline" /> <span className="text-xs ml-2">Plans</span> <button className="text-xs inline text-black bg-creditgreen-100 float-end ml-12 px-1 rounded p-1">Upgrade</button></div>
        <div className='hover:bg-darkcolor-300 p-1 px-2 rounded-md'><img src="img/question.png" alt="help center" className="inline" /> <span className="text-xs ml-2">Help center</span></div>
        <div className='hover:bg-darkcolor-300 p-1 px-2 rounded-md cursor-pointer' onClick={props.logout}><img src="img/log-out.png" alt="log out" className="inline" /> <span className="text-xs ml-2">Log out</span></div>
    </div>
  )
}

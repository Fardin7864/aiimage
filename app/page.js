/* eslint-disable @next/next/no-img-element */
'use client'
import Image from "next/image";
import Link from "next/link";
import { useState,useEffect } from "react";
import LoginModal from "@/components/LoginModal";
import ScaleModal from "@/components/ScaleModal";
import UserDropdown from "@/components/UserDropdown";
import ApiCredits from "@/components/ApiCredits";
import UpgradeModal from "@/components/UpgradeModal";
import { previewImage,addOneMonth } from "@/libs/utils";
import { auth } from "@/libs/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from "next/navigation";


export default function Home() {


  const [user,setUser] = useAuthState(auth)

  const [launchSignIn,setLaunchSignIn] = useState(false)

  const [launchUpgrade,setLaunchUpgrade] = useState(false)

  const [showScale,setShowScale] = useState(false)

  const [isDropdown,setIsDropdown] = useState(false)

  const [uploader,setUploader] = useState(true)

  const router = useRouter()

  

  //image width
  const [width,setWidth] = useState(0)
  //image height
  const [height,setHeight] = useState(0)
  //original image width
  const [original_width,setOriginal_width] = useState(0)
  //original image height
  const [original_height,setOriginal_height] = useState(0)

  //toggle the launch of the sign in with google modal
  const toggleLaunchSignIn = () => {

    setLaunchSignIn(!launchSignIn)
  }
  
  //toggle the image scale modal
  const toggleScale = () => {

    setShowScale(!showScale)
  }
  
  //toggle the user authenticated dropdown 
  const toggleUserDropdown = () => {

    setIsDropdown(!isDropdown)
  }

  //toggle the upgrade modal toggle
  const toggleUpgrade = () => {

    setLaunchUpgrade(!launchUpgrade)

  }
  
  //logging in the user
  const setLogin = () => {

    setLaunchSignIn(false)

    //setIsLoggedIn(true)

   
    
  }

  
  //logout the user
  const logout = async () => {

    toggleUserDropdown()

    //setIsLoggedIn(false)

    await signOut(auth)
  }

  //toggle between file uploader or image url
  const toggleUploader = () => {

    setUploader(!uploader)

  }

  const maintainState = () => {

    if(user == null){

      if(auth.currentUser != null) setUser(auth.currentUser)
    }
  }

  
  useEffect(() => {

    // setTimeout(() => {
    //   //checkoutPortal()
       //retrieveSession()
    //   //billingPortal('cus_Pk3b7aM6iInAS9')
      
    // },5000)


    
  },[])

  

  
  return (
    
    <>
   
   
    {/* header */}
    <header className="bg-darkcolor-200">
        <div className="container mx-auto flex flex-row justify-between text-white py-4 md:py-8 px-1 md:px-auto">
          <span>Extend Image</span>
          {user != null ? <span onClick={toggleUserDropdown} className="cursor-pointer flex"><img width={32} height={32} className="inline mr-2 md:mr-0 rounded-full" src={user.photoURL} alt="user" /></span> 
          :<span onClick={toggleLaunchSignIn} className="cursor-pointer"><img width={16} height={16} className="inline" src="/img/login.png" alt="sign in" /> &nbsp; sign in</span>
          }

          {isDropdown && <UserDropdown logout={logout} />}
          


          
          
          
        </div>
    </header>
    
    <div className="container mx-auto text-white">
      <div className="flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-12 mt-5">
        <aside className="bg-darkcolor-200 p-3 rounded relative">

          {user && <ApiCredits toggleUpgrade={toggleUpgrade} user={user} />}



          <div className="w-2/3 md:w-full lg:w-1/2 sm:w-1/2 bg-darkcolor-300 rounded-md text-xs flex py-1 flex-row justify-between">
            <span onClick={toggleUploader} className={` py-2 px-3 ml-1 rounded whitespace-nowrap cursor-pointer ${uploader ? 'bg-darkcolor-100' : ''}`}>Upload File</span>
            <span onClick={toggleUploader} className={`py-2 px-4 whitespace-nowrap cursor-pointer rounded ${uploader ? '' : 'bg-darkcolor-100'}`}>Image URL</span>
          </div>

          <div className={`mt-5 w-full relative border-2 border-dashed border-blue-800 rounded-xl ${uploader ? '' : 'hidden'}`}>
            <div className="rounded-3xl w-full bg-darkcolor-300">
              <div className="w-2/3 mx-auto flex flex-col justify-center gap-2 py-4">
                <div className="text-center justify-center mt-2">
                  <img className="inline" height={24} width={24} src="/img/upload.png" alt="upload an image" />
                </div>
                <div className="text-center text-sm mt-3">Upload an image</div>
                <input type="file" onChange={(event) => previewImage(event,setHeight,setWidth,setOriginal_height,setOriginal_width)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" id="fileInput" />
                <small className="text-center text-xs text-slate-400">To get better results upload an image without border or lettering.</small>
                <div className="text-primary text-center text-xs mt-3">(up to 4mb)</div>
                <small className="text-center text-xs text-slate-400 mt-3">PNG, JPG, JPEG are supported</small>
              </div>
            </div>
          </div>

          <div className={`mt-8 ${uploader ? 'hidden' : ''}`}>
            <h4 className="text-sm">Image Url</h4>
            <input className="text-xs text-slate-400 mt-2 w-full border border-slate-500 p-2 rounded ring-0 bg-inherit" placeholder="Paste Link" />
          </div>

          <div className="mt-8">
            <h4 className="text-sm">Prompt <span className="text-slate-400 text-xs">(Optional)</span></h4>
            <label className="text-xs mt-1">Describe the image you want to generate in English</label>
            <input className="text-xs text-slate-400 mt-2 w-full border border-slate-500 p-2 rounded ring-0 bg-inherit" placeholder="Enter Prompt" />
          </div>

          <div className="mt-8">
            <h4 className="text-sm">Amount</h4>
            <label className="text-xs mt-1">Set the number of images you want to generate</label>
            <select className="text-xs my-select mt-2 w-full p-2 px-4 rounded ring-0 bg-darkcolor-300">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </select>
          </div>

          <div className="mt-8">
            <h4 className="text-sm">Private <span><img className="inline" height={24} width={24} src="/img/crown.png" alt="upload an image" /></span></h4>
            <label className="text-xs mt-1">Control the privacy of the image</label>
            <select className="text-xs my-select mt-2 w-full p-2 px-4 rounded ring-0 bg-darkcolor-300">
              <option>Public</option>
              <option>Private</option>
            </select>
            <small className="text-xs mt-3"><a href="#">To create private images you must first upgrade</a></small>
          </div>

          <button className="bg-primary py-3 text-center w-full rounded mt-10 text-sm">Extend my image</button>


        </aside>
        <main className="bg-darkcolor-200 col-span-2 p-2 rounded relative">
          <div className="flex flex-row justify-end">
            <div className="w-2/3 md:w-full lg:w-1/5 sm:w-1/3 bg-darkcolor-300 rounded-md text-xs flex py-1 flex-row justify-between">
                <span className="bg-darkcolor-100 py-3 px-3 ml-1 rounded">
                  <div className="min-h-5 min-w-4 border-2 border-slate-500 "></div>
                </span>
                <span className="py-2 px-4">Scale <br />772X772</span>
                <span onClick={toggleScale} className="py-2 px-4 cursor-pointer"><img src="/img/up-arrow.png" width={24} height={24} alt="drop down" /></span>
            </div>
          </div>

          {showScale && <ScaleModal original_height={original_height} original_width={original_width} height={height} width={width} changeHeight={(val) => setHeight(val)} changeWidth={(val) => setWidth(val)} />}

          <div className="w-full mx-auto mt-8 flex justify-center h-auto" id="imagePreview">
            <img src='/' height={height} width={width}  alt="image to scale" />
          </div>

        </main>
      </div>
    </div>

    <div className="container mx-auto mt-12 text-white">
      <div className="w-full md:w-1/4 bg-darkcolor-300 rounded-md flex p-3 py-2 flex-row justify-between">
        <span className="py-2 px-3 rounded">Public</span>
        <span className="bg-darkcolor-100 py-2 px-4 rounded mr-1">My collection</span>
      </div>

      <div className="md:grid md:grid-cols-5 gap-3 mt-8 w-full">
        <div className="relative">
          <img src="/img/generating.jpeg" alt="generating image" className="h-auto w-full" />
        </div>
        <div className="relative mt-2">
          <img src="/img/generating.jpeg" alt="generating image" className="h-auto w-full" />
        </div>
        <div className="relative mt-2">
          <img src="/img/generating.jpeg" alt="generating image" className="h-auto w-full" />
        </div>
        <div className="relative mt-2">
          <img src="/img/generating.jpeg" alt="generating image" className="h-auto w-full" />
        </div>
        <div className="relative mt-2">
          <img src="/img/car.jpeg" alt="generating image" className="h-auto w-full" />
        </div>
        <div className="relative mt-2">
          <img src="/img/car.jpeg" alt="generating image" className="h-auto w-full" />
        </div>
        <div className="relative mt-2">
          <img src="/img/car.jpeg" alt="generating image" className="h-auto w-full" />
        </div>
        <div className="relative mt-2">
          <img src="/img/car.jpeg" alt="generating image" className="h-auto w-full" />
        </div>
        <div className="relative">
          <img src="/img/car.jpeg" className="h-auto w-full" alt="generating image" />
          <div className="absolute inset-0 bg-black opacity-30"></div>

          <div className="absolute top-12">
            <div className="grid grid-cols-3 gap-3 w-full ml-4">
              <div>
                <div className="border-2 border-white rounded-full h-14 w-14 p-4">
                  <img src="/img/downloads.png" alt="image" />
                </div>
                <small className="text-xs">Download</small>
              </div>
             <div>
                <div className="border-2 border-white rounded-full h-14 w-14 p-3">
                  <img src="/img/full-screen.png" alt="image" />
                </div>
                <small className="text-xs">Extend</small>
             </div>
              <div>
                <div className="border-2 border-white rounded-full h-14 w-14 p-4">
                  <Link href='/copylink'><img src="/img/link.png" alt="image" /></Link>
                </div>
                <Link href='/copylink'><small className="text-xs">Copy link</small></Link>
              </div>
              <div>
                <div className="border-2 border-white rounded-full h-14 w-14 p-4">
                  <a target="_blank" href="/viewmore"><img src="/img/eye.png" alt="image" /></a>
                </div>
                <Link target="_blank" href="/viewmore"><small className="text-xs">View more</small></Link>
              </div>
              <div>
                <div className="border-2 border-white rounded-full h-14 w-14 p-4">
                  <img src="/img/refresh.png" alt="image" />
                </div>
                <small className="text-xs">Copycat</small>
              </div>
            </div>
          </div>
       
        </div>
      </div>
    </div>

    <div className="mt-5 w-2 h-2 min-h-2 min-w-2 bg-white mx-auto rounded-full"></div>
    <div className="mt-5 w-2 h-2 min-h-2 min-w-2 bg-white mx-auto rounded-full"></div>
    <div className="mt-5 w-2 h-2 min-h-2 min-w-2 bg-white mx-auto rounded-full"></div>

    <div className="w-full flex justify-center mt-12 mb-7">
    <button className="bg-primary p-3 text-sm text-white mx-auto rounded">Load more</button>
    </div>

    { launchSignIn == true && <LoginModal toggleLaunchSignIn={toggleLaunchSignIn} setLogin={setLogin} />}

    { launchUpgrade == true && <UpgradeModal toggleUpgrade={toggleUpgrade} />}

    
    
    </>

  );
}

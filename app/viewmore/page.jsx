/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

export default function ViewMore() {
  return (
    
    <>
    <h1 className="text-center text-white p-14 text-xl">Extend my image</h1>

    <div className="container mx-auto text-white md:w-4/5 lg:w-2/3 bg-darkcolor-200 p-2 md:p-5 lg:p-10 lg:px-14 mb-10">
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-6">
            <div className="md:col-span-1">
                <h3 className="text-center text-lg mb-1">Original image</h3>
                <div className="bg-darkcolor-300 w-full rounded-md py-14 min-h-96 px-8 md:px-4 lg:px-8 flex justify-center">
                    <img src="img/original-image.jpeg" alt="original image" />
                </div>
            </div>
            <div className="md:col-span-1">
                <h3 className="text-center text-lg mb-1">Extended image</h3>
                <div className="bg-darkcolor-300 w-full rounded-md py-14 min-h-96 px-8 md:px-4 lg:px-8 flex justify-center">
                    <img src="img/extended-image.jpeg" alt="extended image" />
                </div>
            </div>
        </div>
        <hr className="mt-20 mb-16 bg-darkcolor-300 text-slate-800" />
        <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between">
            <div>
                <h2 className="text-lg md:text-2xl mt-2">Share this wonder with people!</h2>
            </div>
            <div>
                <button className="p-5 px-16 bg-primary rounded-md">Copy link</button>
            </div>
        </div>
        
    </div>
    


    
    
    
    </>

  );
}

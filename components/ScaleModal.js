import React from 'react'
import { useState } from 'react'

export default function ScaleModal(props) {
    

    const scaleImage = (event,type) => {

        switch (type) {
            case '1:1':
                props.changeWidth(Math.round(props.original_width * (1/1)))
                props.changeHeight(Math.round(props.original_height * (1/1)))
                document.getElementById('width').value = Math.round(props.original_width * (1/1))
                document.getElementById('height').value = Math.round(props.original_height * (1/1))
                break;

            case '3:2':
                props.changeWidth(Math.round(props.original_width * (3/2)))
                props.changeHeight(Math.round(props.original_height * (2/3)))
                document.getElementById('width').value = Math.round(props.original_width * (3/2))
                document.getElementById('height').value = Math.round(props.original_height * (2/3))
                break;

            case '2:3':
                props.changeWidth(Math.round(props.original_width * (2/3)))
                props.changeHeight(Math.round(props.original_height * (3/2)))
                document.getElementById('width').value = Math.round(props.original_width * (2/3))
                document.getElementById('height').value = Math.round(props.original_height * (3/2))
                break;

            case '4:3':
                props.changeWidth(Math.round(props.original_width * (4/3)))
                props.changeHeight(Math.round(props.original_height * (3/4)))
                document.getElementById('width').value = Math.round(props.original_width * (4/3))
                document.getElementById('height').value = Math.round(props.original_height * (3/4))
                break;

            case '3:4':
                props.changeWidth(Math.round(props.original_width * (3/4)))
                props.changeHeight(Math.round(props.original_height * (4/3)))
                document.getElementById('width').value = Math.round(props.original_width * (3/4))
                document.getElementById('height').value = Math.round(props.original_height * (4/3))
                break;

            case '16:9':
                props.changeWidth(Math.round(props.original_width * (16/9)))
                props.changeHeight(Math.round(props.original_height * (9/16)))
                document.getElementById('width').value = Math.round(props.original_width * (16/9))
                document.getElementById('height').value = Math.round(props.original_height * (9/16))
                break;

            case '9:16':
                props.changeWidth(Math.round(props.original_width * (9/16)))
                props.changeHeight(Math.round(props.original_height * (16/9)))
                document.getElementById('width').value = Math.round(props.original_width * (9/16))
                document.getElementById('height').value = Math.round(props.original_height * (16/9))
                break;

            case 'original':
                props.changeWidth(props.original_width)
                props.changeHeight(props.original_height)
                document.getElementById('width').value = props.original_width
                document.getElementById('height').value = props.original_height
                break;


        
            default:

                props.changeWidth(props.original_width)
                props.changeHeight(props.original_height)
                document.getElementById('width').value = props.original_width
                document.getElementById('height').value = props.original_height
                break;
        }

        const arr = document.querySelectorAll('.scaler .parent.border')
        
        arr.forEach(elem => {

            elem.classList.contains('border') ? elem.classList.remove('border') : ''
        })

        let el = event.target

        if(el.classList.contains('child') || el.classList.contains('min-h-3')){

            el.parentElement.classList.add('border')
        
        }else{

            el.classList.add('border')
        }
    }

    


  return (
    <div className="flex flex-row justify-end absolute w-3/4 md:w-full lg:w-1/4 sm:w-3/4 right-1">
        <div className="bg-darkcolor-300 rounded-md text-xs py-1 mt-2">

            <div className=" grid grid-cols-5 p-3 relative">
            <div className="col-span-2">
                <input id='width' type="number" min={1} className="p-1 w-full bg-transparent rounded-md border border-double border-slate-800 text-slate-400" onChange={(event) => props.changeWidth(event.target.value)} defaultValue={props.width} />
            </div>
            <div className="col-span-1 text-center mt-1">X</div>
            <div className="col-span-2">
                <input id='height' type="number" min={1} className="p-1 w-full bg-transparent rounded-md border border-slate-800 text-slate-400" onChange={(event) => props.changeHeight(event.target.value)} defaultValue={props.height} />
            </div>
            </div>

            <div className="grid grid-cols-4 p-3 gap-2 relative scaler">
                <div onClick={(event) => scaleImage(event,'original')} style={{fontSize: '10px'}} className="col-span-1 cursor-pointer text-center align-middle py-2 rounded bg-black min-h-8 h-8 text-xs">Original</div>
                <div onClick={(event) => scaleImage(event,'1:1')} className="col-span-1 parent relative cursor-pointer bg-black min-h-8 h-8 text-center flex justify-center align-middle py-2 rounded">
                    <div className='text-white child bg-darkcolor-300 focus:block focus-within:block absolute p-1'>1:1</div>
                    <div className="min-h-3 parent min-w-3 h-3 w-3 text-white border-2 border-slate-500 "></div>
                </div>
                <div onClick={(event) => scaleImage(event,'3:2')} className="col-span-1 parent relative cursor-pointer bg-black min-h-8 h-8 text-center flex justify-center align-middle py-2 rounded">
                    <div className='text-white child bg-darkcolor-300 focus:block focus-within:block absolute p-1'>3:2</div>
                    <div className="min-h-2 min-w-3 h-2 w-3 border-2 border-slate-500 "></div>
                </div>
                <div onClick={(event) => scaleImage(event,'2:3')} className="col-span-1 parent relative cursor-pointer bg-black min-h-8 h-8 text-center flex justify-center align-middle py-2 rounded">
                    <div className='text-white child bg-darkcolor-300 focus:block focus-within:block absolute p-1'>2:3</div>
                    <div className="min-h-3 min-w-2 h-3 w-2 border-2 border-slate-500 "></div>
                </div>
                <div onClick={(event) => scaleImage(event,'4:3')} className="col-span-1 parent relative cursor-pointer bg-black min-h-8 h-8 text-center flex justify-center align-middle py-2 rounded">
                    <div className='text-white child bg-darkcolor-300 focus:block focus-within:block absolute p-1'>4:3</div>
                    <div className="min-h-2 min-w-3 h-2 w-3 border-2 border-slate-500 "></div>
                </div>
                <div onClick={(event) => scaleImage(event,'3:4')} className="col-span-1 parent relative cursor-pointer bg-black min-h-8 h-8 text-center flex justify-center align-middle py-2 rounded">
                    <div className='text-white child bg-darkcolor-300 focus:block focus-within:block absolute p-1'>3:4</div>
                    <div className=" bg-darkcolor-300">9:12</div>
                </div>
                <div onClick={(event) => scaleImage(event,'16:9')} className="col-span-1 parent relative cursor-pointer bg-black min-h-8 h-8 text-center flex justify-center align-middle py-2 rounded">
                    <div className='text-white child bg-darkcolor-300 focus:block focus-within:block absolute p-1'>16:9</div>
                    <div className="min-h-1 min-w-3 h-1 w-3 border border-slate-500 "></div>
                </div>
                <div onClick={(event) => scaleImage(event,'9:16')} className="col-span-1 parent relative cursor-pointer bg-black min-h-8 h-8 text-center flex justify-center align-middle py-2 rounded">
                    <div className='text-white child bg-darkcolor-300 focus:block focus-within:block absolute p-1'>9:16</div>
                    <div className="min-h-3 min-w-1 h-3 w-1 border border-slate-500 "></div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

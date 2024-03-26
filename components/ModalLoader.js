import { Circles } from 'react-loader-spinner'

export default function modalLoader() {
  return (

    <div className="overlay z-50">
        <div className="modal w-3/4 md:w-1/3 rounded-md text-white p-5 px-8 flex justify-center">
        
            <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
        </div>
    </div>
    
    
  )
}

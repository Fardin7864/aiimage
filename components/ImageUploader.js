import { previewImage } from "@/libs/utils";

export default function ImageUploader() {
  return (
    <>
    <div className="w-2/3 md:w-full lg:w-1/2 sm:w-1/2 bg-darkcolor-300 rounded-md text-xs flex py-1 flex-row justify-between">
            <span className="bg-darkcolor-100 py-2 px-3 ml-1 rounded whitespace-nowrap">Upload File</span>
            <span className="py-2 px-4 whitespace-nowrap">Image URL</span>
          </div>

          <div className="mt-5 w-full relative border-2 border-dashed border-blue-800 rounded-xl">
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
    </>
  )
}

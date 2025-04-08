"use client"

import { ChangeEvent, EventHandler, useState } from "react";

const Home = () => {
  //onchange states
  const [excelFile, setExcelFile] = useState(null)
  const [typeError, setTypeError] = useState(null)
  // submit state
  const [excelData, setExcelData] = useState(null)


  //onchange event
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files[0]
      if(selectedFile){

      }else{
        console.log('Please select your file')
      }
  }

  //submit event
  return(
    <div className="w-full h-[100vh] bg-sky-950 flex  justify-center p-5">
      <form className="flex flex-col gap-4 items-center justify-center ">
        <input type="file" className="
        file:bg-slate-900
        file:p-3
        file:rounded-2xl
        file:text-2xl file:py-2 cursor-pointer"  required/>
        <button className="bg-slate-900 w-full py-3 rounded-2xl text-2xl  cursor-pointer">UPLOAD</button>
      </form>

      <div className="">
      {
        excelData?(
          <div>Show Data Here</div>
        ): (
          <div>Sem arquivo para upload</div>
        )
      }
      </div>
    </div>
  )
}

export default Home;
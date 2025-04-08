"use client"

import { ChangeEvent, EventHandler, useState } from "react";
import * as XLSX from 'xlsx'
type DataRelatorioPrisma = {
  polo: string
  matriculaAluno: string
  cicloAplicacao: string
  curso: string
  modalidade: string
  nomeAluno: string
  prazoRealizacao: number
  prova: string
  semestre: string
}
const Home = () => {
  const matriculaAlunoPrisma: DataRelatorioPrisma[] = []
  //onchange states
  const [excelFile, setExcelFile] = useState<string | ArrayBuffer | null>(null)
  const [typeError, setTypeError] = useState<string | null>(null)
  // submit state
  const [excelData, setExcelData] = useState<DataRelatorioPrisma[] |null>(null)


  //onchange event
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
      let fileType = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"]

      const selectedFile = e.target.files[0]

      if(selectedFile){
       if(selectedFile&&fileType.includes(selectedFile.type)){
        setTypeError(null)
        let reader = new FileReader()
        reader.readAsArrayBuffer(selectedFile)
        reader.onload = (e: ProgressEvent<FileReader>) => {
          setExcelFile(e.target!.result)
        }

       }else{
        setTypeError("Por favor, informe o tipo de arquivo correto")
        setExcelFile(null)
       }
      }else{
        console.log('Please select your file')
      }
  }

  //submit event

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(excelFile !== null){
      const workbook = XLSX.read(excelFile, {type: 'buffer'})
      const worksheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[worksheetName]
      const data = XLSX.utils.sheet_to_json(worksheet)
      console.log(data)
       setExcelData(data as DataRelatorioPrisma[])
    }
    
    const matricula = excelData?.map(item => item.matriculaAluno)
    console.log(matricula)
  }

  return(
    <div className="w-full h-[100vh] bg-sky-950 flex flex-col items-center gap-10 p-5">
      <form  onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-center ">
        <input role="alert" type="file" className="
        file:bg-slate-900
        file:p-3
        file:rounded-2xl
        file:text-2xl file:py-2 cursor-pointer"  required onChange={handleFile}/>
        <button onClick={() => console.log('Clique detectado')} type="submit" className="bg-slate-900 w-full py-3 rounded-2xl text-2xl  cursor-pointer">UPLOAD</button>
        {
          typeError && (
            <div  className="bg-red-500 opacity-60 px-2 rounded-2xl">{typeError}</div>
          )
        }
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
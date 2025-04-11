"use client"

import Table from "@/components/Table";
import { DataRelatorioPrisma } from "@/types/dataExcelTypes";
import { ChangeEvent, EventHandler, useState } from "react";
import * as XLSX from 'xlsx'

const Home = () => {
  const matriculaAlunoPrisma: DataRelatorioPrisma[] = []
  //onchange states
  const [excelFile, setExcelFile] = useState<File>()
  const [typeError, setTypeError] = useState<string | null>(null)
  // submit state
  const [excelData, setExcelData] = useState<DataRelatorioPrisma[]>([])


  //onchange event
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
      let fileType = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"]

      if(e.target.files && e.target.files.length > 0){
        const selectedFile = e.target.files[0]
        if(selectedFile){
        if(selectedFile&&fileType.includes(selectedFile.type)){
          setTypeError(null)
          let reader = new FileReader()
          reader.readAsArrayBuffer(selectedFile)
          reader.onload = (e: ProgressEvent<FileReader>) => {
            setExcelFile(e.target.result)
          }

        }else{
          setTypeError("Por favor, informe o tipo de arquivo correto")
      
        }
        }else{
          console.log('Please select your file')
        }
      }
  }

  //submit event

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(excelFile !== null){
      const workbook =  XLSX.read(excelFile, {type: 'buffer'})
      const worksheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[worksheetName]
      const rowData = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet) 
      
      const data: DataRelatorioPrisma[] = rowData.map(item => ({
        cicloDeAplicacao: item["Ciclo de Aplicação"],
        matriculaAluno: item["Matrícula"],
        modalidade: item["Modalidade"],
        momeAluno: String(item["Nome do Aluno"]),
        polo: item["Polo"],
        prazoRealização: item["Prazo Realização"],
        curso: item['Curso'],
        prova: item["Prova"],
        semestre: item["Semestre"],
      }))

      setExcelData(data)

    }
     excelData.map(item => {
       console.log(item.polo)
     })
  }

  return(
    <div className="w-full h-full  bg-sky-950 flex flex-col items-center gap-10 p-5">
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
          excelData.map((item, index) => {
            return (
               <Table item = {item} index={index}/>
            )
          })
        ): (
          <div>Sem arquivo para upload</div>
        )
      }
      </div>
    </div>
  )
}

export default Home;
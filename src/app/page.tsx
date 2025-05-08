"use client"

import Table from "@/components/Table";
import { filterNumbers } from "@/helpers/filterObjects";
import { DataRelatorioColaborar, DataRelatorioPrisma } from "@/types/dataExcelTypes";
import { NumberAndPhonesColaborarPolo } from "@/types/numberAndPhones";
import { ChangeEvent, EventHandler, useRef, useState } from "react";
import * as XLSX from 'xlsx'
import EXCELJS from 'exceljs'
import  {saveAs } from 'file-saver'
import { checkFilePolo } from "@/types/checkPoloFile";
import { returnSheetColaborar, returnSheetPrisma } from "@/helpers/returnSheets";
import { readAndConvertSheets } from "@/helpers/worksheets";
import { filterMatriculasNumberColaborar } from "@/helpers/filterMatriculasNumberColaborar";

const Home = () => {
  //ref
  const fileInputRef = useRef<HTMLInputElement>(null)
  const fileType = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"]
  //loading state
  const [loading, setLoading] = useState(false)
  //onchange states
  const [excelFile, setExcelFile] = useState<File>()
  const [excelFileColaborarPolo1, setExcelFileColaborarPolo1] = useState<File>()
  const [excelFileColaborarPolo2, setExcelFileColaborarPolo2] = useState<File>()
  const [excelFileColaborarPolo3, setExcelFileColaborarPolo3] = useState<File>()
  //VALIDATE
  const [typeError, setTypeError] = useState<string | null>(null)
  //colca para realizar download da planilha


   //percorre o objeto e insere na planilha
   const traverseObject = (object: NumberAndPhonesColaborarPolo[], worksheet:  EXCELJS.Worksheet ) => {
     object.forEach(obj => {
      worksheet.addRow({
        matricula: obj.matricula,
        telefone: obj.phone
      })
     })
   }
   //gerenciamento de download pelo exceljs e o objeto processado das planilhas
  const downloadData = async (object: NumberAndPhonesColaborarPolo[]) => {
    const workbook = new EXCELJS.Workbook()
    const worksheet = workbook.addWorksheet("Planilha")


    worksheet.columns = [
      {header: "Matricula", key: "matricula", width: 50},
      {header: "Telefone", key: "telefone", width: 50}
    ]
    //percorre o objeto
    traverseObject(object, worksheet)

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    saveAs(blob, 'alunos_que_nao_fizeram_provas.xlsx')
  }

  //onchange event
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    checkFilePolo(e, setTypeError, setExcelFile, fileType)
  }
  const handleFileColaborarPolo1 = (e: React.ChangeEvent<HTMLInputElement> ) => {
    checkFilePolo(e, setTypeError, setExcelFileColaborarPolo1, fileType)
  }
  const handleFileColaborarPolo2 = (e: React.ChangeEvent<HTMLInputElement> ) => {
    checkFilePolo(e, setTypeError, setExcelFileColaborarPolo2, fileType)
  }
  const handleFileColaborarPolo3 = (e: React.ChangeEvent<HTMLInputElement> ) => {
    checkFilePolo(e, setTypeError, setExcelFileColaborarPolo3, fileType) 
  }
  //submit event
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let dataPrisma: DataRelatorioPrisma[] = []
    let dataColaborarPolo1: DataRelatorioColaborar[] = []
    let dataColaborarPolo2: DataRelatorioColaborar[] = []
    let dataColaborarPolo3: DataRelatorioColaborar[] = []

    e.preventDefault()
    setLoading(true)
    if(excelFile && excelFileColaborarPolo1 && excelFileColaborarPolo2 && excelFileColaborarPolo3 !== null){
      //MANIPULANDO O ARQUIVO DO PRISMA (QUE NÃO FIZERAM PROVA)
      const rowDataPrisma = readAndConvertSheets(excelFile as File)
      //MANIPULANDO O ARQUIVO DE RELATORIO COLABORAR polo 1
      const rowDataColaborarPolo1 =  readAndConvertSheets(excelFileColaborarPolo1 as File)
      //MANIPULANDO O ARQUIVO DE RELATORIO COLABORAR polo 2
      const rowDataColaborarPolo2 =  readAndConvertSheets(excelFileColaborarPolo2 as File)
      //MANIPULANDO O ARQUIVO DE RELATORIO COLABORAR polo 3
      const rowDataColaborarPolo3 =  readAndConvertSheets(excelFileColaborarPolo3 as File)
      //COLOCA AS PLANILHAS QUE FORAM TRANFORMADAS EM OBJETOS PARA FICAREM ORGANIZADAS COM SEUS RESPECTIVOS DADOS DOS POLOS
      dataPrisma = rowDataPrisma.map(item =>  returnSheetPrisma(item))
      dataColaborarPolo1  = rowDataColaborarPolo1.map(item => returnSheetColaborar(item))
      dataColaborarPolo2 = rowDataColaborarPolo2.map(item => returnSheetColaborar(item))
      dataColaborarPolo3 = rowDataColaborarPolo3.map(item => returnSheetColaborar(item))
     
    }
    
    let filterMatriculaNumberPrisma: string[] = dataPrisma.map(item => item.matriculaAluno)
    const polos = [...dataColaborarPolo1,...dataColaborarPolo2,...dataColaborarPolo3]
    let filterMatriculaNumberColaborar = filterMatriculasNumberColaborar(polos)
    //filtra os numeros dos telefones das matriculas iguais, dos que não realizaram a prova e ajusta para não haver símbolos colocando no state
    const matriculaAndPhonesForCall = filterNumbers(filterMatriculaNumberPrisma, filterMatriculaNumberColaborar)

    setExcelFile(undefined)
   
    if(fileInputRef.current){
     console.log(fileInputRef.current.value)
    }
    setTimeout(() => {
      downloadData(matriculaAndPhonesForCall)
      setLoading(false)
    }, 3000)

  }
  
  
  return(
    <div className="w-full h-screen  bg-sky-950  flex flex-col items-center gap-10 p-5">
      <form  onSubmit={handleSubmit} className="w-full flex flex-col gap-4  items-center justify-center ">
        <h1 className="mb-5 text-3xl font-bold">Relatório alunos que não realizaram as provas.</h1>
       
        <div className="flex flex-col gap-2 items-start">
          <span className="text-md font-bold">Planilhas dos que não fizeram a prova:</span>
          <input role="alert" type="file"
          ref={fileInputRef}
          className="
          file:mx-3
          file:bg-slate-900
          file:p-3
          file:rounded-2xl
          file:text-xl file:py-2 cursor-pointer"
          
          required onChange={handleFile}/>
        </div>
        <div className="flex flex-col gap-2 items-start">
        <span className="text-md font-bold">Planilha Polo I:</span>
          <input role="alert"
          ref={fileInputRef}
           
          type="file" className="
           file:mx-3
                   file:bg-slate-900
                   file:p-3 
                   file:rounded-2xl
                   file:text-xl file:py-2 cursor-pointer"  
          required onChange={handleFileColaborarPolo1}/>
        </div>
        <div className="flex flex-col gap-2 items-start">
        <span className="text-md font-bold">Planilha Polo II:</span>
            <input role="alert"
            ref={fileInputRef}
            type="file" className="
             file:mx-3
                   file:bg-slate-900
                   file:p-3
                   file:rounded-2xl
                   file:text-xl file:py-2 cursor-pointer"  required onChange={handleFileColaborarPolo2}/>
        </div>
        <div className="flex flex-col gap-2 items-start">
        <span className="text-md font-bold">Planilha Polo III:</span>
          <input role="alert" 
          ref={fileInputRef}
          type="file" className="
          file:bg-slate-900
          file:p-3
           file:mx-3
          file:rounded-2xl
          file:text-xl file:py-2 cursor-pointer"  required onChange={handleFileColaborarPolo3}/>
        </div>
        {
          loading  ? (
            <div className="w-[50px] h-[50px] border-l-4 border-slate-900 mt-5 rounded-full animate-spin"></div>
          ):
          (
            <button 
            type="submit" className="bg-slate-900 w-full md:w-[600px] py-3 rounded-2xl text-2xl 
            cursor-pointer">DOWNLOAD
          </button>
        
          )
        }
        {
          typeError && (
            <div  className="bg-red-500 opacity-60 px-2 rounded-2xl">{typeError}</div>
          )
        }
      </form>
    </div>
  )
}

export default Home;
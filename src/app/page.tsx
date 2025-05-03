"use client"

import Table from "@/components/Table";
import { filterNumbers } from "@/helpers/filterObjects";
import { DataRelatorioColaborar, DataRelatorioPrisma } from "@/types/dataExcelTypes";
import { NumberAndPhonesColaborarPolo } from "@/types/numberAndPhones";
import { ChangeEvent, EventHandler, useState } from "react";
import * as XLSX from 'xlsx'


const Home = () => {
  const fileType = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"]
  //onchange states
  const [excelFile, setExcelFile] = useState<File>()
  const [excelFileColaborarPolo1, setExcelFileColaborarPolo1] = useState<File>()
  const [excelFileColaborarPolo2, setExcelFileColaborarPolo2] = useState<File>()
  const [excelFileColaborarPolo3, setExcelFileColaborarPolo3] = useState<File>()

  const [phoneResult, setPhoneResult] = useState<string[]>([])

  //VALIDATE
  const [typeError, setTypeError] = useState<string | null>(null)
  
  // submit state
  const [excelData, setExcelData] = useState<DataRelatorioPrisma[]>([])
  const [excelDataColaborarPolo1, setExcelDataColaborarPolo1] = useState<DataRelatorioColaborar[]>([])
  const [excelDataColaborarPolo2, setExcelDataColaborarPolo2] = useState<DataRelatorioColaborar[]>([])
  const [excelDataColaborarPolo3, setExcelDataColaborarPolo3] = useState<DataRelatorioColaborar[]>([])



  //onchange event
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
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
  const handleFileColaborarPolo1 = (e: React.ChangeEvent<HTMLInputElement> ) => {
    if(e.target.files && e.target.files.length > 0){
      const selectedFileColaborar = e.target.files[0]
      if(selectedFileColaborar){
        if(selectedFileColaborar&&fileType.includes(selectedFileColaborar.type)){
          setTypeError(null)
          let reader = new FileReader()
          reader.readAsArrayBuffer(selectedFileColaborar)
          reader.onload = (e: ProgressEvent<FileReader>) => {
            setExcelFileColaborarPolo1(e.target?.result)
          }
        }else{
          setTypeError("Por Favor, informe o tipo de arquivo correto")
        }
      }else{
        console.log("Error file")
      }
    }
  }

  const handleFileColaborarPolo2 = (e: React.ChangeEvent<HTMLInputElement> ) => {
    if(e.target.files && e.target.files.length > 0){
      const selectedFileColaborar = e.target.files[0]
      if(selectedFileColaborar){
        if(selectedFileColaborar&&fileType.includes(selectedFileColaborar.type)){
          setTypeError(null)
          let reader = new FileReader()
          reader.readAsArrayBuffer(selectedFileColaborar)
          reader.onload = (e: ProgressEvent<FileReader>) => {
            setExcelFileColaborarPolo2(e.target?.result)
          }
        }else{
          setTypeError("Por Favor, informe o tipo de arquivo correto")
        }
      }else{
        console.log("Error file")
      }
    }
  }
  const handleFileColaborarPolo3 = (e: React.ChangeEvent<HTMLInputElement> ) => {
    if(e.target.files && e.target.files.length > 0){
      const selectedFileColaborar = e.target.files[0]
      if(selectedFileColaborar){
        if(selectedFileColaborar&&fileType.includes(selectedFileColaborar.type)){
          setTypeError(null)
          let reader = new FileReader()
          reader.readAsArrayBuffer(selectedFileColaborar)
          reader.onload = (e: ProgressEvent<FileReader>) => {
            setExcelFileColaborarPolo3(e.target?.result)
          }
        }else{
          setTypeError("Por Favor, informe o tipo de arquivo correto")
        }
      }else{
        console.log("Error file")
      }
    }
  }
  //submit event
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     
    e.preventDefault()
    if(excelFile !== null){
      //MANIPULANDO O ARQUIVO DO PRISMA (QUE NÃO FIZERAM PROVA)
      const workbookPrisma =  XLSX.read(excelFile, {type: 'buffer'})
      const worksheetNamePrisma = workbookPrisma.SheetNames[0]
      const worksheet = workbookPrisma.Sheets[worksheetNamePrisma]
      const rowDataPrisma = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet) 
  
      //MANIPULANDO O ARQUIVO DE RELATORIO COLABORAR polo 1
      const workbookColaborarPolo1 =  XLSX.read(excelFileColaborarPolo1, {type: 'buffer'})
      const worksheetNameColaborarPolo1 = workbookColaborarPolo1.SheetNames[0]
      const worksheetColaborarPolo1 = workbookColaborarPolo1.Sheets[worksheetNameColaborarPolo1]
      const rowDataColaborarPolo1 = XLSX.utils.sheet_to_json<Record<string, any>>(worksheetColaborarPolo1) 
    
       //MANIPULANDO O ARQUIVO DE RELATORIO COLABORAR polo 1
       const workbookColaborarPolo2 =  XLSX.read(excelFileColaborarPolo2, {type: 'buffer'})
       const worksheetNameColaborarPolo2 = workbookColaborarPolo2.SheetNames[0]
       const worksheetColaborarPolo2 = workbookColaborarPolo2.Sheets[worksheetNameColaborarPolo2]
       const rowDataColaborarPolo2 = XLSX.utils.sheet_to_json<Record<string, any>>(worksheetColaborarPolo2) 
    
        //MANIPULANDO O ARQUIVO DE RELATORIO COLABORAR polo 1
      const workbookColaborarPolo3 =  XLSX.read(excelFileColaborarPolo3, {type: 'buffer'})
      const worksheetNameColaborarPolo3 = workbookColaborarPolo3.SheetNames[0]
      const worksheetColaborarPolo3 = workbookColaborarPolo3.Sheets[worksheetNameColaborarPolo3]
      const rowDataColaborarPolo3 = XLSX.utils.sheet_to_json<Record<string, any>>(worksheetColaborarPolo3) 
    
      const dataPrisma: DataRelatorioPrisma[] = rowDataPrisma.map(item => ({
        cicloDeAplicacao: item["Ciclo de Aplicação"],
        matriculaAluno: item["Matricula Aluno"],
        modalidade: item["Modalidade"],
        momeAluno: item["Nome Aluno"],
        polo: item["Polo"],
        prazoRealização: item["Prazo p/ Realização"],
        curso: item['Curso'],
        prova: item["Prova"],
        semestre: item["Semestre"],
      }))
      const dataColaborarPolo1: DataRelatorioColaborar[] = rowDataColaborarPolo1.map(item => ({
        marca: item["MARCA"],
        polo: item["POLO"],
        matricula: item["MATRICULA"],
        cpf: item["CPF"],
        nome: item["NOME"],
        curso: item["CURSO"],
        semestre: item["SEMESTRE"],
        oferta: item["OFERTA"],
        modalidade: item["MODALIDADE"],
        email: item["EMAIL"],
        foneResidencial: item["FONE_RESIDENCIAL"],
        foneComercial: item["FONE_COMERCIAL"],
        foneCelular: item["FONE_CELULAR"],
        devedor: item["DEVEDOR"],
        documentos:item["DOCUMENTOS"],
        situacao: item["SITUACAO_MATRICULA"],
        dataMatricula: item["DATA_MATRICULA"],
        plano: item['PLANO'],
      
      }))
      const dataColaborarPolo2: DataRelatorioColaborar[] = rowDataColaborarPolo2.map(item => ({
        marca: item["MARCA"],
        polo: item["POLO"],
        matricula: item["MATRICULA"],
        cpf: item["CPF"],
        nome: item["NOME"],
        curso: item["CURSO"],
        semestre: item["SEMESTRE"],
        oferta: item["OFERTA"],
        modalidade: item["MODALIDADE"],
        email: item["EMAIL"],
        foneResidencial: item["FONE_RESIDENCIAL"],
        foneComercial: item["FONE_COMERCIAL"],
        foneCelular: item["FONE_CELULAR"],
        devedor: item["DEVEDOR"],
        documentos:item["DOCUMENTOS"],
        situacao: item["SITUACAO_MATRICULA"],
        dataMatricula: item["DATA_MATRICULA"],
        plano: item['PLANO'],
      
      }))
      const dataColaborarPolo3: DataRelatorioColaborar[] = rowDataColaborarPolo3.map(item => ({
        marca: item["MARCA"],
        polo: item["POLO"],
        matricula: item["MATRICULA"],
        cpf: item["CPF"],
        nome: item["NOME"],
        curso: item["CURSO"],
        semestre: item["SEMESTRE"],
        oferta: item["OFERTA"],
        modalidade: item["MODALIDADE"],
        email: item["EMAIL"],
        foneResidencial: item["FONE_RESIDENCIAL"],
        foneComercial: item["FONE_COMERCIAL"],
        foneCelular: item["FONE_CELULAR"],
        devedor: item["DEVEDOR"],
        documentos:item["DOCUMENTOS"],
        situacao: item["SITUACAO_MATRICULA"],
        dataMatricula: item["DATA_MATRICULA"],
        plano: item['PLANO'],
      
      }))
     
      setExcelData(dataPrisma)
      setExcelDataColaborarPolo1(dataColaborarPolo1)
      setExcelDataColaborarPolo2(dataColaborarPolo2)
      setExcelDataColaborarPolo3(dataColaborarPolo3)
      
    }
    
    let filterMatriculaNumberPrisma: string[] = excelData.map(item => item.matriculaAluno)
    const polos = [...excelDataColaborarPolo1,...excelDataColaborarPolo2,...excelDataColaborarPolo3]
    let filterMatriculaNumberColaborar: NumberAndPhonesColaborarPolo[] = polos.map(item => {
      return {
        matricula: item.matricula.toString(),
        phone: item.foneCelular.toString()
      }
    })
    //filtra os numeros dos telefones das matriculas iguais, dos que não realizaram a prova e ajusta para não haver símbolos colocando no state
    setPhoneResult(filterNumbers(filterMatriculaNumberPrisma, filterMatriculaNumberColaborar).map(tel => tel.replace(/\D/g, '')))
    console.log(phoneResult)
  }
  
  
  return(
    <div className="w-full h-[100vh]  bg-sky-950 flex flex-col items-center gap-10 p-5">
      <form  onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-center ">
        <input role="alert" type="file" className="
        file:bg-slate-900
        file:p-3
        file:rounded-2xl
        file:text-2xl file:py-2 cursor-pointer"  required onChange={handleFile}/>
         <input role="alert" type="file" className="
        file:bg-slate-900
        file:p-3
        file:rounded-2xl
        file:text-2xl file:py-2 cursor-pointer"  required onChange={handleFileColaborarPolo1}/>
         <input role="alert" type="file" className="
        file:bg-slate-900
        file:p-3
        file:rounded-2xl
        file:text-2xl file:py-2 cursor-pointer"  required onChange={handleFileColaborarPolo2}/>
         <input role="alert" type="file" className="
        file:bg-slate-900
        file:p-3
        file:rounded-2xl
        file:text-2xl file:py-2 cursor-pointer"  required onChange={handleFileColaborarPolo3}/>
        <button onClick={() => console.log('Clique detectado')} type="submit" className="bg-slate-900 w-full py-3 rounded-2xl text-2xl  cursor-pointer">UPLOAD</button>
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
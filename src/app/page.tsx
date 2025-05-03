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
  const [excelFileColaborar, setExcelFileColaborar] = useState<File>()
  const [phoneResult, setPhoneResult] = useState<string[]>([])

  //VALIDATE
  const [typeError, setTypeError] = useState<string | null>(null)
  
  // submit state
  const [excelData, setExcelData] = useState<DataRelatorioPrisma[]>([])
  const [excelDataColaborar, setExcelDataColaborar] = useState<DataRelatorioColaborar[]>([])


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
  const readExcel = (file: File): Record<string, any> => {
    const workbookPrisma =  XLSX.read(file, {type: 'buffer'})
    const worksheetNamePrisma = workbookPrisma.SheetNames[0]
    const worksheet = workbookPrisma.Sheets[worksheetNamePrisma]
    const rowDataPrisma = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet) 

    return rowDataPrisma
  }
  //submit event
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(excelFile !== null){
      //MANIPULANDO O ARQUIVO DO PRISMA (QUE NÃO FIZERAM PROVA)
      const rowDataPrisma = readExcel(excelFile as any)
      //MANIPULANDO O ARQUIVO DE RELATORIO COLABORAR
      const rowDataColaborar = readExcel(excelFileColaborar as any)
    
      
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
      const dataColaborar: DataRelatorioColaborar[] = rowDataColaborar.map(item => ({
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
      setExcelDataColaborar(dataColaborar)
    }

    let filterMatriculaNumberPrisma: string[] = excelData.map(item => item.matriculaAluno)
    let filterMatriculaNumberColaborar: NumberAndPhonesColaborarPolo[] = excelDataColaborar.map(item => {
      return {
        matricula: item.matricula.toString(),
        phone: item.foneCelular.toString()
      }
    })
    setPhoneResult(filterNumbers(filterMatriculaNumberPrisma, filterMatriculaNumberColaborar))
   
  }
  const filterMatriculas = (filterMatriculaNumberPrisma: string[],  filterMatriculaNumberColaborar: NumberAndPhonesColaborarPolo[]) => {

  }
  const handleFileColaborar = (e: React.ChangeEvent<HTMLInputElement> ) => {
    if(e.target.files && e.target.files.length > 0){
      const selectedFileColaborar = e.target.files[0]
      if(selectedFileColaborar){
        if(selectedFileColaborar&&fileType.includes(selectedFileColaborar.type)){
          setTypeError(null)
          let reader = new FileReader()
          reader.readAsArrayBuffer(selectedFileColaborar)
          reader.onload = (e: ProgressEvent<FileReader>) => {
            setExcelFileColaborar(e.target?.result)
          }
        }else{
          setTypeError("Por Favor, informe o tipo de arquivo correto")
        }
      }else{
        console.log("Error file")
      }
    }
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
        file:text-2xl file:py-2 cursor-pointer"  required onChange={handleFileColaborar}/>
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
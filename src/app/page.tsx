"use client"

import Table from "@/components/Table";
import { filterNumbers } from "@/helpers/filterObjects";
import { DataRelatorioColaborar, DataRelatorioPrisma } from "@/types/dataExcelTypes";
import { NumberAndPhonesColaborarPolo } from "@/types/numberAndPhones";
import { ChangeEvent, EventHandler, useState } from "react";
import * as XLSX from 'xlsx'
import EXCELJS from 'exceljs'
import  {saveAs } from 'file-saver'
import { CheckFilePolo } from "@/types/checkPoloFile";

const Home = () => {
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
    CheckFilePolo(e, setTypeError, setExcelFile, fileType)
  }
  const handleFileColaborarPolo1 = (e: React.ChangeEvent<HTMLInputElement> ) => {
    CheckFilePolo(e, setTypeError, setExcelFileColaborarPolo1, fileType)
  }

  const handleFileColaborarPolo2 = (e: React.ChangeEvent<HTMLInputElement> ) => {
    CheckFilePolo(e, setTypeError, setExcelFileColaborarPolo2, fileType)
  }
  const handleFileColaborarPolo3 = (e: React.ChangeEvent<HTMLInputElement> ) => {
    CheckFilePolo(e, setTypeError, setExcelFileColaborarPolo3, fileType) 
  }
  //submit event
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let dataPrisma: DataRelatorioPrisma[] = []
    let dataColaborarPolo1: DataRelatorioColaborar[] = []
    let dataColaborarPolo2: DataRelatorioColaborar[] = []
    let dataColaborarPolo3: DataRelatorioColaborar[] = []

    e.preventDefault()

    setLoading(true)
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
    
       //MANIPULANDO O ARQUIVO DE RELATORIO COLABORAR polo 2
       const workbookColaborarPolo2 =  XLSX.read(excelFileColaborarPolo2, {type: 'buffer'})
       const worksheetNameColaborarPolo2 = workbookColaborarPolo2.SheetNames[0]
       const worksheetColaborarPolo2 = workbookColaborarPolo2.Sheets[worksheetNameColaborarPolo2]
       const rowDataColaborarPolo2 = XLSX.utils.sheet_to_json<Record<string, any>>(worksheetColaborarPolo2) 
    
        //MANIPULANDO O ARQUIVO DE RELATORIO COLABORAR polo 3
      const workbookColaborarPolo3 =  XLSX.read(excelFileColaborarPolo3, {type: 'buffer'})
      const worksheetNameColaborarPolo3 = workbookColaborarPolo3.SheetNames[0]
      const worksheetColaborarPolo3 = workbookColaborarPolo3.Sheets[worksheetNameColaborarPolo3]
      const rowDataColaborarPolo3 = XLSX.utils.sheet_to_json<Record<string, any>>(worksheetColaborarPolo3) 
    
      dataPrisma = rowDataPrisma.map(item => ({
        cicloDeAplicacao: item["Ciclo de Aplicação"],
        matriculaAluno: String(item["Matricula Aluno"]),
        modalidade: item["Modalidade"],
        momeAluno: item["Nome Aluno"],
        polo: item["Polo"],
        prazoRealização: item["Prazo p/ Realização"],
        curso: item['Curso'],
        prova: item["Prova"],
        semestre: item["Semestre"],
      }))
      dataColaborarPolo1  = rowDataColaborarPolo1.map(item => ({
        marca: item["MARCA"],
        polo: item["POLO"],
        matricula: String(item["MATRICULA"]),
        cpf: item["CPF"],
        nome: item["NOME"],
        curso: item["CURSO"],
        semestre: item["SEMESTRE"],
        oferta: item["OFERTA"],
        modalidade: item["MODALIDADE"],
        email: item["EMAIL"],
        foneResidencial: item["FONE_RESIDENCIAL"],
        foneComercial: item["FONE_COMERCIAL"],
        foneCelular: String(item["FONE_CELULAR"]),
        devedor: item["DEVEDOR"],
        documentos:item["DOCUMENTOS"],
        situacao: item["SITUACAO_MATRICULA"],
        dataMatricula: item["DATA_MATRICULA"],
        plano: item['PLANO'],
      
      }))
      dataColaborarPolo2 = rowDataColaborarPolo2.map(item => ({
        marca: item["MARCA"],
        polo: item["POLO"],
        matricula: String(item["MATRICULA"]),
        cpf: item["CPF"],
        nome: item["NOME"],
        curso: item["CURSO"],
        semestre: item["SEMESTRE"],
        oferta: item["OFERTA"],
        modalidade: item["MODALIDADE"],
        email: item["EMAIL"],
        foneResidencial: item["FONE_RESIDENCIAL"],
        foneComercial: item["FONE_COMERCIAL"],
        foneCelular:  String(item["FONE_CELULAR"]),
        devedor: item["DEVEDOR"],
        documentos:item["DOCUMENTOS"],
        situacao: item["SITUACAO_MATRICULA"],
        dataMatricula: item["DATA_MATRICULA"],
        plano: item['PLANO'],
      
      }))
      dataColaborarPolo3 = rowDataColaborarPolo3.map(item => ({
        marca: item["MARCA"],
        polo: item["POLO"],
        matricula: String(item["MATRICULA"]),
        cpf: item["CPF"],
        nome: item["NOME"],
        curso: item["CURSO"],
        semestre: item["SEMESTRE"],
        oferta: item["OFERTA"],
        modalidade: item["MODALIDADE"],
        email: item["EMAIL"],
        foneResidencial: item["FONE_RESIDENCIAL"],
        foneComercial: item["FONE_COMERCIAL"],
        foneCelular:String(item["FONE_CELULAR"]),
        devedor: item["DEVEDOR"],


        documentos:item["DOCUMENTOS"],
        situacao: item["SITUACAO_MATRICULA"],
        dataMatricula: item["DATA_MATRICULA"],
        plano: item['PLANO'],
      
      }))
     
    }
    
    let filterMatriculaNumberPrisma: string[] = dataPrisma.map(item => item.matriculaAluno)
    const polos = [...dataColaborarPolo1,...dataColaborarPolo2,...dataColaborarPolo3]
    
    let filterMatriculaNumberColaborar: NumberAndPhonesColaborarPolo[] = polos.map(item => {
      return {
        matricula: item.matricula,
        phone: item.foneCelular
      }
    })
    //filtra os numeros dos telefones das matriculas iguais, dos que não realizaram a prova e ajusta para não haver símbolos colocando no state
    const matriculaAndPhonesForCall = filterNumbers(filterMatriculaNumberPrisma, filterMatriculaNumberColaborar)

    setTimeout(() => {
      downloadData(matriculaAndPhonesForCall)
      setLoading(false)
    }, 5000)
   
  }
  
  
  return(
    <div className="w-full h-[100vh]  bg-sky-950 flex flex-col items-center gap-10 p-5">
      <form  onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-center ">
        <h1 className="mb-5 text-3xl">Downlad dos alunos que não realizaram as provas: </h1>
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

        {
          loading === true ? (
            <div className="w-[50px] h-[50px] border-l-4 border-slate-900 mt-5 rounded-full animate-spin"></div>
          ):
          (
            <button onClick={() => console.log('Clique detectado')} 
            type="submit" className="bg-slate-900 w-full py-3 rounded-2xl text-2xl 
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
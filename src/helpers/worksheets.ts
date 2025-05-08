import * as XLSX from 'xlsx'

export const readAndConvertSheets = (excelFile: File) => {
    const workbookPrisma =  XLSX.read(excelFile, {type: 'buffer'})
    const worksheetNamePrisma = workbookPrisma.SheetNames[0]
    const worksheet = workbookPrisma.Sheets[worksheetNamePrisma]
    return  XLSX.utils.sheet_to_json<Record<string, any>>(worksheet) 
      
}
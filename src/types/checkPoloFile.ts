import { SetStateAction } from "react"

export const CheckFilePolo = (e: React.ChangeEvent<HTMLInputElement>, setStateError: (str: string | null) => void, setStateFilePolo: (file: File) => void, fileType: string[]) => {
    if(e.target.files && e.target.files.length > 0){
        const selectedFileColaborar = e.target.files[0]
        if(selectedFileColaborar){
          if(selectedFileColaborar&&fileType.includes(selectedFileColaborar.type)){
            setStateError(null)
            let reader = new FileReader()
            reader.readAsArrayBuffer(selectedFileColaborar)
            reader.onload = (e: ProgressEvent<FileReader>) => {
              setStateFilePolo(e.target?.result)
            }
          }else{
            setStateError("Por Favor, informe o tipo de arquivo correto")
          }
        }else{
          console.log("Error file")
        }
    }
}
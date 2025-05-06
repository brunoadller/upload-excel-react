import { NumberAndPhonesColaborarPolo } from "@/types/numberAndPhones"

export const filterNumbers = (filterMatriculaNumberPrisma: string[], filterMatriculaNumberColaborar: NumberAndPhonesColaborarPolo[]) => {
    let phonesAndMatriculaAndNamesResult: NumberAndPhonesColaborarPolo[] = []  
    console.log("entrou no filter")
    for(let i = 0; i < filterMatriculaNumberColaborar.length; i++){
      for(let j = 0; j < filterMatriculaNumberPrisma.length;j++){
        if(filterMatriculaNumberColaborar[i].matricula === filterMatriculaNumberPrisma[j] ){
         phonesAndMatriculaAndNamesResult.push({matricula: filterMatriculaNumberPrisma[j], phone: filterMatriculaNumberColaborar[i].phone.replace(/\D/g, '') })
        }
      }
    }
    return phonesAndMatriculaAndNamesResult
}

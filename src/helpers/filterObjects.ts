import { NumberAndPhonesColaborarPolo } from "@/types/numberAndPhones"

export const filterNumbers = (filterMatriculaNumberPrisma: string[], filterMatriculaNumberColaborar: NumberAndPhonesColaborarPolo[]) => {
    let phonesResult: string[] = []
    for(let i = 0; i < filterMatriculaNumberPrisma.length; i++){
        for(let j = 0; j < filterMatriculaNumberColaborar.length; j++){
          if(filterMatriculaNumberPrisma[i] === filterMatriculaNumberColaborar[j].matricula){
            phonesResult.push(filterMatriculaNumberColaborar[j].phone)
          }
        }
      }

      return phonesResult
}
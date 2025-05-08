import { DataRelatorioColaborar } from "@/types/dataExcelTypes";

export const filterMatriculasNumberColaborar = (polos: DataRelatorioColaborar[]) => {
    return polos.map(item => {
          return {
            matricula: item.matricula,
            phone: item.foneCelular
          }
    })
}
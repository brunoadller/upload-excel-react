

export const returnSheetPrisma = (item: Record<string, any>) => {
     return   {
        cicloDeAplicacao: item["Ciclo de Aplicação"],
        matriculaAluno: String(item["Matricula Aluno"]),
        modalidade: item["Modalidade"],
        momeAluno: item["Nome Aluno"],
        polo: item["Polo"],
        prazoRealização: item["Prazo p/ Realização"],
        curso: item['Curso'],
        prova: item["Prova"],
        semestre: item["Semestre"],
     }
}
export const  returnSheetColaborar = ( item: Record<string, any>) => {
    return {
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
    }
}
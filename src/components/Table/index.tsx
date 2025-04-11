import { DataRelatorioPrisma } from '@/types/dataExcelTypes'
import React from 'react'

type Props ={
    item: DataRelatorioPrisma
    index: number
}
const Table = ({item, index}: Props ) => {
  return (
    <table className=' min-w-full text-sm' key={index}>
      <thead className='bg-slate-800 text-slate-300'>
        <tr>
            <th className='px-6 py-3 text-left font-semibold'>POLO</th>
            <th className='px-6 py-3 text-left font-semibold'>MATRICULA</th>
            <th className='px-6 py-3 text-left font-semibold'>NOME ALUNO</th>
            <th className='px-6 py-3 text-left font-semibold'>MODALIDADE</th>
            <th className='px-6 py-3 text-left font-semibold'>CURSO</th>
            <th className='px-6 py-3 text-left font-semibold'>SEMESTRE</th>
            <th className='px-6 py-3 text-left font-semibold'>CICLO DE APLICAÇÃO</th>
            <th className='px-6 py-3 text-left font-semibold'>PROVA</th>
            <th className='px-6 py-3 text-left font-semibold'>PRAZO P/ REALIZAÇÃO</th>
        </tr>
      </thead>
      <tbody className='bg-slate-900 divide-y divide-slate-700'>
         <tr className='hover:bg-slate-800 transition-colors'>
            <td className='px-6 py-4'>{item.polo}</td>
            <td className='px-6 py-4'>{item.matriculaAluno}</td>
            <td className='px-6 py-4'>{item.momeAluno}</td>
            <td className='px-6 py-4'>{item.modalidade}</td>
            <td className='px-6 py-4'>{item.curso}</td>
            <td className='px-6 py-4'>{item.semestre}</td>
            <td className='px-6 py-4'>{item.cicloDeAplicacao}</td>
            <td className='px-6 py-4'>{item.prova}</td>
            <td className='px-6 py-4'>{item.prazoRealização}</td>
         </tr>
      </tbody>
    </table>
  )
}

export default Table

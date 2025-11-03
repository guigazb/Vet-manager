import React from 'react';

import Actions from '../../components/geral/Actions';
import MainLayout from '../MainLayout';

function RiscoMapaRisco() {

  return (
    <MainLayout>
      <React.Fragment>

        <Actions breadcrumb="Início : Risco" nomeSessao="Mapa de Risco" hasAddViewButton={false} hasFilter={false} />

        {/* Sessões internas da página */}
        <table className="w-full border-collapse border-s-white">
          <tr>
            <td colspan="12" className='text-center bg-[#1F4E78] text-white p-2'>Tabela Periódica de Riscos e Controles</td>
          </tr>
          <tr>
            <td colspan="1" className='w-1/12 text-center bg-blue-500 text-white p-2'>Probabilidade</td>
            <td colspan="5" className='w-5/12 text-center bg-[#7A0000] text-white p-2'>Riscos</td>
            <td colspan="5" className='w-5/12 text-center bg-[#595959] text-white p-2'>Controles</td>
            <td colspan="1" className='w-1/12 text-center bg-blue-500 text-white p-2'>Desenho</td>
          </tr>
          <tr>
            <td colspan="1" className='w-1/12 text-center bg-white p-2 text-[12px]'>Muito Alta (5)</td>
            <td colspan="1" className='w-1/12 text-center bg-[#FFFF00] text-black p-2'>5</td>
            <td colspan="1" className='w-1/12 text-center bg-[#FFC000] text-black p-2'>10</td>
            <td colspan="1" className='w-1/12 text-center bg-[#FF0000] text-white p-2'>15</td>
            <td colspan="1" className='w-1/12 text-center bg-[#FF0000] text-white p-2'>20</td>
            <td colspan="1" className='w-1/12 text-center bg-[#FF0000] text-white p-2'>25</td>
            <td colspan="1" className='w-1/12 text-center bg-[#548235] text-white p-2'>25</td>
            <td colspan="1" className='w-1/12 text-center bg-[#A9D08E] p-2'>20</td>
            <td colspan="1" className='w-1/12 text-center bg-[#FFFF00] text-black p-2'>15</td>
            <td colspan="1" className='w-1/12 text-center bg-[#FFFF00] text-black p-2'>10</td>
            <td colspan="1" className='w-1/12 text-center bg-[#FFC000] text-black p-2'>5</td>
            <td colspan="1" className='w-1/12 text-center bg-white p-2 text-[12px]'>Controle Suficiente, eficaz e formalizado (5)</td>
          </tr>
        </table>

      </React.Fragment>
    </MainLayout>
  );
}

export default RiscoMapaRisco;
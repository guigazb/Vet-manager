import React from 'react'

const DesenhoOperacaoRisco = () => {
    return (
        <table className="w-full border-collapse border-spacing-3">
            <thead className='text-white bg-black h-[30px]'>
                <tr>
                    <th className="w-1/3 bg-gray-800 text-center">Desenho dos Controles</th>
                    <th className="w-1/3 bg-gray-800 text-center border-l-2 border-r-2">Operação dos Controles</th>
                    <th className="w-1/3 bg-gray-800 text-center">Matriz de Controle</th>
                </tr>
            </thead>
            <tbody>
                <tr className='text-black text-[12px]'>
                    <td className="w-1/3 bg-[#FF4F64] text-center p-2">
                        <b>1 - Não há controle</b>
                    </td>
                    <td className="w-1/3 bg-[#FF4F64] text-center p-2 border-l-2 border-r-2">
                        <b>1 - Não executado</b>
                    </td>
                    <td className="w-1/3 bg-[#B0C23D] text-center p-2">
                        <b>Controle Forte (25)</b> - Controles que mitigam todos os aspectos
                        relevantes do risco. Totalmente
                        automatizado (quando possível) e detectível.
                        Não há necessidade de mais ações.
                    </td>
                </tr>
                <tr className='text-black text-[12px]'>
                    <td className="w-1/3 bg-[#F8BA00] text-center p-2">
                        <b>2 - Controle Informal</b> - Existe controle, mas é executado de acordo
                        com a dinâmica do dia a dia e/ou de acordo
                        com a experiência dos servidores/empregados, sem formalização.
                    </td>
                    <td className="w-1/3 bg-[#F8BA00] text-center p-2 border-l-2 border-r-2">
                        <b>2 - Parcialmente executado</b> - O controle não está completo e, apesar de uma
                        parte estar em execução, apresenta falhas.
                    </td>
                    <td className="w-1/3 bg-[#DAFF47] text-center p-2">
                        <b>Controle Suficiente (20)</b> - São usadas ferramentas adequadas que
                        mitigam satisfatoriamente o risco. Mas, deve
                        haver um aprimoramento, com controles
                        confiáveis e seguros, a fim de garantir
                        consistência, precisão e tempestividade.
                    </td>
                </tr>
                <tr className='text-black text-[12px]'>
                    <td className="w-1/3 bg-[#FFDD00] text-center p-2">
                        <b>3 - Controle formalizado, mas insuficiente</b> -
                        Há controle, mas não atende à necessidade. Não está
                        adequado e sem revisões periódicas.
                    </td>
                    <td className="w-1/3 bg-[#FFDD00] text-center p-2 border-l-2 border-r-2">
                        <b>3 - Executado e sem evidência</b> - O controle existe e está em execução. No
                        entanto, apresenta falhas e não há
                        comprovações de que está sendo executado.
                    </td>
                    <td className="w-1/3 bg-[#FFDD00] text-center p-2">
                        <b>Controle Mínimo (10-16)</b> - Há controles formalizados que mitigam
                        alguns aspectos do risco, mas não todos. Há a
                        necessidade de planejamento e formalização
                        de mais ou novas atividades de controle.
                    </td>
                </tr>
                <tr className='text-black text-[12px]'>
                    <td className="w-1/3 bg-[#DAFF47] text-center p-2">
                        <b>4 - Controle formalizado e suficiente</b> - O controle foi planejado, discutido e
                        formalizado. É suficiente, mas necessita de
                        melhorias para ser potencializado.
                    </td>
                    <td className="w-1/3 bg-[#DAFF47] text-center p-2 border-l-2 border-r-2">
                        <b>4 - Executado e com evidências</b> - O controle existe e está em execução. Há
                        comprovações de que está sendo executado.
                        Todavia, necessita de melhorias a fim de atender,
                        em sua totalidade, à dinâmica do dia a dia.
                    </td>
                    <td className="w-1/3 bg-[#F8BA00] text-center p-2">
                        <b>Controle Inicial (5-9)</b> - Pode estar mal desenhado ou
                        implementado. Obrigatoriamente, deve
                        haver melhorias significativas nos
                        controles. Repensá-los é fundamental.
                    </td>
                </tr>
                <tr className='text-black text-[12px]'>
                    <td className="w-1/3 bg-[#B0C23D] text-center p-2">
                        <b>5 - Controle formalizado, suficiente e eficaz</b> - Adequadamente planejado, discutido, testado, compartilhado
                        e documentado, com correções e aperfeiçoamentos
                        planejados de forma tempestiva, possivelmente informatizado
                        e atendendo à necessidade para mitigar o risco.
                    </td>
                    <td className="w-1/3 bg-[#B0C23D] text-center p-2 border-l-2 border-r-2">
                        <b>5 - Executado, testado e com evidências</b> - Controle existente, realizado de maneira uniforme pela
                        equipe e na frequência desejada. Há comprovações de que
                        está sendo executado. Periodicamente, é testado e
                        aperfeiçoado, atendendo satisfatoriamente à dinâmica do
                        dia a dia, mitigando a existência do risco.
                    </td>
                    <td className="w-1/3 bg-[#C25C68] text-center p-2">
                        <b>Controle Fraco (2-4)</b> - É executado de acordo com a dinâmica do dia a
                        dia e/ou com base na experiência das pessoas.
                        Obrigatoriamente, deve haver planejamento,
                        análise, discussão e formalização dos controles.
                        Torna-se um problema continuar neste nível.
                    </td>
                </tr>
                <tr className='text-black text-[12px]'>
                    <td className="w-1/3 bg-[transparent] text-center p-2">
                        &nbsp;
                    </td>
                    <td className="w-1/3 bg-[transparent] text-center p-2">
                        &nbsp;
                    </td>
                    <td className="w-1/3 bg-[#E31E36] text-center p-2  border-l-2">
                        <b>Controle Inexistente (1)</b> - Neste nível, nada foi feito ou perdeu-se o
                        objetivo, necessitando de uma avaliação
                        completa e planejamento de ações.
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default DesenhoOperacaoRisco
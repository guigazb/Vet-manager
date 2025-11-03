import React from 'react'

const ProbabilidadeImpactoNivelRisco = () => {
    return (
        <table className="w-full border-collapse border-spacing-3">
            <thead className='text-white bg-black h-[30px]'>
                <tr>
                    <th className="w-1/3 bg-gray-800 text-center">Probabilidade</th>
                    <th className="w-1/3 bg-gray-800 text-center border-l-2 border-r-2">Impacto</th>
                    <th className="w-1/3 bg-gray-800 text-center">Nível de Risco</th>
                </tr>
            </thead>
            <tbody>
                <tr className='text-black text-[12px]'>
                    <td className="w-1/3 bg-[#B0C23D] text-center p-2">
                        <b>1 - Muito Baixa</b> - Evento improvável de ocorrer. Excepcionalmente
                        poderá até ocorrer, porém não há elementos ou
                        informações que indiquem essa possibilidade.
                    </td>
                    <td className="w-1/3 bg-[#B0C23D] text-center p-2 border-l-2 border-r-2">
                        <b>1 - Muito Baixo</b> - Comprometimento de operações ou atividades de processos,
                        projetos ou programas da organização, porém causando
                        impactos mínimos nos objetivos de prazo, custo, qualidade,
                        escopo, imagem ou relacionados ao atendimento de metas,
                        padrões ou à capacidade de entrega de produtos/serviços.
                    </td>
                    <td className="w-1/3 bg-[#B0C23D] text-center p-2">
                        <b>Risco Pequeno (1 a 3)</b> - Quando forem de baixo impacto, monitore. Se forem de alto impacto, atue
                        sobre eles.
                    </td>
                </tr>
                <tr className='text-black text-[12px]'>
                    <td className="w-1/3 bg-[#DAFF47] text-center p-2">
                        <b>2 - Baixa</b> - Evento raro de ocorrer. Poderá ocorrer de forma inesperada, havendo
                        poucos elementos ou informações que indiquem esssa possibilidade.
                    </td>
                    <td className="w-1/3 bg-[#DAFF47] text-center p-2 border-l-2 border-r-2">
                        <b>2 - Baixo</b> - Comprometimento de operações ou atividades de
                        processos ou programas da organização, causando impactos pequenos nos objetivos.
                    </td>
                    <td className="w-1/3 bg-[#FFDD00] text-center p-2">
                        <b>Risco Moderado (4 a 7)</b> - Crie uma rotina de monitoramento e avaliação. Atue sempre nesses riscos.
                    </td>
                </tr>
                <tr className='text-black text-[12px]'>
                    <td className="w-1/3 bg-[#FFDD00] text-center p-2">
                        <b>3 - Média</b> - Evento possível de ocorrer. Há elementos e/ou informações que
                        indiquem moderadamente essa possibilidade.
                    </td>
                    <td className="w-1/3 bg-[#FFDD00] text-center p-2 border-l-2 border-r-2">
                        <b>3 - Médio</b> - Interrupção de operações ou atividades de processos, projetos
                        ou programas, causando impactos significativos nos objetivos, porém recuperáveis.
                    </td>
                    <td className="w-1/3 bg-[#F8BA00] text-center p-2">
                        <b>Risco Alto (8 a 14)</b> - Ponto de Atenção! Se a probabilidade de ocorrência aumentar,
                        a situação poderá ser crítica. Controles mais robustos são necessários.
                    </td>
                </tr>
                <tr className='text-black text-[12px]'>
                    <td className="w-1/3 bg-[#F8BA00] text-center p-2">
                        <b>4 - Alta</b> - Evento provável de ocorrer. É esperado que o evento ocorra, pois os elementos
                        e as informações disponíveis indicam de forma consistente essa possibilidade.
                    </td>
                    <td className="w-1/3 bg-[#F8BA00] text-center p-2 border-l-2 border-r-2">
                        <b>4 - Alto</b> - Interrupção de operações ou atividades de processos,
                        projetos ou programas da organização, causando impactos
                        de reversão muito difícil nos objetivos.
                    </td>
                    <td className="w-1/3 bg-[#FF4F64] text-center p-2">
                        <b>Risco Crítico (15 a 25)</b> - Implemente ações imediatamente! Há a necessidade de revisão
                        do controle existente ou execução de novo controle.
                    </td>
                </tr>
                <tr className='text-black text-[12px]'>
                    <td className="w-1/3 bg-[#FF4F64] text-center p-2">
                        <b>5 - Muito Alta</b> - Evento praticamente certo de ocorrer. Inequivocamente o evento ocorrerá, possibilidade
                        os elementos e informações disponíveis indicam claramente essa possibilidade.
                    </td>
                    <td className="w-1/3 bg-[#FF4F64] text-center p-2 border-l-2 border-r-2">
                        <b>5 - Muito Alto</b> - Paralisação de operações ou atividades de processos,
                        projetos ou programas da organização, causando impactos
                        irreversíveis/catastróficos nos objetivos.
                    </td>
                    <td className="w-1/3 bg-transparent text-center p-2"></td>
                </tr>
            </tbody>
        </table>
    )
}

export default ProbabilidadeImpactoNivelRisco
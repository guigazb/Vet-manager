import React, { useState, useEffect, useRef } from 'react';
import { useFetchRiscoTabelaPeriodica } from '../../../hooks/risco/useFetchRiscoTabelaPeriodica';

import InternalButtonArea from '../../../components/body/InternalButtonArea';
import ButtonComponent from '../../../components/button/ButtonComponent';

import Modal from '../../../components/body/modal/Modal';

const dadosTabela = [
    { probabilidade: 5, risco: [5, 10, 15, 20, 25], controle: [25, 20, 15, 10, 5] },
    { probabilidade: 4, risco: [4, 8, 12, 16, 20], controle: [20, 16, 12, 8, 4] },
    { probabilidade: 3, risco: [3, 6, 9, 12, 15], controle: [15, 12, 9, 6, 3] },
    { probabilidade: 2, risco: [2, 4, 6, 8, 10], controle: [10, 8, 6, 4, 2] },
    { probabilidade: 1, risco: [1, 2, 3, 4, 5], controle: [5, 4, 3, 2, 1] },
];

const TabelaPeriodica = ({ tabelaPeriodicaId }) => {
    const { tabelaPeriodica, loading } = useFetchRiscoTabelaPeriodica(tabelaPeriodicaId);
    const [nomeUnidadeFuncional, setNomeUnidadeFuncional] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [modalContent, setModalContent] = useState([]);
    const tableRef = useRef(null); // Reference for PDF generation

    useEffect(() => {
        tabelaPeriodica.forEach(item => {
            setNomeUnidadeFuncional(item['Unidade Funcional']);
        });
    }, [tabelaPeriodica]);

    const processaDados = (data) => {
        const contadorRisco = dadosTabela.map(row => row.risco.map(() => 0));
        const contadorControle = dadosTabela.map(row => row.controle.map(() => 0));
        const riscosPorCelula = dadosTabela.map(row => row.risco.map(() => []));
        const controlesPorCelula = dadosTabela.map(row => row.controle.map(() => []));

        data.forEach(item => {
            const valorRisco = item.probabilidade * item['impacto'];
            const valorControle = item['desenho controle'] * item['operação controle'];

            dadosTabela.forEach((row, rowIndex) => {
                const prob = row.probabilidade;
                row.risco.forEach((valRisco, colIndex) => {
                    if (prob === item.probabilidade && valRisco === valorRisco) {
                        contadorRisco[rowIndex][colIndex]++;
                        riscosPorCelula[rowIndex][colIndex].push({
                            risco: item.risco,
                            processo: item.processo,
                        });
                    }
                });
            });

            const desenhoIndex = 5 - item['desenho controle'];
            const operacaoIndex = 5 - item['operação controle'];
            if (desenhoIndex >= 0 && desenhoIndex < 5 && operacaoIndex >= 0 && operacaoIndex < 5) {
                const valorEsperadoControle = dadosTabela[desenhoIndex].controle[operacaoIndex];
                if (valorEsperadoControle === valorControle) {
                    contadorControle[desenhoIndex][operacaoIndex]++;
                    controlesPorCelula[desenhoIndex][operacaoIndex].push({
                        risco: item.risco,
                        processo: item.processo,
                    });
                }
            }
        });

        return { contadorRisco, contadorControle, riscosPorCelula, controlesPorCelula };
    };

    const { contadorRisco, contadorControle, riscosPorCelula, controlesPorCelula } = tabelaPeriodica
        ? processaDados(tabelaPeriodica)
        : {
            contadorRisco: dadosTabela.map(row => row.risco.map(() => 0)),
            contadorControle: dadosTabela.map(row => row.controle.map(() => 0)),
            riscosPorCelula: dadosTabela.map(row => row.risco.map(() => [])),
            controlesPorCelula: dadosTabela.map(row => row.controle.map(() => [])),
        };

    const getCorRisco = (valor) => {
        switch (valor) {
            case 1: case 2: case 3: return 'bg-[#548235] text-white';
            case 4: case 6: return 'bg-[#FFFF00] text-black';
            case 5: case 8: case 9: case 12: return 'bg-[#FFC000] text-black';
            case 10: case 15: case 16: case 20: case 25: return 'bg-[#FF0000] text-white';
            default: return 'bg-[#FFFF00] text-black';
        }
    };

    const getCorControle = (valor) => {
        switch (valor) {
            case 25: return 'bg-[#548235] text-white';
            case 15: case 16: case 20: return 'bg-[#A9D08E] text-black';
            case 9: case 10: case 12: return 'bg-[#FFFF00] text-black';
            case 5: case 6: case 8: return 'bg-[#FFC000] text-black';
            case 1: case 2: case 3: case 4: return 'bg-[#FF7C80] text-black';
            default: return 'bg-[#FFFF00] text-black';
        }
    };

    const handleCellClick = (rowIndex, colIndex, type) => {
        if (type === 'risco' && contadorRisco[rowIndex][colIndex] > 0) {
            setModalContent(riscosPorCelula[rowIndex][colIndex]);
            setModalAberto(true);
        } else if (type === 'controle' && contadorControle[rowIndex][colIndex] > 0) {
            setModalContent(controlesPorCelula[rowIndex][colIndex]);
            setModalAberto(true);
        }
    };

    const handleFecharModal = () => {
        setModalAberto(false);
        setModalContent([]);
    };



    const titulosProbabilidade = ['Muito Alta (5)', 'Alta (4)', 'Média (3)', 'Baixa (2)', 'Muito Baixa (1)'];
    const titulosControle = [
        'Controle Suficiente, eficaz e formalizado (5)',
        'Controle Suficiente, mas não formalizado (4)',
        'Controle formalizado, mas insuficiente (3)',
        'Controle informal, inadequado e insuficiente (2)',
        'Não há controle (1)',
    ];
    const titulosImpacto = ['Muito Baixa', 'Baixa', 'Média', 'Alta', 'Muito alta'];
    const titulosOperacao = [
        'Implantada, executada e com evidência',
        'Implantada e executada, mas sem evidência',
        'Parcialmente executada',
        'Parcialmente executada e com deficiência',
        'Não executada',
    ];

    if (loading) {
        return <div>Carregando tabela periódica...</div>;
    }

    return (
        <>
            <div ref={tableRef}>
                <table className="w-full border-collapse border-s-white">
                    <tbody>
                        <tr className="h-[60px]">
                            <td colSpan="12" className="text-center bg-[#1F4E78] text-white p-2 border-2 border-dashed border-white">
                                Tabela Periódica de Riscos e Controles - [<b>{nomeUnidadeFuncional}</b>]
                            </td>
                        </tr>
                        <tr className="h-[50px] border-2 border-dashed border-white">
                            <td colSpan="1" className="w-1/12 text-center bg-blue-500 text-white p-2 border-2 border-dashed border-white">
                                Probabilidade
                            </td>
                            <td colSpan="5" className="w-5/12 text-center bg-[#7A0000] text-white p-2 border-2 border-dashed border-white">
                                Riscos
                            </td>
                            <td colSpan="5" className="w-5/12 text-center bg-[#595959] text-white p-2 border-2 border-dashed border-white">
                                Controles
                            </td>
                            <td colSpan="1" className="w-1/12 text-center bg-blue-500 text-white p-2 border-2 border-dashed border-white">
                                Desenho
                            </td>
                        </tr>
                        {dadosTabela.map((row, rowIndex) => (
                            <tr key={rowIndex} className="h-[80px] border-2 border-dashed border-white">
                                <td
                                    colSpan="1"
                                    className="w-1/12 text-center border-2 border-dashed border-white bg-white p-2 text-[12px]"
                                >
                                    {titulosProbabilidade[rowIndex]}
                                </td>
                                {row.risco.map((valorRisco, colIndex) => (
                                    <td
                                        key={`risco-${colIndex}`}
                                        className={`w-1/12 text-center p-2 border-2 border-dashed border-white ${getCorRisco(valorRisco)} ${contadorRisco[rowIndex][colIndex] > 0 ? 'font-bold text-lg cursor-pointer' : ''
                                            }`}
                                        onClick={() => handleCellClick(rowIndex, colIndex, 'risco')}
                                    >
                                        {contadorRisco[rowIndex][colIndex] > 0 ? contadorRisco[rowIndex][colIndex] : ''}
                                    </td>
                                ))}
                                {row.controle.map((valorControles, colIndex) => (
                                    <td
                                        key={`controle-${colIndex}`}
                                        className={`w-1/12 text-center p-2 border-2 border-dashed border-white ${getCorControle(valorControles)} ${contadorControle[rowIndex][colIndex] > 0 ? 'font-bold text-lg cursor-pointer' : ''
                                            }`}
                                        onClick={() => handleCellClick(rowIndex, colIndex, 'controle')}
                                    >
                                        {contadorControle[rowIndex][colIndex] > 0 ? contadorControle[rowIndex][colIndex] : ''}
                                    </td>
                                ))}
                                <td
                                    colSpan="1"
                                    className="w-1/12 text-center border-2 border-dashed border-white bg-white p-2 text-[12px]"
                                >
                                    {titulosControle[rowIndex]}
                                </td>
                            </tr>
                        ))}
                        <tr className="h-[50px] border-2 border-dashed border-white">
                            <td colSpan="1" className="w-1/12 text-center p-2"></td>
                            {[1, 2, 3, 4, 5].map((value, index) => (
                                <td
                                    key={`impacto-${index}`}
                                    className="border-2 border-dashed border-white w-1/12 text-center bg-white text-black p-2"
                                >
                                    {value}
                                </td>
                            ))}
                            {[5, 4, 3, 2, 1].map((value, index) => (
                                <td
                                    key={`operacao-${index}`}
                                    className="border-2 border-dashed border-white w-1/12 text-center bg-white text-black p-2"
                                >
                                    {value}
                                </td>
                            ))}
                            <td colSpan="1" className="w-1/12 text-center p-2"></td>
                        </tr>
                        <tr className="h-[60px]">
                            <td colSpan="1" className="w-1/12 text-center p-2"></td>
                            {titulosImpacto.map((label, index) => (
                                <td
                                    key={`impacto-label-${index}`}
                                    className="w-1/12 text-center bg-white text-[12px] p-2"
                                >
                                    {label}
                                </td>
                            ))}
                            {titulosOperacao.map((label, index) => (
                                <td
                                    key={`operacao-label-${index}`}
                                    className="w-1/12 text-center bg-white text-[12px] p-2"
                                >
                                    {label}
                                </td>
                            ))}
                            <td colSpan="1" className="w-1/12 text-center p-2"></td>
                        </tr>
                        <tr className="h-[50px]">
                            <td colSpan="1" className="w-1/12 text-center border-2 border-dashed border-white p-2"></td>
                            <td
                                colSpan="5"
                                className="w-5/12 text-center border-2 border-dashed border-white bg-blue-500 text-white p-2"
                            >
                                Impacto
                            </td>
                            <td
                                colSpan="5"
                                className="w-5/12 text-center border-2 border-dashed border-white bg-blue-500 text-white p-2"
                            >
                                Operação
                            </td>
                            <td colSpan="1" className="w-1/12 text-center border-2 border-dashed border-white p-2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Modal modalAberto={modalAberto} tamanho="g" onFechar={handleFecharModal}>
                <Modal.ModalCabecalho onFechar={handleFecharModal}>
                    Riscos na Célula Selecionada
                </Modal.ModalCabecalho>
                <Modal.ModalCorpo>
                    {modalContent.length > 0 ? (
                        <ul>
                            {modalContent.map((item, index) => (
                                <li key={index}>
                                    <strong>Processo:</strong> {item.processo} <br/>
                                    <strong>Risco:</strong> {item.risco} <br/>
                                     <hr/> <br/>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhum risco encontrado para esta célula.</p>
                    )}
                </Modal.ModalCorpo>
                <Modal.ModalRodape>
                    <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModal}>
                        Fechar Janela
                    </ButtonComponent>
                </Modal.ModalRodape>
            </Modal>
        </>
    );
};

export default TabelaPeriodica;
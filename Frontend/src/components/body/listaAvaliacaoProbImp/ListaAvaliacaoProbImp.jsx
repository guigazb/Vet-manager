import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { toast } from 'react-toastify';
import routes from '../../../data/routes';

import Modal from '../modal/Modal';
import ModalCabecalho from '../modal/ModalCabecalho';
import ModalCorpo from '../modal/ModalCorpo';
import ModalRodape from '../modal/ModalRodape';
import ListaAvaliacaoProbImpRow from './ListaAvaliacaoProbImpRow';
import ButtonComponent from '../../button/ButtonComponent';
import ProbabilidadeImpactoNivelRisco from '../ProbabilidadeImpactoNivelRisco';

import useFetchRiscoAvaliacaoProbImp from './../../../hooks/risco/useFetchRiscoAvaliacaoProbImp';
import useFetchProcesso from './../../../hooks/processo/useFetchProcesso';

const ListaAvaliacaoProbImp = ({
    id,
    tipo,
    probabilidades,
    impactos,
    riscoReais,
    avaliacaoArea,
    avaliacaoGestao,
    avaliacaoEncerrada,
    grupoAvaliacaoId
}) => {
    const navigate = useNavigate(); // Hook para navegação
    // ----------------------------------------------------------------------------------------------
    // Variáveis do Modal
    // ----------------------------------------------------------------------------------------------
    const [modalAbertoExplicacao, setModalAbertoExplicacao] = useState(false);
    const [modalAbertoConfirmacao, setModalAbertoConfirmacao] = useState(false);
    const [statusSalvamento, setStatusSalvamento] = useState(null);
    const [erroSalvamento, setErroSalvamento] = useState(null);
    const [valoresRiscoReal, setValoresRiscoReal] = useState({}); // <- estado para rastrear valores

    const atualizarValorRiscoReal = (riscoId, riscoRealValor) => {
        setValoresRiscoReal((prev) => ({
            ...prev,
            [riscoId]: riscoRealValor
        }));
    };

    const handleAbrirModalExplicacao = () => {
        setModalAbertoExplicacao(true);
    };

    const handleFecharModalExplicacao = () => {
        setModalAbertoExplicacao(false);
    };

    const handleAbrirConfirmacaoFinalizacao = () => {
        setModalAbertoConfirmacao(true);
    }

    const handleFecharModalFinalizacao = () => {
        setModalAbertoConfirmacao(false);
    }

    const { riscosPorProcesso, loading: loadingRiscosPorProcesso, error } = useFetchRiscoAvaliacaoProbImp(id, tipo, grupoAvaliacaoId);
    const { processos, loading: loadingProcessos, error: errorProcessos } = useFetchProcesso(id);

    if (loadingRiscosPorProcesso || loadingProcessos) {
        return <div className="col-span-full p-6 !bg-white rounded-lg shadow-md">Carregando...</div>;
    }
    if (error || errorProcessos) {
        return (
            <div className="col-span-full p-6 !bg-white rounded-lg shadow-md">
                Erro: {error?.message || errorProcessos?.message}
            </div>
        );
    }

    const handleFinalizarAvaliacao = async () => {

        const totalRiscos = riscosPorProcesso.length;
        const preenchidos = Object.values(valoresRiscoReal).filter(v => v !== '0' && v !== null && v !== undefined).length;

        if (preenchidos < totalRiscos) {
            toast.error('Você deve avaliar todos os riscos antes de finalizar (Probabilidade e Impacto devem estar selecionados).');
            return;
        }

        try {
            const url = `${import.meta.env.VITE_API_URL_BACKEND}${import.meta.env.VITE_API_URL_RISCO_AVALIACAOPROBIMPACTOGRUPO}/${id}`;
            //const processo_id = id;
            const payload = { id, grupoAvaliacaoId, tipo };

            const response = await axios.put(url, payload);

            setModalAbertoConfirmacao(false);

            toast.success(`Avaliação finalizada com sucesso`, {
                onClose: () => navigate(routes.risco_aval_prob_impacto_listar)
            });
            setStatusSalvamento(null);
            //setTimeout(() => setStatusSalvamento(null), 2000);
            setStatusSalvamento(null);
        } catch (err) {
            toast.error(`Erro ao tentar Finalizar Avaliação`);
            //setErroSalvamento('Falha ao finalizar avaliação. Tente novamente.');
            setStatusSalvamento(null);
        }
    };

    return (
        <div className="col-span-full p-6 !bg-white rounded-lg shadow-md">
            {statusSalvamento && (
                <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                    {statusSalvamento}
                </div>
            )}
            {erroSalvamento && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                    {erroSalvamento}
                </div>
            )}
            <h2 className="text-xl font-bold mb-4">
                Riscos do Processo <b className="text-blue-700">[{processos.nome}]</b>{' '}
                <b className="text-green-900">[Macroprocesso: </b>
                <b className="text-purple-500">{processos.macroprocesso}</b>
                <b className="text-green-900">]</b>
            </h2>
            {riscosPorProcesso && riscosPorProcesso.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-100 text-center">
                                <th className="border p-2 w-[28%] min-w-[150px] font-bold" rowSpan={2}>
                                    Descrição
                                </th>
                                {tipo === 'normal' && (
                                    <th className="border p-2 bg-purple-100" colSpan={4}>
                                        Avaliação da Área
                                    </th>
                                )}
                                {tipo === 'gestao' && (
                                    <th className="border p-2 bg-green-100" colSpan={4}>
                                        Avaliação da Gestão
                                    </th>
                                )}
                            </tr>
                            <tr className="text-center">
                                {tipo === 'normal' && (
                                    <>
                                        <th className="bg-purple-100 border p-2">Probabilidade (P)<br />
                                            <a onClick={handleAbrirModalExplicacao} className='text-blue-700 underline cursor-pointer'>(ajuda)</a>
                                        </th>
                                        <th className="bg-purple-100 border p-2">Impacto (I)<br />
                                            <a onClick={handleAbrirModalExplicacao} className='text-blue-700 underline cursor-pointer'>(ajuda)</a>
                                        </th>
                                        <th className="bg-purple-100 border p-2">Nível de Risco (PxI)
                                            <a onClick={handleAbrirModalExplicacao} className='text-blue-700 underline cursor-pointer'>(ajuda)</a>
                                        </th>
                                        <th className="bg-purple-100 border p-2 text-center justify-center">
                                            Ação
                                        </th>
                                    </>
                                )}
                                {tipo === 'gestao' && (
                                    <>
                                        <th className="bg-green-100 border p-2">Probabilidade (P)<br />
                                            <a onClick={handleAbrirModalExplicacao} className='text-blue-700 underline cursor-pointer'>(ajuda)</a>
                                        </th>
                                        <th className="bg-green-100 border p-2">Impacto (I)<br />
                                            <a onClick={handleAbrirModalExplicacao} className='text-blue-700 underline cursor-pointer'>(ajuda)</a>
                                        </th>
                                        <th className="bg-green-100 border p-2">Nível de Risco (PxI)
                                            <a onClick={handleAbrirModalExplicacao} className='text-blue-700 underline cursor-pointer'>(ajuda)</a>
                                        </th>
                                        <th className="bg-green-100 border p-2 text-center justify-center">
                                            Ação
                                        </th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {riscosPorProcesso.map((risco) => (
                                <ListaAvaliacaoProbImpRow
                                    key={risco.risco_id}
                                    risco={risco}
                                    processo_id={id}
                                    tipo={tipo}
                                    probabilidades={probabilidades}
                                    impactos={impactos}
                                    riscoReais={riscoReais}
                                    avaliacaoArea={avaliacaoArea}
                                    avaliacaoGestao={avaliacaoGestao}
                                    avaliacaoEncerrada={avaliacaoEncerrada}
                                    novoGrupoAvaliacaoId={grupoAvaliacaoId}
                                    widthPadrao="220px"
                                    onRiscoRealChange={atualizarValorRiscoReal}
                                />
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-blue-100 text-center">
                                <th className="p-2 bg-white text-center">
                                    &nbsp;
                                </th>
                                {tipo === 'normal' && (
                                    <th className="border p-4 bg-gray-100 text-center" colSpan={4}>
                                        <ButtonComponent
                                            tipo="warning"
                                            tipoBotao='button'
                                            onClick={handleAbrirConfirmacaoFinalizacao}
                                            disabled={avaliacaoArea}
                                        >
                                            Finalizar Avaliação de Probabilidade e Impacto de Área
                                        </ButtonComponent>
                                    </th>
                                )}
                                {tipo === 'gestao' && (
                                    <th className="border p-4 bg-gray-100 text-center" colSpan={4}>
                                        <ButtonComponent
                                            tipo="warning"
                                            tipoBotao='button'
                                            onClick={handleAbrirConfirmacaoFinalizacao}
                                            disabled={avaliacaoGestao || avaliacaoEncerrada}
                                        >
                                            Finalizar Avaliação de Probabilidade e Impacto da Gestão
                                        </ButtonComponent>
                                    </th>
                                )}
                            </tr>
                        </tfoot>
                    </table>
                    <Modal modalAberto={modalAbertoExplicacao} tamanho='gg' onFechar={handleFecharModalExplicacao}>
                        <ModalCabecalho onFechar={handleFecharModalExplicacao}>
                            Explicação sobre Probabilidade, Impacto e Nível de Risco
                        </ModalCabecalho>
                        <ModalCorpo>
                            <ProbabilidadeImpactoNivelRisco></ProbabilidadeImpactoNivelRisco>
                        </ModalCorpo>
                        <ModalRodape>
                            <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModalExplicacao}>
                                Fechar Janela
                            </ButtonComponent>
                        </ModalRodape>
                    </Modal>

                    <Modal modalAberto={modalAbertoConfirmacao} tamanho='m' onFechar={handleFecharModalFinalizacao}>
                        <ModalCabecalho onFechar={handleFecharModalFinalizacao}>
                            Confirmação de Finalização de Avaliação
                        </ModalCabecalho>
                        <ModalCorpo>
                            {tipo === 'normal' && (
                                <>
                                    Tem certeza que deseja finalizar a Avaliação de Probabilidade e Impacto da <b>ÁREA</b>?
                                    <br></br><br></br>
                                    Após a finalização, os dados <b className='text-red-800'>NÃO PODERÃO SER ALTERADO</b>.
                                    <br></br><br></br>
                                    <b className='text-blue-800'>Certifique-se de que todas as probabilidades e impactos foram avaliadas corretamente</b>.
                                </>
                            )}
                            {tipo === 'gestao' && (
                                <>
                                    Tem certeza que deseja finalizar a Avaliação de Probabilidade e Impacto da <b>GESTÃO</b>?
                                    <br></br><br></br>
                                    Após a finalização, os dados <b className='text-red-800'>NÃO PODERÃO SER ALTERADO</b>.
                                    <br></br><br></br>
                                    <b className='text-blue-800'>Certifique-se de que todas as probabilidades e impactos foram avaliadas corretamente</b>.
                                </>
                            )}
                        </ModalCorpo>
                        <ModalRodape>
                            <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModalFinalizacao}>
                                Fechar Janela
                            </ButtonComponent>
                            <ButtonComponent tipo="perigo" tipoBotao="button" onClick={handleFinalizarAvaliacao}>
                                Finalizar Avaliação
                            </ButtonComponent>
                        </ModalRodape>
                    </Modal>
                </div>
            ) : (
                <p className="text-gray-500">Nenhum risco encontrado para este processo.</p>
            )}
        </div>
    );
};

// Anexa o subcomponente como propriedade estática
ListaAvaliacaoProbImp.ListaAvaliacaoProbImpRow = ListaAvaliacaoProbImpRow;

// Define as propTypes para validação
ListaAvaliacaoProbImp.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    tipo: PropTypes.oneOf(['normal', 'gestao']).isRequired,
    probabilidades: PropTypes.array,
    impactos: PropTypes.array,
    riscoReais: PropTypes.array,
    avaliacaoArea: PropTypes.any,
    avaliacaoGestao: PropTypes.any,
    avaliacaoEncerrada: PropTypes.bool,
    grupoAvaliacaoId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default ListaAvaliacaoProbImp;
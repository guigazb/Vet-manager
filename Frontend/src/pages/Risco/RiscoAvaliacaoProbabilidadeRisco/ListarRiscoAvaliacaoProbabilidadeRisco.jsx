import React, { useState, useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useFetchDatagrid } from '../../../hooks/useFetchDatagrid';
import { useFetchUnidadesFuncionaisPorLocalExecucao } from '../../../hooks/diversos/useFetchUnidadesFuncionaisPorLocalExecucao';

import { AuthContext } from '../../../components/utils/AuthContext';
import BoxColunar from '../../../components/body/boxColunar/BoxColunar'
import Modal from '../../../components/body/modal/Modal'

import { Box, Typography } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import { DataGrid } from '@mui/x-data-grid';

import routes from '../../../data/routes';
import axios from 'axios';

import Actions from '../../../components/geral/Actions';
import MainLayout from '../../MainLayout';
import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';
import ButtonComponent from '../../../components/button/ButtonComponent';

function ListarRiscoAvaliacaoProbabilidadeRisco() {
    // Acessa o AuthContext para pegar os dados do usuário autenticado
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate(); // Hook para navegação

    // ----------------------------------------------------------------------------------------------
    // Variáveis de backend
    // ----------------------------------------------------------------------------------------------
    const localExecucaoId = auth?.local_execucao_id;

    useEffect(() => {
        if (!localExecucaoId) { // Verifica se é null ou undefined
            logout(); // Executa o logout do AuthContext
            localStorage.removeItem('token'); // Remove o token do localStorage (se aplicável)
            navigate('/login', { replace: true }); // Redireciona para a página de login
        }
    }, [localExecucaoId, logout, navigate]);

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const [unidadeFuncionalId, setUnidadeFuncionalId] = useState('0');
    const [URLBackendProcesso, setURLBackendProcesso] = useState('');

    const [selectedIdProcesso, setSelectedIdProcesso] = useState(null);
    const [selectedIdAvaliacao, setSelectedIdAvaliacao] = useState(null);

    const [avaliacaoArea, setAvaliacaoArea] = useState(false);
    const [avaliacaoGestao, setAvaliacaoGestao] = useState(false);
    const [avaliacaoEncerrada, setAvaliacaoEncerrada] = useState(false);

    useEffect(() => {
        setSelectedIdProcesso(null);
        // setAvaliacaoEncerrada(false);
    }, [unidadeFuncionalId])

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Modal
    // ----------------------------------------------------------------------------------------------
    const [modalAbertoAvaliacaoProbabilidadeImpacto, setModalAbertoAvaliacaoProbabilidadeImpacto] = useState(false);
    const [modalAbertoNovaProbabilidadeImpacto, setModalAbertoNovaProbabilidadeImpacto] = useState(false);

    const handleAbrirModalAvaliacaoProbabilidadeImpacto = () => {
        setModalAbertoAvaliacaoProbabilidadeImpacto(true);
    };

    const handleFecharModalAvaliacaoProbabilidadeImpacto = () => {
        setModalAbertoAvaliacaoProbabilidadeImpacto(false);
    };

    const handleAbrirModalNovaAvaliacaoProbabilidadeImpacto = () => {
        setAvaliacaoArea(false);
        setAvaliacaoGestao(false);
        setAvaliacaoEncerrada(false);
        setModalAbertoNovaProbabilidadeImpacto(true);
    };

    const handleFecharModalNovaAvaliacaoProbabilidadeImpacto = () => {
        setModalAbertoNovaProbabilidadeImpacto(false);
    };

    const handleConfirmarAvaliacaoArea = () => {
        const id = selectedIdProcesso;
        const tipo = "normal";
        const grupoAvaliacaoId = selectedIdAvaliacao;

        navigate(routes.risco_aval_prob_impacto_atualizar, { state: { id, tipo, avaliacaoArea, avaliacaoGestao, avaliacaoEncerrada, grupoAvaliacaoId } });
    };

    const handleConfirmarAvaliacaoGestao = () => {
        const id = selectedIdProcesso;
        const tipo = "gestao";
        const grupoAvaliacaoId = selectedIdAvaliacao;
        navigate(routes.risco_aval_prob_impacto_atualizar, { state: { id, tipo, avaliacaoArea, avaliacaoGestao, avaliacaoEncerrada, grupoAvaliacaoId } });
    };

    const handleRowClickProcesso = (params) => {
        setSelectedIdProcesso(params.row.ID);

    };

    const handleRowClickAvaliacao = (params) => {
        setSelectedIdAvaliacao(params.row.ID);
        setAvaliacaoArea(params.row["Avaliação Área?"]);
        setAvaliacaoGestao(params.row["Avaliação Gestão?"]);
        setAvaliacaoEncerrada(false);
    };

    const handleCancelarSelecao = () => {
        setSelectedIdProcesso(null);
        setSelectedIdAvaliacao(null);
    }

    const handleNovaAvaliacaoProbabilidadeImpacto = async () => {
        try {
            const processo_id = selectedIdProcesso !== '0' ? parseInt(selectedIdProcesso) : null;
            const unidade_funcional_id = unidadeFuncionalId !== '0' ? parseInt(unidadeFuncionalId) : null;
            const id = processo_id;

            setAvaliacaoArea(false);
            setAvaliacaoGestao(false);
            setAvaliacaoEncerrada(false);

            const url = `${import.meta.env.VITE_API_URL_BACKEND}${import.meta.env.VITE_API_URL_RISCO_AVALIACAOPROBIMPACTOGRUPO}/`;

            const response = await axios.post(url, {
                processo_id: processo_id,
                unidade_funcional_id: unidade_funcional_id
            });

            // Capturar o id retornado pelo backend
            const grupoAvaliacaoId = response.data.id;

            const tipo = 'normal';
            navigate(routes.risco_aval_prob_impacto_atualizar, {
                state: { id, tipo, avaliacaoArea, avaliacaoGestao, avaliacaoEncerrada, grupoAvaliacaoId },
            });

        } catch (err) {
            console.error('Erro ao salvar avaliação:', err);
            setSaveError('Falha ao salvar. Tente novamente.');
            setSaveStatus(null);
        }
    }

    useEffect(() => {
        setURLBackendProcesso(`${URLProcessosPorUnidadeFuncional}${unidadeFuncionalId}/datagrid`);
    }, [unidadeFuncionalId]);

    // ----------------------------------------------------------------------------------------------
    // Variaveis de backend
    // ----------------------------------------------------------------------------------------------
    const URLProcessosPorUnidadeFuncional = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PROCESSO + "/";
    const URLAvaliacoesProbImpactoPorProcesso = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PROCESSO + "/" + selectedIdProcesso + "/" + unidadeFuncionalId + "/avaliacaoprobabilidadeimpacto/"

    // ----------------------------------------------------------------------------------------------
    // Busca informações via hook
    // ----------------------------------------------------------------------------------------------
    const { linhas: linhasProcessos, colunas: colunasProcessos, loading: loadingProcessos, error: errorProcessos } = useFetchDatagrid(URLBackendProcesso);

    // Buscar dados para o segundo DataGrid (avaliações), apenas quando selectedId for definido
    const { linhas: linhasAvaliacoes, colunas: colunasAvaliacoes, loading: loadingAvaliacoes, error: errorAvaliacoes } = useFetchDatagrid(
        selectedIdProcesso
            ? URLAvaliacoesProbImpactoPorProcesso
            : null,
        selectedIdProcesso
    );

    useEffect(() => {
        if (linhasAvaliacoes && linhasAvaliacoes.length > 0) {
            const todosEncerrados = linhasAvaliacoes.every((avaliacao) => avaliacao['Avaliação Encerrada'] === true);
            setAvaliacaoEncerrada(todosEncerrados);
        } else {
            // Caso o array esteja vazio, deve mostrar o 
            // botão de nova avaliação de Probabilidade e Impacto
            // para que o usuário possa criar a primeira avaliação
            setAvaliacaoEncerrada(true);
        }
    }, [linhasAvaliacoes]);

    const { unidadesPorLocalExecucao, loading: loadingUnidadesFuncionais } = useFetchUnidadesFuncionaisPorLocalExecucao(localExecucaoId);

    // ----------------------------------------------------------------------------------------------
    if (errorProcessos) return <div>Error: {errorProcessos.message}</div>;
    // ----------------------------------------------------------------------------------------------

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Riscos : Avaliação de Risco" nomeSessao="Avaliação de Probabilidade e Impacto" hasAddViewButton={false} hasFilter={false} />

                <InternalArea loading={loadingProcessos}>

                    <SelectInputPadrao
                        label="Selecione uma Unidade Funcional"
                        options={unidadesPorLocalExecucao}
                        optionKey="unidade_funcional_id"
                        optionValue="unidade_funcional_nome"
                        value={unidadeFuncionalId}
                        onChange={setUnidadeFuncionalId}
                        loading={loadingUnidadesFuncionais}
                        nomeSelect="unidadeFuncional"
                    />

                </InternalArea>

                <BoxColunar altura="420" bgcolor='bg-slate-200'>

                    <BoxColunar.BoxItem largura={52}>
                        <Typography variant="h6" gutterBottom>
                            Selecione um processo
                        </Typography>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={linhasProcessos}
                                columns={colunasProcessos}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    }
                                }}
                                pageSizeOptions={[5, 10, 25, 50]}
                                disableMultipleSelection={true}
                                onRowClick={handleRowClickProcesso}
                                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                            />
                        </Box>
                    </BoxColunar.BoxItem>

                    <BoxColunar.BoxItem largura={48}>
                        <Typography variant="h6" gutterBottom>
                            Selecione uma avaliação
                        </Typography>
                        <Box sx={{ height: 337, width: '100%' }}>
                            {selectedIdProcesso && (
                                <DataGrid
                                    rows={linhasAvaliacoes}
                                    columns={colunasAvaliacoes}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        }
                                    }}
                                    pageSizeOptions={[5, 10, 25, 50]}
                                    disableMultipleSelection={true}
                                    onRowClick={handleRowClickAvaliacao}
                                    localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                                />
                            )}
                        </Box>
                        <InternalButtonArea>

                            <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleCancelarSelecao}>
                                Cancelar
                            </ButtonComponent>

                            <ButtonComponent tipo="primario" tipoBotao="button" desabilitado={!selectedIdAvaliacao} onClick={handleAbrirModalAvaliacaoProbabilidadeImpacto}>
                                Avaliar Probabilidade x Impacto
                            </ButtonComponent>

                            <ButtonComponent tipo="diversos" tipoBotao="button"
                                desabilitado={
                                    unidadeFuncionalId === '0' ||
                                    !selectedIdProcesso ||
                                    !avaliacaoEncerrada
                                }
                                onClick={handleAbrirModalNovaAvaliacaoProbabilidadeImpacto}>
                                Nova Avaliação Probabilidade x Impacto
                            </ButtonComponent>

                        </InternalButtonArea>
                    </BoxColunar.BoxItem>
                </BoxColunar>

                <Modal modalAberto={modalAbertoAvaliacaoProbabilidadeImpacto} tamanho='m' onFechar={handleFecharModalAvaliacaoProbabilidadeImpacto}>
                    <Modal.ModalCabecalho onFechar={handleFecharModalAvaliacaoProbabilidadeImpacto}>
                        Tipo de Avaliação
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Que tipo de <b className='text-red-600'>Avaliação de Probabilidade e Impacto</b> deseja efetuar?
                    </Modal.ModalCorpo>
                    <Modal.ModalRodape>
                        <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModalAvaliacaoProbabilidadeImpacto}>
                            Fechar Janela
                        </ButtonComponent>
                        <ButtonComponent tipo="primario" tipoBotao="button" desabilitado={avaliacaoArea} onClick={handleConfirmarAvaliacaoArea}>
                            Avaliação da Área
                        </ButtonComponent>
                        <ButtonComponent tipo="info" tipoBotao="button" desabilitado={!avaliacaoArea} onClick={handleConfirmarAvaliacaoGestao}>
                            Avaliação da Gestão
                        </ButtonComponent>
                    </Modal.ModalRodape>
                </Modal>

                <Modal modalAberto={modalAbertoNovaProbabilidadeImpacto} tamanho='m' onFechar={handleFecharModalNovaAvaliacaoProbabilidadeImpacto}>
                    <Modal.ModalCabecalho onFechar={handleFecharModalNovaAvaliacaoProbabilidadeImpacto}>
                        Nova Avaliação de Probabilidade e Impacto
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Tem certeza que deseja criar uma nova avaliação de Probabilidade e Impacto?
                    </Modal.ModalCorpo>
                    <Modal.ModalRodape>
                        <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModalNovaAvaliacaoProbabilidadeImpacto}>
                            Não
                        </ButtonComponent>
                        <ButtonComponent tipo="perigo" tipoBotao="button" onClick={handleNovaAvaliacaoProbabilidadeImpacto}>
                            Sim
                        </ButtonComponent>
                    </Modal.ModalRodape>
                </Modal>

            </React.Fragment>
        </MainLayout >
    );
}

export default ListarRiscoAvaliacaoProbabilidadeRisco
    ;
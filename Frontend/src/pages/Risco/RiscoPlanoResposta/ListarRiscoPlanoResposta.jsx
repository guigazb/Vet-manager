import React, { useState, useContext, useEffect } from 'react';

import { useFetchDatagrid } from '../../../hooks/useFetchDatagrid';
import { useFetchUnidadesFuncionaisPorLocalExecucao } from '../../../hooks/diversos/useFetchUnidadesFuncionaisPorLocalExecucao';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../components/utils/AuthContext'

import { Box } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import { DataGrid } from '@mui/x-data-grid';
import Modal from '../../../components/body/modal/Modal'

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions'
import routes from '../../../data/routes';

import { toast } from 'react-toastify';
import axios from 'axios';

import InternalButtonArea from '../../../components/body/InternalButtonArea';
import ButtonComponent from '../../../components/button/ButtonComponent';
import InternalArea from '../../../components/body/InternalArea';
import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';

const ListarRiscoPlanoResposta = () => {

    // Acessa o AuthContext para pegar os dados do usuário autenticado
    const { auth, logout } = useContext(AuthContext);
    const navegar = useNavigate();

    // ----------------------------------------------------------------------------------------------
    // Variaveis de backend
    // ----------------------------------------------------------------------------------------------
    const localExecucaoId = auth?.local_execucao_id;

    useEffect(() => {
        if (!localExecucaoId) { // Verifica se é null ou undefined
            logout(); // Executa o logout do AuthContext
            localStorage.removeItem('token'); // Remove o token do localStorage (se aplicável)
            navegar('/login', { replace: true }); // Redireciona para a página de login
        }
    }, [localExecucaoId, logout, navegar]);

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Modal
    // ----------------------------------------------------------------------------------------------
    const [modalAbertoEncerramentoPlano, setModalAbertoEncerramentoPlano] = useState(false);
    const [modalAbertoConfirmacaoFinalEncerramentoPlano, setModalAbertoConfirmacaoFinalEncerramentoPlano] = useState(false);

    const handleAbrirModalEncerramentoPlano = () => {
        setModalAbertoEncerramentoPlano(true);
    };

    const handleFecharModalEncerramentoPlano = () => {
        setModalAbertoEncerramentoPlano(false);
    };

    const handleAbrirModalConfirmacaoEncerramentoPlano = () => {
        setModalAbertoEncerramentoPlano(false);
        setModalAbertoConfirmacaoFinalEncerramentoPlano(true);
    };

    const handleFecharModalConfirmacaoEncerramentoPlano = () => {
        setModalAbertoConfirmacaoFinalEncerramentoPlano(false);
    };

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const [selectedId, setSelectedId] = useState(null);
    const [nomePlanoResposta, setNomePlanoResposta] = useState();
    const [unidadeFuncionalId, setUnidadeFuncionalId] = useState('0');
    const urlBackendRiscoPlanoResposta = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_PLANO_RESPOSTA_DATAGRID + "/" + unidadeFuncionalId;

    // ----------------------------------------------------------------------------------------------
    // Busca informações via hook
    // ----------------------------------------------------------------------------------------------
    const [refetchTriggerPlanoResposta, setRefetchTriggerPlanoResposta] = useState(0);
    const { linhas, colunas, loading, error } = useFetchDatagrid(urlBackendRiscoPlanoResposta, refetchTriggerPlanoResposta);
    const { unidadesPorLocalExecucao, loading: loadingUnidadesFuncionais } = useFetchUnidadesFuncionaisPorLocalExecucao(localExecucaoId);

    const handleCancelarSelecao = () => {
        setSelectedId('');
    };

    const handleIrPaginaCriarRegistro = () => {
        navegar(routes.risco_plano_resposta_criar);
    };

    const handleIrPaginaAtualizarRegistro = () => {
        const id = selectedId;
        navegar(routes.risco_plano_resposta_atualizar, { state: { id } });
    };

    const handleIrPaginaExcluirRegistro = () => {
        const id = selectedId
        navegar(routes.risco_plano_resposta_excluir, { state: { id } });
    };

    const handleIrPaginaAcaoControle = () => {
        const idPlanoAcaoGrupo = selectedId
        navegar(routes.risco_plano_resposta_acao_listar, { state: { idPlanoAcaoGrupo } });
    };

    const handleRowClick = (params) => {
        setSelectedId(params.row.ID);
        setNomePlanoResposta(params.row["Nome do Plano de Resposta"]);
    };

    const handleEncerrarPlanoAcao = async (e) => {
        e.preventDefault();

        let encerramentoBemSucedida = false;

        try {
            const url = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_PLANO_RESPOSTA + "/encerrar/" + selectedId;
            const result = await axios.put(url);

            if (result.status === 201) {

                encerramentoBemSucedida = true;

                setRefetchTriggerPlanoResposta(prev => prev + 1);
                toast.success("Plano de Resposta encerrado com sucesso.");
                setModalAbertoConfirmacaoFinalEncerramentoPlano(false);
            } else {
                toast.error('Erro ao tentar encerrar Plano de Resposta `');
            }
        } catch (error) {
            toast.error('Erro ao tentar encerrar Plano de Resposta `', error);
        } finally {
            if (encerramentoBemSucedida) {

            }
        }
    }

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Risco"
                    nomeSessao="Listagem dos Planos Resposta de Risco" hasAddViewButton={false} hasFilter={false} />

                <InternalArea>

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

                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={linhas}
                        columns={colunas}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            }
                        }}
                        pageSizeOptions={[5, 10, 25, 50]}
                        disableMultipleSelection={true}
                        onRowClick={handleRowClick}
                        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                    />
                </Box>

                <InternalButtonArea>

                    <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleCancelarSelecao}>
                        Cancelar
                    </ButtonComponent>

                    <ButtonComponent tipo="primario" tipoBotao="button" onClick={handleIrPaginaCriarRegistro}>
                        Novo Registro
                    </ButtonComponent>

                    <ButtonComponent tipo="alerta" tipoBotao="button" desabilitado={!selectedId} onClick={handleIrPaginaAtualizarRegistro}>
                        Atualizar Registro
                    </ButtonComponent>

                    <ButtonComponent tipo="perigo" tipoBotao="button" desabilitado={!selectedId} onClick={handleIrPaginaExcluirRegistro}>
                        Excluir Registro
                    </ButtonComponent>

                    |

                    <ButtonComponent tipo="sucesso" tipoBotao="button" desabilitado={!selectedId} onClick={handleIrPaginaAcaoControle}>
                        Ações do Plano de Resposta
                    </ButtonComponent>

                    |

                    <ButtonComponent tipo="perigo" tipoBotao="button" desabilitado={!selectedId} onClick={handleAbrirModalEncerramentoPlano}>
                        Encerrar Plano de Resposta
                    </ButtonComponent>

                </InternalButtonArea>

                <Modal modalAberto={modalAbertoEncerramentoPlano} tamanho='m' onFechar={handleFecharModalEncerramentoPlano}>
                    <Modal.ModalCabecalho onFechar={handleFecharModalEncerramentoPlano}>
                        Encerramento de Plano de Ação
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Deseja encerrar o Plano de Ação [<b className='text-red-700'>{nomePlanoResposta}</b>]?
                        <br></br><br></br>
                        O encerramento do Plano de Ação implica que os status de suas ações ficarão gravados e que não poderão ser alterados posteriormente.
                    </Modal.ModalCorpo>
                    <Modal.ModalRodape>
                        <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModalEncerramentoPlano}>
                            Fechar Janela
                        </ButtonComponent>
                        <ButtonComponent tipo="perigo" tipoBotao="button" onClick={handleAbrirModalConfirmacaoEncerramentoPlano}>
                            Encerrar Plano de Ação
                        </ButtonComponent>

                    </Modal.ModalRodape>
                </Modal>

                <Modal modalAberto={modalAbertoConfirmacaoFinalEncerramentoPlano} tamanho='m' onFechar={handleFecharModalConfirmacaoEncerramentoPlano}>
                    <Modal.ModalCabecalho onFechar={handleFecharModalConfirmacaoEncerramentoPlano}>
                        Confirmação Final
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Ao confirmar, o Plano de Resposta [<b className='text-red-700'>{nomePlanoResposta}</b>] será encerrado permanentemente.
                        <br></br><br></br>
                        Tem certeza que deseja continuar?
                    </Modal.ModalCorpo>
                    <Modal.ModalRodape>
                        <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModalConfirmacaoEncerramentoPlano}>
                            Fechar Janela
                        </ButtonComponent>
                        <ButtonComponent tipo="perigo" tipoBotao="button" onClick={handleEncerrarPlanoAcao}>
                            Encerrar permanentemente Plano de Ação
                        </ButtonComponent>

                    </Modal.ModalRodape>
                </Modal>

            </React.Fragment>
        </MainLayout>
    )
}

export default ListarRiscoPlanoResposta;
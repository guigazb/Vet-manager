import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../../components/utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useFetchDatagrid } from '../../../hooks/useFetchDatagrid';
import { useFetchUnidadesFuncionaisPorLocalExecucao } from '../../../hooks/diversos/useFetchUnidadesFuncionaisPorLocalExecucao';

import { Box } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import { DataGrid } from '@mui/x-data-grid';

import routes from '../../../data/routes';
import axios from 'axios';
import { toast } from 'react-toastify';

import Actions from '../../../components/geral/Actions';
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';
import ButtonComponent from '../../../components/button/ButtonComponent';

import Modal from '../../../components/body/modal/Modal';
import ModalCorpo from '../../../components/body/modal/ModalCorpo';
import ModalCabecalho from '../../../components/body/modal/ModalCabecalho';
import ModalRodape from '../../../components/body/modal/ModalRodape';

function ListarRiscoMatrizSwot() {

    // ----------------------------------------------------------------------------------------------
    // Variaveis de backend
    // ----------------------------------------------------------------------------------------------
    const URLBackend = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_UNIDADE_FUNCIONAL + "/";

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Modal
    // ----------------------------------------------------------------------------------------------
    const [modalAbertoInserir, setModalAbertoInserir] = useState(false);
    const [modalAbertoDesativar, setModalAbertoDesativar] = useState(false);

    const formRef = useRef(null); // Cria uma referência para o formulário

    const handleAbrirModalInserir = () => {
        setModalAbertoInserir(true);
    };

    const handleFecharModalInserir = () => {
        setModalAbertoInserir(false);
    };

    const handleConfirmarInsercaoNoModal = () => {
        if (formRef.current) {
            formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
        }
    };

    const handleAbrirModalDesativar = () => {
        setModalAbertoDesativar(true);
    };

    const handleFecharModalDesativar = () => {
        setModalAbertoDesativar(false);
    };

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [unidadeFuncionalId, setUnidadeFuncionalId] = useState('0');
    const [URLBackendMatriz, setURLBackendMatriz] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    
    // Acessa o AuthContext para pegar os dados do usuário autenticado
    const { auth, logout } = useContext(AuthContext);

    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [inserirDesabilitado, setInserirDesabilitado] = useState(false);
    const [desativarDesabilitado, setDesativarDesabilitado] = useState(true);

    const handleRowClick = (params) => {
        setSelectedId(params.row.ID);
        setDesativarDesabilitado(false);

    };

    const handleCancelarSelecao = () => {
        setSelectedId('');
    };


    useEffect(() => {
        setURLBackendMatriz(`${URLBackend}${unidadeFuncionalId}/matrizswot?refresh=${refreshTrigger}`);
    }, [unidadeFuncionalId, refreshTrigger]);


    // ----------------------------------------------------------------------------------------------
    // Busca informações via hook
    // ----------------------------------------------------------------------------------------------
    const localExecucaoId = auth?.local_execucao_id;

    const { linhas, colunas, loading, error } = useFetchDatagrid(URLBackendMatriz);
    const { unidadesPorLocalExecucao, loading: loadingUnidadesFuncionais } = useFetchUnidadesFuncionaisPorLocalExecucao(localExecucaoId);
    

    // ----------------------------------------------------------------------------------------------
    // Handles dos botões
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();

    const handleIrPaginaVisualizarRegistro = () => {
        const id = selectedId;
        const idUnidade = unidadeFuncionalId;
        navegar(routes.risco_matriz_swot_visualizar, { state: { id, idUnidade } });
    }

    useEffect(() => {
        if (!localExecucaoId) { // Verifica se é null ou undefined
            logout(); // Executa o logout do AuthContext
            localStorage.removeItem('token'); // Remove o token do localStorage (se aplicável)
            navigate('/login', { replace: true }); // Redireciona para a página de login
        }
    }, [localExecucaoId, logout, navegar]);

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const dataAtual = new Date().toISOString();

        const novaMatrizSwot = {
            unidade_funcional_id: unidadeFuncionalId,
            data_matriz_swot: dataAtual
        };

        let criacaoBemSucedida = false;

        try {
            const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_MATRIZ_SWOT, novaMatrizSwot);

            if (result.status === 201) {

                criacaoBemSucedida = true;
                toast.success("Matriz Swot criada com sucesso.");

                // Redireciona para a página de edição da matriz swot
                const id = result.data.id;
                const ufid = unidadeFuncionalId;
                navegar(routes.risco_matriz_swot_editar, { state: { id, ufid } });

            } else {
                toast.error('Erro ao tentar criar Matriz Swot`');
            }
        } catch (error) {
            toast.error('Erro ao tentar criar a Matriz Swot`', error);
        } finally {
            if (criacaoBemSucedida) {

                setInserirDesabilitado(true);

            }
        }
    };

    const handleConfirmarDesativacaoNoModal = async () => {

        let exclusaoBemSucedida = false;

        try {
            const result = await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_MATRIZ_SWOT + '/' + selectedId);

            if (result.status === 204) {

                exclusaoBemSucedida = true;

                toast.success("Matriz Swot excluida com sucesso.");

                setModalAbertoDesativar(false);

            } else {
                toast.error('Erro ao tentar excluir a Matriz Swot`');
            }

        } catch (error) {
            toast.error('Erro ao tentar excluir a Matriz Swot`', error);
        } finally {
            if (exclusaoBemSucedida) {

                // Refetch para o datagrid após desativar a matriz swot 
                setRefreshTrigger(prev => prev + 1);

            }
            setDesativarDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Risco : Matriz SWOT" nomeSessao="Listagem de Matriz Swot" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleCreateSubmit}>

                    <InternalArea loading={loading}>

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

                </FormPadrao>

                <InternalButtonArea>

                    <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleCancelarSelecao}>
                        Cancelar
                    </ButtonComponent>

                    <ButtonComponent tipo="primario" desabilitado={inserirDesabilitado} tipoBotao="button" onClick={handleAbrirModalInserir}>
                        Nova Matriz
                    </ButtonComponent>

                    <ButtonComponent tipo="alerta" desabilitado={!selectedId} tipoBotao="button" onClick={handleIrPaginaVisualizarRegistro}>
                        Editar Matriz
                    </ButtonComponent>

                    <ButtonComponent tipo="perigo" desabilitado={desativarDesabilitado} tipoBotao="button" onClick={handleAbrirModalDesativar}>
                        Desativar/Reativar Matriz
                    </ButtonComponent>

                </InternalButtonArea>

                <Modal modalAberto={modalAbertoInserir} onFechar={handleFecharModalInserir}>
                    <ModalCabecalho onFechar={handleFecharModalInserir}>
                        Criação de Matriz Swot
                    </ModalCabecalho>
                    <ModalCorpo>
                        Deseja Criar uma nova Matriz Swot para a unidade escolhida ?
                        Ao confirmar, voce será redirecionado para a tela de edição da nova matriz.
                    </ModalCorpo>
                    <ModalRodape>
                        <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModalInserir}>
                            Fechar Janela
                        </ButtonComponent>
                        <ButtonComponent tipo="perigo" tipoBotao="button" onClick={handleConfirmarInsercaoNoModal}>
                            Criar Matriz
                        </ButtonComponent>
                    </ModalRodape>
                </Modal>

                <Modal modalAberto={modalAbertoDesativar} onFechar={handleFecharModalDesativar}>
                    <ModalCabecalho onFechar={handleFecharModalDesativar}>
                        Desativar Matriz Swot
                    </ModalCabecalho>
                    <ModalCorpo>
                        Deseja Desativar a Matriz Swot escolhida ?
                        Ao confirmar, se a matriz estiver ativa ,será DESATIVADA.
                        se estiver desativada, será ATIVADA.
                    </ModalCorpo>
                    <ModalRodape>
                        <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModalDesativar}>
                            Fechar Janela
                        </ButtonComponent>
                        <ButtonComponent tipo="perigo" tipoBotao="button" onClick={handleConfirmarDesativacaoNoModal}>
                            Desativar Matriz
                        </ButtonComponent>
                    </ModalRodape>
                </Modal>

            </React.Fragment>
        </MainLayout>
    );
}

export default ListarRiscoMatrizSwot;
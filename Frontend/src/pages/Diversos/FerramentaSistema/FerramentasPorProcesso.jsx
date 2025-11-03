import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFetchDatagrid } from '../../../hooks/useFetchDatagrid';
import { useFetchProcesso } from '../../../hooks/processo/useFetchProcesso';

import { Box } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import { DataGrid } from '@mui/x-data-grid';

import routes from '../../../data/routes';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions';
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import ButtonComponent from '../../../components/button/ButtonComponent';

import BoxColunar from '../../../components/body/boxColunar/BoxColunar';

import axios from 'axios';

const FerramentasPorProcesso = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id, tipo } = location.state || {};

    const navegar = useNavigate();
    const handleRetornarPaginaAnterior = () => {

        if (tipo === "listagem") {
            alert("Listagem: " + id);
            navegar(routes.processo_listar, { state: { id } });
        } else if (tipo === "atualizar") {
            alert("Atualizar: " + id);
            navegar(routes.processo_atualizar, { replace: true, state: { id } });
        }
    }

    // ----------------------------------------------------------------------------------------------
    // Variáveis internas
    // ----------------------------------------------------------------------------------------------
    const [nomeProcesso, setNomeProcesso] = useState('');
    const [nomeMacroprocesso, setMacroprocesso] = useState('');
    const [ferramentaCadastradaId, setFerramentaCadastradaId] = useState(null);
    const [ferramentaDisponivelId, setFerramentaDisponivelId] = useState(null);
    const [refetchTriggerFerramentasCadastradas, setRefetchTriggerFerramentasCadastradas] = useState(0);
    const [refetchTriggerFerramentasDisponiveis, setRefetchTriggerFerramentasDisponiveis] = useState(0);

    // ----------------------------------------------------------------------------------------------
    // URLs de retorno do Backend
    // ----------------------------------------------------------------------------------------------
    const URLBackend = import.meta.env.VITE_API_URL_BACKEND;
    const URLFerramentasCadastradas = URLBackend + import.meta.env.VITE_API_URL_FERRAMENTA_SISTEMA + "/" + id + "/dgcadastradasnoprocesso"
    const URLFerramentasDisponiveis = URLBackend + import.meta.env.VITE_API_URL_FERRAMENTA_SISTEMA + "/" + id + "/dgdisponiveisparaprocesso"

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const { linhas: linhasFerramentasCadastradas, colunas: colunasFerramentasCadastradas, loading: loadingFerramentasSistemaCadastradas, error: errorFerramentasSistemaCadastradas } = useFetchDatagrid(URLFerramentasCadastradas, refetchTriggerFerramentasCadastradas);
    const { linhas: linhasFerramentasDisponiveis, colunas: colunasFerramentasDisponiveis, loading: loadingFerramentasSistemaDisponiveis, error: errorFerramentasSistemaDisponiveis } = useFetchDatagrid(URLFerramentasDisponiveis, refetchTriggerFerramentasDisponiveis);
    const { processos, loading: loadingProcesso } = useFetchProcesso(id);

    useEffect(() => {
        if (processos && processos.nome !== undefined) {
            setNomeProcesso(processos.nome);
        }
        if (processos && processos.macroprocesso !== undefined) {
            setMacroprocesso(processos.macroprocesso);
        }
    }, [processos])

    // ----------------------------------------------------------------------------------------------
    // Handle de botões
    // ----------------------------------------------------------------------------------------------
    const handleRowClickFerramentasCadastradas = (params) => {
        setFerramentaCadastradaId(params.row.ID);
    };

    const handleRowClickFerramentasDisponivel = (params) => {
        setFerramentaDisponivelId(params.row.ID);
    };

    const handleInclusaoUnitaria = async (e) => {
        e.preventDefault();

        const ferramentavsprocesso = {
            processo_id: id,
            ferramentasistema_id: ferramentaDisponivelId
        };

        try {
            await axios.post(URLBackend + import.meta.env.VITE_API_URL_PROCESSO_FERRAMENTA, ferramentavsprocesso);

            toast.success("Ferramenta de Sistema adicionada com sucesso ao Processo.");

            setRefetchTriggerFerramentasDisponiveis(prev => prev + 1);
            setRefetchTriggerFerramentasCadastradas(prev => prev + 1);

        } catch (error) {
            toast.error('Erro ao tentar anexar a Ferramenta de Sistema ao Processo', error);
        }
    }

    const handleExclusaoUnitaria = async (e) => {

        e.preventDefault();

        const ferramentavsprocesso = {
            processo_id: id,
            ferramentasistema_id: ferramentaCadastradaId
        };

        try {
            await axios.delete(URLBackend + import.meta.env.VITE_API_URL_PROCESSO_FERRAMENTA, { data: ferramentavsprocesso });

            toast.success("Ferramenta de Sistema excluída com sucesso do Processo.");

            setRefetchTriggerFerramentasDisponiveis(prev => prev + 1);
            setRefetchTriggerFerramentasCadastradas(prev => prev + 1);

        } catch (error) {
            toast.error('Erro ao tentar excluir a Ferramenta de Sistema do Processo', error);
        }
    }

    return (

        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Cadastro de Ferramentas de Sistema x Processo" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao>

                    <InternalArea loading={loadingProcesso}>

                        <div className="sm:col-span-9 text-center">
                            Processo Selecionado: <b className='font-bold text-black'>{nomeProcesso}</b> | Macroprocesso: <b className='font-bold text-red-600'>{nomeMacroprocesso}</b>
                        </div>

                    </InternalArea>

                    <BoxColunar altura="420" loading={loadingProcesso}>

                        <BoxColunar.BoxItem largura={45}>

                            <Box sx={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={linhasFerramentasDisponiveis}
                                    columns={colunasFerramentasDisponiveis}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        }
                                    }}
                                    pageSizeOptions={[5, 10, 25, 50]}
                                    disableMultipleSelection={true}
                                    onRowClick={handleRowClickFerramentasDisponivel}
                                    localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                                    showToolbar
                                />
                            </Box>

                        </BoxColunar.BoxItem>

                        <BoxColunar.BoxButtons>

                            <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleInclusaoUnitaria}>
                                &gt;
                            </ButtonComponent>
                            <br></br>
                            <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleExclusaoUnitaria}>
                                &lt;
                            </ButtonComponent>
                            <br></br>

                        </BoxColunar.BoxButtons>

                        <BoxColunar.BoxItem largura={45}>

                            <Box sx={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={linhasFerramentasCadastradas}
                                    columns={colunasFerramentasCadastradas}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        }
                                    }}
                                    pageSizeOptions={[5, 10, 25, 50]}
                                    disableMultipleSelection={true}
                                    onRowClick={handleRowClickFerramentasCadastradas}
                                    localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                                    showToolbar
                                />
                            </Box>

                        </BoxColunar.BoxItem>

                    </BoxColunar>

                    <InternalButtonArea>
                        <ButtonComponent tipo="cancelar" onClick={handleRetornarPaginaAnterior}>
                            Retornar para tela anterior
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

            </React.Fragment>

        </MainLayout>

    )
}

export default FerramentasPorProcesso
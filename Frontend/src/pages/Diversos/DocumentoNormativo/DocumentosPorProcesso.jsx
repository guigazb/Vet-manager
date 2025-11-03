import React, { useState, useEffect } from 'react'
import { Routes, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFetchDatagrid } from '../../../hooks/useFetchDatagrid';
import { useFetchProcesso } from '../../../hooks/processo/useFetchProcesso';
import { useFetchDocumentoNormativo } from '../../../hooks/diversos/useFetchDocumentoNormativo';

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

const DocumentosPorProcesso = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id, tipo } = location.state || {};

    const navegar = useNavigate();
    const handleRetornarPaginaAnterior = () => {
        if (tipo === "listagem") {
            navegar(routes.processo_listar, { state: { id } });
        } else if (tipo === "atualizar") {
            navegar(routes.processo_atualizar, { state: { id } });
        }
    }

    // ----------------------------------------------------------------------------------------------
    // Variáveis internas
    // ----------------------------------------------------------------------------------------------
    const [nomeProcesso, setNomeProcesso] = useState('');
    const [nomeMacroprocesso, setMacroprocesso] = useState('');
    const [normativoCadastradoId, setNormativoCadastradoId] = useState(null);
    const [normativoDisponivelId, setNormativoDisponivelId] = useState(null);
    const [refetchTriggerNormativosCadastrados, setRefetchTriggerNormativosCadastrados] = useState(0);
    const [refetchTriggerNormativosDisponiveis, setRefetchTriggerNormativosDisponiveis] = useState(0);

    // ----------------------------------------------------------------------------------------------
    // URLs de retorno do Backend
    // ----------------------------------------------------------------------------------------------
    const URLBackend = import.meta.env.VITE_API_URL_BACKEND;
    const URLNormativosCadastrados = URLBackend + import.meta.env.VITE_API_URL_DOCUMENTO_NORMATIVO + "/" + id + "/dgcadastradosnoprocesso"
    const URLNormativosDisponiveis = URLBackend + import.meta.env.VITE_API_URL_DOCUMENTO_NORMATIVO + "/" + id + "/dgdisponiveisparaprocesso"

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const { linhas: linhasNormativosCadastrados, colunas: colunasNormativosCadastrados, loading: loadingNormativosCadastrados, error: errorNormativosCadastrados } = useFetchDatagrid(URLNormativosCadastrados, refetchTriggerNormativosCadastrados);
    const { linhas: linhasNormativosDisponiveis, colunas: colunasNormativosDisponiveis, loading: loadingNormativosDisponiveis, error: errorNormativosDisponiveis } = useFetchDatagrid(URLNormativosDisponiveis, refetchTriggerNormativosDisponiveis);
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
    const handleRowClickNormativosCadastradas = (params) => {
        setNormativoCadastradoId(params.row.ID);
    };

    const handleRowClickNormativosDisponiveis = (params) => {
        setNormativoDisponivelId(params.row.ID);
    };

    const handleInclusaoUnitaria = async (e) => {
        e.preventDefault();

        const docsvsprocesso = {
            processo_id: id,
            normativo_id: normativoDisponivelId
        };

        try {
            await axios.post(URLBackend + import.meta.env.VITE_API_URL_PROCESSO_DOCUMENTO, docsvsprocesso);

            toast.success("Documento ou Normativo adicionado com sucesso ao Processo.");

            setRefetchTriggerNormativosCadastrados(prev => prev + 1);
            setRefetchTriggerNormativosDisponiveis(prev => prev + 1);

        } catch (error) {
            toast.error('Erro ao tentar anexar o Documento ou Normativo ao Processo', error);
        }
    }

    const handleExclusaoUnitaria = async (e) => {
        e.preventDefault();

        const docsvsprocesso = {
            processo_id: id,
            normativo_id: normativoCadastradoId
        };

        try {
            await axios.delete(URLBackend + import.meta.env.VITE_API_URL_PROCESSO_DOCUMENTO, { data: docsvsprocesso });

            toast.success("Documento ou Normativo excluído com sucesso do Processo.");

            setRefetchTriggerNormativosCadastrados(prev => prev + 1);
            setRefetchTriggerNormativosDisponiveis(prev => prev + 1);

        } catch (error) {
            toast.error('Erro ao tentar excluir o Documento ou Normativo do Processo', error);
        }
    }

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Cadastro de Documentos Normativos x Processo" hasAddViewButton={false} hasFilter={false} />

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
                                    rows={linhasNormativosDisponiveis}
                                    columns={colunasNormativosDisponiveis}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        }
                                    }}
                                    pageSizeOptions={[5, 10, 25, 50]}
                                    disableMultipleSelection={true}
                                    onRowClick={handleRowClickNormativosDisponiveis}
                                    localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                                    showToolbar="true"
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
                                    rows={linhasNormativosCadastrados}
                                    columns={colunasNormativosCadastrados}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        }
                                    }}
                                    pageSizeOptions={[5, 10, 25, 50]}
                                    disableMultipleSelection={true}
                                    onRowClick={handleRowClickNormativosCadastradas}
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

export default DocumentosPorProcesso
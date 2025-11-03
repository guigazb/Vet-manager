import React, { useState } from 'react';
import { toast } from 'react-toastify';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions'
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';
import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import ButtonComponent from '../../../components/button/ButtonComponent';

import { Box } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import { DataGrid } from '@mui/x-data-grid';

import BoxColunar from '../../../components/body/boxColunar/BoxColunar';

import axios from 'axios';

import { useFetchPerfis } from '../../../hooks/diversos/useFetchPerfis';
import { useFetchDatagrid } from '../../../hooks/useFetchDatagrid';

const ConfigurarPermissoesPorPerfil = () => {
    // ----------------------------------------------------------------------------------------------
    // Variáveis internas
    // ----------------------------------------------------------------------------------------------
    const [formPerfilId, setFormPerfilId] = useState('0');

    const [permissaoCadastradaId, setPermissaoCadastradaId] = useState(null);
    const [permissaoDisponivelId, setPermissaoDisponivelId] = useState(null);

    const [refetchTriggerPermissoesCadastradas, setRefetchTriggerPermissoesCadastradas] = useState(0);
    const [refetchTriggerPermissoesDisponiveis, setRefetchTriggerPermissoesDisponiveis] = useState(0);

    // ----------------------------------------------------------------------------------------------
    // URLs de retorno do Backend
    // ----------------------------------------------------------------------------------------------
    const URLBackend = import.meta.env.VITE_API_URL_BACKEND;
    const URLPermissoesCadastradas = URLBackend + import.meta.env.VITE_API_URL_PERMISSAO + "/" + formPerfilId + "/datagridMUICadastradasPorPerfil";
    const URLPermissoesDisponiveis = URLBackend + import.meta.env.VITE_API_URL_PERMISSAO + "/" + formPerfilId + "/datagridMUIDisponivelPorPerfil";

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { perfis, loading: loadingPerfis } = useFetchPerfis();
    const { linhas: linhasPermissoesCadastradas, colunas: colunasPermissoesCadastradas, loading: loadingPermissoesSistemaCadastradas, error: errorPermissoesSistemaCadastradas } = useFetchDatagrid(URLPermissoesCadastradas, refetchTriggerPermissoesCadastradas);
    const { linhas: linhasPermissoesDisponiveis, colunas: colunasPermissoesDisponiveis, loading: loadingPermissoesSistemaDisponiveis, error: errorPermissoesSistemaDisponiveis } = useFetchDatagrid(URLPermissoesDisponiveis, refetchTriggerPermissoesDisponiveis);

    // ----------------------------------------------------------------------------------------------
    // Handle de botões
    // ----------------------------------------------------------------------------------------------
    const handleRowClickPermissoesDisponivel = (params) => {
        setPermissaoDisponivelId(params.row.ID);
    };

    const handleRowClickPermissoesCadastradas = (params) => {
        setPermissaoCadastradaId(params.row.ID);
    };

    const handleInclusaoUnitaria = async (e) => {
        if (!formPerfilId || formPerfilId === "0") {
            toast.info("É necessário escolher um Perfil para que a Permissão seja adicionada.");
            return;
        }

        e.preventDefault();

        const permissaovsperfil = {
            perfil_id: formPerfilId,
            permissao_id: permissaoDisponivelId
        };

        try {
            await axios.post(URLBackend + import.meta.env.VITE_API_URL_PERMISSAO_VS_PERFIL, permissaovsperfil);

            toast.success("Permissão adicionada com sucesso ao Perfil.");

            setRefetchTriggerPermissoesCadastradas(prev => prev + 1);
            setRefetchTriggerPermissoesDisponiveis(prev => prev + 1);

            //setPermissaoDisponivelId(prev => prev.filter(id => id !== permissaoDisponivelId));

        } catch (error) {
            toast.error('Erro ao tentar anexar a Permissão ao Perfil', error);
        }
    }

    const handleExclusaoUnitaria = async (e) => {

        e.preventDefault();

        const permissaovsperfil = {
            perfil_id: formPerfilId,
            permissao_id: permissaoCadastradaId
        };

        try {
            await axios.delete(URLBackend + import.meta.env.VITE_API_URL_PERMISSAO_VS_PERFIL, { data: permissaovsperfil });

            toast.success("Permissão excluída com sucesso do Perfil.");

            setRefetchTriggerPermissoesCadastradas(prev => prev + 1);
            setRefetchTriggerPermissoesDisponiveis(prev => prev + 1);

            //setPermissaoCadastradaId(prev => prev.filter(id => id !== permissaoCadastradaId));

        } catch (error) {
            toast.error('Erro ao tentar excluir a Permissão do Perfil', error);
        }
    }

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos"
                    nomeSessao="Configurar Permissões por Perfil" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao>

                    <InternalArea>

                        <SelectInputPadrao
                            label="Perfil"
                            options={perfis}
                            optionKey="id"
                            optionValue="nome"
                            value={formPerfilId}
                            onChange={setFormPerfilId}
                            loading={loadingPerfis}
                            nomeSelect="perfil"
                            col_span="2"
                        />

                    </InternalArea>

                    <BoxColunar altura="440">

                        <BoxColunar.BoxItem largura={45}>

                            <Box sx={{ height: 440, width: '100%' }}>
                                <DataGrid
                                    rows={linhasPermissoesDisponiveis}
                                    columns={colunasPermissoesDisponiveis}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10, 25, 50]}
                                    disableMultipleSelection={true}
                                    onRowClick={handleRowClickPermissoesDisponivel}
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

                            <Box sx={{ height: 440, width: '100%' }}>
                                <DataGrid
                                    rows={linhasPermissoesCadastradas}
                                    columns={colunasPermissoesCadastradas}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        }
                                    }}
                                    pageSizeOptions={[5, 10, 25, 50]}
                                    disableMultipleSelection={true}
                                    onRowClick={handleRowClickPermissoesCadastradas}
                                    localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                                    showToolbar
                                />
                            </Box>

                        </BoxColunar.BoxItem>

                    </BoxColunar>
                    <InternalButtonArea>

                    </InternalButtonArea>
                </FormPadrao>

            </React.Fragment>
        </MainLayout >
    )
}

export default ConfigurarPermissoesPorPerfil
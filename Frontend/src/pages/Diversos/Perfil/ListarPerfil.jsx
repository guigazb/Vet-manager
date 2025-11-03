import React, { useState } from 'react';

import { useFetchDatagrid } from '../../../hooks/useFetchDatagrid';

import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import { DataGrid } from '@mui/x-data-grid';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions'
import routes from '../../../data/routes';

import InternalButtonArea from '../../../components/body/InternalButtonArea';
import ButtonComponent from '../../../components/button/ButtonComponent';

const ListarPerfil = () => {

    // ----------------------------------------------------------------------------------------------
    // Navegação para página de cadastro de Permissões por Perfil
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();

    const handleIrPaginaCriarRegistro = () => {
        navegar(routes.diversos_perfil_criar);
    };

    const handleIrPaginaAtualizarRegistro = () => {
        const id = selectedId;
        navegar(routes.diversos_perfil_atualizar, { state: { id } });
    };

    const handleIrPaginaExcluirRegistro = () => {
        const id = selectedId
        navegar(routes.diversos_perfil_excluir, { state: { id } });
    };

    const handlePaginaPermissaoPorPerfil = () => {
        navegar(routes.diversos_permissao_por_perfil_configurar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variaveis de backend
    // ----------------------------------------------------------------------------------------------  
    const urlBackendPerfis = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PERFIL_DATAGRID;

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const [selectedId, setSelectedId] = useState(null);

    // ----------------------------------------------------------------------------------------------
    // Busca informações via hook
    // ----------------------------------------------------------------------------------------------
    const { linhas, colunas, loading, error } = useFetchDatagrid(urlBackendPerfis);

    const handleCancelarSelecao = () => {
        setSelectedId('');
    };

    const handleRowClick = (params) => {
        setSelectedId(params.row.ID);
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos"
                    nomeSessao="Listagem dos Perfis" hasAddViewButton={false} hasFilter={false} />

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

                    <ButtonComponent tipo="diversos" tipoBotao='button' onClick={handlePaginaPermissaoPorPerfil}>
                        Configurar Permissões por Perfil
                    </ButtonComponent>

                </InternalButtonArea>



            </React.Fragment>
        </MainLayout>
    )
}

export default ListarPerfil;
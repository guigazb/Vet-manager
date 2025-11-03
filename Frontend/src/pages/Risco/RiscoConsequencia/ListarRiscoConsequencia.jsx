import React, { useState, useEffect } from 'react';

import { useFetchDatagrid } from '../../../hooks/useFetchDatagrid';

import { useLocation, useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import { DataGrid } from '@mui/x-data-grid';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions'
import routes from '../../../data/routes';

import InternalButtonArea from '../../../components/body/InternalButtonArea';
import ButtonComponent from '../../../components/button/ButtonComponent';

const ListarRiscoConsequencia = () => {

    const navegar = useNavigate();
    const location = useLocation();
    const {riscoId, unidadeFuncional} = location.state || {}; 

    // ----------------------------------------------------------------------------------------------
    // Variaveis de backend
    // ----------------------------------------------------------------------------------------------
    const urlBackendRiscoConsequencia = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_CONSEQUENCIA_DATAGRID + "/" + riscoId;
    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const [selectedId, setSelectedId] = useState(null);

    // ----------------------------------------------------------------------------------------------
    // Busca informações via hook
    // ----------------------------------------------------------------------------------------------
    const { linhas, colunas, loading, error } = useFetchDatagrid(urlBackendRiscoConsequencia);

    // Extrai o campo "Risco" da primeira linha, se disponível
    const riscoDescricao = linhas && linhas.length > 0 ? linhas[0].Risco : '';

    // Opcional: Trunca o texto do Risco para o título (ex.: primeiros 50 caracteres)
    const riscoDescricaoTruncada = riscoDescricao
        ? riscoDescricao.substring(0, 50) + (riscoDescricao.length > 50 ? '...' : '')
        : 'Sem descrição';

    const handleCancelarSelecao = () => {
        setSelectedId('');
    };

    const handleIrPaginaCriarRegistro = () => {
        navegar(routes.risco_consequencia_criar, { state: { riscoId, unidadeFuncional } });
    };

    const handleIrPaginaAtualizarRegistro = () => {
        const id = selectedId;
        navegar(routes.risco_consequencia_atualizar, { state: { riscoId, unidadeFuncional, id } });
    };

    const handleIrPaginaExcluirRegistro = () => {
        const id = selectedId
        navegar(routes.risco_consequencia_excluir, { state: { riscoId, unidadeFuncional, id } });
    };

    const handleIrParaAtualizarRisco = () => {
        const id = riscoId;
        navegar(routes.risco_atualizar, { state: { id, unidadeFuncional } });
    };

    const handleRowClick = (params) => {
        setSelectedId(params.row.ID);
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Risco : Consequencia"
                    nomeSessao={"Listar Consequencias do Risco: " + (riscoDescricaoTruncada ? riscoDescricaoTruncada : "")}
                    hasAddViewButton={false} hasFilter={false} />


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
                        showToolbar
                        loading={loading}
                    />
                </Box>

                <InternalButtonArea>

                    <ButtonComponent tipo="diversos" tipoBotao="button" onClick={handleIrParaAtualizarRisco}>
                        Voltar para Risco
                    </ButtonComponent>

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

                </InternalButtonArea>

            </React.Fragment>
        </MainLayout>
    )
}

export default ListarRiscoConsequencia
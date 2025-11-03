import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions'
import { AuthContext } from '../../../components/utils/AuthContext';

import { useFetchDatagrid } from '../../../hooks/useFetchDatagrid';
import routes from '../../../data/routes';

import { Box } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import { DataGrid } from '@mui/x-data-grid';

import InternalButtonArea from '../../../components/body/InternalButtonArea';
import ButtonComponent from '../../../components/button/ButtonComponent';

const ListarRisco = () => {

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
    // Variaveis de backend
    // ----------------------------------------------------------------------------------------------
    const URLBackend = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO + "/" + localExecucaoId + "/datagrid";

    // ----------------------------------------------------------------------------------------------
    // Busca informações via hook
    // ----------------------------------------------------------------------------------------------
    const { linhas, colunas, loading, error } = useFetchDatagrid(URLBackend);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedUnidadeFuncional, setSelectedUnidadeFuncional] = useState('');

    // ----------------------------------------------------------------------------------------------
    // Handles dos botões
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();

    const handleIrPaginaCriarRegistro = () => {
        const id = selectedId;
        navegar(routes.risco_criar, { state: { id } });
    }

    const handleIrPaginaAtualizarRegistro = () => {
        const id = selectedId;
        const unidadeFuncional = selectedUnidadeFuncional;
        navegar(routes.risco_atualizar, { state: { id, unidadeFuncional } });
    }

    const handleIrPaginaExcluirRegistro = () => {
        const id = selectedId;
        const unidadeFuncional = selectedUnidadeFuncional;
        navegar(routes.risco_excluir, { state: { id, unidadeFuncional } });
    }

    const handleCancelarSelecao = () => {
        setSelectedId('');
    }

    const handleRowClick = (params) => {
        setSelectedId(params.row.ID);
        setSelectedUnidadeFuncional(params.row["Unidade Funcional"]);
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Riscos" nomeSessao="Listar Riscos Existentes" hasAddViewButton={false} hasFilter={false} />

                <Box sx={{ height: 532, width: '100%' }}>
                    <DataGrid
                        rows={linhas}
                        columns={colunas}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            }
                        }}
                        pageSizeOptions={[5, 10, 25, 50]}
                        disableMultipleSelection={true}
                        onRowClick={handleRowClick}
                        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                        showToolbar
                    />
                </Box>

                <InternalButtonArea>

                    <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleCancelarSelecao}>
                        Cancelar
                    </ButtonComponent>

                    <ButtonComponent tipo="primario" tipoBotao="submit" onClick={handleIrPaginaCriarRegistro}>
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

export default ListarRisco
import React, { useContext, useEffect, useState } from 'react';

import { useFetchDatagrid } from '../../../hooks/useFetchDatagrid';

import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import { DataGrid } from '@mui/x-data-grid';
import { AuthContext } from '../../../components/utils/AuthContext';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions';
import routes from '../../../data/routes';

import InternalButtonArea from '../../../components/body/InternalButtonArea';
import ButtonComponent from '../../../components/button/ButtonComponent';

const ListarUsuarios = () => {
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

    const URLBackendUsuario = `${import.meta.env.VITE_API_URL_BACKEND}${import.meta.env.VITE_API_URL_USUARIO}/${localExecucaoId}/datagrid`;

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const [selectedId, setSelectedId] = useState(null);

    // ----------------------------------------------------------------------------------------------
    // Busca informações via hook
    // ----------------------------------------------------------------------------------------------
    const { linhas, colunas, loading, error } = useFetchDatagrid(URLBackendUsuario);

    const handleCancelarSelecao = () => {
        setSelectedId('');
    };

    const handleIrPaginaCriarRegistro = () => {
        navigate(routes.diversos_usuario_criar);
    };

    const handleIrPaginaAtualizarRegistro = () => {
        const id = selectedId;
        navigate(routes.diversos_usuario_atualizar, { state: { id } });
    };

    const handleIrPaginaExcluirRegistro = () => {
        const id = selectedId
        navigate(routes.diversos_usuario_excluir, { state: { id } });
    };

    const handleRowClick = (params) => {
        setSelectedId(params.row.ID);
    };

    return (
        <MainLayout>
            <React.Fragment>
                <Actions
                    breadcrumb="Início : Diversos"
                    nomeSessao="Listagem de Usuários"
                    hasAddViewButton={false}
                    hasFilter={false}
                />

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

                </InternalButtonArea>


            </React.Fragment>
        </MainLayout>
    );
};

export default ListarUsuarios;
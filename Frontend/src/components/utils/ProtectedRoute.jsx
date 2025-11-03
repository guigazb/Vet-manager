import React from 'react';
import { Navigate } from 'react-router-dom';
import routes from '../../data/routes';
import AcessoNegado from '../../pages/AcessoNegado';

const ProtectedRoute = ({ auth, grupos, rota, children }) => {

    // Se não houver autenticação, redireciona para o login
    if (!auth) {
        return <Navigate to={routes.login} replace />;
    }

    // Para a rota 404 ('*'), não valida permissões, apenas autenticação
    if (rota === '*') {
        return children;
    }

    // Verifica se a rota está presente em alguma permissão dentro dos grupos
    const temPermissao = grupos.some(grupo =>
        grupo.permissoes.some(permissao => permissao.rota === rota)
    );

    // Se não tiver permissão, exibe a página de acesso negado
    if (!temPermissao) {
        return <AcessoNegado />;
    }

    // Se tiver permissão, renderiza o componente filho
    return children;
};

export default ProtectedRoute;
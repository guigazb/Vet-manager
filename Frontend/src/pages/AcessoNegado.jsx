import React, { useContext } from 'react';
import Actions from '../components/geral/Actions';
import MainLayout from './MainLayout';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/utils/AuthContext';

const AcessoNegado = () => {

    const { logout } = useContext(AuthContext);
    const navegar = useNavigate();

    const handleLogout = () => {
        logout(); // Chama a função logout do AuthContext
        navegar('/login'); // Redireciona para a página de login
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Acesso" nomeSessao="Acesso negado" hasAddViewButton={false} hasFilter={false} />

                {/* Sessões internas da página */}

                <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                    <div className="text-center">
                        <p className="text-base font-semibold text-indigo-600">Acesso Negado</p>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Página não pode ser exibida</h1>
                        <p className="mt-6 text-base leading-7 text-gray-600">Desculpe, você não tem acesso à página que está tentando acessar. Se entender que deveria poder acessar a página, entre em contato com o Administrador do Sistema.</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a href="\" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Voltar para tela inicial</a>
                            <button
                                onClick={handleLogout}
                                className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200"
                            >
                                Deslogar do Sistema
                            </button>
                        </div>
                    </div>
                </main>

            </React.Fragment>
        </MainLayout>

    )
}

export default AcessoNegado
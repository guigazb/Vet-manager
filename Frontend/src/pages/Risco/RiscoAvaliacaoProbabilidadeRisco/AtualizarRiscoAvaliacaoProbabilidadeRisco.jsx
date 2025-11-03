import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Actions from '../../../components/geral/Actions';
import MainLayout from '../../MainLayout';
import routes from '../../../data/routes';

import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';
import ListaAvaliacaoProbImp from '../../../components/body/listaAvaliacaoProbImp/ListaAvaliacaoProbImp';
import ButtonComponent from '../../../components/button/ButtonComponent';

import { AuthContext } from '../../../components/utils/AuthContext';

import useFetchRiscoProbabilidade from './../../../hooks/risco/useFetchRiscoProbabilidade';
import useFetchRiscoImpacto from './../../../hooks/risco/useFetchRiscoImpacto';
import useFetchRiscoNivelReal from './../../../hooks/risco/useFetchRiscoNivelReal';

const AtualizarRiscoAvaliacaoProbabilidadeRisco = () => {
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
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id, tipo, avaliacaoArea, avaliacaoGestao, avaliacaoEncerrada, grupoAvaliacaoId } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_aval_prob_impacto_listar);
    }

    const { riscoProbabilidade, loading: loadingRiscosProbabilidade, error: errorRiscosProbabilidade } = useFetchRiscoProbabilidade();
    const { riscoImpacto, loading: loadingRiscosImpacto, error: errorRiscosImpacto } = useFetchRiscoImpacto();
    const { riscoNivelReal, loading: loadingRiscosNivelReal, error: errorRiscosNivelReal } = useFetchRiscoNivelReal();

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Riscos : Avaliação de Risco" nomeSessao="Avaliação de Probabilidade e Impacto" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao>

                    <InternalArea>

                        <ListaAvaliacaoProbImp
                            id={id}
                            tipo={tipo}
                            probabilidades={riscoProbabilidade}
                            impactos={riscoImpacto}
                            riscoReais={riscoNivelReal}
                            avaliacaoArea={avaliacaoArea}
                            avaliacaoGestao={avaliacaoGestao}
                            avaliacaoEncerrada={avaliacaoEncerrada}
                            grupoAvaliacaoId={grupoAvaliacaoId}>
                        </ListaAvaliacaoProbImp>

                    </InternalArea>

                    <InternalButtonArea>

                        <ButtonComponent tipo="cancelar" tipoBotao='button' onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>

                    </InternalButtonArea>

                </FormPadrao>

            </React.Fragment >
        </MainLayout >
    );
};

export default AtualizarRiscoAvaliacaoProbabilidadeRisco;
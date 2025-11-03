import React, { useEffect, useContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../src/components/utils/AuthContext';
import ProtectedRoute from '../src/components/utils/ProtectedRoute';
import routes from "../src/data/routes";
import './css/style.css';

// -------------------------------------------------------------------------------------------
// Login
// -------------------------------------------------------------------------------------------
import Login from './pages/Login';

// -------------------------------------------------------------------------------------------
// Homepage
// -------------------------------------------------------------------------------------------
import HomePage from './pages/HomePage';

// -------------------------------------------------------------------------------------------
// Dashboard
// -------------------------------------------------------------------------------------------
import DashboardProcesso from './pages/Dashboard/DashboardProcessos';
import DashboardIndicador from './pages/Dashboard/DashboardIndicador';
import DashboardRisco from './pages/Dashboard/DashboardRisco';

// -------------------------------------------------------------------------------------------
// Processos
// -------------------------------------------------------------------------------------------
import CriarProcesso from './pages/Processo/CriarProcessos';
import AtualizarProcesso from './pages/Processo/AtualizarProcessos';
import ExcluirProcesso from './pages/Processo/ExcluirProcessos';
import ListarProcesso from './pages/Processo/ListarProcessos';

// -------------------------------------------------------------------------------------------
// Indicador
// -------------------------------------------------------------------------------------------
import ListarIndicador from './pages/Indicador/Indicador/ListarIndicadores';
import AtualizarIndicador from './pages/Indicador/Indicador/AtualizarIndicador';
import ExcluirIndicador from './pages/Indicador/Indicador/ExcluirIndicador';
import CriarIndicador from './pages/Indicador/Indicador/CriarIndicador';
import CadastroIndicadorPorProcesso from './pages/Indicador/CadastroIndicadorPorProcessos';
import CadastroIndicadorDados from './pages/Indicador/CadastroIndicadorDados';

// -------------------------------------------------------------------------------------------
// Riscos
// -------------------------------------------------------------------------------------------
import CriarRisco from './pages/Risco/Risco/CriarRisco';
import AtualizarRisco from './pages/Risco/Risco/AtualizarRisco';
import ExcluirRisco from './pages/Risco/Risco/ExcluirRisco';
import ListarRisco from './pages/Risco/Risco/ListarRisco';

import ListarRiscoAvaliacaoProbabilidadeRisco from './pages/Risco/RiscoAvaliacaoProbabilidadeRisco/ListarRiscoAvaliacaoProbabilidadeRisco';
import AtualizarRiscoAvaliacaoProbabilidadeRisco from './pages/Risco/RiscoAvaliacaoProbabilidadeRisco/AtualizarRiscoAvaliacaoProbabilidadeRisco';

import RiscoTabelaPeriodicaListar from './pages/Risco/TabelaPeriodica/ListarRiscoTabelaPeriodica';
import RiscoTabelaPeriodicaVisualizar from './pages/Risco/TabelaPeriodica/VisualizarRiscoTabelaPeriodica';

import CriarRiscoPlanoResposta from './pages/Risco/RiscoPlanoResposta/CriarRiscoPlanoResposta';
import ListarRiscoPlanoResposta from './pages/Risco/RiscoPlanoResposta/ListarRiscoPlanoResposta';
import AtualizarRiscoPlanoResposta from './pages/Risco/RiscoPlanoResposta/AtualizarRiscoPlanoResposta';
import ExcluirRiscoPlanoResposta from './pages/Risco/RiscoPlanoResposta/ExcluirRiscoPlanoResposta';

import CriarRiscoPlanoRespostaAcao from './pages/Risco/RiscoPlanoRespostaAcao/CriarRiscoPlanoRespostaAcao';
import ListarRiscoPlanoRespostaAcao from './pages/Risco/RiscoPlanoRespostaAcao/ListarRiscoPlanoRespostaAcao';
import AtualizarRiscoPlanoRespostaAcao from './pages/Risco/RiscoPlanoRespostaAcao/AtualizarRiscoPlanoRespostaAcao';
import ExcluirRiscoPlanoRespostaAcao from './pages/Risco/RiscoPlanoRespostaAcao/ExcluirRiscoPlanoRespostaAcao';

import ListarRiscoRespostaEvento from './pages/Risco/Cadastros/RiscoRespostaEvento/ListarRiscoRespostaEvento';
import CriarRiscoRespostaEvento from './pages/Risco/Cadastros/RiscoRespostaEvento/CriarRiscoRespostaEvento';
import AtualizarRiscoRespostaEvento from './pages/Risco/Cadastros/RiscoRespostaEvento/AtualizarRiscoRespostaEvento';
import ExcluirRiscoRespostaEvento from './pages/Risco/Cadastros/RiscoRespostaEvento/ExcluirRiscoRespostaEvento';

import CriarRiscoCausa from './pages/Risco/RiscoCausa/CriarRiscoCausa';
import ListarRiscoCausa from './pages/Risco/RiscoCausa/ListarRiscoCausa';
import AtualizarRiscoCausa from './pages/Risco/RiscoCausa/AtualizarRiscoCausa';
import ExcluirRiscoCausa from './pages/Risco/RiscoCausa/ExcluirRiscoCausa';

import ListarRiscoMatrizSwot from './pages/Risco/RiscoMatrizSwot/ListarRiscoMatrizSwot';
import VisualizarRiscoMatrizSwot from './pages/Risco/RiscoMatrizSwot/VisualizarRiscoMatrizSwot';
import EditarRiscoMatrizSwot from './pages/Risco/RiscoMatrizSwot/EditarRiscoMatrizSwot';

import CriarRiscoConsequencia from './pages/Risco/RiscoConsequencia/CriarRiscoConsequencia';
import ListarRiscoConsequencia from './pages/Risco/RiscoConsequencia/ListarRiscoConsequencia';
import AtualizarRiscoConsequencia from './pages/Risco/RiscoConsequencia/AtualizarRiscoConsequencia';
import ExcluirRiscoConsequencia from './pages/Risco/RiscoConsequencia/ExcluirRiscoConsequencia';

// -------------------------------------------------------------------------------------------
// Riscos - Cadastros
// -------------------------------------------------------------------------------------------

import RiscoControleExistenteAtualizar from './pages/Risco/Cadastros/RiscoControleExistente/AtualizarControleExistente';
import RiscoControleExistenteCriar from './pages/Risco/Cadastros/RiscoControleExistente/CriarControleExistente';
import RiscoControleExistenteExcluir from './pages/Risco/Cadastros/RiscoControleExistente/ExcluirControleExistente';
import RiscoControleExistenteListar from './pages/Risco/Cadastros/RiscoControleExistente/ListarControleExistente';

import CriarOperaçãoControleRisco from './pages/Risco/Cadastros/RiscoOperacaoControle/CriarRiscoOperacaoControle';
import ListarOperaçãoControleRisco from './pages/Risco/Cadastros/RiscoOperacaoControle/ListarRiscoOperacaoControle';
import AtualizarOperaçãoControleRisco from './pages/Risco/Cadastros/RiscoOperacaoControle/AtualizarRiscoOperacaoControle';
import ExcluirOperaçãoControleRisco from './pages/Risco/Cadastros/RiscoOperacaoControle/ExcluirRiscoOperacaoControle';

import CriarRiscoDesenhoControle from './pages/Risco/Cadastros/RiscoDesenhoControle/CriarRiscoDesenhoControle';
import ListarRiscoDesenhoControle from './pages/Risco/Cadastros/RiscoDesenhoControle/ListarRiscoDesenhoControle';
import AtualizarRiscoDesenhoControle from './pages/Risco/Cadastros/RiscoDesenhoControle/AtualizarRiscoDesenhoControle';
import ExcluirRiscoDesenhoControle from './pages/Risco/Cadastros/RiscoDesenhoControle/ExcluirRiscoDesenhoControle';

import CriarRiscoProbabilidade from './pages/Risco/Cadastros/RiscoProbabilidade/CriarRiscoProbabilidade';
import ListarRiscoProbabilidade from './pages/Risco/Cadastros/RiscoProbabilidade/ListarRiscoProbabilidade';
import AtualizarRiscoProbabilidade from './pages/Risco/Cadastros/RiscoProbabilidade/AtualizarRiscoProbabilidade';
import ExcluirRiscoProbabilidade from './pages/Risco/Cadastros/RiscoProbabilidade/ExcluirRiscoProbabilidade';

import CriarRiscoImpacto from './pages/Risco/Cadastros/RiscoImpacto/CriarRiscoImpacto';
import ListarRiscoImpacto from './pages/Risco/Cadastros/RiscoImpacto/ListarRiscoImpacto';
import AtualizarRiscoImpacto from './pages/Risco/Cadastros/RiscoImpacto/AtualizarRiscoImpacto';
import ExcluirRiscoImpacto from './pages/Risco/Cadastros/RiscoImpacto/ExcluirRiscoImpacto';

import CriarCategoriaRisco from './pages/Risco/Cadastros/RiscoCategoria/CriarRiscoCategoria';
import AtualizarCategoriaRisco from './pages/Risco/Cadastros/RiscoCategoria/AtualizarRiscoCategoria';
import ListarCategoriaRisco from './pages/Risco/Cadastros/RiscoCategoria/ListarRiscoCategoria';
import ExcluirCategoriaRisco from './pages/Risco/Cadastros/RiscoCategoria/ExcluirRiscoCategoria';

import CriarRiscoMatrizControle from './pages/Risco/Cadastros/RiscoMatrizControle/CriarRiscoMatrizControle';
import ListarRiscoMatrizControle from './pages/Risco/Cadastros/RiscoMatrizControle/ListarRiscoMatrizControle';
import AtualizarRiscoMatrizControle from './pages/Risco/Cadastros/RiscoMatrizControle/AtualizarRiscoMatrizControle';
import ExcluirRiscoMatrizControle from './pages/Risco/Cadastros/RiscoMatrizControle/ExcluirRiscoMatrizControle';

import ListarRiscoRespostaAoEventoDeRisco from './pages/Risco/Cadastros/RiscoRespostaEvento/ListarRiscoRespostaEvento';
import AtualizarRiscoRepostaAoEventoDeRisco from './pages/Risco/Cadastros/RiscoRespostaEvento/AtualizarRiscoRespostaEvento';
import ExcluirRiscoRepostaAoEventoDeRisco from './pages/Risco/Cadastros/RiscoRespostaEvento/ExcluirRiscoRespostaEvento';
import CriarRiscoRepostaAoEventoDeRisco from './pages/Risco/Cadastros/RiscoRespostaEvento/CriarRiscoRespostaEvento';

import CriarRiscoNivelReal from './pages/Risco/Cadastros/RiscoNivelReal/CriarRiscoNivelReal';
import ListarRiscoNivelReal from './pages/Risco/Cadastros/RiscoNivelReal/ListarRiscoNivelReal';
import AtualizarRiscoNivelReal from './pages/Risco/Cadastros/RiscoNivelReal/AtualizarRiscoNivelReal';
import ExcluirRiscoNivelReal from './pages/Risco/Cadastros/RiscoNivelReal/ExcluirRiscoNivelReal';

import CriarRiscoTipoControleAcao from './pages/Risco/Cadastros/RiscoTipoControleAcao/CriarRiscoTipoControleAcao';
import ListarRiscoTipoControleAcao from './pages/Risco/Cadastros/RiscoTipoControleAcao/ListarRiscoTipoControleAcao';
import AtualizarRiscoTipoControleAcao from './pages/Risco/Cadastros/RiscoTipoControleAcao/AtualizarRiscoTipoControleAcao';
import ExcluirRiscoTipoControleAcao from './pages/Risco/Cadastros/RiscoTipoControleAcao/ExcluirRiscoTipoControleAcao';

// Gestão do Dia a Dia 
import GestaoDiaDia from './pages/Gestao/GestaoMonitoramento';

// -------------------------------------------------------------------------------------------
// Auditoria
// -------------------------------------------------------------------------------------------
import AuditoriaCatalogoControle from './pages/Auditoria/AuditoriaCatalogoControle';
import AuditoriaMapaCalorControles from './pages/Auditoria/AuditoriaMapaCalorControles';
import AuditoriaMapaCalorProcesso from './pages/Auditoria/AuditoriaMapaCalorProcessos';
import AuditoriaMapaCalorIndicador from './pages/Auditoria/AuditoriaMapaCalorIndicador';
import AuditoriaMapaCalorRiscos from './pages/Auditoria/AuditoriaMapaCalorRiscos';

// -------------------------------------------------------------------------------------------
// Relatórios
// -------------------------------------------------------------------------------------------
import RelatorioProcessos from './pages/Relatorio/RelatorioProcessos';
import RelatorioIndicadores from './pages/Relatorio/RelatorioIndicadores';
import RelatorioRiscos from './pages/Relatorio/RelatorioRiscos';

// -------------------------------------------------------------------------------------------
// Configuração
// -------------------------------------------------------------------------------------------
import ConfiguracaoGeral from './pages/Configuracao/ConfiguracaoGeral';
import ConfiguracaoMeuPerfil from './pages/Configuracao/ConfiguracaoMeuPerfil';
import ConfiguracaoNotificacao from './pages/Configuracao/ConfiguracaoNotificacao';

// -------------------------------------------------------------------------------------------
// Diversos
// -------------------------------------------------------------------------------------------
import CriarPerfil from './pages/Diversos/Perfil/CriarPerfil';
import AtualizarPerfil from './pages/Diversos/Perfil/AtualizarPerfil';
import ExcluirPerfil from './pages/Diversos/Perfil/ExcluirPerfil';
import ListarPerfil from './pages/Diversos/Perfil/ListarPerfil';

import CadastroLocalExecucao from './pages/Diversos/LocalExecucao/CriarLocalExecucao';
import AtualizarLocalExecucao from './pages/Diversos/LocalExecucao/AtualizarLocalExecucao';
import ExcluirLocalExecucao from './pages/Diversos/LocalExecucao/ExcluirLocalExecucao';
import ListarLocalExecucao from './pages/Diversos/LocalExecucao/ListarLocalExecucao';

import AtualizarUsuario from './pages/Diversos/Usuario/AtualizarUsuario';
import CriarUsuario from './pages/Diversos/Usuario/CriarUsuario';
import ExcluirUsuario from './pages/Diversos/Usuario/ExcluirUsuario';
import ListarUsuario from './pages/Diversos/Usuario/ListarUsuarios';
import ModificarSenha from './pages/Diversos/Usuario/ModificarSenha';

import CriarDocumentoNormativo from './pages/Diversos/DocumentoNormativo/CriarDocumentoNormativo';
import ListarDocumentoNormativo from './pages/Diversos/DocumentoNormativo/ListarDocumentoNormativo';
import AtualizarDocumentoNormativo from './pages/Diversos/DocumentoNormativo/AtualizarDocumentoNormativo';
import ExcluirDocumentoNormativo from './pages/Diversos/DocumentoNormativo/ExcluirDocumentoNormativo';

import DocumentosPorProcesso from './pages/Diversos/DocumentoNormativo/DocumentosPorProcesso';

import CriarTipoNormativo from './pages/Diversos/TipoNormativo/CriarTipoNormativo';
import ListarTipoNormativo from './pages/Diversos/TipoNormativo/ListarTipoNormativo';
import AtualizarTipoNormativo from './pages/Diversos/TipoNormativo/AtualizarTipoNormativo';
import ExcluirTipoNormativo from './pages/Diversos/TipoNormativo/ExcluirTipoNormativo';

import CriarUnidadeFuncional from './pages/Diversos/UnidadeFuncional/CriarUnidadeFuncional';
import ListarUnidadeFuncional from './pages/Diversos/UnidadeFuncional/ListarUnidadeFuncional';
import AtualizarUnidadeFuncional from './pages/Diversos/UnidadeFuncional/AtualizarUnidadeFuncional';
import ExcluirUnidadeFuncional from './pages/Diversos/UnidadeFuncional/ExcluirUnidadeFuncional';

import CriarTipoUnidadeFuncional from './pages/Diversos/UnidadeFuncionalTipo/CriarTipoUnidadeFuncional';
import ListarTipoUnidadeFuncional from './pages/Diversos/UnidadeFuncionalTipo/ListarTipoUnidadeFuncional';
import AtualizarTipoUnidadeFuncional from './pages/Diversos/UnidadeFuncionalTipo/AtualizarTipoUnidadeFuncional';
import ExcluirTipoUnidadeFuncional from './pages/Diversos/UnidadeFuncionalTipo/ExcluirTipoUnidadeFuncional';

import CriarFerramentaSistema from './pages/Diversos/FerramentaSistema/CriarFerramentaSistema';
import ListarFerramentaSistema from './pages/Diversos/FerramentaSistema/ListarFerramentaSistema';
import AtualizarFerramentaSistema from './pages/Diversos/FerramentaSistema/AtualizarFerramentaSistema';
import ExcluirFerramentaSistema from './pages/Diversos/FerramentaSistema/ExcluirFerramentaSistema';

import FerramentasPorProcesso from './pages/Diversos/FerramentaSistema/FerramentasPorProcesso';

import CriarPermissao from './pages/Diversos/Permissao/CriarPermissao';
import ListarPermissao from './pages/Diversos/Permissao/ListarPermissao';
import AtualizarPermissao from './pages/Diversos/Permissao/AtualizarPermissao';
import ExcluirPermissao from './pages/Diversos/Permissao/ExcluirPermissao';

import ConfigurarPermissaoPorPerfil from './pages/Diversos/PermissaoPorPerfil/ConfigurarPermissoesPorPerfil';

import CriarPermissaoGrupo from './pages/Diversos/PermissaoGrupo/CriarPermissaoGrupo';
import ListarPermissaoGrupo from './pages/Diversos/PermissaoGrupo/ListarPermissaoGrupo';
import AtualizarPermissaoGrupo from './pages/Diversos/PermissaoGrupo/AtualizarPermissaoGrupo';
import ExcluirPermissaoGrupo from './pages/Diversos/PermissaoGrupo/ExcluirPermissaoGrupo';

import CriarTags from './pages/Diversos/Tags/CriarTags';
import ListarTags from './pages/Diversos/Tags/ListarTags';
import AtualizarTags from './pages/Diversos/Tags/AtualizarTags';
import ExcluirTags from './pages/Diversos/Tags/ExcluirTags';

// -------------------------------------------------------------------------------------------
// 404
// -------------------------------------------------------------------------------------------
import Return404 from './pages/Return404';

function App() {
  const { auth, loading } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Routes>

        {/* Login */}
        <Route
          exact
          path={routes.login}
          element={auth ? <Navigate to={routes.homepage} /> : <Login />}
        />

        {/* Root */}
        <Route
          exact
          path={routes.root}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.root}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Root */}
        <Route
          exact
          path={routes.homepage}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.homepage}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route
          exact
          path={routes.dashboard}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.dashboard}>
              <DashboardProcesso />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path={routes.dashboard_processos}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.dashboard_processos}>
              <DashboardProcesso />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.dashboard_indicadores}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.dashboard_indicadores}>
              <DashboardIndicador />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.dashboard_riscos}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.dashboard_riscos}>
              <DashboardRisco />
            </ProtectedRoute>
          }
        />

        {/* Processos */}
        <Route
          exact
          path={routes.processo_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.processo_criar}>
              <CriarProcesso />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.processo_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.processo_atualizar}>
              <AtualizarProcesso />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.processo_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.processo_excluir}>
              <ExcluirProcesso />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.processo_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.processo_listar}>
              <ListarProcesso />
            </ProtectedRoute>
          }
        />

        {/* Indicadores */}
        <Route
          exact
          path={routes.indicadores_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.indicadores_criar}>
              <CriarIndicador />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.indicadores_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.indicadores_atualizar}>
              <AtualizarIndicador />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.indicadores_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.indicadores_excluir}>
              <ExcluirIndicador />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.indicadores_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.indicadores_listar}>
              <ListarIndicador />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.indicadores_processo}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.indicadores_processo}>
              <CadastroIndicadorPorProcesso />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.indicadores_dados}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.indicadores_dados}>
              <CadastroIndicadorDados />
            </ProtectedRoute>
          }
        />

        {/* Riscos */}
        <Route
          exact
          path={routes.risco_resposta_risco_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_resposta_risco_listar}>
              <ListarRiscoRespostaAoEventoDeRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_resposta_risco_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_resposta_risco_criar}>
              <CriarRiscoRepostaAoEventoDeRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_resposta_risco_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_resposta_risco_atualizar}>
              <AtualizarRiscoRepostaAoEventoDeRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_resposta_risco_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_resposta_risco_excluir}>
              <ExcluirRiscoRepostaAoEventoDeRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_criar}>
              <CriarRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_atualizar}>
              <AtualizarRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_excluir}>
              <ExcluirRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_listar}>
              <ListarRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_aval_prob_impacto_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_aval_prob_impacto_listar}>
              <ListarRiscoAvaliacaoProbabilidadeRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_aval_prob_impacto_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_aval_prob_impacto_criar}>
              <ListarRiscoAvaliacaoProbabilidadeRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_aval_prob_impacto_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_aval_prob_impacto_atualizar}>
              <AtualizarRiscoAvaliacaoProbabilidadeRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_aval_prob_impacto_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_aval_prob_impacto_excluir}>
              <ListarRiscoAvaliacaoProbabilidadeRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_tabela_periodica_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_tabela_periodica_listar}>
              <RiscoTabelaPeriodicaListar />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_tabela_periodica_visualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_tabela_periodica_visualizar}>
              <RiscoTabelaPeriodicaVisualizar />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_controle_existente_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_controle_existente_atualizar}>
              <RiscoControleExistenteAtualizar />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_controle_existente_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_controle_existente_criar}>
              <RiscoControleExistenteCriar />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_controle_existente_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_controle_existente_excluir}>
              <RiscoControleExistenteExcluir />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_controle_existente_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_controle_existente_listar}>
              <RiscoControleExistenteListar />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_categoria_risco_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_categoria_risco_criar}>
              <CriarCategoriaRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_categoria_risco_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_categoria_risco_listar}>
              <ListarCategoriaRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_categoria_risco_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_categoria_risco_atualizar}>
              <AtualizarCategoriaRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_categoria_risco_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_categoria_risco_excluir}>
              <ExcluirCategoriaRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_impacto_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_impacto_criar}>
              <CriarRiscoImpacto />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_impacto_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_impacto_listar}>
              <ListarRiscoImpacto />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_impacto_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_impacto_atualizar}>
              <AtualizarRiscoImpacto />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_impacto_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_impacto_excluir}>
              <ExcluirRiscoImpacto />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_probabilidade_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_probabilidade_criar}>
              <CriarRiscoProbabilidade />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_probabilidade_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_probabilidade_listar}>
              <ListarRiscoProbabilidade />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_probabilidade_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_probabilidade_atualizar}>
              <AtualizarRiscoProbabilidade />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_probabilidade_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_probabilidade_excluir}>
              <ExcluirRiscoProbabilidade />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_operacao_controle_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_operacao_controle_criar}>
              <CriarOperaçãoControleRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_operacao_controle_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_operacao_controle_listar}>
              <ListarOperaçãoControleRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_operacao_controle_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_operacao_controle_atualizar}>
              <AtualizarOperaçãoControleRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_operacao_controle_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_operacao_controle_excluir}>
              <ExcluirOperaçãoControleRisco />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_desenho_controle_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_desenho_controle_listar}>
              <ListarRiscoDesenhoControle />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_desenho_controle_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_desenho_controle_criar}>
              <CriarRiscoDesenhoControle />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_desenho_controle_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_desenho_controle_atualizar}>
              <AtualizarRiscoDesenhoControle />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_desenho_controle_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_desenho_controle_excluir}>
              <ExcluirRiscoDesenhoControle />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_tipo_controle_acao_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_tipo_controle_acao_criar}>
              <CriarRiscoTipoControleAcao />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_tipo_controle_acao_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_tipo_controle_acao_listar}>
              <ListarRiscoTipoControleAcao />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_tipo_controle_acao_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_tipo_controle_acao_atualizar}>
              <AtualizarRiscoTipoControleAcao />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_tipo_controle_acao_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_tipo_controle_acao_excluir}>
              <ExcluirRiscoTipoControleAcao />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_nivel_real_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_nivel_real_criar}>
              <CriarRiscoNivelReal />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_nivel_real_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_nivel_real_listar}>
              <ListarRiscoNivelReal />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_nivel_real_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_nivel_real_atualizar}>
              <AtualizarRiscoNivelReal />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_nivel_real_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_nivel_real_excluir}>
              <ExcluirRiscoNivelReal />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_matriz_controle_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_matriz_controle_criar}>
              <CriarRiscoMatrizControle />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_matriz_controle_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_matriz_controle_listar}>
              <ListarRiscoMatrizControle />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_matriz_controle_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_matriz_controle_atualizar}>
              <AtualizarRiscoMatrizControle />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_matriz_controle_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_matriz_controle_excluir}>
              <ExcluirRiscoMatrizControle />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_plano_resposta_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_plano_resposta_criar}>
              <CriarRiscoPlanoResposta />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_plano_resposta_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_plano_resposta_listar}>
              <ListarRiscoPlanoResposta />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_plano_resposta_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_plano_resposta_atualizar}>
              <AtualizarRiscoPlanoResposta />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_plano_resposta_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_plano_resposta_excluir}>
              <ExcluirRiscoPlanoResposta />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_plano_resposta_acao_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_plano_resposta_acao_criar}>
              <CriarRiscoPlanoRespostaAcao />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_plano_resposta_acao_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_plano_resposta_acao_listar}>
              <ListarRiscoPlanoRespostaAcao />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_plano_resposta_acao_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_plano_resposta_acao_atualizar}>
              <AtualizarRiscoPlanoRespostaAcao />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_plano_resposta_acao_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_plano_resposta_acao_excluir}>
              <ExcluirRiscoPlanoRespostaAcao />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_resposta_evento_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_resposta_evento_listar}>
              <ListarRiscoRespostaEvento />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_resposta_evento_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_resposta_evento_criar}>
              <CriarRiscoRespostaEvento />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_resposta_evento_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_resposta_evento_atualizar}>
              <AtualizarRiscoRespostaEvento />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_resposta_evento_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_resposta_evento_excluir}>
              <ExcluirRiscoRespostaEvento />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_causa_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_causa_criar}>
              <CriarRiscoCausa />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_causa_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_causa_listar}>
              <ListarRiscoCausa />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_causa_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_causa_atualizar}>
              <AtualizarRiscoCausa />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_causa_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_causa_excluir}>
              <ExcluirRiscoCausa />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_matriz_swot_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_matriz_swot_listar}>
              <ListarRiscoMatrizSwot />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_matriz_swot_visualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_matriz_swot_visualizar}>
              <VisualizarRiscoMatrizSwot />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_matriz_swot_editar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_matriz_swot_editar}>
              <EditarRiscoMatrizSwot />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_consequencia_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_consequencia_criar}>
              <CriarRiscoConsequencia />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_consequencia_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_consequencia_listar}>
              <ListarRiscoConsequencia />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_consequencia_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_consequencia_atualizar}>
              <AtualizarRiscoConsequencia />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.risco_consequencia_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.risco_consequencia_excluir}>
              <ExcluirRiscoConsequencia />
            </ProtectedRoute>
          }
        />

        {/* Gestão do Dia a Dia */}
        <Route
          exact
          path={routes.gestao_dia_a_dia}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.gestao_dia_a_dia}>
              <GestaoDiaDia />
            </ProtectedRoute>
          }
        />

        {/* Auditoria */}
        <Route
          exact
          path={routes.auditoria_catalogo_controles}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.auditoria_catalogo_controles}>
              <AuditoriaCatalogoControle />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.auditoria_mapa_calor_controles}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.auditoria_mapa_calor_controles}>
              <AuditoriaMapaCalorControles />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.auditoria_mapa_calor_processos}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.auditoria_mapa_calor_processos}>
              <AuditoriaMapaCalorProcesso />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.auditoria_mapa_calor_indicadores}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.auditoria_mapa_calor_indicadores}>
              <AuditoriaMapaCalorIndicador />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.auditoria_mapa_calor_riscos}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.auditoria_mapa_calor_riscos}>
              <AuditoriaMapaCalorRiscos />
            </ProtectedRoute>
          }
        />

        {/* Relatórios */}
        <Route
          exact
          path={routes.relatorio_processo}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.relatorio_processo}>
              <RelatorioProcessos />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.relatorio_indicador}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.relatorio_indicador}>
              <RelatorioIndicadores />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.relatorio_risco}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.relatorio_risco}>
              <RelatorioRiscos />
            </ProtectedRoute>
          }
        />

        {/* Configurações */}
        <Route
          exact
          path={routes.configuracao_geral}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.configuracao_geral}>
              <ConfiguracaoGeral />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.configuracao_meu_perfil}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.configuracao_meu_perfil}>
              <ConfiguracaoMeuPerfil />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.configuracao_notificacao}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.configuracao_notificacao}>
              <ConfiguracaoNotificacao />
            </ProtectedRoute>
          }
        />

        {/* Diversos */}
        <Route
          exact
          path={routes.diversos_perfil_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_perfil_criar}>
              <CriarPerfil />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_perfil_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_perfil_listar}>
              <ListarPerfil />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_perfil_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_perfil_excluir}>
              <ExcluirPerfil />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_perfil_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_perfil_atualizar}>
              <AtualizarPerfil />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_local_execucao_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_local_execucao_criar}>
              <CadastroLocalExecucao />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_local_execucao_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_local_execucao_atualizar}>
              <AtualizarLocalExecucao />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_local_execucao_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_local_execucao_excluir}>
              <ExcluirLocalExecucao />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_local_execucao_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_local_execucao_listar}>
              <ListarLocalExecucao />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_usuario_atualizar}
          element={
            // <ProtectedRoute auth={auth} grupos={auth?.grupos|| []} rota={routes.diversos_usuario_atualizar}>
            <AtualizarUsuario />
            // </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_usuario_criar}
          element={
            // <ProtectedRoute auth={auth} grupos={auth?.grupos|| []} rota={routes.diversos_usuario_criar}>
            <CriarUsuario />
            // </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_usuario_excluir}
          element={
            // <ProtectedRoute auth={auth} grupos={auth?.grupos|| []} rota={routes.diversos_usuario_excluir}>
            <ExcluirUsuario />
            // </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_usuario_listar}
          element={
            // <ProtectedRoute auth={auth} grupos={auth?.grupos|| []} rota={routes.diversos_usuario_listar}>
            <ListarUsuario />
            // </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_usuario_modificar_senha}
          element={
            <ModificarSenha />
          }
        />
        <Route
          exact
          path={routes.diversos_documento_normativo_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_documento_normativo_criar}>
              <CriarDocumentoNormativo />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_documento_normativo_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_documento_normativo_atualizar}>
              <AtualizarDocumentoNormativo />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_documento_normativo_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_documento_normativo_excluir}>
              <ExcluirDocumentoNormativo />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_documento_normativo_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_documento_normativo_listar}>
              <ListarDocumentoNormativo />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_documento_por_processo}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_documento_por_processo}>
              <DocumentosPorProcesso />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_tipo_normativo_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_tipo_normativo_criar}>
              <CriarTipoNormativo />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_tipo_normativo_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_tipo_normativo_atualizar}>
              <AtualizarTipoNormativo />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_tipo_normativo_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_tipo_normativo_excluir}>
              <ExcluirTipoNormativo />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_tipo_normativo_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_tipo_normativo_listar}>
              <ListarTipoNormativo />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_unidade_funcional_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_unidade_funcional_criar}>
              <CriarUnidadeFuncional />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_unidade_funcional_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_unidade_funcional_listar}>
              <ListarUnidadeFuncional />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_unidade_funcional_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_unidade_funcional_atualizar}>
              <AtualizarUnidadeFuncional />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_unidade_funcional_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_unidade_funcional_excluir}>
              <ExcluirUnidadeFuncional />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_tipo_unidade_funcional_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_tipo_unidade_funcional_criar}>
              <CriarTipoUnidadeFuncional />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_tipo_unidade_funcional_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_tipo_unidade_funcional_listar}>
              <ListarTipoUnidadeFuncional />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_tipo_unidade_funcional_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_tipo_unidade_funcional_atualizar}>
              <AtualizarTipoUnidadeFuncional />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_tipo_unidade_funcional_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_tipo_unidade_funcional_excluir}>
              <ExcluirTipoUnidadeFuncional />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_ferramenta_sistema_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_ferramenta_sistema_criar}>
              <CriarFerramentaSistema />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_ferramenta_sistema_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_ferramenta_sistema_listar}>
              <ListarFerramentaSistema />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_ferramenta_sistema_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_ferramenta_sistema_atualizar}>
              <AtualizarFerramentaSistema />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_ferramenta_sistema_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_ferramenta_sistema_excluir}>
              <ExcluirFerramentaSistema />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_ferramenta_por_processo}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_ferramenta_por_processo}>
              <FerramentasPorProcesso />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_permissao_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_permissao_criar}>
              <CriarPermissao />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_permissao_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_permissao_listar}>
              <ListarPermissao />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_permissao_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_permissao_atualizar}>
              <AtualizarPermissao />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_permissao_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_permissao_excluir}>
              <ExcluirPermissao />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_permissao_por_perfil_configurar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_permissao_por_perfil_configurar}>
              <ConfigurarPermissaoPorPerfil />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_permissao_grupo_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_permissao_grupo_criar}>
              <CriarPermissaoGrupo />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_permissao_grupo_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_permissao_grupo_listar}>
              <ListarPermissaoGrupo />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_permissao_grupo_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_permissao_grupo_atualizar}>
              <AtualizarPermissaoGrupo />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_permissao_grupo_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_permissao_grupo_excluir}>
              <ExcluirPermissaoGrupo />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path={routes.diversos_tags_criar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_tags_criar}>
              <CriarTags />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_tags_listar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_tags_listar}>
              <ListarTags />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_tags_atualizar}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_tags_atualizar}>
              <AtualizarTags />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={routes.diversos_tags_excluir}
          element={
            <ProtectedRoute auth={auth} grupos={auth?.grupos || []} rota={routes.diversos_tags_excluir}>
              <ExcluirTags />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          exact
          path="*"
          element={
            <ProtectedRoute auth={auth} permissoes={auth?.grupos || []} rota="*">
              <Return404 />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
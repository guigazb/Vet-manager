import React, { useState, useEffect, useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../components/utils/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

import { useFetchDatagrid } from '../../../hooks/useFetchDatagrid';
import { useFetchUnidadesFuncionaisPorLocalExecucao } from '../../../hooks/diversos/useFetchUnidadesFuncionaisPorLocalExecucao';

import { Box } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import { DataGrid } from '@mui/x-data-grid';

import Actions from '../../../components/geral/Actions';
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import InternalArea from '../../../components/body/InternalArea';

import InternalButtonArea from '../../../components/body/InternalButtonArea';
import ButtonComponent from '../../../components/button/ButtonComponent';
import routes from '../../../data/routes';
import axios from 'axios';

import Modal from '../../../components/body/modal/Modal';


const ListarRiscoTabelaPeriodica = () => {

  // ----------------------------------------------------------------------------------------------
  // Variáveis do Modal
  // ----------------------------------------------------------------------------------------------
  const [modalAbertoInsercao, setModalAbertoInsercao] = useState(false);

  const handleAbrirModalInsercao = () => {
    setModalAbertoInsercao(true);
  };

  const handleFecharModalInsercao = () => {
    setModalAbertoInsercao(false);
  };

  // Acessa o AuthContext para pegar os dados do usuário autenticado
  const { auth, logout } = useContext(AuthContext);

  const location = useLocation();
  const { id } = location.state || {};

  const navigate = useNavigate(); // Hook para navegação
  const [unidadeFuncionalId, setUnidadeFuncionalId] = useState('0');

  const URLBackendTabelaPeriodicaDG = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_TABELA_PERIODICA + "/" + unidadeFuncionalId + "/datagrid";
  const UrlBackendTabelaPeriodica = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_TABELA_PERIODICA;


  // ----------------------------------------------------------------------------------------------
  // Variaveis de backend
  // ----------------------------------------------------------------------------------------------
  const localExecucaoId = auth?.local_execucao_id;

  useEffect(() => {
    if (!localExecucaoId) {
      logout();
      localStorage.removeItem('token');
      navigate('/login', { replace: true });
    }
  }, [localExecucaoId, logout, navigate]);

  // ----------------------------------------------------------------------------------------------
  // Busca informações via hook
  // ----------------------------------------------------------------------------------------------
  const [selectedId, setSelectedId] = useState(null);
  const [tabelaPeriodicaRefetchTrigger, setTabelaPeriodicaRefetchTrigger] = useState(0);

  const { linhas, colunas, loading, error } = useFetchDatagrid(URLBackendTabelaPeriodicaDG, tabelaPeriodicaRefetchTrigger);
  const { unidadesPorLocalExecucao, loading: loadingUnidadesFuncionais } = useFetchUnidadesFuncionaisPorLocalExecucao(localExecucaoId);


  const handleIrPaginaVisualizarRegistro = () => {
    const id = selectedId;
    navigate(routes.risco_tabela_periodica_visualizar, { state: { id } });
  }

  const handleCancelarSelecao = () => {
    setSelectedId('');
  }

  const handleRowClick = (params) => {
    setSelectedId(params.row.ID);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const dataAtual = new Date().toISOString();

    const novaTabelaPeriodica = {
      unidade_funcional_id: unidadeFuncionalId,
      data_criacao: dataAtual
    };

    let criacaoBemSucedida = false;

    try {
      const resultTabelaPeriodica = await axios.post(UrlBackendTabelaPeriodica, novaTabelaPeriodica);

      if (resultTabelaPeriodica.status === 201) {
        criacaoBemSucedida = true;

        let id = resultTabelaPeriodica.data.tabelaPeriodica.id;
        toast.success("Tabela Periodica Criada com sucesso.",
          {
            onClose: () => navigate(routes.risco_tabela_periodica_visualizar, { state: { id } })
          });
      } else {
        toast.error('Erro ao tentar criar Tabela Periodica');
      }

    } catch (error) {
      toast.error('Erro ao tentar criar Tabela Periodica', error);
    }

    if (criacaoBemSucedida) {
      setTabelaPeriodicaRefetchTrigger(prev => prev + 1);
      handleFecharModalInsercao();
    }
  };

  return (
    <MainLayout>
      <Actions breadcrumb="Início : Risco : Tabela periódica" nomeSessao=" Listar Tabela Periódica" hasAddViewButton={false} hasFilter={false} />
      <FormPadrao>
        <InternalArea loading={loadingUnidadesFuncionais}>

          <SelectInputPadrao
            label="Selecione uma Unidade Funcional"
            options={unidadesPorLocalExecucao}
            optionKey="unidade_funcional_id"
            optionValue="unidade_funcional_nome"
            value={unidadeFuncionalId}
            onChange={setUnidadeFuncionalId}
            loading={loadingUnidadesFuncionais}
            nomeSelect="unidadeFuncional"
          />

        </InternalArea>

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

        <Modal modalAberto={modalAbertoInsercao} onFechar={handleFecharModalInsercao}>
          <Modal.ModalCabecalho onFechar={handleFecharModalInsercao}>
            Criar Tabela Periodica
          </Modal.ModalCabecalho>
          <Modal.ModalCorpo>
            Tem certeza que deseja criar uma nova tabela periodica para essa unidade funcional?
            Ao criar uma tabela periodica, a anterior será DESATIVADA, e os dados atuais
            relativos aos riscos e seus valores serão gravados na nova tabela.
          </Modal.ModalCorpo>
          <Modal.ModalRodape>
            <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModalInsercao}>
              Fechar Janela
            </ButtonComponent>
            <ButtonComponent tipo="perigo" tipoBotao="button" onClick={handleCreateSubmit}>
              Criar Nova Tabela Periodica
            </ButtonComponent>
          </Modal.ModalRodape>
        </Modal>


        <InternalButtonArea>

          <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleCancelarSelecao}>
            Cancelar
          </ButtonComponent>

          <ButtonComponent tipo="primario" tipoBotao="button" desabilitado={!unidadeFuncionalId} onClick={handleAbrirModalInsercao}>
            Criar Tabela
          </ButtonComponent>

          <ButtonComponent tipo="alerta" tipoBotao="button" desabilitado={!selectedId} onClick={handleIrPaginaVisualizarRegistro}>
            Visualizar tabela
          </ButtonComponent>


        </InternalButtonArea>

      </FormPadrao>
    </MainLayout>
  );
}

export default ListarRiscoTabelaPeriodica;
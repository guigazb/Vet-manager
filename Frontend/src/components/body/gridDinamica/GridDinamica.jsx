import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import { DataGrid } from '@mui/x-data-grid';

import BoxColunar from '../boxColunar/BoxColunar';
import Modal from '../modal/Modal';
import TextInput from '../../textinput/TextInput';
import ButtonComponent from '../../button/ButtonComponent';
import BoxItem from '../boxColunar/BoxItem';

/**
 * Componente GridDinamica - Gerencia dados de uma matriz SWOT (forças, fraquezas, oportunidades, ameaças)
 * @param {Object} props - Propriedades do componente
 * @param {number} props.matrizId - ID da matriz SWOT
 * @param {number} props.tipoId - Tipo de item (1=Força, 2=Oportunidade, 3=Fraqueza, 4=Ameaça)
 * @param {string} props.titulo - Título da seção
 * @param {string} props.placeholder - Texto de placeholder para o campo de entrada
 * @param {Function} props.onRefresh - Callback para quando os dados são atualizados
 * @param {Array} props.dados - Dados iniciais para o grid
 * @param {Array} props.colunas - Definição das colunas do grid
 * @param {boolean} props.loading - Flag de carregamento
 */
const GridDinamica = ({
  matrizId,
  tipoId,
  tipo,
  titulo,
  placeholder,
  onRefresh,
  dados = [],
  colunas = [],
  loading = false,
  bgcolor = "bg-slate-200"
}) => {

  // ----------------------------------------------------------------------------------------------
  // Variaveis de backend
  // ----------------------------------------------------------------------------------------------

  const baseApiUrl = import.meta.env.VITE_API_URL_BACKEND;
  const swotDadosEndpoint = import.meta.env.VITE_API_URL_RISCO_MATRIZ_SWOT_DADOS;


  // ----------------------------------------------------------------------------------------------
  // Variáveis do Modal
  // ----------------------------------------------------------------------------------------------
  const [modalAberto, setModalAberto] = useState(false);

  const handleAbrirModal = () => {
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
  };


  // ----------------------------------------------------------------------------------------------
  // Variáveis de estado
  // ----------------------------------------------------------------------------------------------

  const [itens, setItens] = useState([]);
  const [loadingGrid, setLoadingGrid] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Atualiza os dados quando as props mudam
  useEffect(() => {
    if (dados && dados.length > 0) {
      setItens(dados);
    }
  }, [dados, refreshTrigger]);

  // Handler para clique em uma linha do grid
  const handleRowClick = (params) => {
    setItemSelecionadoId(params.row.ID);
  };

  // Handler para o campo de entrada de texto
  const handleItemInserido = (e) => {
    setFormItemInserido(e.target.value);
  };


  // ----------------------------------------------------------------------------------------------
  // Variáveis do Form
  // ----------------------------------------------------------------------------------------------
  
  const [itemSelecionadoId, setItemSelecionadoId] = useState(null);
  const [formItemInserido, setFormItemInserido] = useState('');



  // ----------------------------------------------------------------------------------------------
  // Busca de dados
  // ----------------------------------------------------------------------------------------------

  const FetchDados = async () => {

    setLoadingGrid(true);
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_MATRIZ_SWOT_DADOS + '/' + matrizId + `/${tipo}/` + "datagridMUI");

      if (response.data) {
        setItens(response.data);
      }

    } catch (error) {
      toast.error(`Erro ao buscar ${titulo.toLowerCase()}: ${error.message}`);
    } finally {
      setLoadingGrid(false);
    }
  };

  // ----------------------------------------------------------------------------------------------
  // Handles de inclusão e exclusão
  // ----------------------------------------------------------------------------------------------

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const novoItem = {
      matriz_swot_id: matrizId,
      matriz_swot_tipo_id: tipoId,
      descricao: formItemInserido.trim()
    };

    try {
      const result = await axios.post(`${baseApiUrl}${swotDadosEndpoint}`, novoItem);
      setLoadingGrid(true);

      if (result.status === 201) {
        toast.success(`${titulo} inserida com sucesso na Matriz Swot.`);

        if (onRefresh) onRefresh();
        FetchDados();

      } else {
        toast.error(`Erro ao tentar inserir ${titulo.toLowerCase()} na Matriz swot.`);
      }
    } catch (error) {
      toast.error(`Erro ao tentar inserir ${titulo.toLowerCase()} na Matriz swot: ${error.message}`);
    } finally {

      setFormItemInserido('');

      setLoadingGrid(false);

    }
  };


  const handleDeleteSubmit = async () => {

    try {
      const result = await axios.delete(`${baseApiUrl}${swotDadosEndpoint}/${itemSelecionadoId}`);
      setLoadingGrid(true);

      if (result.status === 204) {
        toast.success(`${titulo} excluída com sucesso.`);

        if (onRefresh) onRefresh();
        FetchDados();

      } else {
        toast.error(`Erro ao tentar excluir a ${titulo.toLowerCase()} da matriz swot`);
      }
    } catch (error) {
      toast.error(`Erro ao tentar excluir a ${titulo.toLowerCase()} da matriz swot: ${error.message}`);
    } finally {

      setItemSelecionadoId(null);

      setModalAberto(false);
      setLoadingGrid(false);

    }
  };


  return (
    <>
      <div className={`mt-10 rounded-lg p-6 ${bgcolor}`}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
          {/* Coluna da esquerda - 40% */}
          <Box sx={{ width: '40%', display: 'flex', flexDirection: 'column' }}>
            <BoxItem>
              <TextInput
                maxLength="200"
                nomeComponente={`item${tipoId}`}
                valorComponente={formItemInserido}
                valorLabel={titulo}
                autoComplete={`item${tipoId}`}
                autofocus={false}
                colSpan="1"
                mt="2"
                placeholder={placeholder}
                type="text"
                onChange={handleItemInserido}
              />
            </BoxItem>

            <BoxItem>
              <BoxColunar.BoxButtons>
                <ButtonComponent tipo="primario" tipoBotao="button" onClick={handleCreateSubmit}>
                  Inserir {titulo}
                </ButtonComponent>

                <ButtonComponent tipo="perigo" tipoBotao="button" desabilitado={!itemSelecionadoId} onClick={handleAbrirModal}>
                  Excluir {titulo}
                </ButtonComponent>
              </BoxColunar.BoxButtons>
            </BoxItem>
          </Box>

          {/* Coluna da direita - 60% */}
          <Box sx={{ width: '60%' }}>
            <DataGrid
              rows={itens}
              columns={colunas}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
                columns: {
                  columnVisibilityModel: {
                    ID: false
                  }
                }
              }}
              pageSizeOptions={[5]}
              disableMultipleSelection={true}
              onRowClick={handleRowClick}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              loading={loading || loadingGrid}
              getRowId={(row) => row.ID}
              sx={{
                height: 300,
                // Reduza o z-index quando o modal estiver aberto
                "& .MuiDataGrid-toolbarContainer": {
                  zIndex: modalAberto ? 10 : 1000
                }
              }}
            />
          </Box>
        </Box>

        <Modal modalAberto={modalAberto} onFechar={handleFecharModal}>
          <Modal.ModalCabecalho onFechar={handleFecharModal}>
            Exclusão de {titulo}
          </Modal.ModalCabecalho>
          <Modal.ModalCorpo>
            Tem certeza que deseja excluir o registro selecionado?
          </Modal.ModalCorpo>
          <Modal.ModalRodape>
            <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModal}>
              Cancelar
            </ButtonComponent>
            <ButtonComponent tipo="perigo" tipoBotao="button" onClick={handleDeleteSubmit}>
              Excluir Registro
            </ButtonComponent>
          </Modal.ModalRodape>
        </Modal>

      </div>
    </>
  );
};

export default GridDinamica;
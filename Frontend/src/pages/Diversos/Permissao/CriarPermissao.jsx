import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../../../data/routes';

import Actions from '../../../components/geral/Actions'
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import TextInput from '../../../components/textinput/TextInput';
import ButtonComponent from '../../../components/button/ButtonComponent';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';

import axios from 'axios';

import { useFetchPermissaoGrupo } from '../../../hooks/diversos/useFetchPermissaoGrupo';

const CriarPermissao = () => {

  // ----------------------------------------------------------------------------------------------
  // Variáveis de navegação
  // ----------------------------------------------------------------------------------------------
  const navegar = useNavigate();
  const handleNavegacaoPaginaAnterior = () => {
    navegar(routes.diversos_permissao_listar);
  }

  // ----------------------------------------------------------------------------------------------
  // variaveis de formulário
  // ----------------------------------------------------------------------------------------------
  const [formNomePermissao, setFormNomePermissao] = useState('');
  const [formRota, setFormRota] = useState('');
  const [formGrupoPermissaoId, setFormGrupoPermissaoId] = useState('0');
  const [formVisivelMenu, setFormVisivelMenu] = useState(false);
  const [formNomeMenu, setFormNomeMenu] = useState("");
  const [formOrdemMenu, setFormOrdemMenu] = useState("");

  // ----------------------------------------------------------------------------------------------
  // Variáveis para trazer dados 
  // ----------------------------------------------------------------------------------------------
  const { permissaoGrupo, loading: loadingPermissaoGrupo } = useFetchPermissaoGrupo();

  // ----------------------------------------------------------------------------------------------
  // Handles dos campos do formulário
  // ----------------------------------------------------------------------------------------------
  const handleFormNomePermissao = (e) => {
    setFormNomePermissao(e.target.value);
  };

  const handleFormRota = (e) => {
    setFormRota(e.target.value);
  };

  const handleFormNomeMenu = (e) => {
    setFormNomeMenu(e.target.value);
  };

  const handleFormOrdemMenu = (e) => {
    setFormOrdemMenu(e.target.value);
  };

  // ----------------------------------------------------------------------------------------------
  // Handler da Submissão de dados para backend
  // ----------------------------------------------------------------------------------------------
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const novaPermissao = {
      nome: formNomePermissao,
      rota: formRota,
      grupo_id: formGrupoPermissaoId,
      visivel_menu: formVisivelMenu,
      nome_menu: formNomeMenu,
      ordem: formOrdemMenu
    };

    let criacaoBemSucedida = false;

    try {

      const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PERMISSAO, novaPermissao);

      if (result.status === 201) {
        criacaoBemSucedida = true;
        toast.success("Permissão salva com sucesso.");
      } else {
        toast.error('Erro ao tentar salvar a Permissão');
      }
    } catch (error) {
      toast.error('Erro ao tentar salvar a Permissão', error);
    }

    if (criacaoBemSucedida) {
      //Limpa todos os dados do formulário
      setFormNomePermissao("");
      setFormRota("");
      setFormGrupoPermissaoId("");
      setFormVisivelMenu(false);
      setFormNomeMenu("");
      setFormOrdemMenu("");
    }
  };

  return (
    <MainLayout>
      <React.Fragment>

        <Actions breadcrumb="Início : Diversos" nomeSessao="Cadastro de Permissão" hasAddViewButton={false} hasFilter={false} />

        <FormPadrao onSubmit={handleCreateSubmit}>

          <InternalArea>

            <TextInput
              maxLength="100"
              nomeComponente="nomepermissao"
              required
              valorComponente={formNomePermissao}
              valorLabel="Permissão"
              autoComplete="nome da permissão"
              autofocus={true}
              colSpan='3'
              mt='2'
              placeholder="Digite o nome da permissão"
              type='text'
              onChange={handleFormNomePermissao}
            />

            <TextInput
              maxLength="256"
              nomeComponente="rotapermissao"
              required
              valorComponente={formRota}
              valorLabel="Rota"
              autoComplete="rota da permissão"
              colSpan='3'
              mt='2'
              placeholder="Digite a rota da permissão"
              type='text'
              onChange={handleFormRota}
            />

            <SelectInputPadrao
              label="Grupo Permissão"
              options={permissaoGrupo}
              optionKey="id"
              optionValue="nome"
              value={formGrupoPermissaoId}
              onChange={setFormGrupoPermissaoId}
              loading={loadingPermissaoGrupo}
              nomeSelect="permissaoGrupo"
            />

            <RadioButtonBooleanInput
              valorComponente={formVisivelMenu}
              nomeComponenteAtivo="visivel-ativo"
              nomeComponenteInativo="visivel-inativo"
              onChange={setFormVisivelMenu}
              valorLabel="Visível no Menu?"
            />

            <TextInput
              maxLength="22"
              nomeComponente="nomemenu"
              required
              valorComponente={formNomeMenu}
              valorLabel="Nome para exibição em Menu"
              autoComplete="Nome para exibição em Menu"
              colSpan='3'
              mt='2'
              placeholder="Digite o nome para exibição em Menu"
              type='text'
              onChange={handleFormNomeMenu}
            />

            <TextInput
              maxLength="3"
              nomeComponente="ordem"
              required
              valorComponente={formOrdemMenu}
              valorLabel="Ordem do Menu"
              autoComplete="ordem menu"
              colSpan='1'
              mt='2'
              type='text'
              onChange={handleFormOrdemMenu}
            />

          </InternalArea>

          <InternalButtonArea>
            <ButtonComponent tipo="cancelar" tipoBotao='button' onClick={handleNavegacaoPaginaAnterior}>
              Retornar para Lista de Registros
            </ButtonComponent>
            <ButtonComponent tipo="sucesso">
              Salvar Novo Registro
            </ButtonComponent>
          </InternalButtonArea>

        </FormPadrao>

      </React.Fragment>
    </MainLayout>
  );
}

export default CriarPermissao;
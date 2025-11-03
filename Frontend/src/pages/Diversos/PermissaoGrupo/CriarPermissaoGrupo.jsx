import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../../../data/routes';

import Actions from '../../../components/geral/Actions'
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import TextInput from '../../../components/textinput/TextInput';
import ButtonComponent from '../../../components/button/ButtonComponent';

import axios from 'axios';

const CriarPermisaoGrupo = () => {

  // ----------------------------------------------------------------------------------------------
  // Variáveis de navegação
  // ----------------------------------------------------------------------------------------------
  const navegar = useNavigate();
  const handleNavegacaoPaginaAnterior = () => {
    navegar(routes.diversos_permissao_grupo_listar);
  }

  // ----------------------------------------------------------------------------------------------
  // variaveis de formulário
  // ----------------------------------------------------------------------------------------------
  const [formNomeGrupo, setNomeGrupoPermissao] = useState('');
  const [formOrdemGrupo, setOrdemGrupo] = useState('');

  // ----------------------------------------------------------------------------------------------
  // Handles dos campos do formulário
  // ----------------------------------------------------------------------------------------------
  const handleNomeGrupoPermissao = (e) => {
    setNomeGrupoPermissao(e.target.value);
  };

  const handleOrdemGrupo = (e) => {
    setOrdemGrupo(e.target.value);
  };

  // ----------------------------------------------------------------------------------------------
  // Handler da Submissão de dados para backend
  // ----------------------------------------------------------------------------------------------
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const novoGrupoPermissao = {
      nome: formNomeGrupo,
      ordem: formOrdemGrupo
    };

    let criacaoBemSucedida = false;

    try {
      const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PERMISSAO_GRUPO, novoGrupoPermissao);

      if (result.status === 201) {
        criacaoBemSucedida = true;
        toast.success("Grupo de Permissão salvo com sucesso.");
      }
      else {
        toast.error('Erro ao tentar salvar o Grupo de permissão');
      }
    } catch (error) {
      toast.error('Erro ao tentar salvar o Grupo de permissão', error);
    }

    if (criacaoBemSucedida) {
      //Limpa todos os dados do formulário
      setNomeGrupoPermissao("");
      setOrdemGrupo("");
    }
  };

  return (
    <MainLayout>
      <React.Fragment>

        <Actions breadcrumb="Início : Diversos" nomeSessao="Cadastro de Grupo de permissão" hasAddViewButton={false} hasFilter={false} />

        <FormPadrao onSubmit={handleCreateSubmit}>

          <InternalArea>

            <TextInput
              maxLength="50"
              nomeComponente="nomegrupopermissao"
              required
              valorComponente={formNomeGrupo}
              valorLabel="Grupo de permissão"
              autoComplete="nome grupo"
              autofocus={true}
              colSpan='3'
              mt='2'
              placeholder="Digite o nome do grupo"
              type='text'
              onChange={handleNomeGrupoPermissao}
            />

            <TextInput
              maxLength="3"
              nomeComponente="ordemgrupo"
              required
              valorComponente={formOrdemGrupo}
              valorLabel="Ordem do Grupo"
              autoComplete="ordem grupo"
              colSpan='1'
              mt='2'
              type='text'
              onChange={handleOrdemGrupo}
            />

          </InternalArea>

          <InternalButtonArea>
            <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
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

export default CriarPermisaoGrupo;
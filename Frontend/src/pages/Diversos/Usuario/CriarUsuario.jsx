import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../../../data/routes';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions'
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import TextInput from '../../../components/textinput/TextInput';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';
import ButtonComponent from '../../../components/button/ButtonComponent';

import { useFetchLocaisDeExecucao } from '../../../hooks/diversos/useFetchLocaisDeExecucao';
import { useFetchPerfis } from '../../../hooks/diversos/useFetchPerfis';
import { useFetchUnidadesFuncionaisPorLocalExecucao } from '../../../hooks/diversos/useFetchUnidadesFuncionaisPorLocalExecucao';

import axios from 'axios';

function CriarUsuario1() {

  // ----------------------------------------------------------------------------------------------
  // Variáveis de navegação
  // ----------------------------------------------------------------------------------------------
  const navegar = useNavigate();
  const handleNavegacaoPaginaAnterior = () => {
    navegar(routes.diversos_usuario_listar);
  }

  // ----------------------------------------------------------------------------------------------
  // Variáveis do Form
  // ----------------------------------------------------------------------------------------------
  const [formNomeusuario, setFormNomeUsuario] = useState('');
  const [formEmailUsuario, setFormEmailUsuario] = useState('');
  const [formSenhaUsuario, setFormSenhaUsuario] = useState('');
  const [formSenhaRedigitadaUsuario, setFormSenhaRedigitadaUsuario] = useState('');
  const [formNomeLogin, setFormNomeLogin] = useState('');
  const [formGerenteDeArea, setFormGerenteDeArea] = useState(false);
  const [formUsuarioAtivo, setFormUsuarioAtivo] = useState(true);

  const [formLocalExecucaoId, setFormLocalExecucaoId] = useState('0');
  const [formPerfilId, setFormPerfilId] = useState('0');
  const [formUnidadeFuncionalId, setFormUnidadeId] = useState('0');

  // ----------------------------------------------------------------------------------------------
  // Variáveis para trazer dados 
  // ----------------------------------------------------------------------------------------------
  const { locais, loading: loadingLocais } = useFetchLocaisDeExecucao();
  const { unidadesPorLocalExecucao, loading: loadingUnidadesFuncionais } = useFetchUnidadesFuncionaisPorLocalExecucao(formLocalExecucaoId);
  const { perfis, loading: loadingPerfis } = useFetchPerfis();

  // ----------------------------------------------------------------------------------------------
  // Handles dos campos do formulário
  // ----------------------------------------------------------------------------------------------
  const handleNomeChange = (e) => {
    setFormNomeUsuario(e.target.value);
  };

  const handleEmailChange = (e) => {
    setFormEmailUsuario(e.target.value);
  };

  const handleSenhaChange = (e) => {
    setFormSenhaUsuario(e.target.value);
  };

  const handleSenhaRedigitadaChange = (e) => {
    setFormSenhaRedigitadaUsuario(e.target.value);
  };

  const handleNomeLoginChange = (e) => {
    setFormNomeLogin(e.target.value);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    // Checa se as senhas batem
    if (formSenhaUsuario !== formSenhaRedigitadaUsuario) {
      toast.warn('As senhas não conferem.');
      throw "Senhas não conferem.";
    }

    if (!formLocalExecucaoId) {
      toast.warn('Por favor, escolha um Local de Execução.');
      throw "Local de Execução não escolhido";
    }

    if (!formUnidadeFuncionalId) {
      toast.warn('Por favor, escolha uma Unidade Funcional.');
      throw "Unidade Funcional não escolhida";
    }

    const novoUsuario = {
      nome: formNomeusuario,
      nome_login: formNomeLogin,
      local_execucao_id: formLocalExecucaoId,
      unidade_funcional_id: formUnidadeFuncionalId,
      perfil_id: formPerfilId,
      ativo: formUsuarioAtivo,
      gerente_de_area: formGerenteDeArea,
      email: formEmailUsuario,
      senha: formSenhaUsuario
    };

    let criacaoBemSucedida = false;

    try {
      const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_USUARIO, novoUsuario);

      if (result.status === 201) {
        criacaoBemSucedida = true;
        toast.success("Usuário salvo com sucesso.");
      } else {
        toast.error('Erro ao tentar salvar o usuário');
      }
    } catch (error) {
      toast.error('Erro ao tentar salvar o usuário', error);
    }

    if (criacaoBemSucedida) {
      //Limpa todos os dados do formulário
      setFormNomeUsuario("");
      setFormEmailUsuario("");
      setFormSenhaUsuario("");
      setFormSenhaRedigitadaUsuario("");
      setFormPerfilId("");
      setFormLocalExecucaoId("");
      setFormNomeLogin("");
      setFormUnidadeId("");
      setFormGerenteDeArea(false);
      setFormUsuarioAtivo(true);
    }
  };

  // ----------------------------------------------------------------------------------------------

  return (
    <MainLayout>
      <React.Fragment>

        <Actions breadcrumb="Início : Diversos" nomeSessao="Cadastro de Usuários" hasAddViewButton={false} hasFilter={false} />

        <FormPadrao onSubmit={handleCreateSubmit}>

          <InternalArea>

            <TextInput
              nomeComponente="nomelogin"
              type="text"
              placeholder="Digite o nome de login usuário."
              maxLength="50"
              valorLabel="Nome de Login"
              valorComponente={formNomeLogin}
              onChange={handleNomeLoginChange}
              autoComplete="nomeusuario"
              colSpan="2"
              mt="2"
              required
              autofocus={true}
            />

            <TextInput
              nomeComponente="nomeusuario"
              type="text"
              placeholder="Digite o nome completo do usuário."
              maxLength="100"
              valorLabel="Nome de Usuário"
              valorComponente={formNomeusuario}
              onChange={handleNomeChange}
              autoComplete="nomeusuario"
              colSpan="4"
              mt="2"
              required
              autofocus={false}
            />

            <TextInput
              nomeComponente="emailusuario"
              type="text"
              placeholder="Digite o e-mail do usuário."
              maxLength="100"
              valorLabel="E-mail de Usuário"
              valorComponente={formEmailUsuario}
              onChange={handleEmailChange}
              autoComplete="nomeusuario"
              colSpan="3"
              mt="2"
              required
              autofocus={false}
            />

            <SelectInputPadrao
              label="Local de Execução"
              options={locais}
              optionKey="id"
              optionValue="nome"
              value={formLocalExecucaoId}
              onChange={setFormLocalExecucaoId}
              loading={loadingLocais}
              nomeSelect="localExecucao"
            />

            <SelectInputPadrao
              label="Unidade Funcional"
              options={unidadesPorLocalExecucao}
              optionKey="unidade_funcional_id"
              optionValue="unidade_funcional_nome"
              value={formUnidadeFuncionalId}
              onChange={setFormUnidadeId}
              loading={loadingUnidadesFuncionais}
              nomeSelect="unidadeFuncional"
            />

            <SelectInputPadrao
              label="Perfil"
              options={perfis}
              optionKey="id"
              optionValue="nome"
              value={formPerfilId}
              onChange={setFormPerfilId}
              loading={loadingPerfis}
              nomeSelect="perfil"
            />

            <RadioButtonBooleanInput
              valorLabel="Usuário Ativo?"
              valorComponente={formUsuarioAtivo}
              onChange={setFormUsuarioAtivo}
              nomeComponenteAtivo="usuario-ativo"
              nomeComponenteInativo="usuario-inativo"
              colSpan='1'
              inactiveLabel='true'
            />

            <RadioButtonBooleanInput
              valorLabel="Gerente de Área?"
              valorComponente={formGerenteDeArea}
              onChange={setFormGerenteDeArea}
              nomeComponenteAtivo="gerente-ativo"
              nomeComponenteInativo="gerente-inativo"
              colSpan='1'
              mt='1'
              inactiveLabel='false'
            />

            <TextInput
              nomeComponente="senhaUsuario"
              type="password"
              placeholder="Digite a Senha do Usuário."
              maxLength="100"
              valorLabel="Senha do Usuário"
              valorComponente={formSenhaUsuario}
              onChange={handleSenhaChange}
              autoComplete="senhaUsuario"
              colSpan="2"
              required
              mt="2"
            />

            <TextInput
              nomeComponente="senhaRedigitadaUsuario"
              type="password"
              placeholder="Redigite a Senha do Usuário."
              maxLength="100"
              valorLabel="Senha Redigitada do Usuário"
              valorComponente={formSenhaRedigitadaUsuario}
              onChange={handleSenhaRedigitadaChange}
              autoComplete="senhaRedigitadaUsuario"
              colSpan="2"
              required
              mt="2"
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
    </MainLayout >
  );
}

export default CriarUsuario1;
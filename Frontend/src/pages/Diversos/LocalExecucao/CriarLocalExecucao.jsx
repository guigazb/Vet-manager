import React, { useEffect, useState } from 'react';
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
import RadioButtonInput from '../../../components/radiobutton/RadioButtonInput';
import ButtonComponent from '../../../components/button/ButtonComponent';

import { useFetchEstados } from '../../../hooks/diversos/useFetchEstados';
import { useFetchCidades } from '../../../hooks/diversos/useFetchCidades';
import { useFetchLocaisDeExecucaoTipo } from '../../../hooks/diversos/useFetchLocaisDeExecucaoTipo';

import axios from 'axios';

const CriarLocalExecucao = () => {

  // ----------------------------------------------------------------------------------------------
  // Variáveis de navegação
  // ----------------------------------------------------------------------------------------------
  const navegar = useNavigate();
  const handleNavegacaoPaginaAnterior = () => {
    navegar(routes.diversos_local_execucao_listar);
  }

  // ----------------------------------------------------------------------------------------------
  // Variáveis do Form
  // ----------------------------------------------------------------------------------------------
  const [formNomeLocalidade, setFormNomeLocalidade] = useState('');
  const [formEnderecoLocalidade, setFormEnderecoLocalidade] = useState('');
  const [formBairroLocalidade, setFormBairroLocalidade] = useState('');
  const [formEstadoLocalidadeId, setFormEstadoLocalidadeId] = useState('0');
  const [formCidadePorEstadoId, setFormCidadePorEstadoId] = useState('0');
  const [formTipoLocalExecucaoId, setFormTipoLocalExecucaoId] = useState('');
  const [formCEP, setFormCEP] = useState('');

  // ----------------------------------------------------------------------------------------------
  // Variáveis para trazer dados
  // ----------------------------------------------------------------------------------------------
  const { estados, loading: loadingEstados } = useFetchEstados();
  const { cidades, loading: loadingCidades } = useFetchCidades(formEstadoLocalidadeId);
  const { locaisExecucaoTipo, loading: loadingLocaisExecucaoTipo } = useFetchLocaisDeExecucaoTipo();

  // ----------------------------------------------------------------------------------------------
  // Handles de componentes do formulário
  // ----------------------------------------------------------------------------------------------
  const handleNomeLocalidade = (e) => {
    setFormNomeLocalidade(e.target.value);
  };

  const handleEnderecoLocalidade = (e) => {
    setFormEnderecoLocalidade(e.target.value);
  };

  const handleBairroLocalidade = (e) => {
    setFormBairroLocalidade(e.target.value);
  };

  const handleTipoSedeFilial = (e) => {
    setFormTipoLocalExecucaoId(parseInt(e.target.value, 10));
  };

  const handleCEP = (e) => {
    setFormCEP(e.target.value);
  }

  // ----------------------------------------------------------------------------------------------
  // Handler da Submissão de dados para backend
  // ----------------------------------------------------------------------------------------------
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const novoLocalExecucao = {
      nome: formNomeLocalidade,
      endereco: formEnderecoLocalidade,
      bairro: formBairroLocalidade,
      cidade_id: formCidadePorEstadoId,
      tipo_local_execucao_id: formTipoLocalExecucaoId,
      cep: formCEP
    };

    let criacaoBemSucedida = false;

    try {
      const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_LOCAL_EXECUCAO, novoLocalExecucao);

      if (result.status === 201) {
        toast.success("Local de Execução salvo com sucesso.");
        criacaoBemSucedida = true;
      } else {
        toast.error('Erro ao tentar salvar o Local de Execução');
      }
    } catch (error) {
      toast.error('Erro ao tentar salvar o Local de Execução', error);
    }

    if (criacaoBemSucedida) {
      //Limpa todos os dados do formulário
      setFormNomeLocalidade("");
      setFormEnderecoLocalidade("");
      setFormBairroLocalidade("");
      setFormEstadoLocalidadeId("");
      setFormCidadePorEstadoId("");
      setFormCEP("");
    }
  };

  return (
    <MainLayout>
      <React.Fragment>

        <Actions breadcrumb="Início : Diversos" nomeSessao="Cadastro de Locais de Execução" hasAddViewButton={false} hasFilter={false} />

        <FormPadrao onSubmit={handleCreateSubmit}>

          <InternalArea>

            <TextInput
              maxLength="100"
              nomeComponente="nomelocalidade"
              required
              valorComponente={formNomeLocalidade}
              valorLabel="Nome da Localidade"
              autoComplete="nomelocalidade"
              autofocus={true}
              colSpan='3'
              mt='2'
              placeholder="Digite o Nome da Localidade"
              type='text'
              onChange={handleNomeLocalidade}
            />

            <TextInput
              maxLength="255"
              nomeComponente="endereco"
              required
              valorComponente={formEnderecoLocalidade}
              valorLabel="Endereço"
              autoComplete="endereco"
              autofocus={false}
              colSpan='3'
              mt='2'
              placeholder="Digite o Endereço da localidade"
              type='text'
              onChange={handleEnderecoLocalidade}
            />

            <TextInput
              maxLength="100"
              nomeComponente="bairro"
              required
              valorComponente={formBairroLocalidade}
              valorLabel="Bairro"
              autoComplete="bairro"
              autofocus={false}
              colSpan='3'
              mt='2'
              placeholder="Digite o Bairro da localidade"
              type='text'
              onChange={handleBairroLocalidade}
            />

            <TextInput
              maxLength="9"
              nomeComponente="cep"
              required
              valorComponente={formCEP}
              valorLabel="CEP"
              autoComplete="CEP"
              colSpan='1'
              mt='2'
              placeholder="Digite o CEP"
              type='text'
              onChange={handleCEP}
            />

            <SelectInputPadrao
              label="Escolha um Estado"
              options={estados}
              optionKey="id"
              optionValue="nome"
              value={formEstadoLocalidadeId}
              onChange={setFormEstadoLocalidadeId}
              loading={loadingEstados}
              nomeSelect="estado"
            />

            <SelectInputPadrao
              label="Escolha uma Cidade"
              options={cidades}
              optionKey="id"
              optionValue="nome"
              value={formCidadePorEstadoId}
              onChange={setFormCidadePorEstadoId}
              loading={loadingCidades}
              nomeSelect="cidade"
            />

            <RadioButtonInput
              colSpan='2'
              valorLabel="Tipo Local Execução"
              opcoesLabelValue={locaisExecucaoTipo}
              nomeComponente="tipoLocalExecucao"
              id="id"
              descricao="nome"
              onChange={handleTipoSedeFilial}
              valorSelecionado={formTipoLocalExecucaoId}
              desabilitado={loadingLocaisExecucaoTipo}
            />

          </InternalArea>

          <InternalButtonArea>
            <ButtonComponent tipo="cancelar" tipoBotao='button' onClick={handleNavegacaoPaginaAnterior}>
              Retornar para Lista de Registro
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

export default CriarLocalExecucao;
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

const CriarTipoNormativo = () => {

  // ----------------------------------------------------------------------------------------------
  // Variáveis de navegação
  // ----------------------------------------------------------------------------------------------
  const navegar = useNavigate();
  const handleNavegacaoPaginaAnterior = () => {
    navegar(routes.diversos_tipo_normativo_listar);
  }

  // ----------------------------------------------------------------------------------------------
  // variaveis de formulário
  // ----------------------------------------------------------------------------------------------
  const [formTipoNormativo, setFormTipoNormativo] = useState('');

  // ----------------------------------------------------------------------------------------------
  // Handles dos campos do formulário
  // ----------------------------------------------------------------------------------------------
  const handleTipoNormativo = (e) => {
    setFormTipoNormativo(e.target.value);
  };

  // ----------------------------------------------------------------------------------------------
  // Handler da Submissão de dados para backend
  // ----------------------------------------------------------------------------------------------
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const novoTipoNormativo = {
      tipo_normativo: formTipoNormativo,
    };

    let criacaoBemSucedida = false;

    try {
      const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_DOCUMENTO_NORMATIVO_TIPO, novoTipoNormativo);

      if (result.status === 201) {
        criacaoBemSucedida = true;
        toast.success("Tipo Normativo salvo com sucesso.");
      } else {
        toast.error('Erro ao tentar salvar o tipo normativo');
      }
    } catch (error) {
      toast.error('Erro ao tentar salvar o tipo normativo', error);
    }

    if (criacaoBemSucedida) {
      //Limpa todos os dados do formulário
      setFormTipoNormativo("");
    }
  };

  return (
    <MainLayout>
      <React.Fragment>

        <Actions breadcrumb="Início : Diversos" nomeSessao="Cadastro de Tipos Normativos" hasAddViewButton={false} hasFilter={false} />

        <FormPadrao onSubmit={handleCreateSubmit}>

          <InternalArea>

            <TextInput
              maxLength="100"
              nomeComponente="tipoNormativo"
              required
              valorComponente={formTipoNormativo}
              valorLabel="Tipo de Normativo"
              autoComplete="tipo normativo"
              autofocus={true}
              colSpan='3'
              mt='2'
              placeholder="Digite o tipo de normativo"
              type='text'
              onChange={handleTipoNormativo}
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

export default CriarTipoNormativo;
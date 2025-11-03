import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import routes from '../../../data/routes';

import Actions from '../../../components/geral/Actions'
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import TextInput from '../../../components/textinput/TextInput';
import ButtonComponent from '../../../components/button/ButtonComponent';

import axios from 'axios';

const CriarFerramentaSistema = () => {

  // ----------------------------------------------------------------------------------------------
  // Variáveis de navegação
  // ----------------------------------------------------------------------------------------------
  const navegar = useNavigate();
  const handleNavegacaoPaginaAnterior = () => {
    navegar(routes.diversos_ferramenta_sistema_listar);
  }

  // ----------------------------------------------------------------------------------------------
  // Variáveis do Form
  // ----------------------------------------------------------------------------------------------
  const [formNomeFerramenta, setFormNomeFerramenta] = useState('');

  // ----------------------------------------------------------------------------------------------
  // Handles dos campos do formulário
  // ----------------------------------------------------------------------------------------------
  const handleNomeFerramentaSistema = (e) => {
    setFormNomeFerramenta(e.target.value);
  };

  // ----------------------------------------------------------------------------------------------
  // Handler da Submissão de dados para backend
  // ----------------------------------------------------------------------------------------------
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const novaFerramentaSistema = {
      nome: formNomeFerramenta
    };

    let criacaoBemSucedida = false;

    try {
      const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_FERRAMENTA_SISTEMA, novaFerramentaSistema);

      if (result.status === 201) {
        criacaoBemSucedida = true;
        toast.success("Ferramenta de sistema salva com sucesso.");
      } else {
        toast.error('Erro ao tentar salvar a Ferramenta de sistema`');
      }
    } catch (error) {
      toast.error('Erro ao tentar salvar a Ferramenta de sistema`', error);
    }

    if (criacaoBemSucedida) {
      //Limpa todos os dados do formulário
      setFormNomeFerramenta("");
    }
  };

  return (
    <MainLayout>
      <React.Fragment>

        <Actions breadcrumb="Início : Diversos" nomeSessao="Cadastro de Ferramentas de sistema" hasAddViewButton={false} hasFilter={false} />

        <FormPadrao onSubmit={handleCreateSubmit}>

          <InternalArea>

            <TextInput
              maxLength="180"
              nomeComponente="nomeferramentasistema"
              required
              valorComponente={formNomeFerramenta}
              valorLabel="Ferramenta de sistema"
              autoComplete="nome ferramenta"
              autofocus={true}
              colSpan='3'
              mt='2'
              placeholder="Digite o nome da ferrramenta"
              type='text'
              onChange={handleNomeFerramentaSistema}
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

export default CriarFerramentaSistema;
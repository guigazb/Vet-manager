import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import routes from '../../../../data/routes';

import Actions from '../../../../components/geral/Actions'
import MainLayout from '../../../MainLayout';
import InternalButtonArea from '../../../../components/body/InternalButtonArea';
import FormPadrao from '../../../../components/body/FormPadrao';
import ButtonComponent from '../../../../components/button/ButtonComponent';
import TextInput from '../../../../components/textinput/TextInput';
import TextAreaInput from '../../../../components/textinput/TextAreaInput';
import InternalArea from '../../../../components/body/InternalArea';

import axios from 'axios';

const CriarRiscoTipoControleAcao = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_tipo_controle_acao_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formTipoControleAcaoRisco, setFormTipoControleAcaoRisco] = useState('');
    const [formDescricaoTipoControleAcao, setFormDescricaoTipoControleAcao] = useState('');

    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------
    const handleTipoControleAcaoRisco = (e) => {
        setFormTipoControleAcaoRisco(e.target.value);
    };

    const handleDescricao = (e) => {
        setFormDescricaoTipoControleAcao(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novoTipoControleAcaoRisco = {
            nome_tipo_controle: formTipoControleAcaoRisco,
            descricao_tipo_controle: formDescricaoTipoControleAcao
        };

        let criacaoBemSucedida = false;

        try {
            const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_TIPO_CONTROLE_ACAO, novoTipoControleAcaoRisco);

            if (result.status === 201) {

                criacaoBemSucedida = true;

                toast.success("Tipo de Controle Ação salvo com sucesso.");
            } else {
                toast.error('Erro ao tentar salvar o Tipo de Controle Ação');
            }
        } catch (error) {
            toast.error('Erro ao tentar salvar o Tipo de Controle Ação`', error);
        } finally {
            if (criacaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormTipoControleAcaoRisco('');
                setFormDescricaoTipoControleAcao('');
            }
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastros : Risco" nomeSessao="Cadastro de Tipo de Controle Ação" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

                    <InternalArea>

                        <TextInput
                            maxLength="50"
                            nomeComponente="tipocontroleacao"
                            required
                            valorComponente={formTipoControleAcaoRisco}
                            valorLabel="Tipo de controle ação"
                            autoComplete="tipo de controle"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o tipo"
                            type='text'
                            onChange={handleTipoControleAcaoRisco}
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoTipoControleAcao}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            onChange={handleDescricao}

                        />

                    </InternalArea>

                </FormPadrao>

                <InternalButtonArea>
                    <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                        Retornar para Lista de Registros
                    </ButtonComponent>
                    <ButtonComponent tipo="sucesso" onClick={handleCreateSubmit}>
                        Salvar Novo Registro
                    </ButtonComponent>
                </InternalButtonArea>

            </React.Fragment>
        </MainLayout>
    );
}

export default CriarRiscoTipoControleAcao;
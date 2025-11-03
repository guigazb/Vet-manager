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

const CriarRiscoProbabilidade = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_probabilidade_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formTipoProbabilidadeRisco, setFormTipoProbabilidadeRisco] = useState('');
    const [formDescricaoProbabilidade, setFormDescricaoProbabilidade] = useState('');
    const [formValorProbabilidade, setFormValorProbabilidade] = useState('');

    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------
    const handleTipoProbabilidadeRisco = (e) => {
        setFormTipoProbabilidadeRisco(e.target.value);
    };

    const handleDescricao = (e) => {
        setFormDescricaoProbabilidade(e.target.value);
    };

    const handleValor = (e) => {
        const value = e.target.value;
        setFormValorProbabilidade(value);

        if ((value < 1 || value > 5) && value) {
            toast.error('O valor deve ser um inteiro entre 1 e 5');
        }
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novaProbabilidadeRisco = {
            tipo_probabilidade: formTipoProbabilidadeRisco,
            descricao: formDescricaoProbabilidade,
            valor: formValorProbabilidade
        };

        let criacaoBemSucedida = false;

        try {
            const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_PROBABILIDADE, novaProbabilidadeRisco);

            if (result.status === 201) {

                criacaoBemSucedida = true;

                toast.success("Probabilidade de risco salvo com sucesso.");
            } else {
                toast.error('Erro ao tentar salvar a probabilidade de risco');
            }

        } catch (error) {
            toast.error('Erro ao tentar salvar a probabilidade de risco`', error);
        } finally {
            if (criacaoBemSucedida) {

                //Limpa todos os dados do formulário

                setFormTipoProbabilidadeRisco('');
                setFormDescricaoProbabilidade('');
                setFormValorProbabilidade('');
            }
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastro : Risco" nomeSessao="Cadastro de Probabilidade de Risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

                    <InternalArea>

                        <TextInput
                            maxLength="20"
                            nomeComponente="probabilidaderisco"
                            required
                            valorComponente={formTipoProbabilidadeRisco}
                            valorLabel="Probabilidade de Risco"
                            autoComplete="probabilidade"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite a probabilidade"
                            type='text'
                            onChange={handleTipoProbabilidadeRisco}
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoProbabilidade}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            onChange={handleDescricao}
                        />

                        <TextInput
                            maxLength="1"
                            nomeComponente="valorprobabilidade"
                            required
                            valorComponente={formValorProbabilidade}
                            valorLabel="Valor da Probabilidade"
                            autoComplete="valor"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o valor"
                            type='text'
                            onChange={handleValor}
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

export default CriarRiscoProbabilidade;
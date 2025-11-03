import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import MainLayout from '../../../MainLayout';
import Actions from '../../../../components/geral/Actions'
import FormPadrao from '../../../../components/body/FormPadrao';
import InternalArea from '../../../../components/body/InternalArea';
import InternalButtonArea from '../../../../components/body/InternalButtonArea';

import TextInput from '../../../../components/textinput/TextInput';
import TextAreaInput from '../../../../components/textinput/TextAreaInput';
import RadioButtonBooleanInput from '../../../../components/radiobutton/RadioButtonBooleanInput';

import ButtonComponent from '../../../../components/button/ButtonComponent';

import routes from '../../../../data/routes';

import axios from 'axios';

import { useFetchRiscoProbabilidade } from '../../../../hooks/risco/useFetchRiscoProbabilidade';

const AtualizarRiscoProbabilidade = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_probabilidade_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoProbabilidade, loading: loadingRiscoProbabilidade } = useFetchRiscoProbabilidade(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formTipoProbabilidadeRisco, setFormTipoProbabilidadeRisco] = useState(riscoProbabilidade?.tipo_probabilidade || '');
    const [formDescricaoProbabilidade, setFormDescricaoProbabilidade] = useState(riscoProbabilidade?.descricao || '');
    const [formValorProbabilidade, setFormValorProbabilidade] = useState(riscoProbabilidade?.valor || '');
    const [formProbabilidadeAtivo, setFormProbabilidadeAtivo] = useState(riscoProbabilidade?.ativo || '');

    useEffect(() => {
        if (riscoProbabilidade && riscoProbabilidade.tipo_probabilidade !== undefined) {
            setFormTipoProbabilidadeRisco(riscoProbabilidade.tipo_probabilidade);
        }
        if (riscoProbabilidade && riscoProbabilidade.descricao !== undefined) {
            setFormDescricaoProbabilidade(riscoProbabilidade.descricao);
        }
        if (riscoProbabilidade && riscoProbabilidade.valor !== undefined) {
            setFormValorProbabilidade(riscoProbabilidade.valor);
        }
        if (riscoProbabilidade && riscoProbabilidade.ativo !== undefined) {
            setFormProbabilidadeAtivo(riscoProbabilidade.ativo);
        }
    }, [riscoProbabilidade])

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
        setFormValorProbabilidade(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const ProbabilidadeRiscoAtualizado = {
            tipo_probabilidade: formTipoProbabilidadeRisco,
            descricao: formDescricaoProbabilidade,
            valor: formValorProbabilidade,
            ativo: formProbabilidadeAtivo
        };

        let atualizacaoBemSucedida = false;

        try {
            await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_PROBABILIDADE + "/" + id, ProbabilidadeRiscoAtualizado);

            if (result.status === 201) {

                atualizacaoBemSucedida = true;

                toast.success("Probabilidade de risco atualizado com sucesso.", {
                    onClose: () => navegar(routes.risco_probabilidade_listar)
                });
            } else {
                toast.error('Erro ao tentar Atualizar a Probabilidade de risco`');
            }
        } catch (error) {
            toast.error('Erro ao tentar Atualizar a Probabilidade de risco`', error);
        } finally {
            if (atualizacaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormTipoProbabilidadeRisco('');
                setFormDescricaoProbabilidade('');
                setFormValorProbabilidade('');
                setFormProbabilidadeAtivo('');

            }
            setAtualizarDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastro : Risco" nomeSessao="Atualizar Probabilidade de Risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingRiscoProbabilidade}>

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
                            maxLength="6"
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


                        <RadioButtonBooleanInput
                            valorComponente={formProbabilidadeAtivo}
                            nomeComponenteAtivo="probabilidade-ativo"
                            nomeComponenteInativo="probabilidade-inativo"
                            onChange={setFormProbabilidadeAtivo}
                            valorLabel="Probabilidade ativa ?"
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingRiscoProbabilidade}>
                        <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="alerta" desabilitado={atualizarDesabilitado}>
                            Atualizar Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

            </React.Fragment>
        </MainLayout>
    );

}

export default AtualizarRiscoProbabilidade;
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../../data/routes';

import Actions from '../../../components/geral/Actions'
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';
import TextInput from '../../../components/textinput/TextInput';
import DatePickerUnit from '../../../components/geral/DatePickerUnit';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';
import ButtonComponent from '../../../components/button/ButtonComponent';

import axios from 'axios';

import { useFetchRiscoPlanoResposta } from '../../../hooks/risco/useFetchRiscoPlanoResposta';


const AtualizarRiscoPlanoResposta = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_plano_resposta_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoPlanoResposta, loading: loadingPlanoRespostaRisco } = useFetchRiscoPlanoResposta(id);


    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formPlanoRespostaRisco, setFormPlanoRespostaRisco] = useState(riscoPlanoResposta?.nome_plano_resposta || '');
    const [formPlanoDataInicio, setFormPlanoDataInicio] = useState(riscoPlanoResposta?.data_inicio || '');
    const [formPlanoDataFim, setFormPlanoDataFim] = useState(riscoPlanoResposta?.data_fim || '');
    const [formPlanoRespostaAtivo, setFormPlanoRespostaAtivo] = useState(riscoPlanoResposta?.ativo || '');

    useEffect(() => {
        if (riscoPlanoResposta && riscoPlanoResposta.nome_plano_resposta !== undefined) {
            setFormPlanoRespostaRisco(riscoPlanoResposta.nome_plano_resposta);
        }
        if (riscoPlanoResposta && riscoPlanoResposta.data_inicio !== undefined) {
            setFormPlanoDataInicio(riscoPlanoResposta.data_inicio);
        }
        if (riscoPlanoResposta && riscoPlanoResposta.data_fim !== undefined) {
            setFormPlanoDataFim(riscoPlanoResposta.data_fim);
        }
        if (riscoPlanoResposta && riscoPlanoResposta.ativo !== undefined) {
            setFormPlanoRespostaAtivo(riscoPlanoResposta.ativo);
        }
    }, [riscoPlanoResposta])


    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------

    const handlePlanoRespostaRisco = (e) => {
        setFormPlanoRespostaRisco(e.target.value);
    };

    const handleDataInicio = (e) => {
        setFormPlanoDataInicio(e.target.value);
    };

    const handleDataFim = (e) => {
        const value = e.target.value;
        setFormPlanoDataFim(value);

        if ((formPlanoDataInicio > value) && value) {
            toast.error('A data de fim deve ser posterior a de inicio');
        }
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const planoRespostaRiscoAtualizado = {
            nome_plano_resposta: formPlanoRespostaRisco,
            data_inicio: formPlanoDataInicio,
            data_fim: formPlanoDataFim,
            ativo: formPlanoRespostaAtivo
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_PLANO_RESPOSTA + '/' + id, planoRespostaRiscoAtualizado);

            if (result.status === 201) {

                atualizacaoBemSucedida = true;

                toast.success("Plano De Resposta de risco atualizado com sucesso.", {
                    onClose: () => navegar(routes.risco_plano_resposta_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar o Plano De Resposta de risco`');
            }

        } catch (error) {
            toast.error('Erro ao tentar atualizar o Plano De Resposta de risco`', error);
        } finally {
            if (atualizacaoBemSucedida) {

                //Limpa todos os dados do formulário

                setFormPlanoRespostaRisco('');
                setFormPlanoDataInicio('');
                setFormPlanoDataFim('');
                setFormPlanoRespostaAtivo('');

            }
            setAtualizarDesabilitado(true);
        }

    };


    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Risco" nomeSessao="Atualizar Plano Resposta de risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea>

                        <TextInput
                            maxLength="200"
                            nomeComponente="Planoresposta"
                            required
                            valorComponente={formPlanoRespostaRisco}
                            valorLabel="Plano Resposta "
                            autoComplete="plano resposta"
                            autofocus={true}
                            colSpan='4'
                            mt='2'
                            placeholder="Digite o nome"
                            type='text'
                            onChange={handlePlanoRespostaRisco}
                        />

                    </InternalArea>


                    <InternalArea loading={loadingPlanoRespostaRisco}>

                        <DatePickerUnit
                            nomeComponente="Data de Início"
                            valorLabel={formPlanoDataInicio}
                            required
                            onChange={handleDataInicio}
                            colSpan='2'
                            open
                        />

                        <DatePickerUnit
                            nomeComponente="Data de Fim"
                            valorLabel={formPlanoDataFim}
                            required
                            onChange={handleDataFim}
                            colSpan='2'
                            open
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formPlanoRespostaAtivo}
                            nomeComponenteAtivo="planoresposta-ativo"
                            nomeComponenteInativo="planoresposta-inativo"
                            onChange={setFormPlanoRespostaAtivo}
                            valorLabel="Plano Resposta Ativo ?"
                            colSpan='4'
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingPlanoRespostaRisco}>
                        <ButtonComponent tipo="cancelar" onClick={handleNavegacaoPaginaAnterior}>
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

export default AtualizarRiscoPlanoResposta;
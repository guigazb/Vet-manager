import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import routes from '../../../../data/routes';

import Actions from '../../../../components/geral/Actions'
import MainLayout from '../../../MainLayout';
import FormPadrao from '../../../../components/body/FormPadrao';
import InternalArea from '../../../../components/body/InternalArea';
import InternalButtonArea from '../../../../components/body/InternalButtonArea';

import TextInput from '../../../../components/textinput/TextInput';
import TextAreaInput from '../../../../components/textinput/TextAreaInput';
import RadioButtonBooleanInput from '../../../../components/radiobutton/RadioButtonBooleanInput';
import ButtonComponent from '../../../../components/button/ButtonComponent';

import axios from 'axios';

import { useFetchRiscoRespostaEvento } from '../../../../hooks/risco/useFetchRiscoRespostaEvento';

const AtualizarRiscoRespostaEvento = () => {
    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_resposta_risco_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoRespostaEvento, loading: loadingRespostaEventoRisco } = useFetchRiscoRespostaEvento(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formRespostaEventoRisco, setFormRespostaEventoRisco] = useState(riscoRespostaEvento?.nome_resposta || '');
    const [formDescricaoRespostaEventoRisco, setFormDescricaoRespostaEventoRisco] = useState(riscoRespostaEvento?.descricao_resposta || '');
    const [formRespostaEventoAtivo, setFormRespostaEventoAtivo] = useState(riscoRespostaEvento?.ativo || '');

    useEffect(() => {
        if (riscoRespostaEvento && riscoRespostaEvento.nome_resposta !== undefined) {
            setFormRespostaEventoRisco(riscoRespostaEvento.nome_resposta);
        }
        if (riscoRespostaEvento && riscoRespostaEvento.descricao_resposta !== undefined) {
            setFormDescricaoRespostaEventoRisco(riscoRespostaEvento.descricao_resposta);
        }
        if (riscoRespostaEvento && riscoRespostaEvento.ativo !== undefined) {
            setFormRespostaEventoAtivo(riscoRespostaEvento.ativo);
        }
    }, [riscoRespostaEvento])


    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------
    const handleRespostaEventoRisco = (e) => {
        setFormRespostaEventoRisco(e.target.value);
    };

    const handleDescricao = (e) => {
        setFormDescricaoRespostaEventoRisco(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const respostaEventoRiscoAtualizado = {
            nome_resposta: formRespostaEventoRisco,
            descricao_resposta: formDescricaoRespostaEventoRisco,
            ativo: formRespostaEventoAtivo
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_RESPOSTA_EVENTO_RISCO + "/" + id, respostaEventoRiscoAtualizado);

            if (result.status === 201) {

                atualizacaoBemSucedida = true;

                toast.success("Resposta de Evento de risco atualizada com sucesso.", {
                    onClose: () => navegar(routes.risco_resposta_evento_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar a Resposta Evento de risco`');
            }

        } catch (error) {
            toast.error('Erro ao tentar atualizar a Resposta Evento de risco`', error);
        } finally {
            if (atualizacaoBemSucedida) {

                //Limpa todos os dados do formulário

                setFormRespostaEventoRisco('');
                setFormDescricaoRespostaEventoRisco('');
                setFormRespostaEventoAtivo('');

            }
            setAtualizarDesabilitado(true);
        }

    };


    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastros : Risco" nomeSessao="Atualizar Resposta dos Eventos de Risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingRespostaEventoRisco}>

                        <TextInput
                            maxLength="20"
                            nomeComponente="respostaeventorisco"
                            required
                            valorComponente={formRespostaEventoRisco}
                            valorLabel="Resposta Evento de Risco"
                            autoComplete="resposta evento"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite a Resposta"
                            type='text'
                            onChange={handleRespostaEventoRisco}
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoRespostaEventoRisco}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            onChange={handleDescricao}

                        />

                        <RadioButtonBooleanInput
                            valorComponente={formRespostaEventoAtivo}
                            nomeComponenteAtivo="respostaeventorisco-ativo"
                            nomeComponenteInativo="respostaeventorisco-inativo"
                            onChange={setFormRespostaEventoAtivo}
                            valorLabel="Resposta Evento Ativa ?"
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingRespostaEventoRisco}>
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

export default AtualizarRiscoRespostaEvento;
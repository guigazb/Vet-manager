import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions'
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';
import TextInput from '../../../components/textinput/TextInput';
import DatePickerUnit from '../../../components/geral/DatePickerUnit';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';

import Modal from '../../../components/body/modal/Modal';
import ModalCorpo from '../../../components/body/modal/ModalCorpo';
import ModalCabecalho from '../../../components/body/modal/ModalCabecalho';
import ModalRodape from '../../../components/body/modal/ModalRodape';
import ButtonComponent from '../../../components/button/ButtonComponent';

import routes from '../../../data/routes';
import axios from 'axios';

import { useFetchRiscoPlanoResposta } from '../../../hooks/risco/useFetchRiscoPlanoResposta';

const ExcluirRiscoPlanoResposta = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Modal
    // ----------------------------------------------------------------------------------------------
    const [modalAberto, setModalAberto] = useState(false);
    const formRef = useRef(null); // Cria uma referência para o formulário

    const handleAbrirModal = () => {
        setModalAberto(true);
    };

    const handleFecharModal = () => {
        setModalAberto(false);
    };

    const handleConfirmarExclusaoNoModal = () => {
        if (formRef.current) {
            formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
        }
    };

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_plano_resposta_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

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
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        let exclusaoBemSucedida = false;

        try {
            const result = await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_PLANO_RESPOSTA + '/' + id);

            if (result.status === 204) {

                exclusaoBemSucedida = true;

                toast.success("Plano De Resposta de risco excluido com sucesso.", {
                    onClose: () => navegar(routes.risco_plano_resposta_listar)
                });

                setModalAberto(false);

            } else {
                toast.error('Erro ao tentar excluir o Plano De Resposta de risco`');
            }
        } catch (error) {
            toast.error('Erro ao tentar excluir o Plano De Resposta de risco`', error);
        } finally {
            if (exclusaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormPlanoRespostaRisco('');
                setFormPlanoDataInicio('');
                setFormPlanoDataFim('');
                setFormPlanoRespostaAtivo('');

            }
            setExcluirDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Excluir Plano Resposta" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

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
                            desabilitado
                        />

                    </InternalArea>


                    <InternalArea loading={loadingPlanoRespostaRisco}>

                        <DatePickerUnit
                            nomeComponente="Data de Início"
                            valorLabel={formPlanoDataInicio}
                            required
                            colSpan='2'
                            open
                            desabilitado
                        />

                        <DatePickerUnit
                            nomeComponente="Data de Fim"
                            valorLabel={formPlanoDataFim}
                            required
                            colSpan='2'
                            open
                            desabilitado
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formPlanoRespostaAtivo}
                            nomeComponenteAtivo="planoresposta-ativo"
                            nomeComponenteInativo="planoresposta-inativo"
                            valorLabel="Plano Resposta Ativo ?"
                            colSpan='4'
                            desabilitado
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingPlanoRespostaRisco}>
                        <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="alerta" desabilitado={excluirDesabilitado} tipoBotao="button" onClick={handleAbrirModal}>
                            Excluir Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

                <Modal modalAberto={modalAberto} onFechar={handleFecharModal}>
                    <ModalCabecalho onFechar={handleFecharModal}>
                        Exclusão de Plano Resposta
                    </ModalCabecalho>
                    <ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formPlanoRespostaRisco}</b>]?
                    </ModalCorpo>
                    <ModalRodape>
                        <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModal}>
                            Fechar Janela
                        </ButtonComponent>
                        <ButtonComponent tipo="perigo" tipoBotao="button" onClick={handleConfirmarExclusaoNoModal}>
                            Excluir Registro
                        </ButtonComponent>
                    </ModalRodape>
                </Modal>

            </React.Fragment>
        </MainLayout>
    );
}

export default ExcluirRiscoPlanoResposta;
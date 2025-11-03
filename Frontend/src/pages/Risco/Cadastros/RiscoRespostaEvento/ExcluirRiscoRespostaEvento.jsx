import React, { useEffect, useState, useRef } from 'react';
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

import Modal from '../../../../components/body/modal/Modal';
import ModalCorpo from '../../../../components/body/modal/ModalCorpo';
import ModalCabecalho from '../../../../components/body/modal/ModalCabecalho';
import ModalRodape from '../../../../components/body/modal/ModalRodape';
import ButtonComponent from '../../../../components/button/ButtonComponent';

import routes from '../../../../data/routes';

import axios from 'axios';

import { useFetchRiscoRespostaEvento } from '../../../../hooks/risco/useFetchRiscoRespostaEvento';

const ExcluirRiscoRespostaEvento = () => {
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
        navegar(routes.risco_resposta_risco_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

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
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        let exclusaoBemSucedida = false;

        try {
            const result = await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_RESPOSTA_EVENTO_RISCO + '/' + id);

            if (result.status === 204) {

                exclusaoBemSucedida = true;


                toast.success("Resposta para evento de risco excluida com sucesso.", {
                    onClose: () => navegar(routes.risco_resposta_evento_listar)
                });


                setModalAberto(false);

            } else {
                toast.error('Erro ao tentar excluir a Resposta para evento de risco`');
            }
        } catch (error) {
            toast.error('Erro ao tentar excluir a Resposta para evento de risco`', error);
        } finally {
            if (exclusaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormRespostaEventoRisco('');
                setFormDescricaoRespostaEventoRisco('');
                setFormRespostaEventoAtivo('');

            }
            setExcluirDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastros : Diversos" nomeSessao="Excluir Resposta evento risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

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
                            desabilitado
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
                            desabilitado
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formRespostaEventoAtivo}
                            nomeComponenteAtivo="respostaeventorisco-ativo"
                            nomeComponenteInativo="respostaeventorisco-inativo"
                            valorLabel="Resposta Evento Ativa ?"
                            desabilitado
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingRespostaEventoRisco}>
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
                        Exclusão de Resposta para Evento de Risco
                    </ModalCabecalho>
                    <ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formRespostaEventoRisco}</b>]?
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

export default ExcluirRiscoRespostaEvento;
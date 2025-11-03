import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFetchFerramentaSistema } from '../../../hooks/diversos/useFetchFerramentaSistema';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions'
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import TextInput from '../../../components/textinput/TextInput';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';
import ButtonComponent from '../../../components/button/ButtonComponent';

import Modal from '../../../components/body/modal/Modal';

import routes from '../../../data/routes';

import axios from 'axios';

const ExcluirFerramentaSistema = () => {

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
        navegar(routes.diversos_ferramenta_sistema_listar);
    }

    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { ferramentaSistema, loading: loadingFerramentaSistema } = useFetchFerramentaSistema(id);

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [formNomeFerramenta, setFormNomeFerramenta] = useState(ferramentaSistema?.nome || '');
    const [formFerramentaAtiva, setFormFerramentaAtiva] = useState(ferramentaSistema?.ativo || '');

    useEffect(() => {
        if (ferramentaSistema && ferramentaSistema.nome !== undefined) {
            setFormNomeFerramenta(ferramentaSistema.nome);
        }
        if (ferramentaSistema && ferramentaSistema.ativo !== undefined) {
            setFormFerramentaAtiva(ferramentaSistema.ativo);
        }
    }, [ferramentaSistema])

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_FERRAMENTA_SISTEMA + '/' + id);

            setExcluirDesabilitado(true);
            setModalAberto(false);

            toast.success("Ferramenta Sistema excluida com sucesso.", {
                onClose: () => navegar(routes.diversos_ferramenta_sistema_listar)
            });

        } catch (error) {
            toast.error('Erro ao tentar excluir a Ferramenta de sistema`', error);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Excluir Ferramenta Sistema" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingFerramentaSistema}>

                        <TextInput
                            maxLength="180"
                            nomeComponente="nomeferramentasistema"
                            required
                            valorComponente={formNomeFerramenta}
                            valorLabel="Ferramenta de sistema"
                            autoComplete="nome ferramenta"
                            colSpan='3'
                            placeholder="Digite o nome da ferramenta"
                            type='text'
                            desabilitado={true}
                        />


                        <RadioButtonBooleanInput
                            valorComponente={formFerramentaAtiva}
                            nomeComponenteAtivo="ferramenta-ativo"
                            nomeComponenteInativo="ferramenta-inativo"
                            valorLabel="Ferramenta ativa ?"
                            desabilitado={true}
                            colSpan='2'
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingFerramentaSistema}>
                        <ButtonComponent tipo="cancelar" tipoBotao='button' onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="perigo" tipoBotao='button' desabilitado={excluirDesabilitado} onClick={handleAbrirModal}>
                            Excluir Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

                <Modal modalAberto={modalAberto} onFechar={handleFecharModal}>
                    <Modal.ModalCabecalho onFechar={handleFecharModal}>
                        Exclusão de Ferramenta de Sistema
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formNomeFerramenta}</b>]?
                    </Modal.ModalCorpo>
                    <Modal.ModalRodape>
                        <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModal}>
                            Fechar Janela
                        </ButtonComponent>
                        <ButtonComponent tipo="perigo" tipoBotao="button" onClick={handleConfirmarExclusaoNoModal}>
                            Excluir Registro
                        </ButtonComponent>
                    </Modal.ModalRodape>
                </Modal>

            </React.Fragment>
        </MainLayout>
    );
}

export default ExcluirFerramentaSistema;
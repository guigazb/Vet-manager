import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions'
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import TextInput from '../../../components/textinput/TextInput';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';

//Modal
import Modal from '../../../components/body/modal/Modal';
import ButtonComponent from '../../../components/button/ButtonComponent';

import routes from '../../../data/routes';
import axios from 'axios';

import { useFetchDocumentoNormativoTipo } from '../../../hooks/diversos/useFetchDocumentoNormativoTipo';

const ExcluirTipoNormativo = () => {

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
        navegar(routes.diversos_tipo_normativo_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { documentosNormativosTipo, loading: loadingDocumentoNormativoTipo } = useFetchDocumentoNormativoTipo(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------
    const [formNomeTipoNormativo, setFormNomeTipoNormativo] = useState(documentosNormativosTipo?.tipo_normativo || '');
    const [formTipoAtivo, setFormTipoAtivo] = useState(documentosNormativosTipo?.ativo || '');

    useEffect(() => {
        if (documentosNormativosTipo && documentosNormativosTipo.tipo_normativo !== undefined) {
            setFormNomeTipoNormativo(documentosNormativosTipo.tipo_normativo);
        }
        if (documentosNormativosTipo && documentosNormativosTipo.ativo !== undefined) {
            setFormTipoAtivo(documentosNormativosTipo.ativo);
        }
    }, [documentosNormativosTipo])

    // ----------------------------------------------------------------------------------------------
    // Handle de componentes de formulário
    // ----------------------------------------------------------------------------------------------
    const handleNomeTipoNormativo = (e) => {
        setFormNomeTipoNormativo(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        setExcluirDesabilitado(false);

        try {
            await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_DOCUMENTO_NORMATIVO_TIPO + '/' + id);

            setExcluirDesabilitado(true);
            setModalAberto(false);

            toast.success("Tipo Normativo excluido com sucesso.", {
                onClose: () => navegar(routes.diversos_tipo_normativo_listar)
            });

        } catch (error) {
            toast.error('Erro ao tentar excluir o tipo Normativo`', error);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Excluir Tipo Normativo" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingDocumentoNormativoTipo}>

                        <TextInput
                            maxLength="100"
                            nomeComponente="tipoNormativo"
                            required
                            valorComponente={formNomeTipoNormativo}
                            valorLabel="Tipo Normativo"
                            autoComplete="nome Tipo"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o Tipo de normativo"
                            type='text'
                            onChange={handleNomeTipoNormativo}
                            desabilitado={true}
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formTipoAtivo}
                            nomeComponenteAtivo="tipo-ativo"
                            nomeComponenteInativo="tipo-inativo"
                            onChange={setFormTipoAtivo}
                            valorLabel="Tipo ativo ?"
                            desabilitado={true}
                        />
                    </InternalArea>

                    <InternalButtonArea loading={loadingDocumentoNormativoTipo}>
                        <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="perigo" tipoBotao="button" onClick={handleAbrirModal} desabilitado={excluirDesabilitado}>
                            Excluir Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

                <Modal modalAberto={modalAberto} onFechar={handleFecharModal}>
                    <Modal.ModalCabecalho onFechar={handleFecharModal}>
                        Exclusão de Tipo de Normativo
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formNomeTipoNormativo}</b>]?
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

export default ExcluirTipoNormativo;
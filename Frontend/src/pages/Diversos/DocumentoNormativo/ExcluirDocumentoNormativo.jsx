import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions'
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';
import DatePickerUnit from '../../../components/geral/DatePickerUnit';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';
import ButtonComponent from '../../../components/button/ButtonComponent';

import TextInput from '../../../components/textinput/TextInput';
import { useFetchDocumentoNormativo } from '../../../hooks/diversos/useFetchDocumentoNormativo';
import { useFetchDocumentoNormativoTipo } from '../../../hooks/diversos/useFetchDocumentoNormativoTipo';

import Modal from '../../../components/body/modal/Modal'

import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';

import routes from '../../../data/routes';
import axios from 'axios';

const ExcluirDocumentoNormativo = () => {

    //----------------------------------------------------------------------------------------------
    // Variaveis de backend
    //----------------------------------------------------------------------------------------------
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.diversos_documento_normativo_listar);
    }

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
    // Variáveis para trazer dados
    // ----------------------------------------------------------------------------------------------
    const { documentosNormativos, loading: loadingDocumentosNormativos } = useFetchDocumentoNormativo(id);
    const { documentosNormativosTipo, loading: loadingDocumentosNormativosTipo } = useFetchDocumentoNormativoTipo();

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [formNomeDocumentoNormativo, setFormNomeDocumentoNormativo] = useState(documentosNormativos?.nome_normativo || '');
    const [formTipoDocumentoNormativoId, setFormTipoDocumentoSelecionadoId] = useState(documentosNormativos?.tipo_normativo_id || '');
    const [formDataPublicacao, setFormDataPublicacao] = useState(documentosNormativos?.data_publicacao || '');
    const [formAnoPublicacao, setFormAnoPublicacao] = useState(documentosNormativos?.ano_publicacao || '');
    const [formDocumentoAtivo, setFormDocumentoAtivo] = useState(documentosNormativos?.ativo || '');

    useEffect(() => {
        if (documentosNormativos && documentosNormativos.nome_normativo !== undefined) {
            setFormNomeDocumentoNormativo(documentosNormativos.nome_normativo);
        }
        if (documentosNormativos && documentosNormativos.tipo_normativo_id !== undefined) {
            setFormTipoDocumentoSelecionadoId(documentosNormativos.tipo_normativo_id);
        }
        if (documentosNormativos && documentosNormativos.data_publicacao !== undefined) {
            setFormDataPublicacao(documentosNormativos.data_publicacao);
        }
        if (documentosNormativos && documentosNormativos.ano_publicacao !== undefined) {
            setFormAnoPublicacao(documentosNormativos.ano_publicacao);
        }
        if (documentosNormativos && documentosNormativos.ativo !== undefined) {
            setFormDocumentoAtivo(documentosNormativos.ativo);
        }
    }, [documentosNormativos])

    // ----------------------------------------------------------------------------------------------
    // Handles de campos da tela
    // ----------------------------------------------------------------------------------------------
    const handleNomeDocumentoNormativo = (e) => {
        setFormNomeDocumentoNormativo(e.target.value);
    };

    const handleDataPublicacao = (e) => {
        setFormDataPublicacao(e.target.value);
    };

    const handleAnoPublicacao = (e) => {
        setFormAnoPublicacao(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_DOCUMENTO_NORMATIVO + '/' + id);

            setExcluirDesabilitado(true);
            setModalAberto(false);

            toast.success("Documento Normativo excluido com sucesso.", {
                onClose: () => navegar(routes.diversos_documento_normativo_listar)
            });

        } catch (error) {
            toast.error('Erro ao tentar excluir o Documento Normativo`', error);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Excluir Documento Normativo" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingDocumentosNormativos}>

                        <TextInput
                            maxLength="256"
                            nomeComponente="nomedocumentonormativo"
                            required
                            valorComponente={formNomeDocumentoNormativo}
                            valorLabel="Nome do Documento"
                            autoComplete="nome documento"
                            desabilitado={true}
                            colSpan='3'
                            placeholder="Digite o Nome do Documento Normativo"
                            type='text'
                            onChange={handleNomeDocumentoNormativo}
                        />

                        <SelectInputPadrao
                            label="Tipo de Normativo"
                            options={documentosNormativosTipo}
                            optionKey="id"
                            optionValue="tipo_normativo"
                            value={formTipoDocumentoNormativoId}
                            onChange={setFormTipoDocumentoSelecionadoId}
                            loading={loadingDocumentosNormativosTipo}
                            nomeSelect="tipoNormativo"
                            col_span="2"
                            desabilitado={true}
                        />

                        <TextInput
                            maxLength="4"
                            nomeComponente="ano"
                            required
                            valorComponente={formAnoPublicacao}
                            valorLabel="Ano de Publicação"
                            autoComplete="ano"
                            desabilitado={true}
                            colSpan='2'
                            placeholder="Digite o ano"
                            type='text'
                            onChange={handleAnoPublicacao}
                        />

                        <DatePickerUnit
                            nomeComponente="Data de Publicação"
                            valorLabel={formDataPublicacao}
                            required
                            onChange={handleDataPublicacao}
                            colSpan='2'
                            desabilitado={true}
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formDocumentoAtivo}
                            nomeComponenteAtivo="documento-ativo"
                            nomeComponenteInativo="documento-inativo"
                            onChange={setFormDocumentoAtivo}
                            valorLabel="Documento ativo ?"
                            desabilitado={true}
                        />

                    </InternalArea>

                    <InternalButtonArea>
                        <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="perigo" tipoBotao='button' desabilitado={excluirDesabilitado} onClick={handleAbrirModal}>
                            Excluir Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

                <Modal modalAberto={modalAberto} onFechar={handleFecharModal}>
                    <Modal.ModalCabecalho onFechar={handleFecharModal}>
                        Exclusão de Documento Normativo
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formNomeDocumentoNormativo}</b>]?
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

    )
}

export default ExcluirDocumentoNormativo
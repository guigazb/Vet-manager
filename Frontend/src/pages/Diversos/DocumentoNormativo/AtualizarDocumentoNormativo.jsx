import React, { useEffect, useState } from 'react';
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

import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';

import routes from '../../../data/routes';
import axios from 'axios';

const AtualizarDocumentoNormativo = () => {

    //----------------------------------------------------------------------------------------------
    // Variaveis de backend
    //----------------------------------------------------------------------------------------------
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

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

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setAtualizarDesabilitado(false);

        const documentoNormativoAtualizado = {
            nome_normativo: formNomeDocumentoNormativo,
            data_publicacao: formDataPublicacao,
            ano_publicacao: formAnoPublicacao,
            tipo_normativo_id: formTipoDocumentoNormativoId,
            ativo: formDocumentoAtivo,
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_DOCUMENTO_NORMATIVO + '/' + id, documentoNormativoAtualizado);

            if (result.status === 201) {
                atualizacaoBemSucedida = true;
                setAtualizarDesabilitado(true);

                toast.success("Documento Normativo atualizado com sucesso.", {
                    onClose: () => navegar(routes.diversos_documento_normativo_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar o Documento Normativo`');
            }

        } catch (error) {
            toast.error('Erro ao tentar atualizar o Documento Normativo`', error);
        }

        if (atualizacaoBemSucedida) {
            //Limpa todos os dados do formulário
            setFormNomeDocumentoNormativo("");
            setFormTipoDocumentoSelecionadoId("");
            setFormDataPublicacao("");
            setFormAnoPublicacao("");
            setFormDocumentoAtivo("");
        }
    };

    return (
        <MainLayout>

            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Atualizar Documento Normativo" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingDocumentosNormativos}>

                        <TextInput
                            maxLength="256"
                            nomeComponente="nomedocumentonormativo"
                            required
                            valorComponente={formNomeDocumentoNormativo}
                            valorLabel="Nome do Documento"
                            autoComplete="nome documento"
                            autofocus={true}
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
                        />

                        <TextInput
                            maxLength="4"
                            nomeComponente="ano"
                            required
                            valorComponente={formAnoPublicacao}
                            valorLabel="Ano de Publicação"
                            autoComplete="ano"
                            autofocus={false}
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
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formDocumentoAtivo}
                            nomeComponenteAtivo="documento-ativo"
                            nomeComponenteInativo="documento-inativo"
                            onChange={setFormDocumentoAtivo}
                            valorLabel="Documento ativo ?"
                        />

                    </InternalArea>

                    <InternalButtonArea>
                        <ButtonComponent tipo="cancelar" tipoBotao='button' onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="alerta" desabilitado={atualizarDesabilitado}>
                            Atualizar Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

            </React.Fragment>
        </MainLayout>

    )
}

export default AtualizarDocumentoNormativo
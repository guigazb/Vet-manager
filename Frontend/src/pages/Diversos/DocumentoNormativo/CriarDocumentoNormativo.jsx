import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import routes from '../../../data/routes';
import { useNavigate } from 'react-router-dom';

import Actions from '../../../components/geral/Actions'
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import TextInput from '../../../components/textinput/TextInput';
import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import DatePickerUnit from '../../../components/geral/DatePickerUnit';
import ButtonComponent from '../../../components/button/ButtonComponent';

import { useFetchDocumentoNormativoTipo } from '../../../hooks/diversos/useFetchDocumentoNormativoTipo';

import axios from 'axios';

const CriarDocumentoNormativo = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.diversos_documento_normativo_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variaveis para form
    // ----------------------------------------------------------------------------------------------
    const [formNomeDocumentoNormativo, setFormNomeDocumentoNormativo] = useState('');
    const [formTipoDocumentoNormativoId, setFormTipoSelecionadoId] = useState('0');
    const [formDataPublicacao, setFormDataPublicacao] = useState('');
    const [formAnoPublicacao, setFormAnoPublicacao] = useState('');

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { documentosNormativosTipo, loading: loadingDocumentosNormativosTipo } = useFetchDocumentoNormativoTipo();

    // ----------------------------------------------------------------------------------------------
    // Handles de componentes
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
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novoDocumentoNormativo = {
            nome_normativo: formNomeDocumentoNormativo,
            data_publicacao: formDataPublicacao,
            ano_publicacao: formAnoPublicacao,
            tipo_normativo_id: formTipoDocumentoNormativoId,
        };

        let criacaoBemSucedida = false;

        try {
            const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_DOCUMENTO_NORMATIVO, novoDocumentoNormativo);

            if (result.status === 201) {
                toast.success("Documento Normativo salvo com sucesso.");
                criacaoBemSucedida = true;
            } else {
                toast.error('Erro ao tentar salvar o Documento Normativo`');
            }
        } catch (error) {
            toast.error('Erro ao tentar salvar o Documento Normativo`', error);
        }

        if (criacaoBemSucedida) {
            //Limpa todos os dados do formulário
            setFormNomeDocumentoNormativo("");
            setFormTipoSelecionadoId("");
            setFormDataPublicacao("");
            setFormAnoPublicacao("");
        }
    };

    return (

        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Cadastro de Documentos Normativos" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

                    <InternalArea loading={loadingDocumentosNormativosTipo}>

                        <TextInput
                            maxLength="256"
                            nomeComponente="nomedocumentonormativo"
                            required
                            valorComponente={formNomeDocumentoNormativo}
                            valorLabel="Nome do Documento"
                            autoComplete="nome documento"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o Nome do Documento Normativo"
                            type='text'
                            onChange={handleNomeDocumentoNormativo}
                        />

                        <SelectInputPadrao
                            label="Tipo de Documento"
                            options={documentosNormativosTipo}
                            optionKey="id"
                            optionValue="tipo_normativo"
                            value={formTipoDocumentoNormativoId}
                            onChange={setFormTipoSelecionadoId}
                            loading={loadingDocumentosNormativosTipo}
                            nomeSelect="Tipo de Documento"
                            desabilitado={false}
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
                            mt='2'
                            placeholder="Digite o ano"
                            type='text'
                            onChange={handleAnoPublicacao}
                        />

                        <DatePickerUnit
                            nomeComponente="Data de Publicação"
                            required
                            valorLabel={formDataPublicacao}
                            onChange={handleDataPublicacao}
                            colSpan='2'
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingDocumentosNormativosTipo}>
                        <ButtonComponent tipo="cancelar" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="sucesso">
                            Salvar Novo Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

            </React.Fragment>
        </MainLayout>

    )
}

export default CriarDocumentoNormativo
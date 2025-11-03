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
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';
import ButtonComponent from '../../../components/button/ButtonComponent';

import { useFetchDocumentoNormativoTipo } from '../../../hooks/diversos/useFetchDocumentoNormativoTipo';

import axios from 'axios';

const AtualizarTipoNormativo = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.diversos_tipo_normativo_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

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
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setAtualizarDesabilitado(false);

        const tipoNormativoAtualizado = {
            tipo_normativo: formNomeTipoNormativo,
            ativo: formTipoAtivo,
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_DOCUMENTO_NORMATIVO_TIPO + '/' + id, tipoNormativoAtualizado);

            if (result.status === 201) {
                atualizacaoBemSucedida = true;
                setAtualizarDesabilitado(true);

                toast.success("Tipo Normativo atualizado com sucesso.", {
                    onClose: () => navegar(routes.diversos_tipo_normativo_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar o Tipo Normativo');
            }
        } catch (error) {
            toast.error('Erro ao tentar atualizar o Tipo Normativo`', error);
        }

        if (atualizacaoBemSucedida) {
            //Limpa todos os dados do formulário
            setFormNomeTipoNormativo("");
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Atualizar Tipo Normativo" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

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
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formTipoAtivo}
                            nomeComponenteAtivo="tipo-ativo"
                            nomeComponenteInativo="tipo-inativo"
                            onChange={setFormTipoAtivo}
                            valorLabel="Tipo ativo ?"
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingDocumentoNormativoTipo}>
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

export default AtualizarTipoNormativo;
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

import { useFetchRiscoTipoControleAcao } from '../../../../hooks/risco/useFetchRiscoTipoControleAcao';


const AtualizarRiscoTipoControleAcao = () => {

    // ----------------------------------------------------------------------------------------------
    // Variaveis de backend
    // ----------------------------------------------------------------------------------------------
    const urlBackend = import.meta.env.VITE_API_URL_BACKEND;

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_tipo_controle_acao_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { tipoControleAcao, loading: loadingTipoControleAcaoRisco } = useFetchRiscoTipoControleAcao(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formTipoControleAcaoRisco, setFormTipoControleAcaoRisco] = useState(tipoControleAcao?.nome_tipo_controle || '');
    const [formDescricaoTipoControleAcao, setFormDescricaoTipoControleAcao] = useState(tipoControleAcao?.descricao_tipo_controle || '');
    const [formTipoControleAcaoAtivo, setFormTipoControleAcaoAtivo] = useState(tipoControleAcao?.ativo || '');

    useEffect(() => {
        if (tipoControleAcao && tipoControleAcao.nome_tipo_controle !== undefined) {
            setFormTipoControleAcaoRisco(tipoControleAcao.nome_tipo_controle);
        }
        if (tipoControleAcao && tipoControleAcao.descricao_tipo_controle !== undefined) {
            setFormDescricaoTipoControleAcao(tipoControleAcao.descricao_tipo_controle);
        }
        if (tipoControleAcao && tipoControleAcao.ativo !== undefined) {
            setFormTipoControleAcaoAtivo(tipoControleAcao.ativo);
        }
    }, [tipoControleAcao])

    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------
    const handleTipoControleAcaoRisco = (e) => {
        setFormTipoControleAcaoRisco(e.target.value);
    };

    const handleDescricao = (e) => {
        setFormDescricaoTipoControleAcao(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const tipoControleAcaoRiscoAtualizado = {
            nome_tipo_controle: formTipoControleAcaoRisco,
            descricao_tipo_controle: formDescricaoTipoControleAcao,
            ativo: formTipoControleAcaoAtivo
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(urlBackend + '/risco/tipocontroleacao/' + id, tipoControleAcaoRiscoAtualizado);

            if (result.status === 201) {

                atualizacaoBemSucedida = true;

                toast.success("Tipo de controle ação atualizado com sucesso.", {
                    onClose: () => navegar(routes.risco_tipo_controle_acao_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar o Tipo de controle ação`');
            }

        } catch (error) {
            toast.error('Erro ao tentar atualizar o Tipo de controle ação`', error);
        } finally {
            if (atualizacaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormTipoControleAcaoRisco('');
                setFormDescricaoTipoControleAcao('');
                setFormTipoControleAcaoAtivo('');

            }
            setAtualizarDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastros : Risco" nomeSessao="Atualizar Tipo de Controle Ação" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingTipoControleAcaoRisco}>

                        <TextInput
                            maxLength="50"
                            nomeComponente="tipocontroleacao"
                            required
                            valorComponente={formTipoControleAcaoRisco}
                            valorLabel="Tipo de controle ação"
                            autoComplete="tipo de controle"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o tipo"
                            type='text'
                            onChange={handleTipoControleAcaoRisco}
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoTipoControleAcao}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            onChange={handleDescricao}
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formTipoControleAcaoAtivo}
                            nomeComponenteAtivo="tipocontroleacao-ativo"
                            nomeComponenteInativo="tipocontroleacao-inativo"
                            onChange={setFormTipoControleAcaoAtivo}
                            valorLabel="Tipo de controle ação ativo ?"
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingTipoControleAcaoRisco}>
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

export default AtualizarRiscoTipoControleAcao;
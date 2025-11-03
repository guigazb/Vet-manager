import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../../../data/routes';

import Actions from '../../../components/geral/Actions'
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import TextInput from '../../../components/textinput/TextInput';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';

import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import ButtonComponent from '../../../components/button/ButtonComponent';
import axios from 'axios';

import { useFetchUnidadeFuncionalTipo } from '../../../hooks/diversos/useFetchUnidadeFuncionalTipo';
import { useFetchLocaisDeExecucao } from '../../../hooks/diversos/useFetchLocaisDeExecucao';
import { useFetchUnidadesFuncionaisPorLocalExecucao } from '../../../hooks/diversos/useFetchUnidadesFuncionaisPorLocalExecucao';

const CriarUnidadeFuncional = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.diversos_unidade_funcional_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------
    const [formNomeUnidade, setFormNomeUnidade] = useState('');
    const [formLocalExecucaoId, setFormLocalExecucaoId] = useState('0');
    const [formUnidadeFuncionalPaiId, setformUnidadeFuncionalPaiId] = useState('0');
    const [formOrganograma, setOrganograma] = useState(false);
    const [formTipoUnidadeFuncionalId, setFormTipoUnidadeFuncionalId] = useState('0');
    const [formSigla, setFormSigla] = useState('');

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { locais, loading: loadingLocais } = useFetchLocaisDeExecucao();
    const { unidadesPorLocalExecucao, loading: loadingUnidadesFuncionais } = useFetchUnidadesFuncionaisPorLocalExecucao(formLocalExecucaoId);
    const { unidadeFuncionalTipo, loading: loadingUnidadeFuncionalTipo } = useFetchUnidadeFuncionalTipo();

    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------
    const handleNomeUnidade = (e) => {
        setFormNomeUnidade(e.target.value);
    };

    const handleSigla = (e) => {
        setFormSigla(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novaUnidadeFuncional = {
            nome: formNomeUnidade,
            local_execucao_id: formLocalExecucaoId,
            unidade_funcional_pai: formUnidadeFuncionalPaiId,
            organograma: formOrganograma,
            tipo_unidade_id: formTipoUnidadeFuncionalId,
            sigla: formSigla
        };

        let criacaoBemSucedida = false;

        try {
            const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_UNIDADE_FUNCIONAL, novaUnidadeFuncional);

            if (result.status === 201) {
                criacaoBemSucedida = true;
                toast.success("Unidade Funcional salvo com sucesso.");
            } else {
                toast.error('Erro ao tentar salvar a Unidade Funcional');
            }
        } catch (error) {
            toast.error('Erro ao tentar salvar a Unidade Funcional', error);
        }

        if (criacaoBemSucedida) {
            //Limpa todos os dados do formulário
            setFormNomeUnidade('');
            setFormLocalExecucaoId('');
            setformUnidadeFuncionalPaiId('');
            setOrganograma(false);
            setFormTipoUnidadeFuncionalId('');
            setFormSigla('');
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Cadastro de Unidade Funcional" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

                    <InternalArea>

                        <TextInput
                            maxLength="100"
                            nomeComponente="nomeunidadefuncional"
                            required
                            valorComponente={formNomeUnidade}
                            valorLabel="Unidade Funcional"
                            autoComplete="nome da unidade"
                            autofocus={true}
                            colSpan='3'
                            placeholder="Digite o nome da unidade funcional"
                            type='text'
                            onChange={handleNomeUnidade}
                        />

                        <SelectInputPadrao
                            label="Local de Execução"
                            options={locais}
                            optionKey="id"
                            optionValue="nome"
                            value={formLocalExecucaoId}
                            onChange={setFormLocalExecucaoId}
                            loading={loadingLocais}
                            nomeSelect="localExecucao"
                            required
                        />

                        <SelectInputPadrao
                            label="Unidade Funcional Pai"
                            options={unidadesPorLocalExecucao}
                            optionKey="unidade_funcional_id"
                            optionValue="unidade_funcional_nome"
                            value={formUnidadeFuncionalPaiId}
                            onChange={setformUnidadeFuncionalPaiId}
                            loading={loadingUnidadesFuncionais}
                            nomeSelect="unidadeFuncional"
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formOrganograma}
                            nomeComponenteAtivo="organograma-sim"
                            nomeComponenteInativo="organograma-nao"
                            onChange={setOrganograma}
                            valorLabel="Organograma ?"
                        />

                        <SelectInputPadrao
                            label="Tipo de Unidade"
                            options={unidadeFuncionalTipo}
                            optionKey="id"
                            optionValue="tipo"
                            value={formTipoUnidadeFuncionalId}
                            onChange={setFormTipoUnidadeFuncionalId}
                            loading={loadingUnidadeFuncionalTipo}
                            nomeSelect="tipoUnidade"
                        />

                        <TextInput
                            maxLength="30"
                            nomeComponente="sigla"
                            required
                            valorComponente={formSigla}
                            valorLabel="Sigla"
                            autoComplete="Sigla da unidade"
                            autofocus={false}
                            colSpan='2'
                            mt='2'
                            placeholder="Digite a sigla da unidade funcional"
                            type='text'
                            onChange={handleSigla}
                        />

                    </InternalArea>

                    <InternalButtonArea>
                        <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="sucesso">
                            Salvar Novo Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

            </React.Fragment>
        </MainLayout>
    );
}

export default CriarUnidadeFuncional;
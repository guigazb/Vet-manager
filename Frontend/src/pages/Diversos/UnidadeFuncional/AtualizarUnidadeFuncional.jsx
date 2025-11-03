import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../../data/routes';

import Actions from '../../../components/geral/Actions'
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import TextInput from '../../../components/textinput/TextInput';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';
import ButtonComponent from '../../../components/button/ButtonComponent';

import axios from 'axios';

import { useFetchUnidadesFuncionais } from '../../../hooks/diversos/useFetchUnidadesFuncionais';
import { useFetchUnidadeFuncionalTipo } from '../../../hooks/diversos/useFetchUnidadeFuncionalTipo';
import { useFetchLocaisDeExecucao } from '../../../hooks/diversos/useFetchLocaisDeExecucao';
import { useFetchUnidadesFuncionaisPorLocalExecucao } from '../../../hooks/diversos/useFetchUnidadesFuncionaisPorLocalExecucao';

function AtualizarUnidadeFuncional() {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.diversos_unidade_funcional_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { unidades, loading: loadingUnidadesFuncionais } = useFetchUnidadesFuncionais(id);

    //variaveis internas
    const [formNomeUnidade, setFormNomeUnidade] = useState(unidades?.nome || '');
    const [formLocalExecucaoId, setFormLocalEscolhidoId] = useState(unidades?.local_execucao_id || '');
    const [formUnidadeFuncionalPaiId, setFormUnidadeFuncionalPaiId] = useState(unidades?.unidade_funcional_pai || '');
    const [formOrganograma, setFormOrganograma] = useState(unidades?.organograma || '');
    const [formTipoUnidadeFuncionalId, setFormTipoUnidadeFuncionalId] = useState(unidades?.tipo_unidade_id || '');
    const [formSigla, setFormSigla] = useState(unidades?.sigla || '');
    const [formUnidadeAtivo, setFormUnidadeAtivo] = useState(unidades?.ativo || '');

    const { locais, loading: loadingLocais } = useFetchLocaisDeExecucao();
    const { unidadesPorLocalExecucao, loading: loadingUnidadesFuncionaisPorLocalExecucao } = useFetchUnidadesFuncionaisPorLocalExecucao(formLocalExecucaoId);
    const { unidadeFuncionalTipo, loading: loadingUnidadeFuncionalTipo } = useFetchUnidadeFuncionalTipo();

    useEffect(() => {
        if (unidades && unidades.nome !== undefined) {
            setFormNomeUnidade(unidades.nome);
        }
        if (unidades && unidades.local_execucao_id !== undefined) {
            setFormLocalEscolhidoId(unidades.local_execucao_id);
        }
        if (unidades && unidades.unidade_funcional_pai !== undefined) {
            setFormUnidadeFuncionalPaiId(unidades.unidade_funcional_pai);
        }
        if (unidades && unidades.organograma !== undefined) {
            setFormOrganograma(unidades.organograma);
        }
        if (unidades && unidades.tipo_unidade_id !== undefined) {
            setFormTipoUnidadeFuncionalId(unidades.tipo_unidade_id);
        }
        if (unidades && unidades.sigla !== undefined) {
            setFormSigla(unidades.sigla);
        }
        if (unidades && unidades.ativo !== undefined) {
            setFormUnidadeAtivo(unidades.ativo);
        }
    }, [unidades])

    const handleNomeUnidade = (e) => {
        setFormNomeUnidade(e.target.value);
    };

    const handleSigla = (e) => {
        setFormSigla(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const unidadeFuncionalAtualizada = {
            nome: formNomeUnidade,
            local_execucao_id: formLocalExecucaoId,
            unidade_funcional_pai: formUnidadeFuncionalPaiId,
            organograma: formOrganograma,
            tipo_unidade_id: formTipoUnidadeFuncionalId,
            sigla: formSigla,
            ativo: formUnidadeAtivo
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_UNIDADE_FUNCIONAL + '/' + id, unidadeFuncionalAtualizada);

            if (result.status === 201) {
                atualizacaoBemSucedida = true;
                setAtualizarDesabilitado(true);

                toast.success("Unidade Funcional atualizada com sucesso.", {
                    onClose: () => navegar(routes.diversos_unidade_funcional_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar a Unidade Funcional');
            }
        } catch (error) {
            toast.error('Erro ao tentar atualizar a Unidade Funcional', error);
        }

        if (atualizacaoBemSucedida) {
            //Limpa todos os dados do formulário
            setFormNomeUnidade('');
            setFormLocalEscolhidoId('');
            setFormUnidadeFuncionalPaiId('');
            setFormOrganograma('');
            setFormTipoUnidadeFuncionalId('');
            setFormSigla('');
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Atualizar Unidade Funcional" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingUnidadesFuncionais}>

                        <TextInput
                            maxLength="100"
                            nomeComponente="nomeunidadefuncional"
                            required
                            valorComponente={formNomeUnidade}
                            valorLabel="Unidade Funcional"
                            autoComplete="nome da unidade"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
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
                            onChange={setFormLocalEscolhidoId}
                            loading={loadingLocais}
                            nomeSelect="localExecucao"
                        />

                        <SelectInputPadrao
                            label="Unidade Funcional"
                            options={unidadesPorLocalExecucao}
                            optionKey="unidade_funcional_id"
                            optionValue="unidade_funcional_nome"
                            value={formUnidadeFuncionalPaiId}
                            onChange={setFormUnidadeFuncionalPaiId}
                            loading={loadingUnidadesFuncionaisPorLocalExecucao}
                            nomeSelect="unidadeFuncional"
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formOrganograma}
                            nomeComponenteAtivo="organograma-sim"
                            nomeComponenteInativo="organograma-nao"
                            onChange={setFormOrganograma}
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

                        <RadioButtonBooleanInput
                            valorComponente={formUnidadeAtivo}
                            nomeComponenteAtivo="unidade-ativo"
                            nomeComponenteInativo="unidade-inativo"
                            onChange={setFormUnidadeAtivo}
                            valorLabel="Unidade ativa ?"
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingUnidadesFuncionais}>
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

export default AtualizarUnidadeFuncional;
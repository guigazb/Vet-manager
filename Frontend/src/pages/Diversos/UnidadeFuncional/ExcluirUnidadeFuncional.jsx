import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions'
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import TextInput from '../../../components/textinput/TextInput';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';

//Modal
import Modal from '../../../components/body/modal/Modal';
import ButtonComponent from '../../../components/button/ButtonComponent';

import routes from '../../../data/routes';
import axios from 'axios';

import { useFetchUnidadesFuncionais } from '../../../hooks/diversos/useFetchUnidadesFuncionais';
import { useFetchUnidadeFuncionalTipo } from '../../../hooks/diversos/useFetchUnidadeFuncionalTipo';
import { useFetchLocaisDeExecucao } from '../../../hooks/diversos/useFetchLocaisDeExecucao';
import { useFetchUnidadesFuncionaisPorLocalExecucao } from '../../../hooks/diversos/useFetchUnidadesFuncionaisPorLocalExecucao';

const ExcluirUnidadeFuncional = () => {

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
        navegar(routes.diversos_unidade_funcional_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

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

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        setExcluirDesabilitado(false);

        try {
            await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_UNIDADE_FUNCIONAL + '/' + id);

            setExcluirDesabilitado(true);
            setModalAberto(false);

            toast.success("Unidade Funcional excluida com sucesso.", {
                onClose: () => navegar(routes.diversos_unidade_funcional_listar)
            });

        } catch (error) {
            toast.error('Erro ao tentar excluir a unidade funcional`', error);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Excluir Unidade Funcional" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingUnidadesFuncionais}>

                        <TextInput
                            maxLength="100"
                            nomeComponente="nomeunidadefuncional"
                            required
                            valorComponente={formNomeUnidade}
                            valorLabel="Unidade Funcional"
                            autoComplete="nome da unidade"
                            colSpan='3'
                            placeholder="Digite o nome da unidade funcional"
                            type='text'
                            desabilitado={true}
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
                            desabilitado={true}
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
                            desabilitado={true}
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formOrganograma}
                            nomeComponenteAtivo="organograma-sim"
                            nomeComponenteInativo="organograma-nao"
                            onChange={setFormOrganograma}
                            valorLabel="Organograma ?"
                            desabilitado={true}
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
                            desabilitado={true}
                        />

                        <TextInput
                            maxLength="30"
                            nomeComponente="sigla"
                            required
                            valorComponente={formSigla}
                            valorLabel="Sigla"
                            autoComplete="Sigla da unidade"
                            colSpan='2'
                            placeholder="Digite a sigla da unidade funcional"
                            type='text'
                            desabilitado={true}
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formUnidadeAtivo}
                            nomeComponenteAtivo="unidade-ativo"
                            nomeComponenteInativo="unidade-inativo"
                            onChange={setFormUnidadeAtivo}
                            valorLabel="Unidade ativa ?"
                            desabilitado={true}
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingUnidadesFuncionais}>
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
                        Exclusão de Unidade Funcional
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formNomeUnidade}</b>]?
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
        </MainLayout >
    );
}

export default ExcluirUnidadeFuncional;
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
import RadioButtonInput from '../../../components/radiobutton/RadioButtonInput';
import ButtonComponent from '../../../components/button/ButtonComponent';

//Modal
import Modal from '../../../components/body/modal/Modal';

import routes from '../../../data/routes';
import axios from 'axios';

import { useFetchLocaisDeExecucao } from '../../../hooks/diversos/useFetchLocaisDeExecucao';
import { useFetchEstados } from '../../../hooks/diversos/useFetchEstados';
import { useFetchCidades } from '../../../hooks/diversos/useFetchCidades';
import { useFetchLocaisDeExecucaoTipo } from '../../../hooks/diversos/useFetchLocaisDeExecucaoTipo';

const ExcluirLocalExecucao = () => {

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
        navegar(routes.diversos_local_execucao_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { locais, loading: loadingLocais } = useFetchLocaisDeExecucao(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis de Formulário
    // ----------------------------------------------------------------------------------------------
    const [formNomeLocalidade, setFormNomeLocalidade] = useState(locais?.nome || '');
    const [formEnderecoLocalidade, setFormEnderecoLocalidade] = useState(locais?.endereco || '');
    const [formBairroLocalidade, setFormBairroLocalidade] = useState(locais?.bairro || '');
    const [formLocalidadeAtivo, setFormLocalidadeAtivo] = useState(locais?.ativo || '');
    const [formEstadoLocalidadeId, setFormEstadoLocalidadeId] = useState(locais?.estado_id || '');
    const [formCidadePorEstadoId, setFormCidadePorEstadoId] = useState(locais?.cidade_id || '');
    const [formTipoLocalExecucaoId, setFormTipoLocalExecucaoId] = useState(locais?.tipo_local_execucao_id || '');
    const [formCEP, setFormCEP] = useState(locais?.cep || '');

    useEffect(() => {
        if (locais && locais.nome !== undefined) {
            setFormNomeLocalidade(locais.nome);
        }
        if (locais && locais.endereco !== undefined) {
            setFormEnderecoLocalidade(locais.endereco);
        }
        if (locais && locais.bairro !== undefined) {
            setFormBairroLocalidade(locais.bairro);
        }
        if (locais && locais.estado_id !== undefined) {
            setFormEstadoLocalidadeId(locais.estado_id);
        }
        if (locais && locais.cidade_id !== undefined) {
            setFormCidadePorEstadoId(locais.cidade_id);
        }
        if (locais && locais.ativo !== undefined) {
            setFormLocalidadeAtivo(locais.ativo);
        }
        if (locais && locais.tipo_local_execucao_id !== undefined) {
            setFormTipoLocalExecucaoId(locais.tipo_local_execucao_id);
        }
        if (locais && locais.cep !== undefined) {
            setFormCEP(locais.cep);
        }
    }, [locais])

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados DEPOIS de buscar as informações na base de dados
    // ----------------------------------------------------------------------------------------------
    const { estados, loading: loadingEstados } = useFetchEstados();
    const { cidades, loading: loadingCidades } = useFetchCidades(formEstadoLocalidadeId);
    const { locaisExecucaoTipo, loading: loadingLocaisExecucaoTipo } = useFetchLocaisDeExecucaoTipo();

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        setExcluirDesabilitado(false);

        try {
            await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_LOCAL_EXECUCAO + '/' + id);

            setExcluirDesabilitado(true);
            setModalAberto(false);

            toast.success("Local de execução excluído com sucesso.", {
                onClose: () => navegar(routes.diversos_local_execucao_listar)
            });

        } catch (error) {
            toast.error('Erro ao tentar excluir o Local de execução`', error);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Excluir Local de Execução" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingLocais}>

                        <TextInput
                            maxLength="100"
                            nomeComponente="nomelocalidade"
                            required
                            valorComponente={formNomeLocalidade}
                            valorLabel="Nome da Localidade"
                            autoComplete="nomelocalidade"
                            colSpan='3'
                            placeholder="Digite o Nome da Localidade"
                            type='text'
                            desabilitado={true}
                        />

                        <TextInput
                            maxLength="255"
                            nomeComponente="endereco"
                            required
                            valorComponente={formEnderecoLocalidade}
                            valorLabel="Endereço"
                            autoComplete="endereco"
                            colSpan='3'
                            placeholder="Digite o Endereço da localidade"
                            type='text'
                            desabilitado={true}
                        />

                        <TextInput
                            maxLength="100"
                            nomeComponente="bairro"
                            required
                            valorComponente={formBairroLocalidade}
                            valorLabel="Bairro"
                            autoComplete="bairro"
                            colSpan='3'
                            placeholder="Digite o Bairro da localidade"
                            type='text'
                            desabilitado={true}
                        />

                        <TextInput
                            maxLength="9"
                            nomeComponente="cep"
                            required
                            valorComponente={formCEP}
                            valorLabel="CEP"
                            autoComplete="CEP"
                            autofocus={true}
                            colSpan='1'
                            mt='2'
                            placeholder="Digite o CEP"
                            type='text'
                            desabilitado={true}
                        />

                        <SelectInputPadrao
                            label="Escolha um Estado"
                            options={estados}
                            optionKey="id"
                            optionValue="nome"
                            value={formEstadoLocalidadeId}
                            onChange={setFormEstadoLocalidadeId}
                            loading={loadingEstados}
                            nomeSelect="estado"
                            desabilitado={true}
                        />

                        <SelectInputPadrao
                            label="Escolha uma Cidade"
                            options={cidades}
                            optionKey="id"
                            optionValue="nome"
                            value={formCidadePorEstadoId}
                            onChange={setFormCidadePorEstadoId}
                            loading={loadingCidades}
                            nomeSelect="cidade"
                            desabilitado={true}
                        />

                        <RadioButtonInput
                            colSpan='2'
                            valorLabel="Tipo Local Execução"
                            opcoesLabelValue={locaisExecucaoTipo}
                            nomeComponente="tipoLocalExecucao"
                            id="id"
                            descricao="nome"
                            valorSelecionado={formTipoLocalExecucaoId}
                            desabilitado={true}
                        />

                        <RadioButtonBooleanInput
                            valorLabel="Local de Execução Ativo?"
                            valorComponente={formLocalidadeAtivo}
                            onChange={setFormLocalidadeAtivo}
                            nomeComponenteAtivo="localidade-ativo"
                            nomeComponenteInativo="localidade-inativo"
                            colSpan='2'
                            inactiveLabel='false'
                            desabilitado={true}
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingLocais}>
                        <ButtonComponent tipo="cancelar" tipoBotao='button' onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="alerta" tipoBotao='button' onClick={handleAbrirModal} desabilitado={excluirDesabilitado}>
                            Excluir Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

                <Modal modalAberto={modalAberto} onFechar={handleFecharModal}>
                    <Modal.ModalCabecalho onFechar={handleFecharModal}>
                        Exclusão de Local de Execução
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formNomeLocalidade}</b>]?
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

export default ExcluirLocalExecucao;
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

import { useFetchUsuario } from '../../../hooks/diversos/useFetchUsuario';
import { useFetchLocaisDeExecucao } from '../../../hooks/diversos/useFetchLocaisDeExecucao';
import { useFetchPerfis } from '../../../hooks/diversos/useFetchPerfis';
import { useFetchUnidadesFuncionaisPorLocalExecucao } from '../../../hooks/diversos/useFetchUnidadesFuncionaisPorLocalExecucao';

import routes from '../../../data/routes';
import axios from 'axios';

//Modal
import Modal from '../../../components/body/modal/Modal';
import ButtonComponent from '../../../components/button/ButtonComponent';

const ExcluirUsuario = () => {

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
        navegar(routes.diversos_usuario_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados
    // ----------------------------------------------------------------------------------------------
    const { usuarios, loading: loadingUsuarios } = useFetchUsuario(id);
    const { locais, loading: loadingLocais } = useFetchLocaisDeExecucao();
    const { perfis, loading: loadingPerfis } = useFetchPerfis();

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [formNomeLogin, setFormNomeLogin] = useState(usuarios?.nome_login || '');
    const [formNomeusuario, setFormNomeUsuario] = useState(usuarios?.nome || '');
    const [formEmailUsuario, setFormEmailUsuario] = useState(usuarios?.email || '');
    const [formUsuarioAtivo, setFormUsuarioAtivo] = useState(usuarios?.ativo || '');
    const [formGerenteDeArea, setFormGerenteDeArea] = useState(usuarios?.gerente_de_area || '');
    const [formPerfilId, setFormPerfilId] = useState(usuarios?.perfil_id || '');
    const [formLocalExecucaoId, setFormLocalExecucaoId] = useState(usuarios?.local_execucao_id || '');
    const [formUnidadeFuncionalId, setFormUnidadeFuncionalId] = useState(usuarios?.unidade_funcional_id || '');

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados DEPOIS de buscar as informações na base de dados
    // ----------------------------------------------------------------------------------------------
    const { unidadesPorLocalExecucao, loading: loadingUnidadesFuncionais } = useFetchUnidadesFuncionaisPorLocalExecucao(formLocalExecucaoId);

    useEffect(() => {
        if (usuarios && usuarios.nome_login !== undefined) {
            setFormNomeLogin(usuarios.nome_login);
        }
        if (usuarios && usuarios.nome !== undefined) {
            setFormNomeUsuario(usuarios.nome);
        }
        if (usuarios && usuarios.email !== undefined) {
            setFormEmailUsuario(usuarios.email);
        }
        if (usuarios && usuarios.ativo !== undefined) {
            setFormUsuarioAtivo(usuarios.ativo);
        }
        if (usuarios && usuarios.gerente_de_area !== undefined) {
            setFormGerenteDeArea(usuarios.gerente_de_area);
        }
        if (usuarios && usuarios.perfil_id !== undefined) {
            setFormPerfilId(usuarios.perfil_id);
        }
        if (usuarios && usuarios.local_execucao_id !== undefined) {
            setFormLocalExecucaoId(usuarios.local_execucao_id);
        }
        if (usuarios && usuarios.unidade_funcional_id !== undefined) {
            setFormUnidadeFuncionalId(usuarios.unidade_funcional_id);
        }
    }, [usuarios])

    // ----------------------------------------------------------------------------------------------
    // Variáveis de botão
    // ----------------------------------------------------------------------------------------------
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Handles de campos da tela
    // ----------------------------------------------------------------------------------------------
    const handleNomeLoginChange = (e) => {
        setFormNomeLogin(e.target.value);
    };

    const handleNomeChange = (e) => {
        setFormNomeUsuario(e.target.value);
    };

    const handleEmailChange = (e) => {
        setFormEmailUsuario(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_USUARIO + "/" + id);

            setExcluirDesabilitado(true);
            setModalAberto(false);

            toast.success("Usuário excluído com sucesso.",
                {
                    onClose: () => navegar(routes.diversos_usuario_listar)
                });

        } catch (error) {
            toast.error('Erro ao tentar excluir o usuário`', error);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos"
                    nomeSessao="Exclusão de Usuário" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} id="deleteForm" onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingUsuarios}>

                        <TextInput
                            nomeComponente="nomelogin"
                            type="text"
                            placeholder="Digite o nome de login usuário."
                            maxLength="50"
                            valorLabel="Nome de Login"
                            valorComponente={formNomeLogin}
                            onChange={handleNomeLoginChange}
                            autoComplete="nomelogin"
                            colSpan="2"
                            required
                            mt="2"
                            autofocus={false}
                            desabilitado={true}
                        />

                        <TextInput
                            nomeComponente="nomeusuario"
                            type="text"
                            placeholder="Digite o nome completo do usuário."
                            maxLength="100"
                            valorLabel="Nome de Usuário"
                            valorComponente={formNomeusuario}
                            onChange={handleNomeChange}
                            autoComplete="nomeusuario"
                            required="required"
                            colSpan="4"
                            mt="2"
                            autofocus={true}
                            desabilitado={true}
                        />

                        <TextInput
                            nomeComponente="emailusuario"
                            type="text"
                            placeholder="Digite o e-mail do usuário."
                            maxLength="100"
                            valorLabel="E-mail de Usuário"
                            valorComponente={formEmailUsuario}
                            onChange={handleEmailChange}
                            autoComplete="nomeusuario"
                            required="required"
                            colSpan="3"
                            mt="2"
                            autofocus={false}
                            desabilitado={true}
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
                            col_span="2"
                            desabilitado={true}
                        />

                        <SelectInputPadrao
                            label="Unidade Funcional"
                            options={unidadesPorLocalExecucao}
                            optionKey="unidade_funcional_id"
                            optionValue="unidade_funcional_nome"
                            value={formUnidadeFuncionalId}
                            onChange={setFormUnidadeFuncionalId}
                            loading={loadingUnidadesFuncionais}
                            nomeSelect="unidadeFuncional"
                            col_span="2"
                            desabilitado={true}
                        />

                        <SelectInputPadrao
                            label="Perfil"
                            options={perfis}
                            optionKey="id"
                            optionValue="nome"
                            value={formPerfilId}
                            onChange={setFormPerfilId}
                            loading={loadingPerfis}
                            nomeSelect="perfil"
                            col_span="2"
                            desabilitado={true}
                        />

                        <RadioButtonBooleanInput
                            valorLabel="Usuário Ativo?"
                            valorComponente={formUsuarioAtivo}
                            onChange={setFormUsuarioAtivo}
                            nomeComponenteAtivo="usuario-ativo"
                            nomeComponenteInativo="usuario-inativo"
                            colSpan='1'
                            inactiveLabel='false'
                            desabilitado={true}
                        />

                        <RadioButtonBooleanInput
                            valorLabel="Gerente de Área?"
                            valorComponente={formGerenteDeArea}
                            onChange={setFormGerenteDeArea}
                            nomeComponenteAtivo="gerente-ativo"
                            nomeComponenteInativo="gerente-inativo"
                            colSpan='1'
                            mt='1'
                            inactiveLabel='false'
                            desabilitado={true}
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingUsuarios}>
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
                        Exclusão de Usuário
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formNomeusuario}</b>]?
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
    )
}

export default ExcluirUsuario

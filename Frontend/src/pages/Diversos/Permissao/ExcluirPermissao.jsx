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

import routes from '../../../data/routes';
import axios from 'axios';

import { useFetchPermissaoGrupo } from '../../../hooks/diversos/useFetchPermissaoGrupo';
import { useFetchPermissao } from '../../../hooks/diversos/useFetchPermissao';

//Modal
import Modal from '../../../components/body/modal/Modal';
import ButtonComponent from '../../../components/button/ButtonComponent';

const ExcluirPermissao = () => {

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
        navegar(routes.diversos_permissao_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { permissoes, loading: loadingPermissoes } = useFetchPermissao(id);
    const { permissaoGrupo, loading: loadingPermissaoGrupo } = useFetchPermissaoGrupo();

    // ----------------------------------------------------------------------------------------------
    // Variaveis de Formulário
    // ----------------------------------------------------------------------------------------------
    const [formNomePermissao, setFormNomePermissao] = useState(permissoes?.nome || '');
    const [formRota, setFormRota] = useState(permissoes?.rota || '');
    const [formGrupoPermissaoId, setFormGrupoPermissaoId] = useState(permissoes?.grupo_id || '');
    const [formPermissaoAtiva, setFormPermissaoAtiva] = useState(permissoes?.ativo || '');
    const [formVisivelMenu, setFormVisivelMenu] = useState(permissoes?.visivel_menu || false);
    const [formNomeMenu, setFormNomeMenu] = useState(permissoes?.nome_menu || '');
    const [formOrdemMenu, setFormOrdemMenu] = useState(permissoes?.ordem || '');

    useEffect(() => {
        if (permissoes && permissoes.nome !== undefined) {
            setFormNomePermissao(permissoes.nome);
        }
        if (permissoes && permissoes.rota !== undefined) {
            setFormRota(permissoes.rota);
        }
        if (permissoes && permissoes.grupo_id !== undefined) {
            setFormGrupoPermissaoId(permissoes.grupo_id);
        }
        if (permissoes && permissoes.ativo !== undefined) {
            setFormPermissaoAtiva(permissoes.ativo);
        }
        if (permissoes && permissoes.ativo !== undefined) {
            setFormPermissaoAtiva(permissoes.ativo);
        }
        if (permissoes && permissoes.nome_menu !== undefined) {
            setFormNomeMenu(permissoes.nome_menu);
        }
        if (permissoes && permissoes.ordem !== undefined) {
            setFormOrdemMenu(permissoes.ordem);
        }
    }, [permissoes])

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        setExcluirDesabilitado(false);

        try {
            await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PERMISSAO + '/' + id);

            setExcluirDesabilitado(true);
            setModalAberto(false);

            toast.success("Permissão excluida com sucesso.", {
                onClose: () => navegar(routes.diversos_permissao_listar)
            });

        } catch (error) {
            toast.error('Erro ao tentar excluir a Permissão`', error);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Excluir Permissão" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingPermissoes}>

                        <TextInput
                            maxLength="100"
                            nomeComponente="nomepermissao"
                            required
                            valorComponente={formNomePermissao}
                            valorLabel="Permissão"
                            autoComplete="nome da permissão"
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o nome da permissão"
                            type='text'
                            desabilitado={true}
                        />

                        <TextInput
                            maxLength="256"
                            nomeComponente="rotapermissao"
                            required
                            valorComponente={formRota}
                            valorLabel="Rota"
                            autoComplete="rota da permissão"
                            colSpan='3'
                            mt='2'
                            placeholder="Digite a rota da permissão"
                            type='text'
                            desabilitado={true}
                        />

                        <SelectInputPadrao
                            label="Grupo Permissão"
                            options={permissaoGrupo}
                            optionKey="id"
                            optionValue="nome"
                            value={formGrupoPermissaoId}
                            loading={loadingPermissaoGrupo}
                            nomeSelect="permissaoGrupo"
                            desabilitado={true}
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formVisivelMenu}
                            nomeComponenteAtivo="visivel-ativo"
                            nomeComponenteInativo="visivel-inativo"
                            valorLabel="Visível no Menu?"
                            desabilitado={true}
                        />

                        <TextInput
                            maxLength="22"
                            nomeComponente="nomemenu"
                            required
                            valorComponente={formNomeMenu}
                            valorLabel="Nome para exibição em Menu"
                            autoComplete="Nome para exibição em Menu"
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o nome para exibição em Menu"
                            type='text'
                            desabilitado={true}
                        />

                        <TextInput
                            maxLength="3"
                            nomeComponente="ordem"
                            required
                            valorComponente={formOrdemMenu}
                            valorLabel="Ordem do Menu"
                            autoComplete="ordem menu"
                            colSpan='1'
                            mt='2'
                            type='text'
                            desabilitado={true}
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formPermissaoAtiva}
                            nomeComponenteAtivo="permissao-ativo"
                            nomeComponenteInativo="permissao-inativo"
                            valorLabel="Permissão ativa ?"
                            desabilitado={true}
                        />

                    </InternalArea>

                    <InternalButtonArea>
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
                        Exclusão de Permissão
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formNomePermissao}</b>]?
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

export default ExcluirPermissao;
import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions'
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import TextInput from '../../../components/textinput/TextInput';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';

//Modal
import Modal from '../../../components/body/modal/Modal';
import ButtonComponent from '../../../components/button/ButtonComponent';

import routes from '../../../data/routes';
import axios from 'axios';

import { useFetchPermissaoGrupo } from '../../../hooks/diversos/useFetchPermissaoGrupo';

const ExcluirPermissaoGrupo = () => {

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
        navegar(routes.diversos_permissao_grupo_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { permissaoGrupo, loading: loadingPermissaoGrupo } = useFetchPermissaoGrupo(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------
    const [formNomeGrupo, setFormNomeGrupoPermissao] = useState(permissaoGrupo?.nome || '');
    const [formGrupoAtivo, setFormGrupoAtivo] = useState(permissaoGrupo?.ativo || '');
    const [formOrdemGrupo, setFormOrdemGrupo] = useState(permissaoGrupo?.ordem || '');

    useEffect(() => {
        if (permissaoGrupo && permissaoGrupo.nome !== undefined) {
            setFormNomeGrupoPermissao(permissaoGrupo.nome);
        }
        if (permissaoGrupo && permissaoGrupo.ativo !== undefined) {
            setFormGrupoAtivo(permissaoGrupo.ativo);
        }
        if (permissaoGrupo && permissaoGrupo.ordem !== undefined) {
            setFormOrdemGrupo(permissaoGrupo.ordem);
        }
    }, [permissaoGrupo])

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        setExcluirDesabilitado(false);

        try {
            await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PERMISSAO_GRUPO + '/' + id);

            setExcluirDesabilitado(true);
            setModalAberto(false);

            toast.success("Grupo de Permissão excluido com sucesso.", {
                onClose: () => navegar(routes.diversos_permissao_grupo_listar)
            });

        } catch (error) {
            toast.error('Erro ao tentar excluir o Grupo de Permissão`', error);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Excluir Grupo Permissão" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingPermissaoGrupo}>

                        <TextInput
                            maxLength="50"
                            nomeComponente="nomegrupopermissao"
                            required
                            valorComponente={formNomeGrupo}
                            valorLabel="Grupo de permissão"
                            autoComplete="nome grupo"
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o nome do grupo"
                            type='text'
                            desabilitado={true}
                        />

                        <TextInput
                            maxLength="3"
                            nomeComponente="ordemgrupo"
                            required
                            valorComponente={formOrdemGrupo}
                            valorLabel="Ordem do Grupo"
                            autoComplete="ordem grupo"
                            colSpan='1'
                            mt='2'
                            type='text'
                            desabilitado={true}
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formGrupoAtivo}
                            nomeComponenteAtivo="grupo-ativo"
                            nomeComponenteInativo="grupo-inativo"
                            valorLabel="Grupo ativo ?"
                            desabilitado={true}
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingPermissaoGrupo}>
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
                        Exclusão de Grupo de Permissão
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formNomeGrupo}</b>]?
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

export default ExcluirPermissaoGrupo;
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

import { useFetchPerfis } from '../../../hooks/diversos/useFetchPerfis';

const ExcluirPerfil = () => {

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
        navegar(routes.diversos_perfil_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { perfis, loading: loadingPerfis } = useFetchPerfis(id);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    //const [dadosPerfil, setDadosDePerfil] = useState([]);

    //variaveis internas
    const [formNomePerfil, setFormNomePerfil] = useState(perfis?.nome || '');
    const [formDescricao, setFormDescricao] = useState(perfis?.descricao || '');
    const [formAtivo, setFormAtivo] = useState(perfis?.ativo || '');

    useEffect(() => {
        if (perfis && perfis.nome !== undefined) {
            setFormNomePerfil(perfis.nome);
        }
        if (perfis && perfis.descricao !== undefined) {
            setFormDescricao(perfis.descricao);
        }
        if (perfis && perfis.ativo !== undefined) {
            setFormAtivo(perfis.ativo);
        }
    }, [perfis])

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        setExcluirDesabilitado(false);

        try {
            await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PERFIL + '/' + id);

            setExcluirDesabilitado(true);
            setFormNomePerfil("");
            setFormDescricao("");
            setModalAberto(false);

            toast.success("Perfil excluido com sucesso.", {
                onClose: () => navegar(routes.diversos_perfil_listar)
            });

        } catch (error) {
            toast.error('Erro ao tentar excluir o Perfil`', error);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Excluir Perfil" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingPerfis}>
                        <TextInput
                            maxLength="50"
                            nomeComponente="nomeperfil"
                            required
                            valorComponente={formNomePerfil}
                            valorLabel="Perfil"
                            autoComplete="nome do perfil"
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o nome do perfil"
                            type='text'
                            desabilitado
                        />

                        <TextInput
                            maxLength="512"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricao}
                            valorLabel="Descrição"
                            autoComplete="descricao"
                            colSpan='3'
                            mt='2'
                            placeholder="Digite a descricao"
                            type='text'
                            desabilitado
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formAtivo}
                            nomeComponenteAtivo="perfil-ativo"
                            nomeComponenteInativo="perfil-inativo"
                            onChange={setFormAtivo}
                            valorLabel="Perfil ativo ?"
                            desabilitado
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingPerfis}>
                        <ButtonComponent tipo="cancelar" tipoBotao='button' onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="perigo" tipoBotao='button' onClick={handleAbrirModal} desabilitado={excluirDesabilitado}>
                            Excluir Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

                <Modal modalAberto={modalAberto} onFechar={handleFecharModal}>
                    <Modal.ModalCabecalho onFechar={handleFecharModal}>
                        Exclusão de Perfil
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formNomePerfil}</b>]?
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

export default ExcluirPerfil;
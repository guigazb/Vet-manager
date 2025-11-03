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

import Modal from '../../../components/body/modal/Modal';
import ButtonComponent from '../../../components/button/ButtonComponent';

import routes from '../../../data/routes';
import axios from 'axios';

import { useFetchUnidadeFuncionalTipo } from '../../../hooks/diversos/useFetchUnidadeFuncionalTipo';


const ExcluirTipoUnidadeFuncional = () => {

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
        navegar(routes.diversos_tipo_unidade_funcional_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { unidadeFuncionalTipo, loading: loadingUnidadesFuncionalTipo } = useFetchUnidadeFuncionalTipo(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------
    const [formTipoUnidade, setFormTipoUnidade] = useState(unidadeFuncionalTipo?.tipo || '');
    const [formTipoAtivo, setFormTipoAtivo] = useState(unidadeFuncionalTipo?.ativo || '');

    useEffect(() => {
        // alert(JSON.stringify(unidadeFuncionalTipo));
        if (unidadeFuncionalTipo && unidadeFuncionalTipo.tipo !== undefined) {
            setFormTipoUnidade(unidadeFuncionalTipo.tipo);
        }
        if (unidadeFuncionalTipo && unidadeFuncionalTipo.ativo !== undefined) {
            setFormTipoAtivo(unidadeFuncionalTipo.ativo);
        }
    }, [unidadeFuncionalTipo])



    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_UNIDADE_FUNCIONAL_TIPO + '/' + id);

            setExcluirDesabilitado(true);
            setModalAberto(false);

            toast.success("Tipo de Unidade Funcional excluida com sucesso.", {
                onClose: () => navegar(routes.diversos_tipo_unidade_funcional_listar)
            });

        } catch (error) {
            toast.error('Erro ao tentar excluir o tipo de Unidade Funcional`', error);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Excluir tipo unidade Funcional" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingUnidadesFuncionalTipo}>

                        <TextInput
                            maxLength="50"
                            nomeComponente="tipounidadefuncional"
                            required
                            valorComponente={formTipoUnidade}
                            valorLabel="Tipo de Unidade"
                            autoComplete="Tipo da unidade"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o tipo da unidade funcional"
                            type='text'
                            desabilitado
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formTipoAtivo}
                            nomeComponenteAtivo="tipo-ativo"
                            nomeComponenteInativo="tipo-inativo"
                            valorLabel="Tipo ativo ?"
                            desabilitado
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingUnidadesFuncionalTipo}>
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
                        Exclusão de Tipo de Unidade Funcional
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formTipoUnidade}</b>]?
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

export default ExcluirTipoUnidadeFuncional;
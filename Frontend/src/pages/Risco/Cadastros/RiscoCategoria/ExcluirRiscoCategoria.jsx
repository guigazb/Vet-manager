import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import MainLayout from '../../../MainLayout';
import Actions from '../../../../components/geral/Actions'
import FormPadrao from '../../../../components/body/FormPadrao';
import InternalArea from '../../../../components/body/InternalArea';
import InternalButtonArea from '../../../../components/body/InternalButtonArea';

import TextInput from '../../../../components/textinput/TextInput';
import TextAreaInput from '../../../../components/textinput/TextAreaInput';
import RadioButtonBooleanInput from '../../../../components/radiobutton/RadioButtonBooleanInput';

import Modal from '../../../../components/body/modal/Modal';
import ButtonComponent from '../../../../components/button/ButtonComponent';

import { useFetchRiscoCategoria } from '../../../../hooks/risco/useFetchRiscoCategoria';

import routes from '../../../../data/routes';
import axios from 'axios';

const ExcluirRiscoCategoria = () => {

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
        navegar(routes.risco_categoria_risco_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoCategoria, loading: loadingRiscoCategoria } = useFetchRiscoCategoria(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------
    const [formCategoriaRisco, setFormCategoriaRisco] = useState(riscoCategoria?.nome || '');
    const [formDescricaoCategoria, setFormDescricaoCategoria] = useState(riscoCategoria?.descricao || '');
    const [formCategoriaAtivo, setFormCategoriaAtivo] = useState(riscoCategoria?.ativo || '');

    useEffect(() => {
        if (riscoCategoria && riscoCategoria.nome !== undefined) {
            setFormCategoriaRisco(riscoCategoria.nome);
        }
        if (riscoCategoria && riscoCategoria.descricao !== undefined) {
            setFormDescricaoCategoria(riscoCategoria.descricao);
        }
        if (riscoCategoria && riscoCategoria.ativo !== undefined) {
            setFormCategoriaAtivo(riscoCategoria.ativo);
        }
    }, [riscoCategoria]);


    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        let exclusaoBemSucedida = false;

        try {
            const result = await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_CATEGORIA + '/' + id);

            if (result.status === 204) {

                exclusaoBemSucedida = true;

                toast.success("Categoria de risco excluida com sucesso.", {
                    onClose: () => navegar(routes.risco_categoria_risco_listar)
                });

                setModalAberto(false);

            } else {
                toast.error('Erro ao tentar excluir a categoria de risco`');
            }
        } catch (error) {
            toast.error('Erro ao tentar excluir a categoria de risco`', error);
        } finally {
            if (exclusaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormCategoriaRisco('');
                setFormDescricaoCategoria('');
                setFormCategoriaAtivo('');

            }
            setExcluirDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastros : iversos" nomeSessao="Excluir Categoria de Risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingRiscoCategoria}>

                        <TextInput
                            maxLength="100"
                            nomeComponente="categoriarisco"
                            required
                            valorComponente={formCategoriaRisco}
                            valorLabel="Categoria de risco"
                            autoComplete="categoria"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite a categoria"
                            type='text'
                            desabilitado
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoCategoria}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            desabilitado
                        />


                        <RadioButtonBooleanInput
                            valorComponente={formCategoriaAtivo}
                            nomeComponenteAtivo="categoria-ativo"
                            nomeComponenteInativo="categoria-inativo"
                            valorLabel="Categoria ativa ?"
                            desabilitado
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingRiscoCategoria}>
                        <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="alerta" tipoBotao="button" desabilitado={excluirDesabilitado} onClick={handleAbrirModal}>
                            Excluir Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

                <Modal modalAberto={modalAberto} onFechar={handleFecharModal}>
                    <Modal.ModalCabecalho onFechar={handleFecharModal}>
                        Exclusão de Categoria de Risco
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formCategoriaRisco}</b>]?
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

export default ExcluirRiscoCategoria;
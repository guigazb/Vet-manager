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

import { useFetchRiscoDesenhoControle } from '../../../../hooks/risco/useFetchRiscoDesenhoControle';

import routes from '../../../../data/routes';
import axios from 'axios';

const ExcluirRiscoDesenhoControle = () => {

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
        navegar(routes.risco_desenho_controle_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);


    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoDesenhoControle, loading: loadingRiscoDesenhoControle } = useFetchRiscoDesenhoControle(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------
    const [formDesenhoControleRisco, setFormDesenhoControleRisco] = useState(riscoDesenhoControle?.desenho_controle || '');
    const [formDescricaoDesenhoControle, setFormDescricaoDesenhoControle] = useState(riscoDesenhoControle?.descricao || '');
    const [formValorDesenhoControle, setFormValorDesenhoControle] = useState(riscoDesenhoControle?.valor || '');
    const [formDesenhoAtivo, setFormDesenhoAtivo] = useState(riscoDesenhoControle?.ativo || '');

    useEffect(() => {
        if (riscoDesenhoControle && riscoDesenhoControle.desenho_controle !== undefined) {
            setFormDesenhoControleRisco(riscoDesenhoControle.desenho_controle);
        }
        if (riscoDesenhoControle && riscoDesenhoControle.descricao !== undefined) {
            setFormDescricaoDesenhoControle(riscoDesenhoControle.descricao);
        }
        if (riscoDesenhoControle && riscoDesenhoControle.valor !== undefined) {
            setFormValorDesenhoControle(riscoDesenhoControle.valor);
        }
        if (riscoDesenhoControle && riscoDesenhoControle.ativo !== undefined) {
            setFormDesenhoAtivo(riscoDesenhoControle.ativo);
        }
    }, [riscoDesenhoControle])

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        const dataAtual = new Date().toISOString();

        const desenhoControleExcluido = {
            data_desativacao: dataAtual
        };

        let exclusaoBemSucedida = false;

        try {
            const result = await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_DESENHO_CONTROLE + '/' + id, { data: desenhoControleExcluido });

            if (result.status === 204) {

                exclusaoBemSucedida = true;

                toast.success("Desenho controle excluido com sucesso.", {
                    onClose: () => navegar(routes.risco_desenho_controle_listar)
                });

                setModalAberto(false);

            } else {
                toast.error('Erro ao tentar excluir o Desenho controle`');
            }
        } catch (error) {
            toast.error('Erro ao tentar excluir o Desenho controle`', error);
        } finally {
            if (exclusaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormDesenhoControleRisco('');
                setFormDescricaoDesenhoControle('');
                setFormValorDesenhoControle('');
                setFormDesenhoAtivo('');

            }
            setExcluirDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastros : Risco" nomeSessao="Excluir Desenho controle" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingRiscoDesenhoControle}>

                        <TextInput
                            maxLength="50"
                            nomeComponente="desenhocontrole"
                            valorComponente={formDesenhoControleRisco}
                            valorLabel="Desenho Controle"
                            autoComplete="desenho"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o desenho"
                            type='text'
                            desabilitado
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            valorComponente={formDescricaoDesenhoControle}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            desabilitado
                        />

                        <TextInput
                            maxLength="1"
                            nomeComponente="valordesenho"
                            valorComponente={formValorDesenhoControle}
                            valorLabel="Valor"
                            autoComplete="valor"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o valor"
                            type='text'
                            desabilitado
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formDesenhoAtivo}
                            nomeComponenteAtivo="categoria-ativo"
                            nomeComponenteInativo="categoria-inativo"
                            valorLabel="Categoria ativa ?"
                            desabilitado
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingRiscoDesenhoControle}>
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
                        Exclusão de Desenho Controle Risco
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formDesenhoControleRisco}</b>]?
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

export default ExcluirRiscoDesenhoControle;
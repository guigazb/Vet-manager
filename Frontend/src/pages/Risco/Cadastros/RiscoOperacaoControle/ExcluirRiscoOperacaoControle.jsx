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
import ModalCorpo from '../../../../components/body/modal/ModalCorpo';
import ModalCabecalho from '../../../../components/body/modal/ModalCabecalho';
import ModalRodape from '../../../../components/body/modal/ModalRodape';
import ButtonComponent from '../../../../components/button/ButtonComponent';

import routes from '../../../../data/routes';
import axios from 'axios';

import { useFetchRiscoOperacaoControle } from '../../../../hooks/risco/useFetchRiscoOperacaoControle';

const ExcluirRiscoOperacaoControle = () => {

    // ----------------------------------------------------------------------------------------------
    // Variaveis de backend
    // ----------------------------------------------------------------------------------------------
    const urlBackend = import.meta.env.VITE_API_URL_BACKEND;

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
        navegar(routes.risco_operacao_controle_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoOperacaoControle, loading: loadingOperacaoControleRisco } = useFetchRiscoOperacaoControle(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formOperacaoControleRisco, setFormOperacaoControleRisco] = useState(riscoOperacaoControle?.operacao_controle || '');
    const [formDescricaoOperacaoControle, setFormDescricaoOperacaoControle] = useState(riscoOperacaoControle?.descricao || '');
    const [formValorOperacaoControle, setFormValorOperacaoControle] = useState(riscoOperacaoControle?.valor || '');
    const [formOperacaoControleAtiva, setFormOperacaoControleAtiva] = useState(riscoOperacaoControle?.ativo || '');

    useEffect(() => {
        if (riscoOperacaoControle && riscoOperacaoControle.operacao_controle !== undefined) {
            setFormOperacaoControleRisco(riscoOperacaoControle.operacao_controle);
        }
        if (riscoOperacaoControle && riscoOperacaoControle.descricao !== undefined) {
            setFormDescricaoOperacaoControle(riscoOperacaoControle.descricao);
        }
        if (riscoOperacaoControle && riscoOperacaoControle.valor !== undefined) {
            setFormValorOperacaoControle(riscoOperacaoControle.valor);
        }
        if (riscoOperacaoControle && riscoOperacaoControle.ativo !== undefined) {
            setFormOperacaoControleAtiva(riscoOperacaoControle.ativo);
        }
    }, [riscoOperacaoControle])

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        const dataAtual = new Date().toISOString();

        const operacaoControleExcluida = {
            data_desativacao: dataAtual
        };

        try {
            await axios.delete(urlBackend + '/risco/operacaocontrole/' + id, { data: operacaoControleExcluida });

            setExcluirDesabilitado(true);
            setModalAberto(false);

            toast.success("Operação de controle de risco excluida com sucesso.", {
                onClose: () => navegar(routes.risco_operacao_controle_listar)
            });

        } catch (error) {
            toast.error('Erro ao tentar excluir a operação de controle de risco`', error);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastro : Diversos" nomeSessao="Excluir Operação de Controle" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingOperacaoControleRisco}>

                        <TextInput
                            maxLength="20"
                            nomeComponente="operacaocontrolerisco"
                            required
                            valorComponente={formOperacaoControleRisco}
                            valorLabel="Operacão de controle de Risco"
                            autoComplete="operacao de controle"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite a operação"
                            type='text'
                            desabilitado
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoOperacaoControle}
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
                            nomeComponente="valoroperacaocontrole"
                            required
                            valorComponente={formValorOperacaoControle}
                            valorLabel="Valor da Operação de Controle"
                            autoComplete="valor"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o valor"
                            type='text'
                            onChange={handleValor}
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formOperacaoControleAtiva}
                            nomeComponenteAtivo="operacao-ativo"
                            nomeComponenteInativo="operacao-inativo"
                            valorLabel="Operação de Controle ativa ?"
                            desabilitado
                        />


                    </InternalArea>

                    <InternalButtonArea loading={loadingOperacaoControleRisco}>
                        <ButtonComponent tipo="cancelar" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="alerta" desabilitado={excluirDesabilitado}>
                            Excluir Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

                <Modal modalAberto={modalAberto} onFechar={handleFecharModal}>
                    <ModalCabecalho onFechar={handleFecharModal}>
                        Exclusão de Tipo de Unidade Funcional
                    </ModalCabecalho>
                    <ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formOperacaoControleRisco}</b>]?
                    </ModalCorpo>
                    <ModalRodape>
                        <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModal}>
                            Fechar Janela
                        </ButtonComponent>
                        <ButtonComponent tipo="perigo" tipoBotao="button" onClick={handleConfirmarExclusaoNoModal}>
                            Excluir Registro
                        </ButtonComponent>
                    </ModalRodape>
                </Modal>

            </React.Fragment>
        </MainLayout>
    );
}

export default ExcluirRiscoOperacaoControle;
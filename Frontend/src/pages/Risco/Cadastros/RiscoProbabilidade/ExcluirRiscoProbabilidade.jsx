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

import { useFetchRiscoProbabilidade } from '../../../../hooks/risco/useFetchRiscoProbabilidade';

const ExcluirRiscoProbabilidade = () => {

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
        navegar(routes.risco_probabilidade_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoProbabilidade, loading: loadingRiscoProbabilidade } = useFetchRiscoProbabilidade(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formTipoProbabilidadeRisco, setFormTipoProbabilidadeRisco] = useState(riscoProbabilidade?.tipo_probabilidade || '');
    const [formDescricaoProbabilidade, setFormDescricaoProbabilidade] = useState(riscoProbabilidade?.descricao || '');
    const [formValorProbabilidade, setFormValorProbabilidade] = useState(riscoProbabilidade?.valor || '');
    const [formProbabilidadeAtivo, setFormProbabilidadeAtivo] = useState(riscoProbabilidade?.ativo || '');

    useEffect(() => {
        if (riscoProbabilidade && riscoProbabilidade.tipo_probabilidade !== undefined) {
            setFormTipoProbabilidadeRisco(riscoProbabilidade.tipo_probabilidade);
        }
        if (riscoProbabilidade && riscoProbabilidade.descricao !== undefined) {
            setFormDescricaoProbabilidade(riscoProbabilidade.descricao);
        }
        if (riscoProbabilidade && riscoProbabilidade.valor !== undefined) {
            setFormValorProbabilidade(riscoProbabilidade.valor);
        }
        if (riscoProbabilidade && riscoProbabilidade.ativo !== undefined) {
            setFormProbabilidadeAtivo(riscoProbabilidade.ativo);
        }
    }, [riscoProbabilidade])

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        let exclusaoBemSucedida = false;

        try {
            const result = await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_PROBABILIDADE + '/' + id);

            if (result.status === 204) {

                exclusaoBemSucedida = true;

                toast.success("Probabilidade de risco excluida com sucesso.", {
                    onClose: () => navegar(routes.risco_probabilidade_listar)
                });

                setModalAberto(false);

            } else {
                toast.error('Erro ao tentar Excluir a Probabilidade de risco`');
            }
        } catch (error) {
            toast.error('Erro ao tentar Excluir a Probabilidade de risco`', error);
        } finally {
            if (exclusaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormTipoProbabilidadeRisco('');
                setFormDescricaoProbabilidade('');
                setFormValorProbabilidade('');
                setFormProbabilidadeAtivo('');

            }
            setExcluirDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastro : Diversos" nomeSessao="Excluir Probabilidade de Risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingRiscoProbabilidade}>

                        <TextInput
                            maxLength="20"
                            nomeComponente="probabilidaderisco"
                            required
                            valorComponente={formTipoProbabilidadeRisco}
                            valorLabel="Probabilidade de Risco"
                            autoComplete="probabilidade"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite a probabilidade"
                            type='text'
                            desabilitado
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoProbabilidade}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            desabilitado
                        />

                        <TextInput
                            maxLength="6"
                            nomeComponente="valorprobabilidade"
                            required
                            valorComponente={formValorProbabilidade}
                            valorLabel="Valor da Probabilidade"
                            autoComplete="valor"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o valor"
                            type='text'
                            desabilitado
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formProbabilidadeAtivo}
                            nomeComponenteAtivo="probabilidade-ativo"
                            nomeComponenteInativo="probabilidade-inativo"
                            onChange={setFormProbabilidadeAtivo}
                            valorLabel="Probabilidade ativa ?"
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingRiscoProbabilidade}>
                        <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="alerta" desabilitado={excluirDesabilitado} tipoBotao="button" onClick={handleAbrirModal}>
                            Excluir Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

                <Modal modalAberto={modalAberto} onFechar={handleFecharModal}>
                    <ModalCabecalho onFechar={handleFecharModal}>
                        Exclusão de Probabilidade de Risco
                    </ModalCabecalho>
                    <ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formTipoProbabilidadeRisco}</b>]?
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

export default ExcluirRiscoProbabilidade;
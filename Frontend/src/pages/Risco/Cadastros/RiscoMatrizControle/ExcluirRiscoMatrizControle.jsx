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

import { useFetchRiscoMatrizControle } from '../../../../hooks/risco/useFetchRiscoMatrizControle';

const ExcluirRiscoMatrizControle = () => {

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
        navegar(routes.risco_matriz_controle_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoMatrizControle, loading: loadingMatrizControleRisco } = useFetchRiscoMatrizControle(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formMatrizControleRisco, setFormMatrizControleRisco] = useState(riscoMatrizControle?.matriz_controle || '');
    const [formDescricaoMatrizControle, setFormDescricaoMatrizControle] = useState(riscoMatrizControle?.descricao || '');
    const [formLimiteInicialMatrizControle, setFormLimiteInicialMatrizControle] = useState(riscoMatrizControle?.limite_inicial || '');
    const [formLimiteFinalMatrizControle, setFormLimiteFinalMatrizControle] = useState(riscoMatrizControle?.limite_final || '');
    const [formMatrizControleAtivo, setFormMatrizControleAtivo] = useState(riscoMatrizControle?.ativo || '');

    useEffect(() => {
        if (riscoMatrizControle && riscoMatrizControle.matriz_controle !== undefined) {
            setFormMatrizControleRisco(riscoMatrizControle.matriz_controle);
        }
        if (riscoMatrizControle && riscoMatrizControle.descricao !== undefined) {
            setFormDescricaoMatrizControle(riscoMatrizControle.descricao);
        }
        if (riscoMatrizControle && riscoMatrizControle.limite_inicial !== undefined) {
            setFormLimiteInicialMatrizControle(riscoMatrizControle.limite_inicial);
        }
        if (riscoMatrizControle && riscoMatrizControle.limite_final !== undefined) {
            setFormLimiteFinalMatrizControle(riscoMatrizControle.limite_final);
        }
        if (riscoMatrizControle && riscoMatrizControle.ativo !== undefined) {
            setFormMatrizControleAtivo(riscoMatrizControle.ativo);
        }
    }, [riscoMatrizControle])

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        let exclusaoBemSucedida = false;

        try {
            const result = await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_MATRIZ_CONTROLE + '/' + id);

            if (result.status === 204) {

                exclusaoBemSucedida = true;



                toast.success("Matriz controle de risco excluida com sucesso.", {
                    onClose: () => navegar(routes.risco_matriz_controle_listar)
                });

                setModalAberto(false);

            } else {
                toast.error('Erro ao tentar excluir a matriz controle de risco`');
            }

        } catch (error) {
            toast.error('Erro ao tentar excluir a matriz controle de risco`', error);
        } finally {
            if (exclusaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormMatrizControleRisco('');
                setFormDescricaoMatrizControle('');
                setFormLimiteInicialMatrizControle('');
                setFormLimiteFinalMatrizControle('');
                setFormMatrizControleAtivo('');

            }
            setExcluirDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastros : Diversos" nomeSessao="Excluir Matriz controle" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingMatrizControleRisco}>

                        <TextInput
                            maxLength="50"
                            nomeComponente="matrizcontrolerisco"
                            required
                            valorComponente={formMatrizControleRisco}
                            valorLabel="Matriz Controle de Risco"
                            autoComplete="matriz controle"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite a matriz"
                            type='text'
                            desabilitado
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoMatrizControle}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            desabilitado
                        />

                        <TextInput
                            maxLength="2"
                            nomeComponente="limiteinicial"
                            required
                            valorComponente={formLimiteInicialMatrizControle}
                            valorLabel="Limite Inicial"
                            autoComplete="inicio"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o valor"
                            type='text'
                            desabilitado
                        />

                        <TextInput
                            maxLength="2"
                            nomeComponente="limitefinal"
                            required
                            valorComponente={formLimiteFinalMatrizControle}
                            valorLabel="Limite Final"
                            autoComplete="valor"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o valor"
                            type='text'
                            desabilitado
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formMatrizControleAtivo}
                            nomeComponenteAtivo="matrizcontrole-ativo"
                            nomeComponenteInativo="matrizcontrole-inativo"
                            valorLabel="Matriz Controle Ativa ?"
                            desabilitado
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingMatrizControleRisco}>
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
                        Exclusão de Matriz de Controle de Risco
                    </ModalCabecalho>
                    <ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formMatrizControleRisco}</b>]?
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

export default ExcluirRiscoMatrizControle;
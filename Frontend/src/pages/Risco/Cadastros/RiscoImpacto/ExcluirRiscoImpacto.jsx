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

import { useFetchRiscoImpacto } from '../../../../hooks/risco/useFetchRiscoImpacto';

const ExcluirRiscoImpacto = () => {

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
        navegar(routes.risco_impacto_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoImpacto, loading: loadingRiscoImpacto } = useFetchRiscoImpacto(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formTipoImpactoRisco, setFormTipoImpactoRisco] = useState(riscoImpacto?.tipo_impacto || '');
    const [formDescricaoImpacto, setFormDescricaoImpacto] = useState(riscoImpacto?.descricao || '');
    const [formValorImpacto, setFormValorImpacto] = useState(riscoImpacto?.valor || '');
    const [formImpactoAtivo, setFormImpactoAtivo] = useState(riscoImpacto?.ativo || '');

    useEffect(() => {
        if (riscoImpacto && riscoImpacto.tipo_impacto !== undefined) {
            setFormTipoImpactoRisco(riscoImpacto.tipo_impacto);
        }
        if (riscoImpacto && riscoImpacto.descricao !== undefined) {
            setFormDescricaoImpacto(riscoImpacto.descricao);
        }
        if (riscoImpacto && riscoImpacto.valor !== undefined) {
            setFormValorImpacto(riscoImpacto.valor);
        }
        if (riscoImpacto && riscoImpacto.ativo !== undefined) {
            setFormImpactoAtivo(riscoImpacto.ativo);
        }
    }, [riscoImpacto])

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        const dataAtual = new Date().toISOString();

        const impactoRiscoExcluido = {
            data_desativacao: dataAtual
        };

        let exclusaoBemSucedida = false;

        try {
            const result = await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_IMPACTO + '/' + id, { data: impactoRiscoExcluido });

            if (result.status === 204) {

                exclusaoBemSucedida = true;


                toast.success("Impacto de risco excluido com sucesso.", {
                    onClose: () => navegar(routes.risco_impacto_listar)
                });

                setModalAberto(false);

            } else {
                toast.error('Erro ao tentar Excluir impacto de risco`');
            }
        } catch (error) {
            toast.error('Erro ao tentar Excluir impacto de risco`', error);
        } finally {
            if (exclusaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormTipoImpactoRisco('');
                setFormDescricaoImpacto('');
                setFormValorImpacto('');
                setFormImpactoAtivo('');
            }
            setExcluirDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastro : Diversos" nomeSessao="Excluir Impacto de Risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingRiscoImpacto}>

                        <TextInput
                            maxLength="20"
                            nomeComponente="impactorisco"
                            required
                            valorComponente={formTipoImpactoRisco}
                            valorLabel="Impacto de risco"
                            autoComplete="impacto"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o Impacto"
                            type='text'
                            desabilitado={true}

                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoImpacto}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            desabilitado={true}

                        />

                        <TextInput
                            maxLength="6"
                            nomeComponente="valorimpacto"
                            required
                            valorComponente={formValorImpacto}
                            valorLabel="Valor do impacto"
                            autoComplete="valor"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o valor"
                            type='text'
                            desabilitado={true}

                        />


                        <RadioButtonBooleanInput
                            valorComponente={formImpactoAtivo}
                            nomeComponenteAtivo="impacto-ativo"
                            nomeComponenteInativo="impacto-inativo"
                            valorLabel="Impacto ativo ?"
                            desabilitado
                        />


                    </InternalArea>

                    <InternalButtonArea loading={loadingRiscoImpacto}>
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
                        Exclusão de Impacto de Risco
                    </ModalCabecalho>
                    <ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formTipoImpactoRisco}</b>]?
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

export default ExcluirRiscoImpacto;
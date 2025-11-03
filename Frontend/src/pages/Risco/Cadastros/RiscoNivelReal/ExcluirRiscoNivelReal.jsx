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

import { useFetchRiscoNivelReal } from '../../../../hooks/risco/useFetchRiscoNivelReal';

const ExcluirRiscoNivelReal = () => {

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
        navegar(routes.risco_nivel_real_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoNivelReal, loading: loadingNivelRealRisco } = useFetchRiscoNivelReal(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formNivelRealRisco, setFormNivelRealRisco] = useState(riscoNivelReal?.nivel_real || '');
    const [formDescricaoNivelReal, setFormDescricaoNivelReal] = useState(riscoNivelReal?.descricao || '');
    const [formLimiteInicialNivelReal, setFormLimiteInicialNivelReal] = useState(riscoNivelReal?.limite_inicial || '');
    const [formLimiteFinalNivelReal, setFormLimiteFinalNivelReal] = useState(riscoNivelReal?.limite_final || '');
    const [formNivelRealAtivo, setFormNivelRealAtivo] = useState(riscoNivelReal?.ativo || '');

    useEffect(() => {
        if (riscoNivelReal && riscoNivelReal.nivel_real !== undefined) {
            setFormNivelRealRisco(riscoNivelReal.nivel_real);
        }
        if (riscoNivelReal && riscoNivelReal.descricao !== undefined) {
            setFormDescricaoNivelReal(riscoNivelReal.descricao);
        }
        if (riscoNivelReal && riscoNivelReal.limite_inicial !== undefined) {
            setFormLimiteInicialNivelReal(riscoNivelReal.limite_inicial);
        }
        if (riscoNivelReal && riscoNivelReal.limite_final !== undefined) {
            setFormLimiteFinalNivelReal(riscoNivelReal.limite_final);
        }
        if (riscoNivelReal && riscoNivelReal.ativo !== undefined) {
            setFormNivelRealAtivo(riscoNivelReal.ativo);
        }
    }, [riscoNivelReal])

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        let exclusaoBemSucedida = false;

        try {
            const result = await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_NIVEL_REAL + '/' + id);

            if (result.status === 204) {

                exclusaoBemSucedida = true;


                toast.success("Nivel Real de risco excluida com sucesso.", {
                    onClose: () => navegar(routes.risco_nivel_real_listar)
                });


                setModalAberto(false);

            } else {
                toast.error('Erro ao tentar excluir o nivel real de risco`');
            }

        } catch (error) {
            toast.error('Erro ao tentar excluir o nivel real de risco`', error);
        } finally {
            if (exclusaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormNivelRealRisco('');
                setFormDescricaoNivelReal('');
                setFormLimiteInicialNivelReal('');
                setFormLimiteFinalNivelReal('');
                setFormNivelRealAtivo('');

            }
            setExcluirDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Excluir Nivel Real de Risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingNivelRealRisco}>

                        <TextInput
                            maxLength="20"
                            nomeComponente="nivelrealrisco"
                            required
                            valorComponente={formNivelRealRisco}
                            valorLabel="Nivel Real de Risco"
                            autoComplete="nivel real"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o Nivel"
                            type='text'
                            desabilitado
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoNivelReal}
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
                            valorComponente={formLimiteInicialNivelReal}
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
                            valorComponente={formLimiteFinalNivelReal}
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
                            valorComponente={formNivelRealAtivo}
                            nomeComponenteAtivo="nivel-ativo"
                            nomeComponenteInativo="nivel-inativo"
                            desabilitado
                            valorLabel="Nivel Real Ativo ?"
                        />


                    </InternalArea>

                    <InternalButtonArea loading={loadingNivelRealRisco}>
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
                        Exclusão de Nivel Real de Risco
                    </ModalCabecalho>
                    <ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formNivelRealRisco}</b>]?
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

export default ExcluirRiscoNivelReal;
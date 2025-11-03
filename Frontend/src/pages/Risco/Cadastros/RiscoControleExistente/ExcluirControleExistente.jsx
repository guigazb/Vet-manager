import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { useFetchRiscos } from '../../../../hooks/risco/useFetchRiscos';
import { useFetchRiscoControleExistente } from '../../../../hooks/risco/useFetchRiscoControleExistente';

import Actions from '../../../../components/geral/Actions';
import MainLayout from '../../../MainLayout';
import FormPadrao from '../../../../components/body/FormPadrao';
import SelectInputPadrao from '../../../../components/selectinput/SelectInputPadrao';
import InternalArea from '../../../../components/body/InternalArea';
import InternalButtonArea from '../../../../components/body/InternalButtonArea';

import TextInput from '../../../../components/textinput/TextInput';
import ButtonComponent from '../../../../components/button/ButtonComponent';
import RadioButtonBooleanInput from '../../../../components/radiobutton/RadioButtonBooleanInput';

import routes from '../../../../data/routes';

import axios from 'axios';
import Modal from '../../../../components/body/modal/Modal';

const ExcluirControleExistente = () => {

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
    const { riscoId, unidadeFuncional, id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_controle_existente_listar, { state: { riscoId, unidadeFuncional } });
    };
    // ----------------------------------------------------------------------------------------------
    // Variáveis de botão
    // ----------------------------------------------------------------------------------------------
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { controleExistente, loading: loadingRiscoControleExistente } = useFetchRiscoControleExistente(id);
    const { risco, loading: loadingRiscos } = useFetchRiscos();

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [formRiscoId, setFormRiscoId] = useState(controleExistente?.risco_id || '0');
    const [formControleExistente, setFormControleExistente] = useState(controleExistente?.nome_controle_existente || '');
    const [formControleAtivo, setFormControleAtivo] = useState(controleExistente?.ativo || '');

    useEffect(() => {
        if (controleExistente && controleExistente.risco_id !== undefined) {
            setFormRiscoId(controleExistente.risco_id);
        }
        if (controleExistente && controleExistente.nome_controle_existente !== undefined) {
            setFormControleExistente(controleExistente.nome_controle_existente);
        }
        if (controleExistente && controleExistente.ativo !== undefined) {
            setFormControleAtivo(controleExistente.ativo);
        }
    }, [controleExistente])

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------

    const handleExcluirSubmit = async (e) => {
        e.preventDefault();

        let exclusaoBemSucedida = false;

        try {
            const result = await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_CONTROLES_EXISTENTES + "/" + id);

            if (result.status === 204) {

                exclusaoBemSucedida = true;

                toast.success("Controle Existente excluído com sucesso.", {
                    onClose: () => navegar(routes.risco_controle_existente_listar)
                });

                setModalAberto(false);
            } else {
                toast.error('Erro ao tentar excluir Controle Existente');
            }
        } catch (error) {
            toast.error('Erro ao tentar excluir Controle Existente', error);
        } finally {
            if (exclusaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormRiscoId("0");
                setFormControleExistente("");
                setFormControleAtivo("");
            }
            setExcluirDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastro : Riscos" nomeSessao="Excluir Controles Existentes" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleExcluirSubmit}>

                    <InternalArea loading={loadingRiscoControleExistente}>

                        <SelectInputPadrao
                            label="Risco"
                            options={risco}
                            optionKey="id"
                            optionValue="descricao"
                            value={formRiscoId}
                            loading={loadingRiscos}
                            nomeSelect="risco"
                            desabilitado
                        />

                        <TextInput
                            maxLength="1024"
                            nomeComponente="controlee"
                            valorComponente={formControleExistente}
                            valorLabel="Controle Existente"
                            autoComplete="controle existente"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o Controle"
                            type='text'
                            required
                            desabilitado
                        />

                        <RadioButtonBooleanInput
                            valorLabel="Controle Existente Ativo ?"
                            valorComponente={formControleAtivo}
                            nomeComponenteAtivo="cexistente-ativo"
                            nomeComponenteInativo="cexistente-inativo"
                            colSpan='1'
                            inactiveLabel='false'
                            desabilitado
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingRiscoControleExistente}>
                        <ButtonComponent tipo="cancelar" tipoBotao='button' onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="alerta" desabilitado={excluirDesabilitado} tipoBotao="button" onClick={handleAbrirModal} >
                            Excluir Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

                <Modal modalAberto={modalAberto} onFechar={handleFecharModal}>
                    <Modal.ModalCabecalho onFechar={handleFecharModal}>
                        Exclusão de Causa de Risco
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formControleExistente}</b>]?
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

    )
}

export default ExcluirControleExistente
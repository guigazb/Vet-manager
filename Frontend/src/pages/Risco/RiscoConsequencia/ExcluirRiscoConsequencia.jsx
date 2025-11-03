import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Actions from '../../../components/geral/Actions';
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import TextAreaInput from '../../../components/textinput/TextAreaInput';
import ButtonComponent from '../../../components/button/ButtonComponent';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';

import Modal from '../../../components/body/modal/Modal';

import routes from '../../../data/routes';

import axios from 'axios';

import { useFetchRiscos } from '../../../hooks/risco/useFetchRiscos';
import { useFetchRiscoConsequencia } from '../../../hooks/risco/useFetchRiscoConsequencia';


const ExcluirRiscoConsequencia = () => {

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
        navegar(routes.risco_consequencia_listar, { state: { riscoId, unidadeFuncional } });
    }

    // ----------------------------------------------------------------------------------------------
    // Variáveis de botão
    // ----------------------------------------------------------------------------------------------
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoConsequencia, loading: loadingRiscoConsequencia } = useFetchRiscoConsequencia(id);
    const { risco, loading: loadingRiscos } = useFetchRiscos();

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [formRiscoId, setFormRiscoId] = useState(riscoConsequencia?.risco_id || '0');
    const [formDescricaoConsequencia, setFormDescricaoConsequencia] = useState(riscoConsequencia?.descricao || '');
    const [formConsequenciaAtiva, setFormConsequenciaAtiva] = useState(riscoConsequencia?.ativo || '');

    useEffect(() => {
        if (riscoConsequencia && riscoConsequencia.risco_id !== undefined) {
            setFormRiscoId(riscoConsequencia.risco_id);
        }
        if (riscoConsequencia && riscoConsequencia.descricao !== undefined) {
            setFormDescricaoConsequencia(riscoConsequencia.descricao);
        }
        if (riscoConsequencia && riscoConsequencia.ativo !== undefined) {
            setFormConsequenciaAtiva(riscoConsequencia.ativo);
        }
    }, [riscoConsequencia])

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------

    const handleExcluirSubmit = async (e) => {
        e.preventDefault();


        let exclusaoBemSucedida = false;

        try {
            const result = await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_CONSEQUENCIA + "/" + id);

            if (result.status === 204) {

                exclusaoBemSucedida = true;

                toast.success("Consequencia de risco excluída com sucesso.", {
                    onClose: () => navegar(routes.risco_consequencia_listar)
                });

                setModalAberto(false);
            } else {
                toast.error('Erro ao tentar excluir Consequencia de risco');
            }
        } catch (error) {
            toast.error('Erro ao tentar excluir Consequencia de risco', error);
        } finally {
            if (exclusaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormRiscoId("0");
                setFormDescricaoConsequencia("");
                setFormConsequenciaAtiva("");
            }
            setExcluirDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Riscos" nomeSessao="Excluir Consequencia de risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleExcluirSubmit}>

                    <InternalArea loading={loadingRiscoConsequencia}>

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

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoConsequencia}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            desabilitado
                        />

                        <RadioButtonBooleanInput
                            valorLabel="Consequencia Ativa?"
                            valorComponente={formConsequenciaAtiva}
                            nomeComponenteAtivo="consequencia-ativo"
                            nomeComponenteInativo="conseqeuncia-inativo"
                            colSpan='1'
                            inactiveLabel='false'
                            desabilitado
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingRiscoConsequencia}>
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
                        Exclusão de Consequencia de Risco
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formDescricaoConsequencia}</b>]?
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

export default ExcluirRiscoConsequencia
import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions'
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';
import TextInput from '../../../components/textinput/TextInput';
import DatePickerUnit from '../../../components/geral/DatePickerUnit';
import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';

import Modal from '../../../components/body/modal/Modal';
import ModalCorpo from '../../../components/body/modal/ModalCorpo';
import ModalCabecalho from '../../../components/body/modal/ModalCabecalho';
import ModalRodape from '../../../components/body/modal/ModalRodape';
import ButtonComponent from '../../../components/button/ButtonComponent';

import routes from '../../../data/routes';
import axios from 'axios';

import { useFetchUsuario } from '../../../hooks/diversos/useFetchUsuario';
import { useFetchUnidadesFuncionais } from '../../../hooks/diversos/useFetchUnidadesFuncionais';
import { useFetchRiscoPlanoRespostaAcao } from '../../../hooks/risco/useFetchRiscoPlanoRespostaAcao';

const ExcluirRiscoPlanoRespostaAcao = () => {

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
        navegar(routes.risco_plano_resposta_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoPlanoRespostaAcao, loading: loadingPlanoRespostaAcaoRisco } = useFetchRiscoPlanoRespostaAcao(id);
    const { usuarios, loading: loadingUsuarios } = useFetchUsuario();
    const { unidades, loading: loadingUnidades } = useFetchUnidadesFuncionais();

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formPlanoRespostaAcaoRisco, setFormPlanoRespostaAcaoRisco] = useState(riscoPlanoRespostaAcao?.descricao_acao || '');
    const [formAreaResponsavelId, setAreaResponsavelId] = useState(riscoPlanoRespostaAcao?.area_responsavel_id || '0');
    const [formPlanoAcaoPrazoFinal, setFormPlanoAcaoPrazoFinal] = useState(riscoPlanoRespostaAcao?.prazo_final || '');
    const [formGestorRiscoId, setGestorRiscoId] = useState(riscoPlanoRespostaAcao?.gestor_risco_id || '0');
    const [formPlanoAcaoDataInicial, setFormPlanoAcaoDataInicial] = useState(riscoPlanoRespostaAcao?.data_inicial || '');
    const [formPlanoRespostaAcaoAtivo, setFormPlanoRespostaAcaoAtivo] = useState(riscoPlanoRespostaAcao?.ativo || '');

    useEffect(() => {
        if (riscoPlanoRespostaAcao && riscoPlanoRespostaAcao.descricao_acao !== undefined) {
            setFormPlanoRespostaAcaoRisco(riscoPlanoRespostaAcao.descricao_acao);
        }
        if (riscoPlanoRespostaAcao && riscoPlanoRespostaAcao.area_responsavel_id !== undefined) {
            setAreaResponsavelId(riscoPlanoRespostaAcao.area_responsavel_id);
        }
        if (riscoPlanoRespostaAcao && riscoPlanoRespostaAcao.prazo_final !== undefined) {
            setFormPlanoAcaoPrazoFinal(riscoPlanoRespostaAcao.prazo_final);
        }
        if (riscoPlanoRespostaAcao && riscoPlanoRespostaAcao.gestor_risco_id !== undefined) {
            setGestorRiscoId(riscoPlanoRespostaAcao.gestor_risco_id);
        }
        if (riscoPlanoRespostaAcao && riscoPlanoRespostaAcao.data_inicial !== undefined) {
            setFormPlanoAcaoDataInicial(riscoPlanoRespostaAcao.data_inicial);
        }
        if (riscoPlanoRespostaAcao && riscoPlanoRespostaAcao.ativo !== undefined) {
            setFormPlanoRespostaAcaoAtivo(riscoPlanoRespostaAcao.ativo);
        }
    }, [riscoPlanoRespostaAcao])

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        let exclusaoBemSucedida = false;

        try {
            const result = await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_PLANO_RESPOSTA_ACAO + '/' + id);


            if (result.status === 204) {

                exclusaoBemSucedida = true;


                toast.success("Plano De Resposta Ação de risco excluido com sucesso.", {
                    onClose: () => navegar(routes.risco_plano_resposta_listar)
                });

                setModalAberto(false);

            } else {
                toast.error('Erro ao tentar excluir o Plano De Resposta Ação de risco`');
            }
        } catch (error) {
            toast.error('Erro ao tentar excluir o Plano De Resposta Ação de risco`', error);
        } finally {
            if (exclusaoBemSucedida) {
                //Limpa todos os dados do formulário

                setFormPlanoRespostaAcaoRisco('');
                setAreaResponsavelId('0');
                setFormPlanoAcaoPrazoFinal('');
                setGestorRiscoId('0');
                setFormPlanoAcaoDataInicial('');
                setFormPlanoRespostaAcaoAtivo('');

            }
            setExcluirDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Excluir Plano Resposta Ação" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea>

                        <TextInput
                            nomeComponente="acao"
                            required
                            valorComponente={formPlanoRespostaAcaoRisco}
                            valorLabel="Ação"
                            autoComplete="acao de plano resposta"
                            autofocus={true}
                            colSpan='4'
                            mt='2'
                            placeholder="Digite a ação"
                            type='text'
                            desabilitado
                        />

                        <SelectInputPadrao
                            label="Area Responsavel"
                            options={unidades}
                            optionKey="id"
                            optionValue="nome"
                            value={formAreaResponsavelId}
                            loading={loadingUnidades}
                            nomeSelect="arearesponsavel"
                            desabilitado
                        />

                    </InternalArea>

                    <InternalArea>

                        <DatePickerUnit
                            nomeComponente="Prazo Final"
                            valorLabel={formPlanoAcaoPrazoFinal}
                            required
                            colSpan='2'
                            desabilitado
                        />

                        <SelectInputPadrao
                            label="Gestor de risco"
                            options={usuarios}
                            optionKey="id"
                            optionValue="nome"
                            value={formGestorRiscoId}
                            loading={loadingUsuarios}
                            nomeSelect="gestorrisco"
                            desabilitado
                        />

                        <DatePickerUnit
                            nomeComponente="Data Inicial"
                            valorLabel={formPlanoAcaoDataInicial}
                            required
                            colSpan='2'
                            desabilitado
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formPlanoRespostaAcaoAtivo}
                            nomeComponenteAtivo="planorespostaAcao-ativo"
                            nomeComponenteInativo="planorespostaAcao-inativo"
                            valorLabel="Plano Resposta Ação Ativo ?"
                            desabilitado
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingPlanoRespostaAcaoRisco}>
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
                        Exclusão de Plano Resposta Ação
                    </ModalCabecalho>
                    <ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formPlanoRespostaAcaoRisco}</b>]?
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

export default ExcluirRiscoPlanoRespostaAcao;
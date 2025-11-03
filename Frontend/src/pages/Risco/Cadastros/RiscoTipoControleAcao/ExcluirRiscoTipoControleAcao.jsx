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

import { useFetchRiscoTipoControleAcao } from '../../../../hooks/risco/useFetchRiscoTipoControleAcao';

const ExcluirRiscoTipoControleAcao = () => {

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
        navegar(routes.risco_tipo_controle_acao_listar);
    }
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { tipoControleAcao, loading: loadingTipoControleAcaoRisco } = useFetchRiscoTipoControleAcao(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formTipoControleAcaoRisco, setFormTipoControleAcaoRisco] = useState(tipoControleAcao?.nome_tipo_controle || '');
    const [formDescricaoTipoControleAcao, setFormDescricaoTipoControleAcao] = useState(tipoControleAcao?.descricao_tipo_controle || '');
    const [formTipoControleAcaoAtivo, setFormTipoControleAcaoAtivo] = useState(tipoControleAcao?.ativo || '');

    useEffect(() => {
        if (tipoControleAcao && tipoControleAcao.nome_tipo_controle !== undefined) {
            setFormTipoControleAcaoRisco(tipoControleAcao.nome_tipo_controle);
        }
        if (tipoControleAcao && tipoControleAcao.descricao_tipo_controle !== undefined) {
            setFormDescricaoTipoControleAcao(tipoControleAcao.descricao_tipo_controle);
        }
        if (tipoControleAcao && tipoControleAcao.ativo !== undefined) {
            setFormTipoControleAcaoAtivo(tipoControleAcao.ativo);
        }
    }, [tipoControleAcao])

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        let exclusaoBemSucedida = false;

        try {
            const result = await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_TIPO_CONTROLE_ACAO + '/' + id);


            if (result.status === 204) {

                exclusaoBemSucedida = true;


                toast.success("Tipo de controle ação excluido com sucesso.", {
                    onClose: () => navegar(routes.risco_tipo_controle_acao_listar)
                });

                setModalAberto(false);

            } else {
                toast.error('Erro ao tentar excluir o Tipo de controle ação`');
            }
        } catch (error) {
            toast.error('Erro ao tentar excluir o Tipo de controle ação`', error);
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

                <Actions breadcrumb="Início : Cadastros : Diversos" nomeSessao="Excluir Tipo de Controle Ação" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea loading={loadingTipoControleAcaoRisco}>
                        <TextInput
                            maxLength="50"
                            nomeComponente="tipocontroleacao"
                            required
                            valorComponente={formTipoControleAcaoRisco}
                            valorLabel="Tipo de controle ação"
                            autoComplete="tipo de controle"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o tipo"
                            type='text'
                            desabilitado
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoTipoControleAcao}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            desabilitado
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formTipoControleAcaoAtivo}
                            nomeComponenteAtivo="tipocontroleacao-ativo"
                            nomeComponenteInativo="tipocontroleacao-inativo"
                            valorLabel="Tipo de controle ação ativo ?"
                            desabilitado
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingTipoControleAcaoRisco}>
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
                        Exclusão de Tipo de ação de controle
                    </ModalCabecalho>
                    <ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formTipoControleAcaoRisco}</b>]?
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

export default ExcluirRiscoTipoControleAcao;
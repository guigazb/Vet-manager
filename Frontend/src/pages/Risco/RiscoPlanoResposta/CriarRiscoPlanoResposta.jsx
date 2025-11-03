import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContext } from '../../../components/utils/AuthContext'
import { useFetchUnidadesFuncionaisPorLocalExecucao } from '../../../hooks/diversos/useFetchUnidadesFuncionaisPorLocalExecucao';

import routes from '../../../data/routes';

import Actions from '../../../components/geral/Actions'
import MainLayout from '../../MainLayout';
import InternalButtonArea from '../../../components/body/InternalButtonArea';
import FormPadrao from '../../../components/body/FormPadrao';
import ButtonComponent from '../../../components/button/ButtonComponent';
import TextInput from '../../../components/textinput/TextInput';
import DatePickerUnit from '../../../components/geral/DatePickerUnit';

import Modal from '../../../components/body/modal/Modal'

import axios from 'axios';
import InternalArea from '../../../components/body/InternalArea';
import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';

const CriarRiscoPlanoResposta = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_plano_resposta_listar);
    }

    // Acessa o AuthContext para pegar os dados do usuário autenticado
    const { auth, logout } = useContext(AuthContext);

    // ----------------------------------------------------------------------------------------------
    // Variaveis de backend
    // ----------------------------------------------------------------------------------------------
    const localExecucaoId = auth?.local_execucao_id;

    useEffect(() => {
        if (!localExecucaoId) { // Verifica se é null ou undefined
            logout(); // Executa o logout do AuthContext
            localStorage.removeItem('token'); // Remove o token do localStorage (se aplicável)
            navegar('/login', { replace: true }); // Redireciona para a página de login
        }
    }, [localExecucaoId, logout, navegar]);

    // ----------------------------------------------------------------------------------------------
    // Variaveis do Modal
    // ----------------------------------------------------------------------------------------------    
    const [modalAbertoNovoPlano, setModalAbertoNovo] = useState(false);

    const handleAbrirModalNovoPlano = () => {
        setModalAbertoNovo(true);
    };

    const handleFecharModalnovoPlano = () => {
        setModalAbertoNovo(false);
    };

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formPlanoRespostaRisco, setFormPlanoRespostaRisco] = useState('');
    const [formPlanoDataInicio, setFormPlanoDataInicio] = useState('');
    const [formPlanoDataFim, setFormPlanoDataFim] = useState('');
    const [formUnidadeFuncionalId, setFormUnidadeFuncionalId] = useState('0');
    const { unidadesPorLocalExecucao, loading: loadingUnidadesFuncionais } = useFetchUnidadesFuncionaisPorLocalExecucao(localExecucaoId);

    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------
    const handlePlanoRespostaRisco = (e) => {
        setFormPlanoRespostaRisco(e.target.value);
    };

    const handleDataInicio = (e) => {
        setFormPlanoDataInicio(e.target.value);
    };

    const handleDataFim = (e) => {
        const value = e.target.value;
        setFormPlanoDataFim(value);

        if ((formPlanoDataInicio > value) && value) {
            toast.error('A data de fim deve ser posterior a de inicio');
        }
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novoPlanoRespostaRisco = {
            nome_plano_resposta: formPlanoRespostaRisco,
            data_inicio: formPlanoDataInicio,
            data_fim: formPlanoDataFim,
            unidade_funcional_id: formUnidadeFuncionalId
        };

        let insercaoBemSucedida = false;
        try {
            const url = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_PLANO_RESPOSTA;
            const result = await axios.post(url, novoPlanoRespostaRisco);

            if (result.status === 201) {

                insercaoBemSucedida = true;

                setModalAbertoNovo(false);

                toast.success("Plano resposta de risco salvo com sucesso.", {
                    onClose: () => navegar(routes.risco_plano_resposta_listar)
                });
            } else {
                toast.error('Erro ao tentar salvar o Plano Resposta de risco`', error);
            }

        } catch (error) {
            toast.error('Erro ao tentar salvar o Plano Resposta de risco`', error);
        } finally {
            if (insercaoBemSucedida) {

                //Limpa todos os dados do formulário

                setFormPlanoRespostaRisco('');
                setFormPlanoDataInicio('');
                setFormPlanoDataFim('');
            }
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Risco" nomeSessao="Cadastro de Plano Resposta" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

                    <InternalArea>

                        <SelectInputPadrao
                            label="Selecione uma Unidade Funcional"
                            options={unidadesPorLocalExecucao}
                            optionKey="unidade_funcional_id"
                            optionValue="unidade_funcional_nome"
                            value={formUnidadeFuncionalId}
                            onChange={setFormUnidadeFuncionalId}
                            loading={loadingUnidadesFuncionais}
                            nomeSelect="unidadeFuncional"
                            autofocus={true}
                        />

                        <TextInput
                            maxLength="200"
                            nomeComponente="Planoresposta"
                            required
                            valorComponente={formPlanoRespostaRisco}
                            valorLabel="Plano Resposta "
                            autoComplete="plano resposta"
                            colSpan='4'
                            mt='2'
                            placeholder="Digite o nome"
                            type='text'
                            onChange={handlePlanoRespostaRisco}
                        />

                    </InternalArea>

                    <InternalArea>

                        <DatePickerUnit
                            nomeComponente="Data de Início"
                            valorLabel={formPlanoDataInicio}
                            required
                            onChange={handleDataInicio}
                            colSpan='2'
                            open
                        />

                        <DatePickerUnit
                            nomeComponente="Data de Fim"
                            valorLabel={formPlanoDataFim}
                            required
                            onChange={handleDataFim}
                            colSpan='4'
                            open
                        />

                    </InternalArea>

                </FormPadrao>

                <InternalButtonArea>
                    <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                        Retornar para Lista de Registros
                    </ButtonComponent>
                    <ButtonComponent tipo="sucesso" onClick={handleAbrirModalNovoPlano}>
                        Salvar Novo Registro
                    </ButtonComponent>
                </InternalButtonArea>

                <Modal modalAberto={modalAbertoNovoPlano} tamanho='m' onFechar={handleFecharModalnovoPlano}>
                    <Modal.ModalCabecalho onFechar={handleFecharModalnovoPlano}>
                        Criação de Novo Plano de Ação
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Tem certeza que deseja criar um novo Plano de Ação?
                        <br></br><br></br>
                        Ao aceitar, um novo Plano de Ação será criado.
                        <br></br><br></br>
                        Todas as ações ainda não finalizadas do Plano de Ação mais atual serão migradas para o novo plano de ação.
                    </Modal.ModalCorpo>
                    <Modal.ModalRodape>
                        <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModalnovoPlano}>
                            Fechar Janela
                        </ButtonComponent>
                        <ButtonComponent tipo="perigo" tipoBotao="button" onClick={handleCreateSubmit}>
                            Criar novo Plano de Ação
                        </ButtonComponent>

                    </Modal.ModalRodape>
                </Modal>

            </React.Fragment>
        </MainLayout>
    );
}

export default CriarRiscoPlanoResposta;
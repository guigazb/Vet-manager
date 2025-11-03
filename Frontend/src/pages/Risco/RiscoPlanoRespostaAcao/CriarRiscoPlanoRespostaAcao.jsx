import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../../../data/routes';

import Actions from '../../../components/geral/Actions'
import MainLayout from '../../MainLayout';
import InternalButtonArea from '../../../components/body/InternalButtonArea';
import FormPadrao from '../../../components/body/FormPadrao';
import ButtonComponent from '../../../components/button/ButtonComponent';
import TextInput from '../../../components/textinput/TextInput';
import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import DatePickerUnit from '../../../components/geral/DatePickerUnit';

import axios from 'axios';
import InternalArea from '../../../components/body/InternalArea';

import { useFetchUsuario } from '../../../hooks/diversos/useFetchUsuario';
import { useFetchUnidadesFuncionais } from '../../../hooks/diversos/useFetchUnidadesFuncionais';

const CriarRiscoPlanoRespostaAcao = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_plano_resposta_acao_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { usuarios, loading: loadingUsuarios } = useFetchUsuario();
    const { unidades, loading: loadingUnidades } = useFetchUnidadesFuncionais();

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formPlanoRespostaAcaoRisco, setFormPlanoRespostaAcaoRisco] = useState('');
    const [formAreaResponsavelId, setAreaResponsavelId] = useState('0');
    const [formPlanoAcaoPrazoFinal, setFormPlanoAcaoPrazoFinal] = useState('');
    const [formGestorRiscoId, setGestorRiscoId] = useState('0');
    const [formPlanoAcaoDataInicial, setFormPlanoAcaoDataInicial] = useState('');


    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------
    const handlePlanoRespostaAcaoRisco = (e) => {
        setFormPlanoRespostaAcaoRisco(e.target.value);
    };

    const handlePlanoAcaoPrazoFinal = (e) => {
        setFormPlanoAcaoPrazoFinal(e.target.value);
    };

    const handleDataInicial = (e) => {
        setFormPlanoAcaoDataInicial(e.target.value);
    };


    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novoPlanoRespostaAcaoRisco = {
            descricao_acao: formPlanoRespostaAcaoRisco,
            area_responsavel_id: formAreaResponsavelId,
            prazo_final: formPlanoAcaoPrazoFinal,
            gestor_risco_id: formGestorRiscoId,
            data_inicial:formPlanoAcaoDataInicial
        };

        let insercaoBemSucedida = false;
        try {
            const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_PLANO_RESPOSTA_ACAO, novoPlanoRespostaAcaoRisco);

            if (result.status === 201) {

                insercaoBemSucedida = true;

                toast.success("Plano resposta Ação de risco salvo com sucesso.");
            } else {
                toast.error('Erro ao tentar salvar o Plano Resposta Ação de risco`', error);
            }

        } catch (error) {
            toast.error('Erro ao tentar salvar o Plano Resposta Ação de risco`', error);
        } finally {
            if (insercaoBemSucedida) {

                //Limpa todos os dados do formulário

                setFormPlanoRespostaAcaoRisco('');
                setAreaResponsavelId('0');
                setFormPlanoAcaoPrazoFinal('');
                setGestorRiscoId('0');
                setFormPlanoAcaoDataInicial('');
            }
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Risco" nomeSessao="Cadastro de Plano Resposta Ação" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

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
                            onChange={handlePlanoRespostaAcaoRisco}
                        />

                        <SelectInputPadrao
                            label="Area Responsavel"
                            options={unidades}
                            optionKey="id"
                            optionValue="nome"
                            value={formAreaResponsavelId}
                            onChange={setAreaResponsavelId}
                            loading={loadingUnidades}
                            nomeSelect="arearesponsavel"
                        />
                        
                    </InternalArea>

                    <InternalArea>

                        <DatePickerUnit
                            nomeComponente="Prazo Final"
                            valorLabel={formPlanoAcaoPrazoFinal}
                            required
                            onChange={handlePlanoAcaoPrazoFinal}
                            colSpan='2'
                        />

                        <SelectInputPadrao
                            label="Gestor de risco"
                            options={usuarios}
                            optionKey="id"
                            optionValue="nome"
                            value={formGestorRiscoId}
                            onChange={setGestorRiscoId}
                            loading={loadingUsuarios}
                            nomeSelect="gestorrisco"
                        />

                        <DatePickerUnit
                            nomeComponente="Data Inicial"
                            valorLabel={formPlanoAcaoDataInicial}
                            required
                            onChange={handleDataInicial}
                            colSpan='2'
                        />


                    </InternalArea>

                </FormPadrao>

                <InternalButtonArea>
                    <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                        Retornar para Lista de Registros
                    </ButtonComponent>
                    <ButtonComponent tipo="sucesso" onClick={handleCreateSubmit}>
                        Salvar Novo Registro
                    </ButtonComponent>
                </InternalButtonArea>

            </React.Fragment>
        </MainLayout>
    );
}

export default CriarRiscoPlanoRespostaAcao;
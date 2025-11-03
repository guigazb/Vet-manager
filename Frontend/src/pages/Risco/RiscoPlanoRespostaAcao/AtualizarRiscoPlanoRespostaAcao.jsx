import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../../data/routes';

import Actions from '../../../components/geral/Actions'
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';
import TextInput from '../../../components/textinput/TextInput';
import DatePickerUnit from '../../../components/geral/DatePickerUnit';
import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';
import ButtonComponent from '../../../components/button/ButtonComponent';

import axios from 'axios';

import { useFetchUsuario } from '../../../hooks/diversos/useFetchUsuario';
import { useFetchUnidadesFuncionais } from '../../../hooks/diversos/useFetchUnidadesFuncionais';
import { useFetchRiscoPlanoRespostaAcao } from '../../../hooks/risco/useFetchRiscoPlanoRespostaAcao';


const AtualizarRiscoPlanoRespostaAcao = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_plano_resposta_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

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
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const planoRespostaAcaoRiscoAtualizado = {
            descricao_acao: formPlanoRespostaAcaoRisco,
            area_responsavel_id: formAreaResponsavelId,
            prazo_final: formPlanoAcaoPrazoFinal,
            gestor_risco_id: formGestorRiscoId,
            data_inicial: formPlanoAcaoDataInicial,
            ativo: formPlanoRespostaAcaoAtivo
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_PLANO_RESPOSTA_ACAO + '/' + id, planoRespostaAcaoRiscoAtualizado);

            if (result.status === 201) {

                atualizacaoBemSucedida = true;

                toast.success("Plano De Resposta Ação de risco atualizado com sucesso.", {
                    onClose: () => navegar(routes.risco_plano_resposta_acao_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar o Plano De Resposta Ação de risco`');
            }

        } catch (error) {
            toast.error('Erro ao tentar atualizar o Plano De Resposta Ação de risco`', error);
        } finally {
            if (atualizacaoBemSucedida) {

                //Limpa todos os dados do formulário

                setFormPlanoRespostaAcaoRisco('');
                setAreaResponsavelId('0');
                setFormPlanoAcaoPrazoFinal('');
                setGestorRiscoId('0');
                setFormPlanoAcaoDataInicial('');
                setFormPlanoRespostaAcaoAtivo('');

            }
            setAtualizarDesabilitado(true);
        }

    };


    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Risco" nomeSessao="Atualizar Plano Resposta ação de risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

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

                        <RadioButtonBooleanInput
                            valorComponente={formPlanoRespostaAcaoAtivo}
                            nomeComponenteAtivo="planorespostaAcao-ativo"
                            nomeComponenteInativo="planorespostaAcao-inativo"
                            valorLabel="Plano Resposta Ação Ativo ?"
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingPlanoRespostaAcaoRisco}>
                        <ButtonComponent tipo="cancelar" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="alerta" desabilitado={atualizarDesabilitado}>
                            Atualizar Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

            </React.Fragment>
        </MainLayout>
    );

}

export default AtualizarRiscoPlanoRespostaAcao;
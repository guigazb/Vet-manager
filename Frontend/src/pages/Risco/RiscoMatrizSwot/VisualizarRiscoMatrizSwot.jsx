import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../components/utils/AuthContext';
import { useFetchUnidadesFuncionaisPorLocalExecucao } from '../../../hooks/diversos/useFetchUnidadesFuncionaisPorLocalExecucao';
import { useFetchRiscoMatrizSwot } from '../../../hooks/risco/useFetchRiscoMatrizSwot';
import { useFetchForcasPorMatrizSwot } from '../../../hooks/risco/useFetchForcasPorMatrizSwot';
import { useFetchAmeacasPorMatrizSwot } from '../../../hooks/risco/useFetchAmeacasPorMatrizSwot';
import { useFetchOportunidadesPorMatrizSwot } from '../../../hooks/risco/useFetchOportunidadesPorMatrizSwot';
import { useFetchFraquezasPorMatrizSwot } from '../../../hooks/risco/useFetchFraquezasPorMatrizSwot';

import routes from '../../../data/routes';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions'
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';
import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import DatePickerUnit from '../../../components/geral/DatePickerUnit';
import ButtonComponent from '../../../components/button/ButtonComponent';
import GridInterna from '../../../components/datagrid/GridInterna';

const VisualizarRiscoMatrizSwot = () => {

    // ----------------------------------------------------------------------------------------------
    // URLs de retorno do Backend
    // ----------------------------------------------------------------------------------------------
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);
    const [forcas, setForcas] = useState([]);
    const [oportunidades, setOportunidades] = useState([]);
    const [fraquezas, setFraquezas] = useState([]);
    const [ameacas, setAmeacas] = useState([]);


    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------

    // Acessa o AuthContext para pegar os dados do usuário autenticado
    const { auth, logout } = useContext(AuthContext);

    const location = useLocation();
    const { id, idUnidade } = location.state || {};


    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_matriz_swot_listar);
    }


    // ----------------------------------------------------------------------------------------------
    // Busca de dados
    // ----------------------------------------------------------------------------------------------
    const localExecucaoId = auth?.local_execucao_id;

    const { riscoMatrizSwot, loading: loadingMatrizSwot } = useFetchRiscoMatrizSwot(id);
    const { forcasSwot, loading: loadingForcasSwot } = useFetchForcasPorMatrizSwot(id);
    const { oportunidadesSwot, loading: loadingOportunidadesSwot } = useFetchOportunidadesPorMatrizSwot(id);
    const { fraquezasSwot, loading: loadingFraquezasSwot } = useFetchFraquezasPorMatrizSwot(id);
    const { ameacasSwot, loading: loadingAmeacasSwot } = useFetchAmeacasPorMatrizSwot(id);
    const { unidadesPorLocalExecucao, loading: loadingUnidadesFuncionais } = useFetchUnidadesFuncionaisPorLocalExecucao(localExecucaoId);

    useEffect(() => {
        if (forcasSwot) {
            setForcas(forcasSwot);
        }
    }, [forcasSwot]);

    useEffect(() => {
        if (oportunidadesSwot) {
            setOportunidades(oportunidadesSwot);
        }
    }, [oportunidadesSwot]);

    useEffect(() => {
        if (fraquezasSwot) {
            setFraquezas(fraquezasSwot);
        }
    }, [fraquezasSwot]);

    useEffect(() => {
        if (ameacasSwot) {
            setAmeacas(ameacasSwot);
        }
    }, [ameacasSwot]);


    useEffect(() => {
        if (!localExecucaoId) { // Verifica se é null ou undefined
            logout(); // Executa o logout do AuthContext
            localStorage.removeItem('token'); // Remove o token do localStorage (se aplicável)
            navigate('/login', { replace: true }); // Redireciona para a página de login
        }
    }, [localExecucaoId, logout, navegar]);

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [formUnidadeFuncionalId, setUnidadeFuncionalId] = useState(riscoMatrizSwot?.unidade_funcional_id || '');
    const [formDataMatriz, setFormDataMatriz] = useState(riscoMatrizSwot?.data_matriz_swot || '');
    const [formMatrizAtiva, setFormMatrizAtiva] = useState(riscoMatrizSwot?.ativo || '');

    useEffect(() => {
        if (riscoMatrizSwot && riscoMatrizSwot.unidade_funcional_id !== undefined) {
            setUnidadeFuncionalId(riscoMatrizSwot.unidade_funcional_id);
        }
        if (riscoMatrizSwot && riscoMatrizSwot.data_matriz_swot !== undefined) {
            setFormDataMatriz(riscoMatrizSwot.data_matriz_swot);
        }
        if (riscoMatrizSwot && riscoMatrizSwot.ativo !== undefined) {
            setFormMatrizAtiva(riscoMatrizSwot.ativo);
        }
    }, [riscoMatrizSwot]);

    useEffect(() => {
        if (unidadesPorLocalExecucao) {
            setUnidadeFuncionalId(idUnidade);
        }
    });

    const handleNavegacaoEditarDadosMatrizSwot = () => {
        const idUnidade = formUnidadeFuncionalId;
        navegar(routes.risco_matriz_swot_editar, { state: { id, idUnidade } });
    }

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Risco" nomeSessao="Visualização de Matriz Swot" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao >

                    <InternalArea loading={loadingMatrizSwot}>

                        <SelectInputPadrao
                            label="Unidade Funcional:"
                            options={unidadesPorLocalExecucao}
                            optionKey="unidade_funcional_id"
                            optionValue="unidade_funcional_nome"
                            value={formUnidadeFuncionalId}
                            onChange={setUnidadeFuncionalId}
                            loading={loadingUnidadesFuncionais}
                            nomeSelect="unidadeFuncional"
                            desabilitado={true}
                        />

                        <DatePickerUnit
                            nomeComponente="Data de vigencia"
                            valorLabel={formDataMatriz}
                            required
                            colSpan='2'
                            desabilitado
                        />

                        <RadioButtonBooleanInput
                            valorLabel="Matriz Ativa?"
                            valorComponente={formMatrizAtiva}
                            onChange={setFormMatrizAtiva}
                            nomeComponenteAtivo="matriz-swot-ativo"
                            nomeComponenteInativo="matriz-swot-inativo"
                            colSpan='1'
                            inactiveLabel='true'
                            desabilitado
                        />

                    </InternalArea>

                    <InternalArea>

                        <GridInterna data={forcas} campo_exibicao="descricao_dado" titulo="Forças" registrosNaoEncontrados="Forças não cadastradas">
                            <ButtonComponent tipo="info" tipoBotao='button' onClick={handleNavegacaoEditarDadosMatrizSwot}>
                                Editar Forças da Matriz
                            </ButtonComponent>
                            <br></br><br></br>
                        </GridInterna>

                        <GridInterna data={fraquezas} campo_exibicao="descricao_dado" titulo="Fraquezas" registrosNaoEncontrados="Fraquezas não cadastradas">
                            <ButtonComponent tipo="info" tipoBotao='button' onClick={handleNavegacaoEditarDadosMatrizSwot}>
                                Editar Fraquezas da Matriz
                            </ButtonComponent>
                            <br></br><br></br>
                        </GridInterna>

                    </InternalArea>

                    <InternalArea>

                        <GridInterna data={oportunidades} campo_exibicao="descricao_dado" titulo="Oportunidades" registrosNaoEncontrados="Oportunidades não cadastradas">
                            <ButtonComponent tipo="info" tipoBotao='button' onClick={handleNavegacaoEditarDadosMatrizSwot}>
                                Editar Oportunidades da Matriz
                            </ButtonComponent>
                            <br></br><br></br>
                        </GridInterna>

                        <GridInterna data={ameacas} campo_exibicao="descricao_dado" titulo="Ameaças" registrosNaoEncontrados="Ameaças não cadastradas">
                            <ButtonComponent tipo="info" tipoBotao='button' onClick={handleNavegacaoEditarDadosMatrizSwot}>
                                Editar Ameaças da Matriz
                            </ButtonComponent>
                            <br></br><br></br>
                        </GridInterna>

                    </InternalArea>

                    <InternalButtonArea loading={loadingMatrizSwot}>

                        <ButtonComponent tipo="cancelar" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>

                        <ButtonComponent tipo="alerta" desabilitado={atualizarDesabilitado}>
                            Atualizar Registro
                        </ButtonComponent>

                    </InternalButtonArea>

                </FormPadrao>

            </React.Fragment>
        </MainLayout >
    )
}

export default VisualizarRiscoMatrizSwot
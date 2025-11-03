import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../components/utils/AuthContext';

import { useFetchUnidadesFuncionaisPorLocalExecucao } from '../../../hooks/diversos/useFetchUnidadesFuncionaisPorLocalExecucao';
import { useFetchRiscoMatrizSwot } from '../../../hooks/risco/useFetchRiscoMatrizSwot';

import routes from '../../../data/routes';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions'
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';
import { useFetchDatagrid } from '../../../hooks/useFetchDatagrid';

import BoxColunar from '../../../components/body/boxColunar/BoxColunar';
import GridDinamica from '../../../components/body/gridDinamica/GridDinamica';

import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';
import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import DatePickerUnit from '../../../components/geral/DatePickerUnit';
import ButtonComponent from '../../../components/button/ButtonComponent';

const EditarRiscoMatrizSwot = () => {

    // ----------------------------------------------------------------------------------------------
    // Variaveis de backend
    // ----------------------------------------------------------------------------------------------

    const URLBackend = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_MATRIZ_SWOT_DADOS + "/";

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------

    // Acessa o AuthContext para pegar os dados do usuário autenticado
    const { auth, logout } = useContext(AuthContext);

    const [refetchTrigger, setRefreshTrigger] = useState(0);

    const location = useLocation();
    const { id, idUnidade } = location.state || {};

    const navegar = useNavigate();

    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_matriz_swot_visualizar, { state: { id, idUnidade } });
    }


    // ----------------------------------------------------------------------------------------------
    // Busca de dados
    // ----------------------------------------------------------------------------------------------
    
    const localExecucaoId = auth?.local_execucao_id;

    const { riscoMatrizSwot, loading: loadingMatrizSwot } = useFetchRiscoMatrizSwot(id);
    const { unidadesPorLocalExecucao, loading: loadingUnidadesFuncionais } = useFetchUnidadesFuncionaisPorLocalExecucao(localExecucaoId);

    const { linhas: forcasSwotMUI, colunas: colunasForcaSwotMUI, loading: loadingForcaSwotMUI, error: errorForcaSwotMUI } = useFetchDatagrid(URLBackend + id + "/forcas/datagridMUI?refresh=" + refetchTrigger, refetchTrigger);
    const { linhas: oportunidadesSwotMUI, colunas: colunasOportunidadeSwotMUI, loading: loadingOportunidadesSwot, error: errorOportunidadeSwotMUI } = useFetchDatagrid(URLBackend + id + "/oportunidades/datagridMUI?refresh=" + refetchTrigger, refetchTrigger);
    const { linhas: fraquezasSwotMUI, colunas: colunasFraquezaSwotMUI, loading: loadingFraquezasSwot, error: errorFraquezaSwotMUI } = useFetchDatagrid(URLBackend + id + "/fraquezas/datagridMUI?refresh=" + refetchTrigger, refetchTrigger);
    const { linhas: ameacasSwotMUI, colunas: colunasAmeacaSwotMUI, loading: loadingAmeacasSwot, error: errorAmeacaSwotMUI } = useFetchDatagrid(URLBackend + id + "/ameacas/datagridMUI?refresh=" + refetchTrigger, refetchTrigger);


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
    }, [unidadesPorLocalExecucao]);

    const handleRefreshData = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    useEffect(() => {
        if (!localExecucaoId) { // Verifica se é null ou undefined
            logout(); // Executa o logout do AuthContext
            localStorage.removeItem('token'); // Remove o token do localStorage (se aplicável)
            navigate('/login', { replace: true }); // Redireciona para a página de login
        }
    }, [localExecucaoId, logout, navegar]);

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Risco : Matriz Swot" nomeSessao="Editar Matriz Swot" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao >

                    <InternalArea loading={loadingMatrizSwot}>

                        <SelectInputPadrao
                            label="Unidade Funcional:"
                            options={unidadesPorLocalExecucao}
                            optionKey="unidade_funcional_id"
                            optionValue="unidade_funcional_nome"
                            value={formUnidadeFuncionalId}
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
                            nomeComponenteAtivo="matriz-swot-ativo"
                            nomeComponenteInativo="matriz-swot-inativo"
                            colSpan='1'
                            inactiveLabel='true'
                            desabilitado
                        />

                    </InternalArea>

                    <BoxColunar altura="350">
                        <BoxColunar.BoxItem largura={50}>
                            <GridDinamica
                                matrizId={id}
                                tipoId={1}  // 1=Força, 2=Oportunidade, 3=Fraqueza, 4=Ameaça
                                tipo="forcas"
                                titulo="Forças"
                                placeholder="Insira uma nova força..."
                                onRefresh={handleRefreshData}
                                dados={forcasSwotMUI}
                                colunas={colunasForcaSwotMUI}
                                loading={loadingForcaSwotMUI}
                            />
                        </BoxColunar.BoxItem>

                        <BoxColunar.BoxItem largura={50}>
                            <GridDinamica
                                matrizId={id}
                                tipoId={3}
                                tipo="fraquezas"
                                titulo="Fraquezas"
                                placeholder="Insira uma nova fraqueza..."
                                onRefresh={handleRefreshData}
                                dados={fraquezasSwotMUI}
                                colunas={colunasFraquezaSwotMUI}
                                loading={loadingFraquezasSwot}
                            />
                        </BoxColunar.BoxItem>
                    </BoxColunar>

                    <BoxColunar altura="350">
                        <BoxColunar.BoxItem largura={50}>
                            <GridDinamica
                                matrizId={id}
                                tipoId={2}
                                tipo="oportunidades"
                                titulo="Oportunidades"
                                placeholder="Insira uma nova oportunidade..."
                                onRefresh={handleRefreshData}
                                dados={oportunidadesSwotMUI}
                                colunas={colunasOportunidadeSwotMUI}
                                loading={loadingOportunidadesSwot}
                            />
                        </BoxColunar.BoxItem>

                        <BoxColunar.BoxItem largura={50}>
                            <GridDinamica
                                matrizId={id}
                                tipoId={4}
                                tipo="ameacas"
                                titulo="Ameaças"
                                placeholder="Insira uma nova ameaça..."
                                onRefresh={handleRefreshData}
                                dados={ameacasSwotMUI}
                                colunas={colunasAmeacaSwotMUI}
                                loading={loadingAmeacasSwot}
                            />
                        </BoxColunar.BoxItem>
                    </BoxColunar>

                    <InternalButtonArea loading={loadingMatrizSwot}>
                        <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Visualização
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

            </React.Fragment>
        </MainLayout>
    );
}

export default EditarRiscoMatrizSwot;
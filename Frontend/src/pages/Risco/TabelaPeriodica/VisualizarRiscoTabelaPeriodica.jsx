import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../components/utils/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';

import Actions from '../../../components/geral/Actions';
import MainLayout from '../../MainLayout';
import InternalButtonArea from '../../../components/body/InternalButtonArea';
import ButtonComponent from '../../../components/button/ButtonComponent';

import TabelaPeriodica from '../../../components/body/tabelaPeriodica/TabelaPeriodica';
import TabelaPeriodicaPDF from '../../../components/body/tabelaPeriodica/TabelaPeriodicaPDF'; // Import the PDF component

import { useFetchRiscoTabelaPeriodica } from '../../../hooks/risco/useFetchRiscoTabelaPeriodica';
import routes from '../../../data/routes';

const VisualizarRiscoTabelaPeriodica = () => {
    const { auth, logout } = useContext(AuthContext);
    const location = useLocation();
    const { id } = location.state || {};
    const navigate = useNavigate();
    const [unidadeFuncionalId, setUnidadeFuncionalId] = useState('0');
    const { tabelaPeriodica, loading } = useFetchRiscoTabelaPeriodica(id);

    const localExecucaoId = auth?.local_execucao_id;

    useEffect(() => {
        if (!localExecucaoId) {
            logout();
            localStorage.removeItem('token');
            navigate('/login', { replace: true });
        }
    }, [localExecucaoId, logout, navigate]);

    const handleIrParaPaginaListarRegistros = () => {
        const unidadeFuncional = unidadeFuncionalId;
        navigate(routes.risco_tabela_periodica_listar, { state: { unidadeFuncional } });
    };

    // Process data for PDF (same as in TabelaPeriodica)
    const dadosTabela = [
        { probabilidade: 5, risco: [5, 10, 15, 20, 25], controle: [25, 20, 15, 10, 5] },
        { probabilidade: 4, risco: [4, 8, 12, 16, 20], controle: [20, 16, 12, 8, 4] },
        { probabilidade: 3, risco: [3, 6, 9, 12, 15], controle: [15, 12, 9, 6, 3] },
        { probabilidade: 2, risco: [2, 4, 6, 8, 10], controle: [10, 8, 6, 4, 2] },
        { probabilidade: 1, risco: [1, 2, 3, 4, 5], controle: [5, 4, 3, 2, 1] },
    ];

    const processaDados = (data) => {
        const contadorRisco = dadosTabela.map(row => row.risco.map(() => 0));
        const contadorControle = dadosTabela.map(row => row.controle.map(() => 0));
        const riscosPorCelula = dadosTabela.map(row => row.risco.map(() => []));
        const controlesPorCelula = dadosTabela.map(row => row.controle.map(() => []));

        data.forEach(item => {
            const valorRisco = item.probabilidade * item['impacto'];
            const valorControle = item['desenho controle'] * item['operação controle'];

            dadosTabela.forEach((row, rowIndex) => {
                const prob = row.probabilidade;
                row.risco.forEach((valRisco, colIndex) => {
                    if (prob === item.probabilidade && valRisco === valorRisco) {
                        contadorRisco[rowIndex][colIndex]++;
                        riscosPorCelula[rowIndex][colIndex].push({
                            risco: item.risco,
                            processo: item.processo,
                        });
                    }
                });
            });

            const desenhoIndex = 5 - item['desenho controle'];
            const operacaoIndex = 5 - item['operação controle'];
            if (desenhoIndex >= 0 && desenhoIndex < 5 && operacaoIndex >= 0 && operacaoIndex < 5) {
                const valorEsperadoControle = dadosTabela[desenhoIndex].controle[operacaoIndex];
                if (valorEsperadoControle === valorControle) {
                    contadorControle[desenhoIndex][operacaoIndex]++;
                    controlesPorCelula[desenhoIndex][operacaoIndex].push({
                        risco: item.risco,
                        processo: item.processo,
                    });
                }
            }
        });

        return { contadorRisco, contadorControle, riscosPorCelula, controlesPorCelula };
    };

    const { contadorRisco, contadorControle, riscosPorCelula, controlesPorCelula } = tabelaPeriodica
        ? processaDados(tabelaPeriodica)
        : {
              contadorRisco: dadosTabela.map(row => row.risco.map(() => 0)),
              contadorControle: dadosTabela.map(row => row.controle.map(() => 0)),
              riscosPorCelula: dadosTabela.map(row => row.risco.map(() => [])),
              controlesPorCelula: dadosTabela.map(row => row.controle.map(() => [])),
          };

    const nomeUnidadeFuncional = tabelaPeriodica[0]?.['Unidade Funcional'] || '';

    return (
        <MainLayout>
            <Actions
                breadcrumb="Início : Risco : Tabela periódica"
                nomeSessao=" Visualizar Tabela Periódica"
                hasAddViewButton={false}
                hasFilter={false}
            />

            <TabelaPeriodica tabelaPeriodicaId={id} />

            <InternalButtonArea>
                <PDFDownloadLink
                    document={
                        <TabelaPeriodicaPDF
                            tabelaPeriodica={tabelaPeriodica}
                            nomeUnidadeFuncional={nomeUnidadeFuncional}
                            contadorRisco={contadorRisco}
                            contadorControle={contadorControle}
                            riscosPorCelula={riscosPorCelula}
                            controlesPorCelula={controlesPorCelula}
                        />
                    }
                    fileName={`Tabela_Periodica_Riscos_${id}.pdf`}
                >
                    {({ loading }) => (
                        <ButtonComponent
                            tipo="primario"
                            tipoBotao="button"
                            desabilitado={loading}
                        >
                            {loading ? 'Gerando PDF...' : 'Baixar PDF'}
                        </ButtonComponent>
                    )}
                </PDFDownloadLink>
                <ButtonComponent
                    tipo="primario"
                    tipoBotao="submit"
                    onClick={handleIrParaPaginaListarRegistros}
                >
                    Retornar para Listagem
                </ButtonComponent>
            </InternalButtonArea>
        </MainLayout>
    );
};

export default VisualizarRiscoTabelaPeriodica;
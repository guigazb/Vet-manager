import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    tablePage: { padding: 20, fontSize: 12 },
    riskPage: { padding: 30, fontSize: 12 },
    title: { fontSize: 16, marginBottom: 10, textAlign: 'center', backgroundColor: '#1F4E78', color: 'white', padding: 10 },
    table: { display: 'table', width: '100%', borderStyle: 'solid', borderWidth: 1, borderColor: '#fff' },
    tableRow: { flexDirection: 'row', minHeight: 80 }, // Standardized row height
    tableCell: { width: 100, height: 80, borderStyle: 'solid', borderWidth: 1, borderColor: '#fff', padding: 5, textAlign: 'center', fontSize: 12 },
    headerCell: { backgroundColor: '#7A0000', color: 'white', fontSize: 12 },
    controlHeaderCell: { backgroundColor: '#595959', color: 'white', fontSize: 12 },
    probCell: { backgroundColor: '#fff', fontSize: 12 },
    desenhoCell: { backgroundColor: '#fff', fontSize: 12 },
    impactHeader: { backgroundColor: '#0057B7', color: 'white', fontSize: 12 },
    riskListTitle: { fontSize: 14, marginBottom: 10, marginTop: 20 },
    riskItem: { marginBottom: 5 },
});

const TabelaPeriodicaPDF = ({ tabelaPeriodica, nomeUnidadeFuncional, contadorRisco, contadorControle, riscosPorCelula, controlesPorCelula }) => {
    const dadosTabela = [
        { probabilidade: 5, risco: [5, 10, 15, 20, 25], controle: [25, 20, 15, 10, 5] },
        { probabilidade: 4, risco: [4, 8, 12, 16, 20], controle: [20, 16, 12, 8, 4] },
        { probabilidade: 3, risco: [3, 6, 9, 12, 15], controle: [15, 12, 9, 6, 3] },
        { probabilidade: 2, risco: [2, 4, 6, 8, 10], controle: [10, 8, 6, 4, 2] },
        { probabilidade: 1, risco: [1, 2, 3, 4, 5], controle: [5, 4, 3, 2, 1] },
    ];

    const titulosProbabilidade = ['Muito Alta (5)', 'Alta (4)', 'Média (3)', 'Baixa (2)', 'Muito Baixa (1)'];
    const titulosControle = [
        'Controle Suficiente, eficaz e formalizado (5)',
        'Controle Suficiente, mas não formalizado (4)',
        'Controle formalizado, mas insuficiente (3)',
        'Controle informal, inadequado e insuficiente (2)',
        'Não há controle (1)',
    ];
    const titulosImpacto = ['Muito Baixa', 'Baixa', 'Média', 'Alta', 'Muito alta'];
    const titulosOperacao = [
        'Implantada, executada e com evidência',
        'Implantada e executada, mas sem evidência',
        'Parcialmente executada',
        'Parcialmente executada e com deficiência',
        'Não executada',
    ];

    const getCorRisco = (valor) => {
        switch (valor) {
            case 1: case 2: case 3: return '#548235';
            case 4: case 6: return '#FFFF00';
            case 5: case 8: case 9: case 12: return '#FFC000';
            case 10: case 15: case 16: case 20: case 25: return '#FF0000';
            default: return '#FFFF00';
        }
    };

    const getCorControle = (valor) => {
        switch (valor) {
            case 25: return '#548235';
            case 15: case 16: case 20: return '#A9D08E';
            case 9: case 10: case 12: return '#FFFF00';
            case 5: case 6: case 8: return '#FFC000';
            case 1: case 2: case 3: case 4: return '#FF7C80';
            default: return '#FFFF00';
        }
    };

    return (
        <Document>
            {/* Page 1: Periodic Table with Custom Size */}
            <Page size={{ width: 1200, height: 850 }} style={styles.tablePage}>
                <Text style={styles.title}>Tabela Periódica de Riscos e Controles - [{nomeUnidadeFuncional}]</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCell, { backgroundColor: '#0057B7', color: 'white', width: 100, height:40 }]}><Text>Probabilidade</Text></View>
                        <View style={[styles.tableCell, styles.headerCell, { width: 500, height: 40 }]}><Text>Riscos</Text></View>
                        <View style={[styles.tableCell, styles.controlHeaderCell, { width: 500, height: 40 }]}><Text>Controles</Text></View>
                        <View style={[styles.tableCell, { backgroundColor: '#0057B7', color: 'white', width: 100, height: 40 }]}><Text>Desenho</Text></View>
                    </View>
                    {dadosTabela.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.tableRow}>
                            <View style={[styles.tableCell, styles.probCell, { width: 100 }]}><Text>{titulosProbabilidade[rowIndex]}</Text></View>
                            {row.risco.map((valorRisco, colIndex) => (
                                <View key={`risco-${colIndex}`} style={[styles.tableCell, { backgroundColor: getCorRisco(valorRisco), color: [1, 2, 3, 10, 15, 16, 20, 25].includes(valorRisco) ? 'white' : 'black', width: 100 }]}>
                                    <Text>{contadorRisco[rowIndex][colIndex] > 0 ? contadorRisco[rowIndex][colIndex] : ''}</Text>
                                </View>
                            ))}
                            {row.controle.map((valorControle, colIndex) => (
                                <View key={`controle-${colIndex}`} style={[styles.tableCell, { backgroundColor: getCorControle(valorControle), color: valorControle === 25 ? 'white' : 'black', width: 100 }]}>
                                    <Text>{contadorControle[rowIndex][colIndex] > 0 ? contadorControle[rowIndex][colIndex] : ''}</Text>
                                </View>
                            ))}
                            <View style={[styles.tableCell, styles.desenhoCell, { width: 100 }]}><Text>{titulosControle[rowIndex]}</Text></View>
                        </View>
                    ))}
                    <View style={styles.tableRow}>
                        <View style={styles.tableCell}></View>
                        {titulosImpacto.map((label, index) => (
                            <View key={`impacto-${index}`} style={[styles.tableCell, { width: 100, height: 30 }]}><Text>{index + 1}</Text></View>
                        ))}
                        {titulosOperacao.map((_, index) => (
                            <View key={`operacao-${index}`} style={[styles.tableCell, { width: 100, height: 30}]}><Text>{5 - index}</Text></View>
                        ))}
                        <View style={styles.tableCell}></View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCell}></View>
                        {titulosImpacto.map((label, index) => (
                            <View key={`impacto-label-${index}`} style={[styles.tableCell, { width: 100 }]}><Text>{label}</Text></View>
                        ))}
                        {titulosOperacao.map((label, index) => (
                            <View key={`operacao-label-${index}`} style={[styles.tableCell, { width: 100 }]}><Text>{label}</Text></View>
                        ))}
                        <View style={styles.tableCell}></View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCell}></View>
                        <View style={[styles.tableCell, styles.impactHeader, { width: 500, height: 50 }]}><Text>Impacto</Text></View>
                        <View style={[styles.tableCell, styles.impactHeader, { width: 500, height: 50 }]}><Text>Operação</Text></View>
                        <View style={styles.tableCell}></View>
                    </View>
                </View>
            </Page>

            {/* Page 2: Risk and Control Details */}
            <Page size="A4" style={styles.riskPage}>
                <Text style={styles.riskListTitle}>Detalhes dos Riscos e Controles</Text>
                {dadosTabela.map((row, rowIndex) => (
                    <View key={rowIndex}>
                        {row.risco.map((valorRisco, colIndex) => (
                            riscosPorCelula[rowIndex][colIndex].length > 0 && (
                                <View key={`risco-detail-${rowIndex}-${colIndex}`}>
                                    <Text style={styles.riskListTitle}>
                                        Riscos (Probabilidade: {titulosProbabilidade[rowIndex]}, Impacto: {titulosImpacto[colIndex]})
                                    </Text>
                                    {riscosPorCelula[rowIndex][colIndex].map((item, index) => (
                                        <View key={index} style={styles.riskItem}>
                                            <Text>Risco: {item.risco}</Text>
                                            <Text>Processo: {item.processo}</Text>
                                        </View>
                                    ))}
                                </View>
                            )
                        ))}
                        {row.controle.map((valorControle, colIndex) => (
                            controlesPorCelula[rowIndex][colIndex].length > 0 && (
                                <View key={`controle-detail-${rowIndex}-${colIndex}`}>
                                    <Text style={styles.riskListTitle}>
                                        Controles (Desenho: {titulosControle[rowIndex]}, Operação: {titulosOperacao[colIndex]})
                                    </Text>
                                    {controlesPorCelula[rowIndex][colIndex].map((item, index) => (
                                        <View key={index} style={styles.riskItem}>
                                            <Text>Risco: {item.risco}</Text>
                                            <Text>Processo: {item.processo}</Text>
                                        </View>
                                    ))}
                                </View>
                            )
                        ))}
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default TabelaPeriodicaPDF;
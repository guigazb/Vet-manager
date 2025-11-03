const mapearCorFundo = (tipoDado) => (opcao, valor, options = []) => {
    const parsedValor = parseInt(valor, 10); // Converte valor para número
    let opcaoSelecionada = opcao;

    // Se opcao for null, tente encontrar a opção correspondente em options
    if (!opcaoSelecionada && valor !== '0' && options.length > 0) {
        opcaoSelecionada = options.find(
            (opt) => opt.valor === parsedValor || opt.id === parsedValor
        );
    }

    // Helper para probabilidade e impacto
    const getCorProbabilidadeImpacto = (valor) => {
        if (valor === 1) return '#B0C23D'; // Muito baixa
        if (valor === 2) return '#DAFF47'; // Baixa
        if (valor === 3) return '#FFDD00'; // Média
        if (valor === 4) return '#F8BA00'; // Alta
        if (valor === 5) return '#FF4F64'; // Muito alta
        return 'white';
    };

    // Helper para desenho_controle e operacao_controle
    const getCorDesenhoOperacao = (valor) => {
        if (valor === 1) return '#FF4F64'; // Muito baixa
        if (valor === 2) return '#F8BA00'; // Baixa
        if (valor === 3) return '#FFDD00'; // Média
        if (valor === 4) return '#DAFF47'; // Alta
        if (valor === 5) return '#B0C23D'; // Muito alta
        return 'white';
    };

    // Helper para nivel_real
    const getCorNivelReal = (limiteInicial, limiteFinal) => {
        if (limiteInicial >= 1 && limiteFinal <= 3) return '#B0C23D';   // Risco Pequeno (1 a 3)
        if (limiteInicial >= 4 && limiteFinal <= 7) return '#FFDD00';   // Risco Moderado (4 a 7)
        if (limiteInicial >= 8 && limiteFinal <= 14) return '#F8BA00';  // Risco Alto (8 a 14)
        if (limiteInicial >= 15 && limiteFinal <= 25) return '#FF4F64'; // Risco Crítico (15 a 25)
        return 'white';
    };

    // Helper para matriz_controle
    const getCorMatrizControle = (limiteInicial, limiteFinal) => {
        if (limiteInicial === 1) return '#E31E36';                      // Controle Inexistente
        if (limiteInicial >= 2 && limiteFinal <= 4) return '#C25C68';   // Controle Fraco
        if (limiteInicial >= 5 && limiteFinal <= 9) return '#F8BA00';   // Controle Inicial
        if (limiteInicial >= 10 && limiteFinal <= 16) return '#FFDD00'; // Controle Mínimo
        if (limiteInicial >= 17 && limiteFinal <= 20) return '#DAFF47'; // Controle Suficiente
        if (limiteInicial >= 20) return '#B0C23D';                      // Controle Forte
        return 'white';
    };

    switch (tipoDado) {
        case 'probabilidade':
        case 'impacto':
            return getCorProbabilidadeImpacto(parsedValor);
        case 'desenho':
        case 'operacao':
            return getCorDesenhoOperacao(parsedValor);
        case 'nivel_real':
            if (opcaoSelecionada && opcaoSelecionada.limite_inicial !== undefined && opcaoSelecionada.limite_final !== undefined) {
                return getCorNivelReal(opcaoSelecionada.limite_inicial, opcaoSelecionada.limite_final);
            }
            return 'white';
        case 'matriz_controle':
            if (opcaoSelecionada && opcaoSelecionada.limite_inicial !== undefined && opcaoSelecionada.limite_final !== undefined) {
                return getCorMatrizControle(opcaoSelecionada.limite_inicial, opcaoSelecionada.limite_final);
            }
            return 'white';
        default:
            return 'white';
    }
};

export default mapearCorFundo;
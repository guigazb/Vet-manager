import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Função para mapear cores do grupo probabilidade/impacto
const getCorProbabilidadeImpacto = (valor) => {
    return valor === '1' ? '#B0C23D' :
        valor === '2' ? '#DAFF47' :
            valor === '3' ? '#FFDD00' :
                valor === '4' ? '#F8BA00' :
                    valor === '5' ? '#FF4F64' : 'white';
};

// Função para mapear cores do grupo desenho_controle/operacao_controle
const getCorDesenhoOperacao = (valor) => {
    return valor === '1' ? '#FF4F64' :
        valor === '2' ? '#F8BA00' :
            valor === '3' ? '#FFDD00' :
                valor === '4' ? '#DAFF47' :
                    valor === '5' ? '#B0C23D' : 'white';
};

// Função para mapear cores do grupo nivel_real
const getCorNivelReal = (limiteInicial, limiteFinal) => {
    if (limiteInicial >= 1 && limiteFinal <= 3) return '#B0C23D';
    if (limiteInicial >= 4 && limiteFinal <= 7) return '#FFDD00';
    if (limiteInicial >= 8 && limiteFinal <= 14) return '#F8BA00';
    if (limiteInicial >= 15 && limiteFinal <= 25) return '#FF4F64';
    return 'white';
};

// Função para mapear cores do grupo matriz_controle
const getCorMatrizControle = (limiteInicial, limiteFinal) => {
    if (limiteInicial === 1) return '#E31E36'; // Controle Inexistente
    if (limiteInicial >= 2 && limiteFinal <= 4) return '#C25C68'; // Controle Fraco
    if (limiteInicial >= 5 && limiteFinal <= 9) return '#F8BA00'; // Controle Inicial
    if (limiteInicial >= 10 && limiteFinal <= 16) return '#FFDD00'; // Controle Mínimo
    if (limiteInicial >= 17 && limiteFinal <= 20) return '#DAFF47'; // Controle Suficiente
    if (limiteInicial >= 20) return '#B0C23D'; // Controle Forte
    return 'white';
};

const SelectInputPadrao = ({
    label,
    options,
    optionKey,
    optionValue,
    value = "0",
    onChange,
    loading,
    nomeSelect,
    col_span = 2,
    autofocus = false,
    desabilitado = false,
    mapearCorFundo = null,
    tipoDado = '', // Opções: '', 'probabilidade', 'impacto', 'nivel_real', 'desenho', 'operacao', 'matriz_controle',
    corForcada = null,
}) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (autofocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autofocus]);

    const getCorOpcionalFundo = (opcao, valor) => {
        if (corForcada) {
            return corForcada;
        }
        if (mapearCorFundo) {
            return mapearCorFundo(opcao, valor);
        }

        switch (tipoDado) {
            case 'probabilidade':
            case 'impacto':
                return getCorProbabilidadeImpacto(valor);
            case 'desenho':
            case 'operacao':
                return getCorDesenhoOperacao(valor);
            case 'nivel_real':
                if (opcao && opcao.limite_inicial !== undefined && opcao.limite_final !== undefined) {
                    return getCorNivelReal(opcao.limite_inicial, opcao.limite_final);
                }
                const opcaoSelecionada = options.find(opt => opt[optionKey].toString() === valor);
                return opcaoSelecionada && opcaoSelecionada.limite_inicial !== undefined && opcaoSelecionada.limite_final !== undefined
                    ? getCorNivelReal(opcaoSelecionada.limite_inicial, opcaoSelecionada.limite_final)
                    : 'white';
            case 'matriz_controle':
                if (opcao && opcao.limite_inicial !== undefined && opcao.limite_final !== undefined) {
                    return getCorMatrizControle(opcao.limite_inicial, opcao.limite_final);
                }
                const opcaoSelecionadaMatriz = options.find(opt => opt[optionKey].toString() === valor);
                return opcaoSelecionadaMatriz && opcaoSelecionadaMatriz.limite_inicial !== undefined && opcaoSelecionadaMatriz.limite_final !== undefined
                    ? getCorMatrizControle(opcaoSelecionadaMatriz.limite_inicial, opcaoSelecionadaMatriz.limite_final)
                    : 'white';
            default:
                return 'white';
        }
    };

    return (
        <div className={`sm:col-span-${col_span}`}>
            <label htmlFor={nomeSelect} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    style={{
                        backgroundColor: getCorOpcionalFundo(null, value),
                        color: '#000000'
                    }}
                    value={value}
                    ref={inputRef}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={desabilitado || loading}
                    name={nomeSelect}
                    id={nomeSelect}
                >
                    <option value="0" key="0" disabled style={{ color: 'black', backgroundColor: 'white' }}>
                        Selecione...
                    </option>
                    {options.map((option, index) => (
                        <option
                            key={index}
                            value={option[optionKey]}
                            style={{
                                backgroundColor: getCorOpcionalFundo(option, option[optionKey].toString()),
                                color: 'black',
                            }}
                        >
                            {option[optionValue]}
                        </option>
                    ))}
                </select>
                {loading && <p className="text-sm text-gray-500">Carregando...</p>}
            </div>
        </div>
    );
};

SelectInputPadrao.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    optionKey: PropTypes.string.isRequired,
    optionValue: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    nomeSelect: PropTypes.string.isRequired,
    col_span: PropTypes.number,
    autofocus: PropTypes.bool,
    desabilitado: PropTypes.bool,
    mapearCorFundo: PropTypes.func,
    tipoDado: PropTypes.oneOf([
        '',
        'probabilidade',
        'impacto',
        'nivel_real',
        'desenho',
        'operacao',
        'matriz_controle',
    ]),
    corForcada: PropTypes.string,
};

export default SelectInputPadrao;
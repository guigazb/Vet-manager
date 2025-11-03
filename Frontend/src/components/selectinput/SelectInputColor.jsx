import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const SelectInputColor = ({
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
    corCarregando = '#f0f0f0', // Cor padrão para quando estiver carregando
}) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (autofocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autofocus]);

    const getBackgroundColor = (option, valor) => {
        if (loading) {
            return corCarregando; // Aplicar cor de carregamento
        }
        if (mapearCorFundo) {
            return mapearCorFundo(option, valor, options); // Passa options para mapearCorFundo
        }
        return 'white'; // Background padrão
    };

    // Encontrar a opção selecionada com base no valor
    const selectedOption = options.find(
        (option) => option[optionKey].toString() === value.toString()
    );

    return (
        <div className={`sm:col-span-${col_span}`}>
            {label && (
                <label htmlFor={nomeSelect} className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
            )}
            <div
                className="mt-2 relative"
                style={{
                    backgroundColor: getBackgroundColor(selectedOption, value), // Aplica a cor ao contêiner
                    borderRadius: '0.375rem', // Mesma borda arredondada do select
                }}
            >
                <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    style={{
                        backgroundColor: 'transparent', // Torna o fundo do select transparente para mostrar a cor do contêiner
                        color: '#000000',
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
                            value={option[optionKey].toString()}
                            style={{
                                backgroundColor: getBackgroundColor(option, option[optionKey].toString()),
                                color: 'black',
                            }}
                        >
                            {option[optionValue]}
                        </option>
                    ))}
                </select>
                {loading && <p className="text-sm text-gray-500 absolute">Carregando...</p>}
            </div>
        </div>
    );
};

SelectInputColor.propTypes = {
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
    corCarregando: PropTypes.string,
};

export default SelectInputColor;
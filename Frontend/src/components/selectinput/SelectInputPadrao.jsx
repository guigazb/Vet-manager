import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

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
}) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (autofocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autofocus]);

    return (
        <div className={`sm:col-span-${col_span}`}>
            <label htmlFor={nomeSelect} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={value ?? "0"}
                    ref={inputRef}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={desabilitado || loading}
                    name={nomeSelect}
                    id={nomeSelect}
                >
                    <option value="0" key="0" disabled>
                        Selecione...
                    </option>
                    {options.map((option, index) => (
                        <option
                            key={index}
                            value={option[optionKey]}
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
};

export default SelectInputPadrao;
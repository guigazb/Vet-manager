import React, { memo } from 'react';

const SelectInput = ({
    valorLabel,
    nomeSelect,
    valorSelect,
    onChange,
    dados = [],
    placeholder = "Selecione uma opção",
    optionKey = "",
    optionValue = "",
    loading = "true",
    col_span = "2",
    mt_ = "2",
    desabilitado = false
}) => {
    return (
        <>
            {loading ? (
                <p>Carregando {valorLabel}...</p>
            ) : (
                <div className={`sm:col-span-${col_span}`}>
                    <label htmlFor={nomeSelect} className="block text-sm font-medium leading-6 text-gray-900">
                        {valorLabel}
                    </label>
                    <div className={`mt-${mt_}`}>
                        <select
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            id={nomeSelect}
                            name={nomeSelect}
                            value={valorSelect}
                            onChange={onChange}
                            disabled={desabilitado}
                        >
                            <option value="undefined">{placeholder}</option>
                            {dados.length > 0 ? (
                                dados.map((option, index) => (
                                    <option key={index} value={option[optionKey]}>
                                        {option[optionValue]}
                                    </option>
                                    
                                ))
                            ) : (
                                <option disabled>Carregando opções...</option>
                            )}
                        </select>
                    </div>
                </div>
            )}
        </>
    )
};

export default memo(SelectInput);
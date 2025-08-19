import React from 'react'

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
    desabilitado = false }) => {
    return (
        <>
            <div className={`sm:col-span-${col_span}`}>
                <label htmlFor={nomeSelect} className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
                <div className="mt-2">

                    {desabilitado ? (
                        <select
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            disabled={desabilitado}
                            name={nomeSelect}
                            id={nomeSelect}
                        >
                            <option value="" key="" id="" disabled>Selecione...</option>
                            {options.map((option, index) => (
                                <option key={index} value={option[optionKey]}>
                                    {option[optionValue]}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <select
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            disabled={loading}
                            name={nomeSelect}
                            id={nomeSelect}
                        >
                            <option value="0" key="" id="" disabled>Selecione...</option>
                            {options.map((option, index) => (
                                <option key={index} value={option[optionKey]}>
                                    {option[optionValue]}
                                </option>
                            ))}
                        </select>

                    )}
                    {loading && <p className="text-sm text-gray-500">Carregando...</p>}
                </div>
            </div>
        </>
    )
}

export default SelectInputPadrao
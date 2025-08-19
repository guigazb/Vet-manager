import React, { useEffect, useRef, memo } from 'react';

const TextInput = ({
    nomeComponente,
    type = "text",
    placeholder = "",
    maxLength,
    valorLabel,
    valorComponente,
    onChange,
    autoComplete = "",
    required,
    colSpan = "2",
    autofocus = false,
    desabilitado = false
}) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (autofocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autofocus]);

    return (
        <>
            <div className={`sm:col-span-${colSpan}`}>
                <label htmlFor={nomeComponente} className="block text-sm font-medium text-gray-900 leading-6">
                    {valorLabel}
                </label>
                <div className={`mt-2`}>

                    <input
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        ref={inputRef}
                        id={nomeComponente}
                        name={nomeComponente}
                        type={type}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        label={valorLabel}
                        value={valorComponente}
                        onChange={onChange}
                        autoComplete={autoComplete}
                        required={required}
                        disabled={desabilitado}
                    />

                </div>
            </div>
        </>

    )
};

export default memo(TextInput);
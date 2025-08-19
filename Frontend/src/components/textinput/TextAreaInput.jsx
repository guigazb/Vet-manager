import React, { useEffect, useRef, memo } from 'react';

const TextAreaInput = ({
    nomeComponente,
    placeholder = "",
    maxLength,
    valorLabel,
    valorComponente,
    onChange,
    autoComplete = "",
    required,
    colSpan = 3,
    autofocus = false,
    desabilitado = false,
    rows = 2,
    cols = 5
}) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (autofocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autofocus]);

    // calcula largura de acordo com o número de colunas
    const getWidthClass = () => {

        if (cols <= 20) {
            return 'w-48';  // pequeno
        }

        if (cols <= 40) {
            return 'w-96'; // medio
        }

        return 'w-full'; // grande - quebrado
    };

    return (
        <>
            <div className={`sm:col-span-${colSpan}`}>

                <label className="block text-sm font-medium text-gray-900 leading-6">
                    {valorLabel}
                </label>
                <div className={`mt-2`}></div>

                <textarea
                    className={`${getWidthClass()} rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset 
                    ${desabilitado
                            ? 'bg-gray-100 text-gray-500 ring-gray-200 cursor-not-allowed'
                            : 'ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                        } 
                    sm:text-sm sm:leading-6`}
                    ref={inputRef}
                    id={nomeComponente}
                    name={nomeComponente}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    value={valorComponente}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    required={required}
                    disabled={desabilitado}
                    rows={rows}
                    cols={cols}

                />
            </div>
        </>
    );
};

export default memo(TextAreaInput);
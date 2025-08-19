import React, { useEffect, useRef, memo } from 'react';

const RadioButtonBooleanInput = ({
    valorLabel,
    valorComponente,
    onChange,
    nomeComponenteAtivo,
    nomeComponenteInativo,
    colSpan = "1",
    desabilitado = false
}) => (
    <div className={`sm:col-span-${colSpan}`}>
        <fieldset>
            <p className="mt-1 text-sm leading-6 font-medium text-gray-900">{valorLabel}</p>
            <div className="mt-3 space-y-6">
                <div className="flex items-center gap-x-3">
                    <input
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        type="radio"
                        id={nomeComponenteAtivo}
                        checked={valorComponente}
                        onChange={() => onChange(true)}
                        disabled={desabilitado}
                    />
                    <label htmlFor={nomeComponenteAtivo} className="block text-sm font-medium leading-6">
                        Sim
                    </label>
                    <input
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        type="radio"
                        id={nomeComponenteInativo}
                        checked={!valorComponente}
                        onChange={() => onChange(false)}
                        disabled={desabilitado}
                    />
                    <label htmlFor={nomeComponenteInativo} className="block text-sm font-medium leading-6">
                        Não
                    </label>
                </div>
            </div>
        </fieldset>
    </div>
);

export default memo(RadioButtonBooleanInput);

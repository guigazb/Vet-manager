import React, { memo } from 'react';

const RadioButtonInput = ({
    valorLabel,
    colSpan = "1",
    opcoesLabelValue,
    nomeComponente,
    onChange,
    id,
    descricao,
    valorSelecionado,
    desabilitado = false
}) => (
    <div className={`sm:col-span-${colSpan}`}>
        <fieldset>
            <p className="mt-1 text-sm leading-6 font-medium text-gray-900">{valorLabel}</p>
            <div className="mt-3 space-y-6">
                <div className="flex items-center gap-x-3">
                    {opcoesLabelValue.map((item) => {

                        const isChecked = valorSelecionado === item[id]; // Checa explicitamente se o valor está checado

                        return (
                            <div key={item[id]}>
                                <label htmlFor={item[descricao] + item[id]}>
                                    <input
                                        type="radio"
                                        id={item[descricao] + item[id]}
                                        name={nomeComponente}
                                        value={item[id]}
                                        onChange={onChange}
                                        checked={isChecked} // Valida que o checked receba sempre um boolean
                                        disabled={desabilitado}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    &nbsp;{item[descricao]}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
        </fieldset>
    </div>
);

export default memo(RadioButtonInput);

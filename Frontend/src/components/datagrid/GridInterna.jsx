import React from 'react'

const GridInterna = ({
    titulo,
    campo_exibicao,
    data,
    registrosNaoEncontrados,
    children }) => {

    let contador = 0;
    return (

        <div className="bg-gray-100 p-6 col-span-3">
            <div className="container mx-auto">
                <h1 className="text-sm font-bold mb-4">{titulo}</h1>
                {children}
                <ul className="bg-white shadow-md rounded-xs p-4">
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map(item => (
                            <li key={contador++} className="mb-4 p-2 border-b border-gray-200 last:border-0">
                                <div className="text-sm font-semibold">{item[campo_exibicao]}</div>
                            </li>
                        ))
                    ) : (
                        <li>{registrosNaoEncontrados}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default GridInterna
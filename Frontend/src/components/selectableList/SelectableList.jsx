import React, { useEffect, useState } from 'react';

const SelectableList = ({ maximoItensVisiveis = 10 }) => {
    const [itens, setItens] = useState([]); // Armazena os itens recebidos do backend
    const [itemSelecionado, setItemSelecionado] = useState(null); // Armazena o item selecionado

    const URLBackend = import.meta.env.VITE_API_URL_BACKEND;
    const URLPermissao = URLBackend + import.meta.env.VITE_API_URL_PERMISSAO;

    // Função para buscar os dados do backend
    const fetchItems = async () => {
        try {
            const response = await fetch(URLPermissao);
            if (!response.ok) {
                throw new Error("Erro ao buscar dados");
            }
            const data = await response.json();
            setItens(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // Função para lidar com a seleção de um item
    const selectItem = (item) => {
        setItemSelecionado(item);
    };

    return (
        <div className="selectable-list border rounded-lg p-4 max-w-md mx-auto">
            <ul
                className={`overflow-y-auto ${itens.length > maximoItensVisiveis ? "h-60" : "h-auto"}`}
                id="itemList"
            >
                {itens.map((item, index) => (
                    <li
                        key={index}
                        className={`p-2 cursor-pointer rounded-md ${itemSelecionado === item
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-200"
                            }`}
                        onClick={() => selectItem(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
            {itemSelecionado && (
                <p className="mt-4 text-sm text-gray-700">
                    Item selecionado: <strong>{itemSelecionado}</strong>
                </p>
            )}
        </div>
    );
};

export default SelectableList;
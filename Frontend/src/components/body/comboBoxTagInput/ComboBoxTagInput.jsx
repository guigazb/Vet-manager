import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ComboBoxTagInput = ({
  nomeComponente,
  valorLabel,
  options = [],
  optionKey = "id",
  optionValue = "nome",
  value = "",         // String para seleção única, Array para seleção múltipla
  onChange,           // Recebe o ID selecionado ou array de IDs
  onRefreshItems,     // Função para atualizar a lista de opções
  placeholder = "Digite ou selecione uma opção...",
  loading = false,
  required = false,
  colSpan = "2",
  autofocus = false,
  desabilitado = false,
  multiple = false,  // Propriedade para selecionar múltiplos itens
  open // Propriedade para controlar a abertura do dropdown na renderização

}) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(open === true ? true : false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [internalLoading, setInternalLoading] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!multiple) {
      // para seleção única, encontra o selecionado e coloca seu valor no input
      if (value && options.length > 0) {
        const selectedOption = options.find(option => option[optionKey] === value);
        if (selectedOption) {
          setInputValue(selectedOption[optionValue]);
        }
      }
    }
  }, [value, options, multiple, optionKey, optionValue]);

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  // Inicializa o filtro com todas as opções
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  // Filtra as opções baseado no texto digitado
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter(option =>
        option[optionValue].toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [inputValue, options, optionValue]);

  // Autofocus
  useEffect(() => {
    if (autofocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autofocus]);

  // Fecha o dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // Formata o texto para padrão camelCase com primeira letra maiúscula
  const formataTextoTag = (text) => {

    if (!text || typeof text !== 'string') return '';

    // Remove espaços extras e divide em palavras
    const palavras = text.trim().split(/\s+/);

    if (palavras.length === 0) return '';

    // Primeira palavra com primeira letra maiúscula
    const primeiraPalavra = palavras[0].charAt(0).toUpperCase() + palavras[0].slice(1).toLowerCase();

    // Demais palavras com primeira letra maiúscula (camelCase)
    const camelCase = palavras.slice(1).map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('');

    // Retorna a combinação (sem espaços)
    return primeiraPalavra + camelCase;
  };

  // Função para adicionar novos itens 
  const addNovoItem = async (text) => {

    const textoTagFormatado = formataTextoTag(text);
    if (textoTagFormatado === '') return null;

    // Verifica se o item já existe
    const itemExistente = options.find(
      opt => opt[optionValue].toLowerCase() === textoTagFormatado.toLowerCase()
    );

    if (itemExistente) {
      return itemExistente;
    }

    setInternalLoading(true);

    const novaTag = {
      nome: textoTagFormatado
    };

    let criacaoBemSucedida = false;

    try {

      const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_TAGS, novaTag);

      if (result.status === 201) {

        criacaoBemSucedida = true;
        toast.success("Tag salva com sucesso.");

        // Adiciona o novo item à lista de opções se não usar onRefreshItems

        if (!onRefreshItems) {

          const updatedOptions = [...options, novaTag];
          options.push(novaTag);
          setFilteredOptions(updatedOptions);

        } else {

          // Se existir função de atualização, chama ela
          onRefreshItems();

        }

        setInternalLoading(false);
        return novaTag;

      } else {
        toast.error('Erro ao tentar salvar a Tag');
      }

    } catch (error) {

      toast.error('Erro ao tentar salvar a Tag', error);
      setInternalLoading(false);
      return null;

    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleSelectOption = (option) => {
    if (multiple) {
      // Para seleção múltipla
      const selectedValues = Array.isArray(value) ? [...value] : [];
      const optionId = option[optionKey];

      // Toggle selection - if already selected, remove it
      if (selectedValues.includes(optionId)) {
        // Remove the item if it's already selected
        const updatedValues = selectedValues.filter(id => id !== optionId);
        onChange(updatedValues);
      } else {
        // Add the item if it's not selected
        selectedValues.push(optionId);
        onChange(selectedValues);
      }

      // Limpa o input após seleção
      setInputValue("");
    } else {
      // Para seleção única permite limpar o valor clicando no mesmo item
      if (value === option[optionKey]) {
        onChange(""); // Limpa o valor se o mesmo item for selecionado novamente
        setInputValue("");
      } else {
        // Para seleção única
        onChange(option[optionKey]);
        setInputValue(option[optionValue]);
      }
      setIsOpen(false);
    }

    // Mantém o dropdown aberto para seleção múltipla
    if (!multiple) {
      setIsOpen(false);
    }
  };

  const handleRemoveItem = (itemId) => {
    if (multiple && Array.isArray(value)) {
      const updatedValues = value.filter(id => id !== itemId);
      onChange(updatedValues);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const trimmedInput = inputValue.trim();
      if (trimmedInput === "") return;

      // Verifica se é um item existente
      const exactMatch = options.find(
        opt => opt[optionValue].toLowerCase() === trimmedInput.toLowerCase()
      );

      if (exactMatch) {
        handleSelectOption(exactMatch);
      } else {
        // Cria um novo item e o seleciona automaticamente
        const novoItem = await addNovoItem(trimmedInput);

        if (novoItem) {
          if (multiple) {
            const valoresSelecionados = Array.isArray(value) ? [...value] : [];
            if (!valoresSelecionados.includes(novoItem[optionKey])) {
              valoresSelecionados.push(novoItem[optionKey]);
              onChange(valoresSelecionados);
            }
            setInputValue("");
          } else {
            onChange(novoItem[optionKey]);
            setInputValue(novoItem[optionValue]);
          }
        }
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown" && isOpen) {
      e.preventDefault();
      const firstOption = dropdownRef.current?.querySelector("li");
      if (firstOption) {
        firstOption.focus();
      }
    }
  };

  const handleFocus = () => {
    if (!desabilitado) {
      setIsOpen(true);
    }
  };

  const refreshItemsList = () => {
    if (onRefreshItems && !loading && !internalLoading) {
      onRefreshItems();
    }
  };

  // Função para obter os itens selecionados
  const getSelectedItems = () => {
    if (!multiple) return [];

    return Array.isArray(value)
      ? options.filter(option => value.includes(option[optionKey]))
      : [];
  };

  // Determina se estamos em estado de carregamento
  const isLoading = loading || internalLoading;

  return (
    <div className={`sm:col-span-${colSpan} relative`}>
      <label
        htmlFor={nomeComponente}
        className="block text-sm font-medium text-gray-900 leading-6"
      >
        {valorLabel}
      </label>

      <div className="mt-2 relative">
        <div className="flex">
          <input
            className="block w-full rounded-md border-0 py-1.5 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ref={inputRef}
            id={nomeComponente}
            name={nomeComponente}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            required={required && (!multiple || (multiple && (!value || value.length === 0)))}
            disabled={desabilitado || isLoading}
            autoComplete="off"
          />

          <div className="flex">
            {/* Botão para atualizar a lista */}
            {onRefreshItems && (
              <button
                type="button"
                className="ml-1 px-2 py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={refreshItemsList}
                disabled={desabilitado || isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            )}

            {/* Botão para abrir/fechar dropdown */}
            <button
              type="button"
              className="ml-1 px-2 py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setIsOpen(!isOpen)}
              disabled={desabilitado}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tags para itens selecionados (seleção múltipla) */}
        {multiple && (
          <div className="flex flex-wrap gap-2 mt-2 mb-2">
            {getSelectedItems().map((item) => (
              <div
                key={item[optionKey]}
                className="flex items-center bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-sm cursor-pointer"
                onClick={() => handleRemoveItem(item[optionKey])}
              >
                <span>{item[optionValue]}</span>
                <button
                  type="button"
                  className="ml-1 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the parent onClick from firing
                    handleRemoveItem(item[optionKey]);
                  }}
                  disabled={desabilitado}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {isOpen && (
          <ul
            ref={dropdownRef}
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {isLoading ? (
              <li className="px-4 py-2 text-sm text-gray-500">Carregando...</li>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                // Verifica se o item já está selecionado (para seleção múltipla)
                const isSelected = multiple && Array.isArray(value)
                  ? value.includes(option[optionKey])
                  : value === option[optionKey];

                return (
                  <li
                    key={index}
                    className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50 focus:bg-indigo-50 focus:outline-none ${isSelected ? "bg-indigo-50 text-indigo-900" : ""
                      }`}
                    onClick={() => handleSelectOption(option)}
                    tabIndex="0"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSelectOption(option);
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        const nextLi = e.target.nextElementSibling;
                        if (nextLi) nextLi.focus();
                      }
                      if (e.key === "ArrowUp") {
                        e.preventDefault();
                        const prevLi = e.target.previousElementSibling;
                        if (prevLi) prevLi.focus();
                        else inputRef.current?.focus();
                      }
                    }}
                  >
                    <div className="flex items-center">
                      {isSelected && multiple && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-1.5">
                          <svg className="h-3 w-3 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                      <span className={isSelected && multiple ? "pl-6" : ""}>{option[optionValue]}</span>
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500">
                {inputValue.trim() !== ""
                  ? "Pressione Enter para adicionar"
                  : "Nenhuma opção encontrada"}
              </li>
            )}

            {inputValue.trim() !== "" && !options.find(
              opt => opt[optionValue].toLowerCase() === inputValue.toLowerCase()
            ) && (
                <li
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-indigo-600 hover:bg-indigo-50 focus:bg-indigo-50 focus:outline-none"
                  onClick={async () => {
                    const newItem = await addNovoItem(inputValue);
                    if (newItem) {
                      if (multiple) {
                        const selectedValues = Array.isArray(value) ? [...value] : [];
                        selectedValues.push(newItem[optionKey]);
                        onChange(selectedValues);
                        setInputValue("");
                      } else {
                        onChange(newItem[optionKey]);
                        setInputValue(newItem[optionValue]);
                      }
                    }
                  }}
                  tabIndex="0"
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      const newItem = await addNovoItem(inputValue);
                      if (newItem) {
                        if (multiple) {
                          const selectedValues = Array.isArray(value) ? [...value] : [];
                          selectedValues.push(newItem[optionKey]);
                          onChange(selectedValues);
                          setInputValue("");
                        } else {
                          onChange(newItem[optionKey]);
                          setInputValue(newItem[optionValue]);
                        }
                      }
                    }
                  }}
                >
                  + Adicionar "{formataTextoTag(inputValue)}"
                </li>
              )}
          </ul>
        )}
      </div>

      {isLoading && <p className="text-sm text-gray-500 mt-1">Carregando...</p>}
    </div>
  );
};

export default ComboBoxTagInput;
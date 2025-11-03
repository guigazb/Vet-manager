import React, { useState, useEffect, useMemo, memo, useRef } from 'react';

const DatePickerUnit = ({
  nomeComponente,
  valorLabel,
  colSpan = '2',
  placeholder = 'Escolha uma data',
  onChange,
  required = false,
  desabilitado = false,
  dataInicial = null,
  open,
}) => {
  const today = new Date();
  const [dataSelecionada, setDataSelecionada] = useState(
    dataInicial ? new Date(dataInicial) : null
  );
  const [mesAtual, setMesAtual] = useState(today.getMonth());
  const [anoAtual, setAnoAtual] = useState(today.getFullYear());
  const [isOpen, setIsOpen] = useState(open ? true : false);

  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (valorLabel) {
      const novaData = new Date(valorLabel);
      if (!isNaN(novaData.getTime())) {
        const dataLocal = new Date(
          novaData.getFullYear(),
          novaData.getMonth(),
          novaData.getDate()
        );
        setDataSelecionada(dataLocal);
        setMesAtual(dataLocal.getMonth());
        setAnoAtual(dataLocal.getFullYear());
      } else {
        setDataSelecionada(null);
      }
    } else {
      setDataSelecionada(null);
    }
  }, [valorLabel]);

  const geraDiasCalendario = useMemo(() => {
    const dias = [];
    const primeiroDia = new Date(anoAtual, mesAtual, 1);
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0);

    for (let i = 0; i < primeiroDia.getDay(); i++) {
      dias.push(null);
    }

    for (let day = 1; day <= ultimoDia.getDate(); day++) {
      dias.push(new Date(anoAtual, mesAtual, day));
    }

    return dias;
  }, [mesAtual, anoAtual]);

  const vaiParaMesAnterior = (e) => {
    e.preventDefault();
    setMesAtual((prev) => {
      if (prev === 0) {
        setAnoAtual((prev) => prev - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const vaiParaProximoMes = (e) => {
    e.preventDefault();
    setMesAtual((prev) => {
      if (prev === 11) {
        setAnoAtual((prev) => prev + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const limparData = (e) => {
    e.preventDefault();
    setDataSelecionada(null);
    setIsOpen(false);
    if (onChange) {
      onChange({
        target: {
          name: nomeComponente,
          value: null,
        },
      });
    }
  };

  const handleDataSelecionada = (date, e) => {
    e.preventDefault();

    if (!date) {
      limparData(e);
      return;
    }

    const dataFormatada = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    setDataSelecionada(dataFormatada);
    setIsOpen(false);

    if (onChange) {
      onChange({
        target: {
          name: nomeComponente,
          value: dataFormatada.toISOString(),
        },
      });
    }
  };

  const togglePicker = (e) => {
    e.preventDefault();
    if (!desabilitado) {
      setIsOpen(!isOpen);
      if (!dataSelecionada && !isOpen) {
        const today = new Date();
        setDataSelecionada(today);
        setMesAtual(today.getMonth());
        setAnoAtual(today.getFullYear());
        if (onChange) {
          onChange({
            target: {
              name: nomeComponente,
              value: today.toISOString(),
            },
          });
        }
      }
    }
  };

  const formataData = (data) => {
    return data ? data.toLocaleDateString() : '';
  };

  const displayMesAno = new Date(anoAtual, mesAtual).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div>
      <label htmlFor={nomeComponente} className="block text-sm font-medium leading-6">
        {nomeComponente}
      </label>
      <div ref={datePickerRef} className="mt-2 relative">
        <input
          className="block w-full rounded-md border-0 py-1.5 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          id={nomeComponente}
          name={nomeComponente}
          type="text"
          placeholder={placeholder}
          value={formataData(dataSelecionada)}
          onClick={togglePicker}
          readOnly
          required={required}
          disabled={desabilitado}
        />
        <button
          type="button"
          onClick={limparData}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
        </button>
        {isOpen && !desabilitado && (
          <div className="absolute z-10 min-w-[256px] max-w-[300px] bg-white shadow-lg rounded-lg overflow-hidden mt-1">
            <div className="flex justify-between items-center p-2 bg-gray-100">
              <button
                type="button"
                onClick={vaiParaMesAnterior}
                className="p-2 hover:bg-gray-200 rounded-sm"
              >
                ←
              </button>
              <span className="font-semibold">{displayMesAno}</span>
              <button
                type="button"
                onClick={vaiParaProximoMes}
                className="p-2 hover:bg-gray-200 rounded-sm"
              >
                →
              </button>
            </div>
            <div className="grid grid-cols-7 text-center p-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((dia) => (
                <div key={dia} className="font-bold text-sm text-gray-500 p-1">
                  {dia}
                </div>
              ))}
              {geraDiasCalendario.map((dia, indice) => (
                <button
                  key={indice}
                  type="button"
                  onClick={(e) => dia && handleDataSelecionada(dia, e)}
                  disabled={!dia}
                  className={`
                    p-2 
                    ${!dia ? 'bg-transparent' : ''}
                    ${dia && dataSelecionada && dia.toDateString() === dataSelecionada.toDateString()
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-blue-500'}
                    ${dia ? 'cursor-pointer' : 'cursor-default'}
                    ${dia && (dia.getDay() === 0 || dia.getDay() === 6)
                      ? 'bg-blue-200'
                      : ''}
                  `}
                >
                  {dia ? dia.getDate() : ''}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(DatePickerUnit);
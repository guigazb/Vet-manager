import React, { useState, useMemo, memo } from 'react';

const DatePickerUnit = ({
  nomeComponente,
  valorLabel,
  colSpan = '2',
  placeholder = 'Escolha uma data',
  onChange,
  required = false,
  desabilitado = false,
  dataInicial = null
}) => {


  const [dataSelecionada, setDataSelecionada] = useState(dataInicial ? new Date(dataInicial) : null);
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const [isOpen, setIsOpen] = useState(false);

  // gera os dias no mes atual
  const geraDiasCalendario = useMemo(() => {
    const dias = [];
    const primeiroDia = new Date(anoAtual, mesAtual, 1);
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < primeiroDia.getDay(); i++) {
      dias.push(null);
    }

    // adiciona os dias do mes
    for (let day = 1; day <= ultimoDia.getDate(); day++) {
      dias.push(new Date(anoAtual, mesAtual, day));
    }

    return dias;
  }, [mesAtual, anoAtual]);

  // Navega para o mes anterior
  const vaiParaMesAnterior = (e) => {
    e.preventDefault();
    setMesAtual(prev => {
      if (prev === 0) {
        setAnoAtual(prev => prev - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  // navega para o proximo mes
  const vaiParaProximoMes = (e) => {
    e.preventDefault();
    setMesAtual(prev => {
      if (prev === 11) {
        setAnoAtual(prev => prev + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const converteData = () => {
    if (valorLabel) {
      const dataConvertida = new Date(valorLabel).toLocaleDateString('pt-br', { weekday: "long", year: "numeric", month: "short", day: "numeric" });
      return dataConvertida;
    }

  }

  React.useEffect(() => {
    if (valorLabel) {
      const novaData = new Date(valorLabel);
      setDataSelecionada(novaData);
      setMesAtual(novaData.getMonth());
      setAnoAtual(novaData.getFullYear());
    }
  }, [valorLabel]);

  // seleciona a data
  const handleDataSelecionada = (date, e) => {
    e.preventDefault();

    const dataFormatada = new Date(date);
    dataFormatada.setUTCHours(0, 0, 0, 0);


    setDataSelecionada(date);
    setIsOpen(false);

    // Trigger onChange if provided
    if (onChange) {
      onChange({
        target: {
          name: nomeComponente,
          value: dataFormatada.toISOString()
        }
      });
    }
  };




  // abre e fecha a aba
  const togglePicker = (e) => {
    e.preventDefault();
    if (!desabilitado) {
      setIsOpen(!isOpen);
    }
  };

  // formata a data para exibição
  const formataData = (data) => {
    return data ? data.toLocaleDateString() : '';
  };

  // Month and year display
  const displayMesAno = new Date(anoAtual, mesAtual).toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <>
      <div className={`sm:col-span-${colSpan}`}>
        <label
          htmlFor={nomeComponente}
          className="block text-sm font-medium leading-6"
        >
          {nomeComponente}

        </label>
        <div className={`mt-2 relative`}>
          <input
            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

          {isOpen && !desabilitado && (
            <div className="absolute z-10 w-full bg-white shadow-lg rounded-lg overflow-hidden mt-1">
              {/* Month Navigation */}
              <div className="flex justify-between items-center p-2 bg-gray-100">
                <button
                  type="button"
                  onClick={vaiParaMesAnterior}
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  ←
                </button>
                <span className="font-semibold">{displayMesAno}</span>
                <button
                  type="button"
                  onClick={vaiParaProximoMes}
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  →
                </button>
              </div>

              {/* grid do calendário */}
              <div className="grid grid-cols-7 text-center p-2">
                {/* dias da semana */}
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(dia => (
                  <div key={dia} className="font-bold text-sm text-gray-500 p-1">
                    {dia}
                  </div>
                ))}

                {/* dias do calendário*/}
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
                        : 'hover:bg-blue-100'}
                      ${dia ? 'cursor-pointer' : 'cursor-default'}
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
    </>
  );
};

export default memo(DatePickerUnit);
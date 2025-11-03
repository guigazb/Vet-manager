import { useState, useMemo, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import InternalButtonArea from '../body/InternalButtonArea';
import ButtonComponent from "../button/ButtonComponent";

const Datagrid = (
    {
        URLBackend = "http://localhost:8001/api/public/usuario/2/datagrid",
        campoIDParaUsoEmClickTabela = "ID",
        rotaCriarRegistro = "",
        rotaAtualizarRegistro = "",
        rotaExcluirRegistro = "",
        children
    }
) => {
    const colunaInicialAtivaOrdem = "xxxx";

    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();

    const handleIrPaginaCriarRegistro = () => {
        navegar(rotaCriarRegistro);
    }

    const handleIrPaginaAtualizarRegistro = () => {
        const id = idSelecionadoTabela;
        navegar(rotaAtualizarRegistro, { state: { id } });
    }

    const handleIrPaginaExcluirRegistro = () => {
        const id = idSelecionadoTabela;
        navegar(rotaExcluirRegistro, { state: { id } });
    }

    // ----------------------------------------------------------------------------------------------
    const [registrosTabela, setRegistrosTabela] = useState([]);
    const [loadingDatagrid, setLoadingDatagrid] = useState(true);
    const [botaoUpdateDesabilidado, setBotaoUpdateDesabilitado] = useState(true);
    const [botaoExcluirDesabilitado, setBotaoExcluirDesabilitado] = useState(true);

    // ----------------------------------------------------------------------------------------------
    const [textoPesquisa, setTextoPesquisa] = useState();
    const [listaDeDados, setListaDeDados] = useState([]);
    const [limiteDeLinhas] = useState(7);
    const [qtdeLinhasASeremMostradas, setQtdeLinhasASeremMostradas] = useState([]);
    const [paginacaoCustomizada, setPaginacaoCustomizada] = useState([]);
    const [colunaOrdenadaPor, setColunaOrdenadaPor] = useState([colunaInicialAtivaOrdem]);
    const [totalDePaginas, setTotalDePaginas] = useState(Math.ceil(listaDeDados?.length / limiteDeLinhas));
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [cabecalhosDeTabela, setCabecalhosDeTabela] = useState([]);
    const [idSelecionadoTabela, setIdSelecionadoTabela] = useState(null);

    //const [colunaAtiva, setColunaAtiva] = useState([colunaInicialAtivaOrdem]);

    const handleClickCancelarSelecaoTabela = () => {
        setBotaoUpdateDesabilitado(true);
        setBotaoExcluirDesabilitado(true);
        setIdSelecionadoTabela();
    };

    const hancleClickSelecaoRegistroTabela = (id) => {
        setBotaoUpdateDesabilitado(false);
        setBotaoExcluirDesabilitado(false);
        setIdSelecionadoTabela(id);
    };

    function pesquisarProdutos(palavraChave) {

        palavraChave = palavraChave.toLowerCase();
        setTextoPesquisa(palavraChave);

        if (!palavraChave == "") {

            //Captura os nomes dos campos e faz a busca do valor da pesquisa
            const fieldsToSearch = listaDeDados.length > 0 ? Object.keys(listaDeDados[0]) : [];

            const resultadosPesquisa = listaDeDados.filter((registro) => {
                return fieldsToSearch.some((field) => {
                    const fieldValue = registro[field];
                    return (
                        fieldValue &&
                        fieldValue.toString().toLowerCase().includes(palavraChave.toLowerCase())
                    );
                });
            });

            setListaDeDados(resultadosPesquisa);
            setQtdeLinhasASeremMostradas(resultadosPesquisa.slice(0, limiteDeLinhas));
            setPaginaAtual(0);
            setTotalDePaginas(Math.ceil(resultadosPesquisa?.length / limiteDeLinhas));
            setPaginacaoCustomizada(
                Array(Math.ceil(resultadosPesquisa?.length / limiteDeLinhas)).fill(null)
            );
        } else {
            limparDadosPesquisa();
        }

    }

    const limparDadosPesquisa = () => {

        setTextoPesquisa("");

        const registrosOrdenados = registrosTabela.slice().sort((a, b) => a[colunaInicialAtivaOrdem] - b[colunaInicialAtivaOrdem]);
        setListaDeDados(registrosOrdenados);
        setQtdeLinhasASeremMostradas(registrosOrdenados.slice(0, limiteDeLinhas));
        setPaginacaoCustomizada(Array(Math.ceil(registrosTabela?.length / limiteDeLinhas)).fill(null));
        setTotalDePaginas(Math.ceil(registrosTabela?.length / limiteDeLinhas));

    };

    const ordenaPorColuna = (coluna, colunaOrdenadaMudada = true) => {

        // Transforma o objeto retornado pelo BD em um JSON
        const objCodificado = JSON.stringify(coluna);

        // Analisa o JSON
        const objTraduzida = JSON.parse(objCodificado);

        // Resgata o valor da variável
        const colunaInterna = objTraduzida.header;

        if (colunaInterna != colunaInicialAtivaOrdem) {

            if (colunaOrdenadaPor?.includes(colunaInterna) && colunaOrdenadaMudada) {
                const ordenaRegistros = listaDeDados
                    .slice()
                    .sort((a, b) =>
                        b[colunaInterna].toString().localeCompare(a[colunaInterna].toString())
                    );

                setQtdeLinhasASeremMostradas(
                    ordenaRegistros.slice(paginaAtual * limiteDeLinhas, (paginaAtual + 1) * limiteDeLinhas)
                );

                if (colunaOrdenadaMudada) {
                    setColunaOrdenadaPor([]);
                    setListaDeDados(ordenaRegistros);
                }

            } else {

                const ordenaRegistros = listaDeDados
                    .slice()
                    .sort((a, b) =>
                        a[colunaInterna].toString().localeCompare(b[colunaInterna].toString())
                    );

                setQtdeLinhasASeremMostradas(
                    ordenaRegistros.slice(paginaAtual * limiteDeLinhas, (paginaAtual + 1) * limiteDeLinhas)
                );

                if (colunaOrdenadaMudada) {
                    setListaDeDados(ordenaRegistros);
                    setColunaOrdenadaPor([`${colunaInterna}`]);
                }

            }
        } else {

            if (colunaOrdenadaPor?.includes(colunaInterna)) {

                const registrosOrdenados = listaDeDados
                    .slice()
                    .sort((a, b) => b[colunaInicialAtivaOrdem] - a[colunaInicialAtivaOrdem]);

                setQtdeLinhasASeremMostradas(
                    registrosOrdenados.slice(
                        paginaAtual * limiteDeLinhas,
                        (paginaAtual + 1) * limiteDeLinhas
                    )
                );

                if (colunaOrdenadaMudada) {
                    setColunaOrdenadaPor([]);
                    setListaDeDados(registrosOrdenados);
                }

            } else {

                const registrosOrdenados = listaDeDados
                    .slice()
                    .sort((a, b) => a[colunaInicialAtivaOrdem] - b[colunaInicialAtivaOrdem]);

                setQtdeLinhasASeremMostradas(
                    registrosOrdenados.slice(
                        paginaAtual * limiteDeLinhas,
                        (paginaAtual + 1) * limiteDeLinhas
                    )
                );

                if (colunaOrdenadaMudada) {
                    setColunaOrdenadaPor([`${colunaInterna}`]);
                    setListaDeDados(registrosOrdenados);
                }

            }
        }
        //setColunaAtiva([`${colunaInterna}`]);

    };

    const proximaPagina = () => {

        const indiceInicial = limiteDeLinhas * (paginaAtual + 1);
        const indiceFinal = indiceInicial + limiteDeLinhas;
        const novaArray = registrosTabela.slice(indiceInicial, indiceFinal);

        setQtdeLinhasASeremMostradas(novaArray);
        setPaginaAtual(paginaAtual + 1);

    };

    const mudarPagina = (value) => {

        const indiceInicial = value * limiteDeLinhas;
        const indiceFinal = indiceInicial + limiteDeLinhas;
        const novaArray = listaDeDados.slice(indiceInicial, indiceFinal);

        setQtdeLinhasASeremMostradas(novaArray);
        setPaginaAtual(value);

    };

    const paginaAnterior = () => {

        const indiceInicial = (paginaAtual - 1) * limiteDeLinhas;
        const indiceFinal = indiceInicial + limiteDeLinhas;
        const novaArray = registrosTabela.slice(indiceInicial, indiceFinal);

        setQtdeLinhasASeremMostradas(novaArray);

        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        } else {
            setPaginaAtual(0);
        }

    };

    useEffect(() => {

        setLoadingDatagrid(true);

        //Busca as informações das Local de Execução
        const fetchRegistros = async () => {

            try {
                const response = await axios.get(URLBackend);
                const dadosRetornados = response.data;
                setRegistrosTabela(response.data);

                setLoadingDatagrid(false);

                const registrosClassificados = dadosRetornados.slice().sort(
                    (a, b) => a[colunaInicialAtivaOrdem] - b[colunaInicialAtivaOrdem]
                );
                setListaDeDados(registrosClassificados);
                setQtdeLinhasASeremMostradas(response.data.slice(0, limiteDeLinhas));

                setPaginacaoCustomizada(
                    Array(Math.ceil(registrosClassificados?.length / limiteDeLinhas)).fill(null)
                );

                setCabecalhosDeTabela(Object.keys(registrosClassificados[0]));

            } catch (error) {
                console.error('Erro ao carregar as informações do Local de Execução:', error);
            } finally {

            }
        };

        fetchRegistros();
    }, []);

    useMemo(() => {

        setPaginacaoCustomizada(
            Array(Math.ceil(listaDeDados?.length / limiteDeLinhas)).fill(null)
        );

    }, []);

    return (

        <>
            {loadingDatagrid ? (
                <div className="absolute inset-0 flex justify-center items-center">
                    <p className="text-sm text-gray-700 bg-gray-200 p-2 rounded-md shadow-md">Carregando registros...</p>
                </div>
            ) : (
                <>
                    {/* Início da barra de pesquisa */}
                    <div className="flex justify-end bg-[#F2ECCB]/[6%] px-2 mt-2 py-2">
                        <div className="px-2 bg-white py-1 rounded-lg border border-gray-300">
                            <div className="flex items-center">
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.2741 9.05133C11.1214 7.89518 11.5009 6.46176 11.3366 5.03784C11.1724 3.61391 10.4766 2.3045 9.38841 1.37157C8.30022 0.438638 6.8999 -0.0490148 5.4676 0.0061742C4.0353 0.0613632 2.67666 0.655324 1.66348 1.66923C0.650303 2.68313 0.0573143 4.0422 0.00315019 5.47454C-0.0510139 6.90687 0.437641 8.30685 1.37135 9.39437C2.30506 10.4819 3.61497 11.1768 5.03901 11.34C6.46305 11.5032 7.8962 11.1227 9.05174 10.2746H9.05087C9.07712 10.3096 9.10512 10.3428 9.13662 10.3752L12.5054 13.744C12.6694 13.9081 12.892 14.0004 13.1241 14.0005C13.3562 14.0006 13.5789 13.9085 13.7431 13.7444C13.9072 13.5803 13.9995 13.3578 13.9996 13.1256C13.9997 12.8935 13.9076 12.6709 13.7435 12.5067L10.3747 9.13796C10.3435 9.10629 10.3098 9.07704 10.2741 9.05046V9.05133ZM10.4999 5.68783C10.4999 6.31982 10.3754 6.94562 10.1335 7.5295C9.89169 8.11338 9.5372 8.6439 9.09032 9.09078C8.64344 9.53767 8.11291 9.89215 7.52903 10.134C6.94515 10.3759 6.31936 10.5003 5.68737 10.5003C5.05538 10.5003 4.42959 10.3759 3.84571 10.134C3.26183 9.89215 2.7313 9.53767 2.28442 9.09078C1.83754 8.6439 1.48305 8.11338 1.2412 7.5295C0.999349 6.94562 0.87487 6.31982 0.87487 5.68783C0.87487 4.41148 1.3819 3.1874 2.28442 2.28488C3.18694 1.38236 4.41102 0.875332 5.68737 0.875332C6.96372 0.875332 8.1878 1.38236 9.09032 2.28488C9.99284 3.1874 10.4999 4.41148 10.4999 5.68783Z"
                                        fill="black"
                                    />
                                </svg>
                                <input
                                    id="searchBox"
                                    type="text"
                                    className="text-black w-[85%] outline-hidden border border-gray-50 bg-transparent text-sm max-w-[250px]"
                                    placeholder="Digite texto para pesquisa..."
                                    onChange={(e) => pesquisarProdutos(e.target.value)}
                                    value={textoPesquisa}
                                />
                                <svg
                                    stroke="currentColor"
                                    fill="black"
                                    className={`text-black cursor-pointer ${textoPesquisa?.length > 0 ? "visible" : "invisible"
                                        }`}
                                    strokeWidth="0"
                                    viewBox="0 0 1024 1024"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={limparDadosPesquisa}
                                >
                                    <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    {/* Final da barra de pesquisa */}

                    {/* Tabela de Resultados */}
                    <div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none border-gray-300">
                        <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border">

                            {/* Cabeçalho da tabela */}
                            <thead
                                className={`rounded-lg text-base text-white font-semibold w-full ${qtdeLinhasASeremMostradas?.length > 0
                                    ? "border-b-0"
                                    : "border-b-2 border-gray-200"
                                    }`}
                            >
                                <tr className={"bg-[#F2ECCB]/[6%]"}>
                                    {cabecalhosDeTabela.map((header, index) => (
                                        <th
                                            key={index}
                                            className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap"
                                        >
                                            <div className="flex items-center">
                                                <span
                                                    className="cursor-pointer pl-1 float-right"
                                                    onClick={() => ordenaPorColuna({ header })}
                                                >
                                                    {header}
                                                </span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            {/* Final do Cabeçalho da tabela */}

                            <tbody>
                                {qtdeLinhasASeremMostradas?.map((data, index) => (
                                    <tr
                                        className={
                                            `${idSelecionadoTabela === data[campoIDParaUsoEmClickTabela]
                                                ? "bg-green-50"
                                                : index % 2 === 0
                                                    ? "bg-white"
                                                    : "bg-[#222E3A]/[6%]"
                                            }`}
                                        key={index}
                                        onClick={() => hancleClickSelecaoRegistroTabela(data[campoIDParaUsoEmClickTabela])}
                                    >
                                        {cabecalhosDeTabela.map((nomeCampo) => (
                                            <td
                                                key={nomeCampo}
                                                className={`py-2 px-3 font-normal text-base 
                                ${index === 0
                                                        ? "border-t-2 border-gray-300"
                                                        : index === qtdeLinhasASeremMostradas?.length - 1 ? "border-y border-gray-300" : "border-t border-gray-300"
                                                    } whitespace-nowrap`}
                                            >
                                                {data[nomeCampo]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Final da Tabela de Resultados */}

                    {/* Paginação */}
                    <div className={`w-full justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-2.5 px-1 items-center ${listaDeDados?.length > 0 ? "flex" : "hidden"}`}>
                        {/* <div className="text-lg">
                            &nbsp;
                        </div> */}
                        <div className="flex-left">
                            <ul
                                className="flex justify-center items-center gap-x-[10px] z-30"
                                role="navigation"
                                aria-label="Pagination"
                            >
                                <li
                                    className={`prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${paginaAtual == 0
                                        ? "bg-[#cccccc] pointer-events-none"
                                        : " cursor-pointer"
                                        }`}
                                    onClick={paginaAnterior}
                                >
                                    <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.295922 6.7158L5.29592 11.7158C5.38916 11.809 5.49985 11.883 5.62167 11.9335C5.74349 11.9839 5.87406 12.0099 6.00592 12.0099C6.27222 12.0099 6.52762 11.9041 6.71592 11.7158C6.80916 11.6226 6.88312 11.5119 6.93358 11.39C6.98404 11.2682 7.01001 11.1377 7.01001 11.0058C7.01001 10.7395 6.90422 10.4841 6.71592 10.2958L2.41592 6.0058L6.71592 1.7158C6.80965 1.62283 6.88404 1.51223 6.93481 1.39037C6.98558 1.26851 7.01172 1.13781 7.01172 1.0058C7.01172 0.873785 6.98558 0.743079 6.93481 0.62122C6.88404 0.49936 6.80965 0.388761 6.71592 0.295797C6.62296 0.202069 6.51236 0.127673 6.3905 0.0769042C6.26864 0.0261354 6.13793 -1.98374e-06 6.00592 -1.99528e-06C5.87391 -2.00682e-06 5.7432 0.0261353 5.62134 0.0769042C5.49949 0.127673 5.38888 0.202069 5.29592 0.295797L0.295922 5.2958C0.202193 5.38876 0.127798 5.49936 0.0770288 5.62122C0.02626 5.74308 0.000122607 5.87378 0.000122595 6.0058C0.000122584 6.13781 0.0262599 6.26851 0.0770288 6.39037C0.127798 6.51223 0.202193 6.62283 0.295922 6.7158Z" fill="#637381" />
                                    </svg>
                                </li>
                                {paginacaoCustomizada?.map((data, index) => (
                                    <li
                                        className={
                                            `flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer 
                                            ${paginaAtual == index
                                                ? "text-blue-600  border-sky-500"
                                                : "border-[#E4E4EB] "
                                            }`
                                        }
                                        onClick={() => mudarPagina(index)}
                                        key={index}
                                    >
                                        {index + 1}
                                    </li>
                                ))}
                                <li
                                    className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${paginaAtual == totalDePaginas - 1
                                        ? "bg-[#cccccc] pointer-events-none"
                                        : " cursor-pointer"
                                        }`}
                                    onClick={proximaPagina}
                                >
                                    <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.7158 5.29409L1.7158 0.294092C1.62256 0.200853 1.51187 0.126893 1.39005 0.0764322C1.26823 0.0259719 1.13766 0 1.0058 0C0.739497 0 0.484102 0.105788 0.295798 0.294092C0.20256 0.38733 0.128599 0.498021 0.0781384 0.619843C0.027678 0.741665 0.00170708 0.872233 0.00170708 1.00409C0.00170708 1.27039 0.107495 1.52579 0.295798 1.71409L4.5958 6.00409L0.295798 10.2941C0.20207 10.3871 0.127676 10.4977 0.0769072 10.6195C0.0261385 10.7414 0 10.8721 0 11.0041C0 11.1361 0.0261385 11.2668 0.0769072 11.3887C0.127676 11.5105 0.20207 11.6211 0.295798 11.7141C0.388761 11.8078 0.499362 11.8822 0.621222 11.933C0.743081 11.9838 0.873786 12.0099 1.0058 12.0099C1.13781 12.0099 1.26852 11.9838 1.39038 11.933C1.51223 11.8822 1.62284 11.8078 1.7158 11.7141L6.7158 6.71409C6.80953 6.62113 6.88392 6.51053 6.93469 6.38867C6.98546 6.26681 7.0116 6.1361 7.0116 6.00409C7.0116 5.87208 6.98546 5.74137 6.93469 5.61951C6.88392 5.49766 6.80953 5.38705 6.7158 5.29409Z" fill="#637381" />
                                    </svg>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Final Paginação */}

                    <InternalButtonArea>

                        <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleClickCancelarSelecaoTabela}>
                            Cancelar
                        </ButtonComponent>

                        <ButtonComponent tipo="primario" tipoBotao="button" onClick={handleIrPaginaCriarRegistro}>
                            Novo Registro
                        </ButtonComponent>

                        <ButtonComponent tipo="alerta" tipoBotao="button" onClick={handleIrPaginaAtualizarRegistro} desabilitado={botaoUpdateDesabilidado}>
                            Atualizar Registro
                        </ButtonComponent>

                        <ButtonComponent tipo="perigo" tipoBotao="button" onClick={handleIrPaginaExcluirRegistro} desabilitado={botaoExcluirDesabilitado}>
                            Excluir Registro
                        </ButtonComponent>

                        {children}

                    </InternalButtonArea>
                </>
            )}
        </>

    );
};
export default Datagrid;
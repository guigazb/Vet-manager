import React, { useState, useEffect, useRef, memo, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import SidebarLinkUL from "./SidebarLinkUL";
import { AuthContext } from "../utils/AuthContext";

function Sidebar({
    sidebarOpen,
    setSidebarOpen,
    variant = 'default',
}) {
    const location = useLocation();
    const { pathname } = location;

    const { auth } = useContext(AuthContext);

    const trigger = useRef(null);
    const sidebar = useRef(null);

    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
    );
    const [gruposComPermissoes, setGruposComPermissoes] = useState([]);

    useEffect(() => {
        if (auth && auth.grupos) {
            setGruposComPermissoes(auth.grupos);
        } else {
            setGruposComPermissoes([]);
        }
    }, [auth]);

    // Fechar ao clicar fora (mobile) e outros useEffects permanecem iguais
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded);
        if (sidebarExpanded) {
            document.querySelector("body").classList.add("sidebar-expanded");
        } else {
            document.querySelector("body").classList.remove("sidebar-expanded");
        }
    }, [sidebarExpanded]);

    return (
        <div className="min-w-fit">
            {/* Sidebar backdrop (mobile only) */}
            <div
                className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 
          ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                aria-hidden="true"
            ></div>

            {/* Sidebar */}
            <div
                id="sidebar"
                ref={sidebar}
                className={`flex flex-col absolute z-40 left-0 top-0 
                    lg:static lg:left-auto lg:top-auto lg:translate-x-0 
                    h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar 
                    bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out 
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}
                    ${variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : 'rounded-r-2xl shadow-xs'}
                    lg:w-20 
                    ${sidebarExpanded ? 'lg:!w-64' : 'lg:w-20'} 
                    w-64`}
            >
                {/* Sidebar header */}
                <div className="flex justify-between mb-10 pr-3 sm:px-2">
                    {/* Close button */}
                    <button
                        ref={trigger}
                        className="lg:hidden text-gray-500 hover:text-gray-400"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-controls="sidebar"
                        aria-expanded={sidebarOpen}
                    >
                        <span className="sr-only">Fechar Sidebar</span>
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                        </svg>
                    </button>
                    <NavLink end to="/homepage" className="block">
                        <svg className="fill-white-500" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.5 8.5C21.5 7.09554 21.5 6.39331 21.1629 5.88886C21.017 5.67048 20.8295 5.48298 20.6111 5.33706C20.1699 5.04224 19.5774 5.00529 18.496 5.00066C18.5001 5.29206 18.5 5.59655 18.5 5.91051L18.5 6V7.25H19.5C19.9142 7.25 20.25 7.58579 20.25 8C20.25 8.41421 19.9142 8.75 19.5 8.75H18.5V10.25H19.5C19.9142 10.25 20.25 10.5858 20.25 11C20.25 11.4142 19.9142 11.75 19.5 11.75H18.5V13.25H19.5C19.9142 13.25 20.25 13.5858 20.25 14C20.25 14.4142 19.9142 14.75 19.5 14.75H18.5V21.25H17V6C17 4.11438 17 3.17157 16.4142 2.58579C15.8284 2 14.8856 2 13 2H11C9.11438 2 8.17157 2 7.58579 2.58579C7 3.17157 7 4.11438 7 6V21.25H5.5V14.75H4.5C4.08579 14.75 3.75 14.4142 3.75 14C3.75 13.5858 4.08579 13.25 4.5 13.25H5.5V11.75H4.5C4.08579 11.75 3.75 11.4142 3.75 11C3.75 10.5858 4.08579 10.25 4.5 10.25H5.5V8.75H4.5C4.08579 8.75 3.75 8.41421 3.75 8C3.75 7.58579 4.08579 7.25 4.5 7.25H5.5V6L5.49999 5.9105C5.49996 5.59655 5.49992 5.29206 5.50403 5.00066C4.42262 5.00529 3.83008 5.04224 3.38886 5.33706C3.17048 5.48298 2.98298 5.67048 2.83706 5.88886C2.5 6.39331 2.5 7.09554 2.5 8.5V21.25H2C1.58579 21.25 1.25 21.5858 1.25 22C1.25 22.4142 1.58579 22.75 2 22.75H22C22.4142 22.75 22.75 22.4142 22.75 22C22.75 21.5858 22.4142 21.25 22 21.25H21.5V8.5ZM12 4.25C12.4142 4.25 12.75 4.58579 12.75 5V6.25H14C14.4142 6.25 14.75 6.58579 14.75 7C14.75 7.41421 14.4142 7.75 14 7.75H12.75V9C12.75 9.41421 12.4142 9.75 12 9.75C11.5858 9.75 11.25 9.41421 11.25 9V7.75H10C9.58579 7.75 9.25 7.41421 9.25 7C9.25 6.58579 9.58579 6.25 10 6.25H11.25V5C11.25 4.58579 11.5858 4.25 12 4.25ZM9.25 12C9.25 11.5858 9.58579 11.25 10 11.25H14C14.4142 11.25 14.75 11.5858 14.75 12C14.75 12.4142 14.4142 12.75 14 12.75H10C9.58579 12.75 9.25 12.4142 9.25 12ZM9.25 15C9.25 14.5858 9.58579 14.25 10 14.25H14C14.4142 14.25 14.75 14.5858 14.75 15C14.75 15.4142 14.4142 15.75 14 15.75H10C9.58579 15.75 9.25 15.4142 9.25 15ZM12 18.25C12.4142 18.25 12.75 18.5858 12.75 19V21.25H11.25V19C11.25 18.5858 11.5858 18.25 12 18.25Z"
                                fill="#1C274C" />
                        </svg>
                    </NavLink>
                </div>

                {/* Links */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
                            <span
                                className="inline-block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                                aria-hidden="true"
                            >
                                •••
                            </span>
                            <span
                                className="hidden lg:sidebar-expanded:inline-block 2xl:inline-block"
                            >
                                Opções
                            </span>
                        </h3>
                        <ul className="mt-3">
                            {auth && gruposComPermissoes.map((grupo) => {
                                const rotasPrefixos = grupo.permissoes && Array.isArray(grupo.permissoes)
                                    ? grupo.permissoes.map(permissao => {
                                        const rota = permissao.rota.startsWith('/') ? permissao.rota.slice(1) : permissao.rota;
                                        return rota.includes('-') ? rota.split('-')[0] + '-' : rota;
                                    })
                                    : [];

                                const permissoesVisiveis = grupo.permissoes && Array.isArray(grupo.permissoes)
                                    ? grupo.permissoes.filter(permissao => permissao.visivelmenu === true)
                                    : [];

                                if (permissoesVisiveis.length === 0) return null;

                                return (
                                    <SidebarLinkGroup
                                        key={grupo.grupo}
                                        activecondition={
                                            pathname === "/" ||
                                            rotasPrefixos.some(prefixo => pathname.includes(prefixo))
                                        }
                                    >
                                        {(handleClick, open) => (
                                            <React.Fragment>
                                                <a
                                                    href="#0"
                                                    className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 
                                ${pathname.includes(grupo.grupo.toLowerCase()) ? '' : 'hover:text-gray-900 dark:hover:text-white'}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleClick();
                                                        setSidebarExpanded(true);
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <svg
                                                                className={
                                                                    `shrink-0 fill-current 
                                            ${pathname.includes(grupo.grupo.toLowerCase()) ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`}
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="M9 6.855A3.502 3.502 0 0 0 8 0a3.5 3.5 0 0 0-1 6.855v1.656L5.534 9.65a3.5 3.5 0 1 0 1.229 1.578L8 10.267l1.238.962a3.5 3.5 0 1 0 1.229-1.578L9 8.511V6.855ZM6.5 3.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm4.803 8.095c.005-.005.01-.01.013-.016l.012-.016a1.5 1.5 0 1 1-.025.032ZM3.5 11c.474 0 .897.22 1.171.563l.013.016.013.017A1.5 1.5 0 1 1 3.5 11Z" />
                                                            </svg>
                                                            <span className="text-sm font-medium ml-4 opacity-100 transition-opacity duration-200">
                                                                {grupo.grupo}
                                                            </span>
                                                        </div>
                                                        <div className="flex shrink-0 ml-2">
                                                            <svg
                                                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && 'rotate-180'}`}
                                                                viewBox="0 0 12 12"
                                                            >
                                                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </a>
                                                <div className="block lg:block">
                                                    <ul className={`pl-8 mt-1 ${!open && 'hidden'} text-gray-800 dark:text-gray-100`}>
                                                        {permissoesVisiveis.length > 0 ? (
                                                            permissoesVisiveis.map((permissao, index) => (
                                                                <SidebarLinkUL
                                                                    key={permissao.rota || index}
                                                                    endereco={permissao.rota}
                                                                    nomeLink={permissao.nome}
                                                                />
                                                            ))
                                                        ) : (
                                                            <li className="text-gray-500">Sem permissões visíveis</li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </React.Fragment>
                                        )}
                                    </SidebarLinkGroup>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* Expand / collapse button */}
                <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
                    <div className="w-12 pl-4 pr-3 py-2">
                        <button
                            className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-500"
                            onClick={() => {
                                setSidebarExpanded(!sidebarExpanded);
                                localStorage.setItem("sidebar-expanded", (!sidebarExpanded).toString());
                            }}
                        >
                            <span className="sr-only">Expand / collapse sidebar</span>
                            <svg
                                className={`shrink-0 fill-current text-gray-400 dark:text-gray-500 
                                    ${sidebarExpanded ? 'rotate-180' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                            >
                                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Sidebar);
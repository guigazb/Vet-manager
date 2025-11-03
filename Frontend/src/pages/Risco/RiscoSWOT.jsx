import React from 'react';

import Actions from '../../components/geral/Actions';
import MainLayout from '../MainLayout';


function RiscoSWOT() {

  return (
    <MainLayout>
      <React.Fragment>

        <Actions breadcrumb="Início : Risco" nomeSessao="Matriz SWOT" hasAddViewButton={false} hasFilter={false} />
        <form>
          <div className="space-y-12">

            <div className="pb-12">
              <h2 className="text-base font-semibold leading-7">Matriz SWOT</h2>
              <p className="mt-1 text-sm leading-6 ">
                A Matriz SWOT, cuja sigla vem de <b className="text-red-600">S</b>trengths (forças), <b className="text-red-600">W</b>eaknesses (fraquezas), <b className="text-red-600">O</b>pportunities (oportunidades) e <b className="text-red-600">T</b>hreats (ameaças), <br />
                é uma ferramenta de gestão que possibilita identificar o cenário interno e externo dos negócios
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-9">

                <div className="sm:col-span-9">
                  <label htmlFor="unidade-funcional" className="block text-sm font-medium leading-6">
                    Unidade Funcional
                  </label>
                  <div className="mt-2">
                    <select
                      id="unidade-funcional"
                      name="unidade-funcional"
                      className="block w-full rounded-md border-0 py-1.5 shadow-xs ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Unidade de Planejamento</option>
                      <option>Setor de Governança e Estratégia</option>
                      <option>Divisão de Apoio Diagnóstico Terapêutico</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col col-span-full sm:col-span-3 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
                  <div className="px-5 pt-5 p-4">
                    <header className="flex justify-between items-start mb-2">
                      <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">Forças</h2>
                    </header>

                    <div className="sm:col-span-4">
                      <label htmlFor="forca-nova" className="block text-sm font-medium leading-6">
                        Nova Força
                      </label>
                      <div className="mt-2">
                        <input
                          id="forca-nova"
                          name="forca-nova"
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Salvar
                        </button>
                      </div>


                    </div>

                  </div>
                </div>

                <div className="flex flex-col col-span-full sm:col-span-3 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
                  <div className="px-5 pt-5 p-4">
                    <header className="flex justify-between items-start mb-2">
                      <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">Fraquezas</h2>
                    </header>

                    <div className="sm:col-span-4">
                      <label htmlFor="fraqueza-nova" className="block text-sm font-medium leading-6">
                        Nova Fraqueza
                      </label>
                      <div className="mt-2">
                        <input
                          id="fraqueza-nova"
                          name="fraqueza-nova"
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Salvar
                        </button>
                      </div>



                    </div>

                  </div>
                </div>

                <div className="flex flex-col col-span-full sm:col-span-3 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
                  <div className="px-5 pt-5 p-4">
                    <header className="flex justify-between items-start mb-2">
                      <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">Oportunidades</h2>
                    </header>

                    <div className="sm:col-span-4">
                      <label htmlFor="oportunidade-nova" className="block text-sm font-medium leading-6">
                        Nova Oportunidade
                      </label>
                      <div className="mt-2">
                        <input
                          id="oportunidade-nova"
                          name="oportunidade-nova"
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Salvar
                        </button>
                      </div>


                    </div>

                  </div>
                </div>

                <div className="flex flex-col col-span-full sm:col-span-3 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
                  <div className="px-5 pt-5 p-4">
                    <header className="flex justify-between items-start mb-2">
                      <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">Ameaças</h2>
                    </header>

                    <div className="sm:col-span-4">
                      <label htmlFor="ameaca-nova" className="block text-sm font-medium leading-6">
                        Nova Ameaças
                      </label>
                      <div className="mt-2">
                        <input
                          id="ameaca-nova"
                          name="ameaca-nova"
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Salvar
                        </button>
                      </div>


                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </form>

      </React.Fragment>
    </MainLayout>
  );
}

export default RiscoSWOT;
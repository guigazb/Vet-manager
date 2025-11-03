import React from 'react';
import Actions from '../components/geral/Actions';
import MainLayout from './MainLayout';

const HomePage = () => {

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início" nomeSessao="Página Inicial" hasAddViewButton={false} hasFilter={false} />

                {/* Sessões internas da página */}

                <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                    <div className="text-center">
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-600 sm:text-5xl">Bem-vindo(a) ao</h1>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-indigo-600 sm:text-5xl">Sistema de Gestão do Ciclo BPM do HU-UFMA.</h1>
                    </div>
                </main>

            </React.Fragment>
        </MainLayout >

    )
}

export default HomePage
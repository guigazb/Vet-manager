import React from 'react';

import Actions from '../../components/geral/Actions';
import MainLayout from '../MainLayout';

function DashboardProcessos() {

  return (
    <MainLayout>
      <React.Fragment>

        <Actions breadcrumb="Início : Dashboard" nomeSessao="Dashboard de Processos" hasAddViewButton={false} hasDatepicker={true} hasFilter={false} />

        {/* Sessões internas da página */}
        <div className="grid grid-cols-12 gap-6">
          Dashboard
        </div>

      </React.Fragment>
    </MainLayout>
  );
}

export default DashboardProcessos;
import React from 'react';

import Actions from '../../components/geral/Actions';
import MainLayout from '../MainLayout';

function DashboardRisco() {

  return (
    <MainLayout>
      <React.Fragment>

        <Actions breadcrumb="Início : Dashboard" nomeSessao="Dashboard de Riscos" hasAddViewButton={false} hasDatepicker={true} hasFilter={false} />

        {/* Sessões internas da página */}
        <div className="grid grid-cols-12 gap-6">

        </div>

      </React.Fragment>
    </MainLayout>
  );
}

export default DashboardRisco;
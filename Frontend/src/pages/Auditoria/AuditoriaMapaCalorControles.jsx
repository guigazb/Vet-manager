import React from 'react';

import Actions from '../../components/geral/Actions';
import MainLayout from '../MainLayout';

function AuditoriaMapaCalorControles() {

  return (
    <MainLayout>
      <React.Fragment>

        <Actions breadcrumb="Início : Auditoria" nomeSessao="Mapa de Calor de Controles" hasAddViewButton={false} hasFilter={false} />

        {/* Sessões internas da página */}
        <div className="grid grid-cols-12 gap-6">

        </div>

      </React.Fragment>
    </MainLayout>
  );
}

export default AuditoriaMapaCalorControles;
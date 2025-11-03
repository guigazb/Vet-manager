import React from 'react';

import Actions from '../../components/geral/Actions';
import MainLayout from '../MainLayout';

function ConfiguracaoGeral() {

  return (
    <MainLayout>
      <React.Fragment>

        <Actions breadcrumb="Início : Configuração" nomeSessao="Geral" hasAddViewButton={false} hasFilter={false} />

        {/* Sessões internas da página */}
        <div className="grid grid-cols-12 gap-6">

        </div>

      </React.Fragment>
    </MainLayout>
  );
}

export default ConfiguracaoGeral;
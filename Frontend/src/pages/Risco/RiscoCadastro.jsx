import React from 'react';

import Actions from '../../components/geral/Actions';
import MainLayout from '../MainLayout';

const RiscoCadastro = () => {

  return (
    <MainLayout>
      <React.Fragment>

        <Actions breadcrumb="Início : Risco" nomeSessao="Cadastro de Risco" hasAddViewButton={false} hasFilter={false} />

        {/* Sessões internas da página */}

        <div className="grid grid-cols-12 gap-6">

        </div>

      </React.Fragment>
    </MainLayout>
  );

}

export default RiscoCadastro
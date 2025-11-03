import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../components/utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useFetchUnidadesFuncionaisPorLocalExecucao } from '../../hooks/diversos/useFetchUnidadesFuncionaisPorLocalExecucao';
import Actions from '../../components/geral/Actions';
import MainLayout from '../MainLayout';
import FormPadrao from '../../components/body/FormPadrao';
import SelectInputPadrao from '../../components/selectinput/SelectInputPadrao';
import InternalArea from '../../components/body/InternalArea';
import TabelaPeriodica from '../../components/body/tabelaPeriodica/TabelaPeriodica';

const RiscoTabelaPeriodica = () => {
  const [unidadeFuncionalId, setUnidadeFuncionalId] = useState('0');
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const localExecucaoId = auth?.local_execucao_id;
  const { unidadesPorLocalExecucao, loading: loadingUnidadesFuncionais } = useFetchUnidadesFuncionaisPorLocalExecucao(localExecucaoId);

  useEffect(() => {
    if (!localExecucaoId) {
      logout();
      localStorage.removeItem('token');
      navigate('/login', { replace: true });
    }
  }, [localExecucaoId, logout, navigate]);

  return (
    <MainLayout>
      <Actions breadcrumb="Início : Risco : Tabela periódica" nomeSessao="Tabela Periódica" hasAddViewButton={false} hasFilter={false} />
      <FormPadrao>
        <InternalArea loading={loadingUnidadesFuncionais}>
          <SelectInputPadrao
            label="Selecione uma Unidade Funcional"
            options={unidadesPorLocalExecucao}
            optionKey="unidade_funcional_id"
            optionValue="unidade_funcional_nome"
            value={unidadeFuncionalId}
            onChange={setUnidadeFuncionalId}
            loading={loadingUnidadesFuncionais}
            nomeSelect="unidadeFuncional"
          />
        </InternalArea>
        <TabelaPeriodica unidadeFuncionalId={unidadeFuncionalId} />
      </FormPadrao>
    </MainLayout>
  );
}

export default RiscoTabelaPeriodica;
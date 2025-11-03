import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../../data/routes';

import Actions from '../../../components/geral/Actions'
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import TextInput from '../../../components/textinput/TextInput';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';
import ButtonComponent from '../../../components/button/ButtonComponent';

import { useFetchFerramentaSistema } from '../../../hooks/diversos/useFetchFerramentaSistema';

import axios from 'axios';
//import { updateCacheWithNewRows } from '@mui/x-data-grid/hooks/features/rows/gridRowsUtils';

const AtualizarFerramentaSistema = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.diversos_ferramenta_sistema_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variáveis de Backend
    // ----------------------------------------------------------------------------------------------
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados
    // ----------------------------------------------------------------------------------------------
    const { ferramentaSistema, loading: loadingFerramentaSistema } = useFetchFerramentaSistema(id);

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [formNomeFerramenta, setFormNomeFerramenta] = useState(ferramentaSistema?.nome || '');
    const [formFerramentaAtiva, setFormFerramentaAtiva] = useState(ferramentaSistema?.ativo || '');

    useEffect(() => {
        if (ferramentaSistema && ferramentaSistema.nome !== undefined) {
            setFormNomeFerramenta(ferramentaSistema.nome);
        }
        if (ferramentaSistema && ferramentaSistema.ativo !== undefined) {
            setFormFerramentaAtiva(ferramentaSistema.ativo);
        }
    }, [ferramentaSistema])

    // ----------------------------------------------------------------------------------------------
    // Handles de campos da tela
    // ----------------------------------------------------------------------------------------------
    const handleNomeFerramentaSistema = (e) => {
        setFormNomeFerramenta(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setAtualizarDesabilitado(false);

        const ferramentaSistemaAtualizada = {
            nome: formNomeFerramenta,
            ativo: formFerramentaAtiva
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_FERRAMENTA_SISTEMA + '/' + id, ferramentaSistemaAtualizada);

            if (result.status === 201) {
                atualizacaoBemSucedida = true
                setAtualizarDesabilitado(true);

                toast.success("Ferramenta de sistema atualizada com sucesso.", {
                    onClose: () => navegar(routes.diversos_ferramenta_sistema_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar a Ferramenta de sistema`');
            }
        } catch (error) {
            toast.error('Erro ao tentar atualizar a Ferramenta de sistema`', error);
        }

        if (atualizacaoBemSucedida) {
            //Limpa todos os dados do formulário
            setFormNomeFerramenta("");
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Atualizar Ferramenta Sistema" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingFerramentaSistema}>

                        <TextInput
                            maxLength="180"
                            nomeComponente="nomeferramentasistema"
                            required
                            valorComponente={formNomeFerramenta}
                            valorLabel="Ferramenta de sistema"
                            autoComplete="nome ferramenta"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o nome da ferrramenta"
                            type='text'
                            onChange={handleNomeFerramentaSistema}
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formFerramentaAtiva}
                            nomeComponenteAtivo="ferramenta-ativo"
                            nomeComponenteInativo="ferramenta-inativo"
                            onChange={setFormFerramentaAtiva}
                            valorLabel="Ferramenta ativa ?"
                            colSpan='2'
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingFerramentaSistema}>
                        <ButtonComponent tipo="cancelar" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="alerta" desabilitado={atualizarDesabilitado}>
                            Atualizar Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

            </React.Fragment>
        </MainLayout>
    );
}

export default AtualizarFerramentaSistema;
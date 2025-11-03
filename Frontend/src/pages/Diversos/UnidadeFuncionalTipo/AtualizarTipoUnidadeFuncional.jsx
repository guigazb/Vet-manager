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

import axios from 'axios';

import { useFetchUnidadeFuncionalTipo } from '../../../hooks/diversos/useFetchUnidadeFuncionalTipo';


const AtualizarTipoUnidadeFuncional = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.diversos_tipo_unidade_funcional_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { unidadeFuncionalTipo, loading: loadingUnidadesFuncionalTipo } = useFetchUnidadeFuncionalTipo(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------
    const [formTipoUnidade, setFormTipoUnidade] = useState(unidadeFuncionalTipo?.tipo || '');
    const [formTipoAtivo, setFormTipoAtivo] = useState(unidadeFuncionalTipo?.ativo || '');

    useEffect(() => {
        // alert(JSON.stringify(unidadeFuncionalTipo));
        if (unidadeFuncionalTipo && unidadeFuncionalTipo.tipo !== undefined) {
            setFormTipoUnidade(unidadeFuncionalTipo.tipo);
        }
        if (unidadeFuncionalTipo && unidadeFuncionalTipo.ativo !== undefined) {
            setFormTipoAtivo(unidadeFuncionalTipo.ativo);
        }
    }, [unidadeFuncionalTipo])


    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------

    const handleTipoUnidade = (e) => {
        setFormTipoUnidade(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const tipoUnidadeFuncionalAtualizada = {
            tipo: formTipoUnidade,
            ativo: formTipoAtivo
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_UNIDADE_FUNCIONAL_TIPO + '/' + id, tipoUnidadeFuncionalAtualizada);

            if (result.status === 201) {
                atualizacaoBemSucedida = true;
                setAtualizarDesabilitado(true);

                toast.success("Tipo de Unidade Funcional atualizada com sucesso.", {
                    onClose: () => navegar(routes.diversos_tipo_unidade_funcional_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar o tipo de Unidade Funcional');
            }
        } catch (error) {
            toast.error('Erro ao tentar atualizar o tipo de Unidade Funcional', error);
        }

        if (atualizacaoBemSucedida) {
            //Limpa todos os dados do formulário
            setFormTipoUnidade('');
            setFormTipoAtivo('');
        }
    };


    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Atualizar tipo Unidade Funcional" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingUnidadesFuncionalTipo}>

                        <TextInput
                            maxLength="50"
                            nomeComponente="tipounidadefuncional"
                            required
                            valorComponente={formTipoUnidade}
                            valorLabel="Tipo de Unidade"
                            autoComplete="Tipo da unidade"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o tipo da unidade funcional"
                            type='text'
                            onChange={handleTipoUnidade}
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formTipoAtivo}
                            nomeComponenteAtivo="tipo-ativo"
                            nomeComponenteInativo="tipo-inativo"
                            onChange={setFormTipoAtivo}
                            valorLabel="Tipo ativo ?"
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingUnidadesFuncionalTipo}>
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

export default AtualizarTipoUnidadeFuncional;
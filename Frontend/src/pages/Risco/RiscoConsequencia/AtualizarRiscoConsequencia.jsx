import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import Actions from '../../../components/geral/Actions';
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import TextAreaInput from '../../../components/textinput/TextAreaInput';
import ButtonComponent from '../../../components/button/ButtonComponent';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';

import routes from '../../../data/routes';

import axios from 'axios';

import { useFetchRiscos } from '../../../hooks/risco/useFetchRiscos';
import { useFetchRiscoConsequencia } from '../../../hooks/risco/useFetchRiscoConsequencia';

const AtualizarRiscoConsequencia = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { riscoId, unidadeFuncional, id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_consequencia_listar, { state: { riscoId, unidadeFuncional } });
    }

    // ----------------------------------------------------------------------------------------------
    // Variáveis de botão
    // ----------------------------------------------------------------------------------------------
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoConsequencia, loading: loadingRiscoConsequencia } = useFetchRiscoConsequencia(id);
    const { risco, loading: loadingRiscos } = useFetchRiscos();

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [formRiscoId, setFormRiscoId] = useState(riscoConsequencia?.risco_id || '0');
    const [formDescricaoConsequencia, setFormDescricaoConsequencia] = useState(riscoConsequencia?.descricao || '');
    const [formConsequenciaAtiva, setFormConsequenciaAtiva] = useState(riscoConsequencia?.ativo || '');

    useEffect(() => {
        if (riscoConsequencia && riscoConsequencia.risco_id !== undefined) {
            setFormRiscoId(riscoConsequencia.risco_id);
        }
        if (riscoConsequencia && riscoConsequencia.descricao !== undefined) {
            setFormDescricaoConsequencia(riscoConsequencia.descricao);
        }
        if (riscoConsequencia && riscoConsequencia.ativo !== undefined) {
            setFormConsequenciaAtiva(riscoConsequencia.ativo);
        }
    }, [riscoConsequencia])

    // ----------------------------------------------------------------------------------------------
    // Handles de componentes do formulário
    // ----------------------------------------------------------------------------------------------

    const handleDescricao = (e) => {
        setFormDescricaoConsequencia(e.target.value);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setAtualizarDesabilitado(false);

        const atualizarRiscoConsequencia = {
            risco_id: formRiscoId,
            descricao: formDescricaoConsequencia,
            ativo: formConsequenciaAtiva
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_CONSEQUENCIA + "/" + id, atualizarRiscoConsequencia);

            if (result.status === 201) {

                atualizacaoBemSucedida = true;

                toast.success("Consequencia de risco atualizada com sucesso.", {
                    onClose: () => navegar(routes.risco_consequencia_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar a Consequencia de risco');
            }
        } catch (error) {
            toast.error('Erro ao tentar atualizar a Consequencia de risco', error);
        } finally {
            if (atualizacaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormRiscoId("0");
                setFormDescricaoConsequencia("");
                setFormConsequenciaAtiva("");
            }
            setAtualizarDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Riscos" nomeSessao="Atualizar Consequencia de Risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingRiscoConsequencia}>

                        <SelectInputPadrao
                            label="Risco"
                            options={risco}
                            optionKey="id"
                            optionValue="descricao"
                            value={formRiscoId}
                            onChange={setFormRiscoId}
                            loading={loadingRiscos}
                            nomeSelect="risco"
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoConsequencia}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            onChange={handleDescricao}
                        />

                        <RadioButtonBooleanInput
                            valorLabel="Consequencia Ativa?"
                            valorComponente={formConsequenciaAtiva}
                            onChange={setFormConsequenciaAtiva}
                            nomeComponenteAtivo="consequencia-ativo"
                            nomeComponenteInativo="conseqeuncia-inativo"
                            colSpan='1'
                            inactiveLabel='false'
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingRiscoConsequencia}>
                        <ButtonComponent tipo="cancelar" tipoBotao='button' onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="alerta" tipoBotao='submit' desabilitado={atualizarDesabilitado}>
                            Atualizar Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

            </React.Fragment>
        </MainLayout>
    )
}

export default AtualizarRiscoConsequencia
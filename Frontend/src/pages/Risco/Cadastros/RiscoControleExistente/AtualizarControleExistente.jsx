import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { useFetchRiscos } from '../../../../hooks/risco/useFetchRiscos';
import { useFetchRiscoControleExistente } from '../../../../hooks/risco/useFetchRiscoControleExistente';

import Actions from '../../../../components/geral/Actions';
import MainLayout from '../../../MainLayout';
import FormPadrao from '../../../../components/body/FormPadrao';
import SelectInputPadrao from '../../../../components/selectinput/SelectInputPadrao';
import InternalArea from '../../../../components/body/InternalArea';
import InternalButtonArea from '../../../../components/body/InternalButtonArea';

import TextInput from '../../../../components/textinput/TextInput';
import ButtonComponent from '../../../../components/button/ButtonComponent';
import RadioButtonBooleanInput from '../../../../components/radiobutton/RadioButtonBooleanInput';

import routes from '../../../../data/routes';

import axios from 'axios';

const AtualizarControleExistente = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { riscoId, unidadeFuncional, id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_controle_existente_listar, { state: { riscoId, unidadeFuncional } });
    }

    // ----------------------------------------------------------------------------------------------
    // Variáveis de botão
    // ----------------------------------------------------------------------------------------------
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { controleExistente, loading: loadingRiscoControleExistente } = useFetchRiscoControleExistente(id);
    const { risco, loading: loadingRiscos } = useFetchRiscos();

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [formRiscoId, setFormRiscoId] = useState(controleExistente?.risco_id || '0');
    const [formControleExistente, setFormControleExistente] = useState(controleExistente?.nome_controle_existente || '');
    const [formControleAtivo, setFormControleAtivo] = useState(controleExistente?.ativo || '');

    useEffect(() => {
        if (controleExistente && controleExistente.risco_id !== undefined) {
            setFormRiscoId(controleExistente.risco_id);
        }
        if (controleExistente && controleExistente.nome_controle_existente !== undefined) {
            setFormControleExistente(controleExistente.nome_controle_existente);
        }
        if (controleExistente && controleExistente.ativo !== undefined) {
            setFormControleAtivo(controleExistente.ativo);
        }
    }, [controleExistente])

    // ----------------------------------------------------------------------------------------------
    // Handles de componentes do formulário
    // ----------------------------------------------------------------------------------------------

    const handleControleExistente = (e) => {
        setFormControleExistente(e.target.value);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setAtualizarDesabilitado(false);

        const riscoControleAtualizado = {
            nome_controle_existente: formControleExistente,
            risco_id: formRiscoId,
            ativo: formControleAtivo
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_CONTROLES_EXISTENTES + "/" + id, riscoControleAtualizado);

            if (result.status === 201) {

                atualizacaoBemSucedida = true;

                toast.success("Controle Existente atualizado com sucesso.", {
                    onClose: () => navegar(routes.risco_controle_existente_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar a Controle Existente');
            }
        } catch (error) {
            toast.error('Erro ao tentar atualizar a Controle Existente', error);
        } finally {
            if (atualizacaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormRiscoId("0");
                setFormControleExistente("");
                setFormControleAtivo("");
            }
            setAtualizarDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastro : Riscos" nomeSessao="Atualizar Controles Existentes" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingRiscoControleExistente}>

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

                        <TextInput
                            maxLength="1024"
                            nomeComponente="controlee"
                            valorComponente={formControleExistente}
                            valorLabel="Controle Existente"
                            autoComplete="controle existente"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o Controle"
                            type='text'
                            onChange={handleControleExistente}
                            required
                        />

                        <RadioButtonBooleanInput
                            valorLabel="Controle Existente Ativo ?"
                            valorComponente={formControleAtivo}
                            onChange={setFormControleAtivo}
                            nomeComponenteAtivo="cexistente-ativo"
                            nomeComponenteInativo="cexistente-inativo"
                            colSpan='1'
                            inactiveLabel='false'
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingRiscoControleExistente}>
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

export default AtualizarControleExistente
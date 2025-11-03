import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import routes from '../../../../data/routes';

import Actions from '../../../../components/geral/Actions'
import MainLayout from '../../../MainLayout';
import FormPadrao from '../../../../components/body/FormPadrao';
import SelectInputPadrao from '../../../../components/selectinput/SelectInputPadrao';
import InternalArea from '../../../../components/body/InternalArea';
import InternalButtonArea from '../../../../components/body/InternalButtonArea';

import TextInput from '../../../../components/textinput/TextInput';
import ButtonComponent from '../../../../components/button/ButtonComponent';

import axios from 'axios';

import { useFetchRiscos } from '../../../../hooks/risco/useFetchRiscos';

const CriarControleExistente = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { riscoId, unidadeFuncional } = location.state || {};

    // ----------------------------------------------------------------------------------------------
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_controle_existente_listar, { state: { riscoId, unidadeFuncional } });
    }

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [formRiscoId, setFormRiscoId] = useState(riscoId ? riscoId : '0');
    const [formControleExistente, setFormControleExistente] = useState('');

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { risco, loading: loadingRiscos } = useFetchRiscos();


    // ----------------------------------------------------------------------------------------------
    // Handles de componentes do formulário
    // ----------------------------------------------------------------------------------------------

    const handleControleExistente = (e) => {
        setFormControleExistente(e.target.value);
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novoControle = {
            nome_controle_existente: formControleExistente,
            risco_id: formRiscoId
        };

        let criacaoBemSucedida = false;

        try {
            const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_CONTROLES_EXISTENTES, novoControle);

            if (result.status === 201) {
                criacaoBemSucedida = true;
                toast.success("Controle Existente de risco salvo com sucesso.");
            } else {
                toast.error('Erro ao tentar salvar o Controle Existente de risco');
            }
        } catch (error) {
            toast.error('Erro ao tentar salvar o Controle Existente de risco', error);
        } finally {
            if (criacaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormRiscoId("0");
                setFormControleExistente("");
            }
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Risco : Controle Existente : Criar " nomeSessao="Criar Controles Existentes" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

                    <InternalArea>

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

                    </InternalArea>

                    <InternalButtonArea>
                        <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="sucesso" tipoBotao='submit'>
                            Salvar Novo Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

            </React.Fragment>
        </MainLayout>

    )
}

export default CriarControleExistente
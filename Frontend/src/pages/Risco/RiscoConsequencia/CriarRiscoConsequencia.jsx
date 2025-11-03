import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import routes from '../../../data/routes';

import Actions from '../../../components/geral/Actions'
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import TextAreaInput from '../../../components/textinput/TextAreaInput';
import ButtonComponent from '../../../components/button/ButtonComponent';

import axios from 'axios';

import { useFetchRiscos } from '../../../hooks/risco/useFetchRiscos';

const CriarRiscoConsequencia = () => {

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
        navegar(routes.risco_consequencia_listar, { state: { riscoId, unidadeFuncional } });
    }

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [formRiscoId, setFormRiscoId] = useState(riscoId?riscoId:'0');
    const [formDescricaoConsequencia, setFormDescricaoConsequencia] = useState('');

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { risco, loading: loadingRiscos } = useFetchRiscos();


    // ----------------------------------------------------------------------------------------------
    // Handles de componentes do formulário
    // ----------------------------------------------------------------------------------------------

    const handleDescricao = (e) => {
        setFormDescricaoConsequencia(e.target.value);
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novaConsequencia = {
            risco_id: formRiscoId,
            descricao: formDescricaoConsequencia
        };

        let criacaoBemSucedida = false;

        try {
            const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_CONSEQUENCIA, novaConsequencia);

            if (result.status === 201) {
                criacaoBemSucedida = true;
                toast.success("Consequencia de risco salva com sucesso.");
            } else {
                toast.error('Erro ao tentar salvar a Consequencia de risco');
            }
        } catch (error) {
            toast.error('Erro ao tentar salvar a Consequencia de risco', error);
        } finally {
            if (criacaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormRiscoId("0");
                setFormDescricaoConsequencia("");
            }
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Risco : Consequencia : Criar" nomeSessao="Criar consequencia" hasAddViewButton={false} hasFilter={false} />

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

export default CriarRiscoConsequencia
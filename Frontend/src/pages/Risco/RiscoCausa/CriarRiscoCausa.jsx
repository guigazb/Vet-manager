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
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';
import ButtonComponent from '../../../components/button/ButtonComponent';

import axios from 'axios';

import { useFetchRiscos } from '../../../hooks/risco/useFetchRiscos';

const CriarRiscoCausa = () => {

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
        navegar(routes.risco_causa_listar, { state: { riscoId, unidadeFuncional } });
    }

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [formRiscoId, setFormRiscoId] = useState(riscoId?riscoId:'0');
    const [formDescricaoCausa, setFormDescricaoCausa] = useState('');
    const [formCausaInterna, setFormCausaInterna] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { risco, loading: loadingRiscos } = useFetchRiscos();

    // ----------------------------------------------------------------------------------------------
    // Handles de componentes do formulário
    // ----------------------------------------------------------------------------------------------

    const handleDescricao = (e) => {
        setFormDescricaoCausa(e.target.value);
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novaCausa = {
            risco_id: formRiscoId,
            descricao: formDescricaoCausa,
            causa_interna: formCausaInterna
        };

        let criacaoBemSucedida = false;

        try {
            const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_CAUSA, novaCausa);

            if (result.status === 201) {
                criacaoBemSucedida = true;
                toast.success("Causa de risco salva com sucesso.");
            } else {
                toast.error('Erro ao tentar salvar a Causa de risco');
            }
        } catch (error) {
            toast.error('Erro ao tentar salvar a Causa de risco', error);
        } finally {
            if (criacaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormRiscoId("0");
                setFormDescricaoCausa("");
                setFormCausaInterna("");
            }
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Riscos" nomeSessao="Criar causas" hasAddViewButton={false} hasFilter={false} />

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
                            valorComponente={formDescricaoCausa}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            onChange={handleDescricao}

                        />

                        <RadioButtonBooleanInput
                            valorLabel="Causa interna ?"
                            valorComponente={formCausaInterna}
                            onChange={setFormCausaInterna}
                            nomeComponenteAtivo="causa-e-interna"
                            nomeComponenteInativo="causa-nao-interna"
                            colSpan='1'
                            inactiveLabel='false'
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

export default CriarRiscoCausa
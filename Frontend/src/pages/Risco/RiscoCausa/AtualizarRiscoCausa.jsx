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
import { useFetchRiscoCausa } from '../../../hooks/risco/useFetchRiscoCausa';


const AtualizarRiscoCausa = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { riscoId, unidadeFuncional, id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_causa_listar, { state: { riscoId, unidadeFuncional } });
    }

    // ----------------------------------------------------------------------------------------------
    // Variáveis de botão
    // ----------------------------------------------------------------------------------------------
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoCausa, loading: loadingRiscoCausa } = useFetchRiscoCausa(id);
    const { risco, loading: loadingRiscos } = useFetchRiscos();

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [formRiscoId, setFormRiscoId] = useState(riscoCausa?.risco_id || '0');
    const [formDescricaoCausa, setFormDescricaoCausa] = useState(riscoCausa?.descricao || '');
    const [formCausaInterna, setFormCausaInterna] = useState(riscoCausa?.causa_interna || '');
    const [formCausaAtiva, setFormCausaAtiva] = useState(riscoCausa?.ativo || '');

    useEffect(() => {
        if (riscoCausa && riscoCausa.risco_id !== undefined) {
            setFormRiscoId(riscoCausa.risco_id);
        }
        if (riscoCausa && riscoCausa.descricao !== undefined) {
            setFormDescricaoCausa(riscoCausa.descricao);
        }
        if (riscoCausa && riscoCausa.causa_interna !== undefined) {
            setFormCausaInterna(riscoCausa.causa_interna);
        }
        if (riscoCausa && riscoCausa.ativo !== undefined) {
            setFormCausaAtiva(riscoCausa.ativo);
        }
    }, [riscoCausa])

    // ----------------------------------------------------------------------------------------------
    // Handles de componentes do formulário
    // ----------------------------------------------------------------------------------------------

    const handleDescricao = (e) => {
        setFormDescricaoCausa(e.target.value);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setAtualizarDesabilitado(false);

        const atualizarRiscoCausa = {
            risco_id: formRiscoId,
            descricao: formDescricaoCausa,
            causa_interna: formCausaInterna,
            ativo: formCausaAtiva
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_CAUSA + "/" + id, atualizarRiscoCausa);

            if (result.status === 201) {

                atualizacaoBemSucedida = true;
                
                toast.success("Causa de risco atualizada com sucesso.", {
                    onClose: () => navegar(routes.risco_causa_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar a Causa de risco');
            }
        } catch (error) {
            toast.error('Erro ao tentar atualizar a Causa de risco', error);
        } finally {
            if (atualizacaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormRiscoId("0");
                setFormDescricaoCausa("");
                setFormCausaInterna("");
                setFormCausaAtiva("");
            }
            setAtualizarDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Riscos" nomeSessao="Atualizar Causa de Risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingRiscoCausa}>

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

                        <RadioButtonBooleanInput
                            valorLabel="Causa Ativa?"
                            valorComponente={formCausaAtiva}
                            onChange={setFormCausaAtiva}
                            nomeComponenteAtivo="causa-ativo"
                            nomeComponenteInativo="causa-inativo"
                            colSpan='1'
                            inactiveLabel='false'
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingRiscoCausa}>
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

export default AtualizarRiscoCausa
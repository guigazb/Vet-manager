import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import routes from '../../../../data/routes';

import Actions from '../../../../components/geral/Actions'
import MainLayout from '../../../MainLayout';
import FormPadrao from '../../../../components/body/FormPadrao';
import InternalArea from '../../../../components/body/InternalArea';
import InternalButtonArea from '../../../../components/body/InternalButtonArea';

import TextInput from '../../../../components/textinput/TextInput';
import TextAreaInput from '../../../../components/textinput/TextAreaInput';
import RadioButtonBooleanInput from '../../../../components/radiobutton/RadioButtonBooleanInput';
import ButtonComponent from '../../../../components/button/ButtonComponent';

import axios from 'axios';

import { useFetchRiscoImpacto } from '../../../../hooks/risco/useFetchRiscoImpacto';

const AtualizarRiscoImpacto = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_categoria_risco_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoImpacto, loading: loadingRiscoImpacto } = useFetchRiscoImpacto(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formTipoImpactoRisco, setFormTipoImpactoRisco] = useState(riscoImpacto?.tipo_impacto || '');
    const [formDescricaoImpacto, setFormDescricaoImpacto] = useState(riscoImpacto?.descricao || '');
    const [formValorImpacto, setFormValorImpacto] = useState(riscoImpacto?.valor || '');
    const [formImpactoAtivo, setFormImpactoAtivo] = useState(riscoImpacto?.ativo || '');

    useEffect(() => {
        if (riscoImpacto && riscoImpacto.tipo_impacto !== undefined) {
            setFormTipoImpactoRisco(riscoImpacto.tipo_impacto);
        }
        if (riscoImpacto && riscoImpacto.descricao !== undefined) {
            setFormDescricaoImpacto(riscoImpacto.descricao);
        }
        if (riscoImpacto && riscoImpacto.valor !== undefined) {
            setFormValorImpacto(riscoImpacto.valor);
        }
        if (riscoImpacto && riscoImpacto.ativo !== undefined) {
            setFormImpactoAtivo(riscoImpacto.ativo);
        }
    }, [riscoImpacto])

    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------
    const handleTipoImpactoRisco = (e) => {
        setFormTipoImpactoRisco(e.target.value);
    };

    const handleDescricao = (e) => {
        setFormDescricaoImpacto(e.target.value);
    };

    const handleValor = (e) => {
        setFormValorImpacto(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const impactoRiscoAtualizado = {
            tipo_impacto: formTipoImpactoRisco,
            descricao: formDescricaoImpacto,
            valor: formValorImpacto,
            ativo: formImpactoAtivo
        };

        let atualizacaoBemSucedida = false;

        try {
            await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_IMPACTO + "/" + id, impactoRiscoAtualizado);

            if (result.status === 201) {

                atualizacaoBemSucedida = true;

                toast.success("Impacto de risco atualizado com sucesso.", {
                    onClose: () => navegar(routes.risco_impacto_listar)
                });
            } else {
                toast.error('Erro ao tentar Atualizar o impacto de risco`');
            }
        } catch (error) {
            toast.error('Erro ao tentar Atualizar o impacto de risco`', error);
        } finally {
            if (atualizacaoBemSucedida) {
                //Limpa todos os dados do formulário
                setFormTipoImpactoRisco('');
                setFormDescricaoImpacto('');
                setFormValorImpacto('');
                setFormImpactoAtivo('');
            }
            setAtualizarDesabilitado(true);
        }
    };


    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastro : Risco" nomeSessao="Atualizar Impacto de Risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingRiscoImpacto}>

                        <TextInput
                            maxLength="20"
                            nomeComponente="impactorisco"
                            required
                            valorComponente={formTipoImpactoRisco}
                            valorLabel="Impacto de risco"
                            autoComplete="impacto"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o Impacto"
                            type='text'
                            onChange={handleTipoImpactoRisco}
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoImpacto}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            onChange={handleDescricao}

                        />

                        <TextInput
                            maxLength="6"
                            nomeComponente="valorimpacto"
                            required
                            valorComponente={formValorImpacto}
                            valorLabel="Valor do impacto"
                            autoComplete="valor"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o valor"
                            type='text'
                            onChange={handleValor}
                        />


                        <RadioButtonBooleanInput
                            valorComponente={formImpactoAtivo}
                            nomeComponenteAtivo="impacto-ativo"
                            nomeComponenteInativo="impacto-inativo"
                            onChange={setFormImpactoAtivo}
                            valorLabel="Impacto ativo ?"
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingRiscoImpacto}>
                        <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
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

export default AtualizarRiscoImpacto;
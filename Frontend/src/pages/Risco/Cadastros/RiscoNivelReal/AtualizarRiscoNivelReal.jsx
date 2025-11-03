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

import { useFetchRiscoNivelReal } from '../../../../hooks/risco/useFetchRiscoNivelReal';

const AtualizarRiscoNivelReal = () => {
    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_nivel_real_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoNivelReal, loading: loadingNivelRealRisco } = useFetchRiscoNivelReal(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formNivelRealRisco, setFormNivelRealRisco] = useState(riscoNivelReal?.nivel_real || '');
    const [formDescricaoNivelReal, setFormDescricaoNivelReal] = useState(riscoNivelReal?.descricao || '');
    const [formLimiteInicialNivelReal, setFormLimiteInicialNivelReal] = useState(riscoNivelReal?.limite_inicial || '');
    const [formLimiteFinalNivelReal, setFormLimiteFinalNivelReal] = useState(riscoNivelReal?.limite_final || '');
    const [formNivelRealAtivo, setFormNivelRealAtivo] = useState(riscoNivelReal?.ativo || '');

    useEffect(() => {
        if (riscoNivelReal && riscoNivelReal.nivel_real !== undefined) {
            setFormNivelRealRisco(riscoNivelReal.nivel_real);
        }
        if (riscoNivelReal && riscoNivelReal.descricao !== undefined) {
            setFormDescricaoNivelReal(riscoNivelReal.descricao);
        }
        if (riscoNivelReal && riscoNivelReal.limite_inicial !== undefined) {
            setFormLimiteInicialNivelReal(riscoNivelReal.limite_inicial);
        }
        if (riscoNivelReal && riscoNivelReal.limite_final !== undefined) {
            setFormLimiteFinalNivelReal(riscoNivelReal.limite_final);
        }
        if (riscoNivelReal && riscoNivelReal.ativo !== undefined) {
            setFormNivelRealAtivo(riscoNivelReal.ativo);
        }
    }, [riscoNivelReal])

    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------
    const handleNivelRealRisco = (e) => {
        setFormNivelRealRisco(e.target.value);
    };

    const handleDescricao = (e) => {
        setFormDescricaoNivelReal(e.target.value);
    };

    const handleLimiteInicial = (e) => {
        const value = e.target.value;
        setFormLimiteInicialNivelReal(value);

        if ((value < 1 || value > 25) && value) {
            toast.error('O valor deve ser um inteiro entre 1 e 25');
        }
    };

    const handleLimiteFinal = (e) => {
        const value = e.target.value;
        setFormLimiteFinalNivelReal(value);

        if ((value < 1 || value > 25) && value) {
            toast.error('O valor deve ser um inteiro entre 1 e 25');
        }
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const nivelRealRiscoAtualizado = {
            nivel_real: formNivelRealRisco,
            descricao: formDescricaoNivelReal,
            limite_inicial: formLimiteInicialNivelReal,
            limite_final: formLimiteFinalNivelReal,
            ativo: formNivelRealAtivo
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_NIVEL_REAL + "/" + id, nivelRealRiscoAtualizado);

            if (result.status === 201) {

                atualizacaoBemSucedida = true;

                toast.success("Nivel Real de risco atualizado com sucesso.", {
                    onClose: () => navegar(routes.risco_nivel_real_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar o Nivel Real de risco`');
            }

        } catch (error) {
            toast.error('Erro ao tentar atualizar o Nivel Real de risco`', error);
        } finally {
            if (atualizacaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormNivelRealRisco('');
                setFormDescricaoNivelReal('');
                setFormLimiteInicialNivelReal('');
                setFormLimiteFinalNivelReal('');
                setFormNivelRealAtivo('');
            }
            setAtualizarDesabilitado(true);
        }

    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Risco" nomeSessao="Atualizar Niveis Reais de Risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingNivelRealRisco}>

                        <TextInput
                            maxLength="20"
                            nomeComponente="nivelrealrisco"
                            required
                            valorComponente={formNivelRealRisco}
                            valorLabel="Nivel Real de Risco"
                            autoComplete="nivel real"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o Nivel"
                            type='text'
                            onChange={handleNivelRealRisco}
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoNivelReal}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            onChange={handleDescricao}
                        />

                        <TextInput
                            maxLength="2"
                            nomeComponente="limiteinicial"
                            required
                            valorComponente={formLimiteInicialNivelReal}
                            valorLabel="Limite Inicial"
                            autoComplete="inicio"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o valor"
                            type='text'
                            onChange={handleLimiteInicial}
                        />

                        <TextInput
                            maxLength="2"
                            nomeComponente="limitefinal"
                            required
                            valorComponente={formLimiteFinalNivelReal}
                            valorLabel="Limite Final"
                            autoComplete="valor"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o valor"
                            type='text'
                            onChange={handleLimiteFinal}
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formNivelRealAtivo}
                            nomeComponenteAtivo="nivel-ativo"
                            nomeComponenteInativo="nivel-inativo"
                            onChange={setFormNivelRealAtivo}
                            valorLabel="Nivel Real Ativo ?"
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingNivelRealRisco}>
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

export default AtualizarRiscoNivelReal;
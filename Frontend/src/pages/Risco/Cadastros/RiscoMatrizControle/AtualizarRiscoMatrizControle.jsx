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

import { useFetchRiscoMatrizControle } from '../../../../hooks/risco/useFetchRiscoMatrizControle';

const AtualizarRiscoMatrizControle = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_matriz_controle_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoMatrizControle, loading: loadingMatrizControleRisco } = useFetchRiscoMatrizControle(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formMatrizControleRisco, setFormMatrizControleRisco] = useState(riscoMatrizControle?.matriz_controle || '');
    const [formDescricaoMatrizControle, setFormDescricaoMatrizControle] = useState(riscoMatrizControle?.descricao || '');
    const [formLimiteInicialMatrizControle, setFormLimiteInicialMatrizControle] = useState(riscoMatrizControle?.limite_inicial || '');
    const [formLimiteFinalMatrizControle, setFormLimiteFinalMatrizControle] = useState(riscoMatrizControle?.limite_final || '');
    const [formMatrizControleAtivo, setFormMatrizControleAtivo] = useState(riscoMatrizControle?.ativo || '');

    useEffect(() => {
        if (riscoMatrizControle && riscoMatrizControle.matriz_controle !== undefined) {
            setFormMatrizControleRisco(riscoMatrizControle.matriz_controle);
        }
        if (riscoMatrizControle && riscoMatrizControle.descricao !== undefined) {
            setFormDescricaoMatrizControle(riscoMatrizControle.descricao);
        }
        if (riscoMatrizControle && riscoMatrizControle.limite_inicial !== undefined) {
            setFormLimiteInicialMatrizControle(riscoMatrizControle.limite_inicial);
        }
        if (riscoMatrizControle && riscoMatrizControle.limite_final !== undefined) {
            setFormLimiteFinalMatrizControle(riscoMatrizControle.limite_final);
        }
        if (riscoMatrizControle && riscoMatrizControle.ativo !== undefined) {
            setFormMatrizControleAtivo(riscoMatrizControle.ativo);
        }
    }, [riscoMatrizControle])

    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------
    const handleMatrizControleRisco = (e) => {
        setFormMatrizControleRisco(e.target.value);
    };

    const handleDescricao = (e) => {
        setFormDescricaoMatrizControle(e.target.value);
    };

    const handleLimiteInicial = (e) => {
        const value = e.target.value;
        setFormLimiteInicialMatrizControle(value);

        if ((value < 1 || value > 25) && value) {
            toast.error('O valor deve ser um inteiro entre 1 e 25');
        }
    };

    const handleLimiteFinal = (e) => {
        const value = e.target.value;
        setFormLimiteFinalMatrizControle(value);

        if ((value < 1 || value > 25) && value) {
            toast.error('O valor deve ser um inteiro entre 1 e 25');
        }
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const matrizControleRiscoAtualizado = {
            matriz_controle: formMatrizControleRisco,
            descricao: formDescricaoMatrizControle,
            limite_inicial: formLimiteInicialMatrizControle,
            limite_final: formLimiteFinalMatrizControle,
            ativo: formMatrizControleAtivo
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_MATRIZ_CONTROLE + "/" + id, matrizControleRiscoAtualizado);

            if (result.status === 201) {

                atualizacaoBemSucedida = true;

                toast.success("Matriz Controle de risco atualizada com sucesso.", {
                    onClose: () => navegar(routes.risco_matriz_controle_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar a matriz de controle de risco`');
            }

        } catch (error) {
            toast.error('Erro ao tentar atualizar a matriz de controle de risco`', error);
        } finally {
            if (atualizacaoBemSucedida) {

                //Limpa todos os dados do formulário

                setFormMatrizControleRisco('');
                setFormDescricaoMatrizControle('');
                setFormLimiteInicialMatrizControle('');
                setFormLimiteFinalMatrizControle('');
                setFormMatrizControleAtivo('');

            }
            setAtualizarDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastros : Risco" nomeSessao="Atualizar Matriz de Controle de Risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingMatrizControleRisco}>

                        <TextInput
                            maxLength="50"
                            nomeComponente="matrizcontrolerisco"
                            required
                            valorComponente={formMatrizControleRisco}
                            valorLabel="Matriz Controle de Risco"
                            autoComplete="matriz controle"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite a matriz"
                            type='text'
                            onChange={handleMatrizControleRisco}
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoMatrizControle}
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
                            valorComponente={formLimiteInicialMatrizControle}
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
                            valorComponente={formLimiteFinalMatrizControle}
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
                            valorComponente={formMatrizControleAtivo}
                            nomeComponenteAtivo="matrizcontrole-ativo"
                            nomeComponenteInativo="matrizcontrole-inativo"
                            onChange={setFormMatrizControleAtivo}
                            valorLabel="Matriz Controle Ativa ?"
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingMatrizControleRisco}>
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

export default AtualizarRiscoMatrizControle;
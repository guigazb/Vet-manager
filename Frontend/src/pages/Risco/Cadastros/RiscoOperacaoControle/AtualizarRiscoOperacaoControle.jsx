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

import { useFetchRiscoOperacaoControle } from '../../../../hooks/risco/useFetchRiscoOperacaoControle';

const AtualizarRiscoOperacaoControle = () => {

    // ----------------------------------------------------------------------------------------------
    // Variaveis de backend
    // ----------------------------------------------------------------------------------------------
    const urlBackend = import.meta.env.VITE_API_URL_BACKEND;

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_operacao_controle_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoOperacaoControle, loading: loadingOperacaoControleRisco } = useFetchRiscoOperacaoControle(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formOperacaoControleRisco, setFormOperacaoControleRisco] = useState('');
    const [formDescricaoOperacaoControle, setFormDescricaoOperacaoControle] = useState('');
    const [formValorOperacaoControle, setFormValorOperacaoControle] = useState('');
    const [formOperacaoControleAtiva, setFormOperacaoControleAtiva] = useState(riscoOperacaoControle?.ativo || '');

    useEffect(() => {
        if (riscoOperacaoControle && riscoOperacaoControle.operacao_controle !== undefined) {
            setFormOperacaoControleRisco(riscoOperacaoControle.operacao_controle);
        }
        if (riscoOperacaoControle && riscoOperacaoControle.descricao !== undefined) {
            setFormDescricaoOperacaoControle(riscoOperacaoControle.descricao);
        }
        if (riscoOperacaoControle && riscoOperacaoControle.valor !== undefined) {
            setFormValorOperacaoControle(riscoOperacaoControle.valor);
        }
        if (riscoOperacaoControle && riscoOperacaoControle.ativo !== undefined) {
            setFormOperacaoControleAtiva(riscoOperacaoControle.ativo);
        }
    }, [riscoOperacaoControle])

    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------
    const handleOperacaoControleRisco = (e) => {
        setFormOperacaoControleRisco(e.target.value);
    };

    const handleDescricao = (e) => {
        setFormDescricaoOperacaoControle(e.target.value);
    };

    const handleValor = (e) => {
        const value = e.target.value;
        setFormValorOperacaoControle(value);

        if ((value < 1 || value > 5) && value) {
            toast.error('O valor deve ser um inteiro entre 1 e 5');
        }
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const operacoControleRiscoAtualizado = {
            operacao_controle: formOperacaoControleRisco,
            descricao: formDescricaoOperacaoControle,
            valor: formValorOperacaoControle,
            ativo: formOperacaoControleAtiva
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(urlBackend + '/risco/operacaocontrole/' + id, operacoControleRiscoAtualizado);

            if (result.status === 201) {

                atualizacaoBemSucedida = true;

                toast.success("Operação de controle de risco atualizada com sucesso.", {
                    onClose: () => navegar(routes.risco_operacao_controle_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar a operação de controle de risco`');
            }

        } catch (error) {
            toast.error('Erro ao tentar atualizar a operação de controle de risco`', error);
        } finally {
            if (atualizacaoBemSucedida) {

                //Limpa todos os dados do formulário

                setFormOperacaoControleRisco('');
                setFormDescricaoOperacaoControle('');
                setFormValorOperacaoControle('');
                setFormOperacaoControleAtiva('');

            }
            setAtualizarDesabilitado(true);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastro : Risco" nomeSessao="Atualizar Operação de Controle de Risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingOperacaoControleRisco}>

                        <TextInput
                            maxLength="20"
                            nomeComponente="operacaocontrolerisco"
                            required
                            valorComponente={formOperacaoControleRisco}
                            valorLabel="Operacão de controle de Risco"
                            autoComplete="operacao de controle"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite a operação"
                            type='text'
                            onChange={handleOperacaoControleRisco}
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoOperacaoControle}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            onChange={handleDescricao}

                        />

                        <TextInput
                            maxLength="1"
                            nomeComponente="valoroperacaocontrole"
                            required
                            valorComponente={formValorOperacaoControle}
                            valorLabel="Valor da Operação de Controle"
                            autoComplete="valor"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o valor"
                            type='text'
                            onChange={handleValor}
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formOperacaoControleAtiva}
                            nomeComponenteAtivo="operacao-ativo"
                            nomeComponenteInativo="operacao-inativo"
                            onChange={setFormOperacaoControleAtiva}
                            valorLabel="Operação de Controle ativa ?"
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingOperacaoControleRisco}>
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

export default AtualizarRiscoOperacaoControle;
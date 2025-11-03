import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../../../../data/routes';

import Actions from '../../../../components/geral/Actions'
import MainLayout from '../../../MainLayout';
import InternalButtonArea from '../../../../components/body/InternalButtonArea';
import FormPadrao from '../../../../components/body/FormPadrao';
import ButtonComponent from '../../../../components/button/ButtonComponent';
import TextInput from '../../../../components/textinput/TextInput';
import TextAreaInput from '../../../../components/textinput/TextAreaInput';

import axios from 'axios';
import InternalArea from '../../../../components/body/InternalArea';

const CriarRiscoOperacaoControle = () => {

    // ----------------------------------------------------------------------------------------------
    // Variaveis de backend
    // ----------------------------------------------------------------------------------------------
    const urlBackend = import.meta.env.VITE_API_URL_BACKEND;

    // ----------------------------------------------------------------------------------------------
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_operacao_controle_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formOperacaoControleRisco, setFormOperacaoControleRisco] = useState('');
    const [formDescricaoOperacaoControle, setFormDescricaoOperacaoControle] = useState('');
    const [formValorOperacaoControle, setFormValorOperacaoControle] = useState('');

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
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novaOperacaoControleRisco = {
            operacao_controle: formOperacaoControleRisco,
            descricao: formDescricaoOperacaoControle,
            valor: formValorOperacaoControle
        };

        try {
            await axios.post(urlBackend + '/risco/operacaocontrole', novaOperacaoControleRisco);

            toast.success("Operação de controle de risco salva com sucesso.");

            //Limpa todos os dados do formulário

            setFormOperacaoControleRisco('');
            setFormDescricaoOperacaoControle('');
            setFormValorOperacaoControle('');

        } catch (error) {
            toast.error('Erro ao tentar salvar a operação de controle de risco`', error);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastro : Risco" nomeSessao="Cadastro de Operação de Controle" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

                    <InternalArea>

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

                    </InternalArea>

                </FormPadrao>

                <InternalButtonArea>
                    <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                        Retornar para Lista de Registros
                    </ButtonComponent>
                    <ButtonComponent tipo="sucesso" onClick={handleCreateSubmit}>
                        Salvar Novo Registro
                    </ButtonComponent>
                </InternalButtonArea>

            </React.Fragment>
        </MainLayout>
    );
}

export default CriarRiscoOperacaoControle;
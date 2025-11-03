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
import InternalArea from '../../../../components/body/InternalArea';

import axios from 'axios';

const CriarRiscoMatrizControle = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_matriz_controle_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formMatrizControleRisco, setFormMatrizControleRisco] = useState('');
    const [formDescricaoMatrizControle, setFormDescricaoMatrizControle] = useState('');
    const [formLimiteInicialMatrizControle, setFormLimiteInicialMatrizControle] = useState('');
    const [formLimiteFinalMatrizControle, setFormLimiteFinalMatrizControle] = useState('');

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
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novaMatrizControleRisco = {
            matriz_controle: formMatrizControleRisco,
            descricao: formDescricaoMatrizControle,
            limite_inicial: formLimiteInicialMatrizControle,
            limite_final: formLimiteFinalMatrizControle
        };

        let insercaoBemSucedida = false;

        try {
            const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_MATRIZ_CONTROLE, novaMatrizControleRisco);

            if (result.status === 201) {

                insercaoBemSucedida = true;

                toast.success("Matriz de controle de risco salvo com sucesso.");
            } else {
                toast.error('Erro ao tentar salvar a matriz de controle de risco`', error);
            }

        } catch (error) {
            toast.error('Erro ao tentar salvar a matriz de controle de risco`', error);
        } finally {
            if (insercaoBemSucedida) {

                //Limpa todos os dados do formulário

                setFormMatrizControleRisco('');
                setFormDescricaoMatrizControle('');
                setFormLimiteInicialMatrizControle('');
                setFormLimiteFinalMatrizControle('');
            }
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastros : Risco" nomeSessao="Cadastro de Matriz Controle" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

                    <InternalArea>

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

export default CriarRiscoMatrizControle;
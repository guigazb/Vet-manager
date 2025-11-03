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

const CriarRiscoDesenhoControle = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_desenho_controle_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formDesenhoControleRisco, setFormDesenhoControleRisco] = useState('');
    const [formDescricaoDesenhoControle, setFormDescricaoDesenhoControle] = useState('');
    const [formValorDesenhoControle, setFormValorDesenhoControle] = useState('');

    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------
    const handleDesenhoControleRisco = (e) => {
        setFormDesenhoControleRisco(e.target.value);
    };

    const handleDescricao = (e) => {
        setFormDescricaoDesenhoControle(e.target.value);
    };

    const handleValor = (e) => {
        const value = e.target.value;
        setFormValorDesenhoControle(value);

        if ((value < 1 || value > 5) && value) {
            toast.error('O valor deve ser um inteiro entre 1 e 5');
        }
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novoDesenhoControle = {
            desenho_controle: formDesenhoControleRisco,
            descricao: formDescricaoDesenhoControle,
            valor: formValorDesenhoControle
        };

        let criacaoBemSucedida = false;

        try {
            const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_DESENHO_CONTROLE, novoDesenhoControle);

            if (result.status === 201) {

                criacaoBemSucedida = true;
                toast.success("Desenho de Controle de risco salvo com sucesso.");
            } else {
                toast.error('Erro ao tentar salvar desenho de Controle de risco`');
            }
        } catch (error) {
            toast.error('Erro ao tentar salvar desenho de Controle de risco`', error);
        } finally {
            if (criacaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormDesenhoControleRisco('');
                setFormDescricaoDesenhoControle('');
                setFormValorDesenhoControle('');
            }
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastros : Risco" nomeSessao="Cadastro de Desenho Controle" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

                    <InternalArea>

                        <TextInput
                            maxLength="50"
                            nomeComponente="desenhocontrole"
                            required
                            valorComponente={formDesenhoControleRisco}
                            valorLabel="Desenho Controle"
                            autoComplete="desenho"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o desenho"
                            type='text'
                            onChange={handleDesenhoControleRisco}
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoDesenhoControle}
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
                            nomeComponente="valordesenho"
                            required
                            valorComponente={formValorDesenhoControle}
                            valorLabel="Valor"
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

export default CriarRiscoDesenhoControle;
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

const CriarRiscoNivelReal = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_nivel_real_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formNivelRealRisco, setFormNivelRealRisco] = useState('');
    const [formDescricaoNivelReal, setFormDescricaoNivelReal] = useState('');
    const [formLimiteInicialNivelReal, setFormLimiteInicialNivelReal] = useState('');
    const [formLimiteFinalNivelReal, setFormLimiteFinalNivelReal] = useState('');

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
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novoNivelRealRisco = {
            nivel_real: formNivelRealRisco,
            descricao: formDescricaoNivelReal,
            limite_inicial: formLimiteInicialNivelReal,
            limite_final: formLimiteFinalNivelReal
        };

        let insercaoBemSucedida = false;

        try {
            const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_NIVEL_REAL, novoNivelRealRisco);

            if (result.status === 201) {

                insercaoBemSucedida = true;

                toast.success("Nivel Real de risco salvo com sucesso.");
            } else {
                toast.error('Erro ao tentar salvar o Nivel Real de risco`', error);
            }

        } catch (error) {
            toast.error('Erro ao tentar salvar o Nivel Real de risco`', error);
        } finally {
            if (insercaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormNivelRealRisco('');
                setFormDescricaoNivelReal('');
                setFormLimiteInicialNivelReal('');
                setFormLimiteFinalNivelReal('');
            }
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Risco" nomeSessao="Cadastro de Nivel Real" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

                    <InternalArea>

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

export default CriarRiscoNivelReal;
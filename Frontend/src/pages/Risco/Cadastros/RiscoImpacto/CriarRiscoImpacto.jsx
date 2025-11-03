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

const CriarRiscoImpacto = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_impacto_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formTipoImpactoRisco, setFormTipoImpactoRisco] = useState('');
    const [formDescricaoImpacto, setFormDescricaoImpacto] = useState('');
    const [formValorImpacto, setFormValorImpacto] = useState('');

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
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novoImpactoRisco = {
            tipo_impacto: formTipoImpactoRisco,
            descricao: formDescricaoImpacto,
            valor: formValorImpacto
        };

        let criacaoBemSucedida = false;

        try {
            await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_IMPACTO, novoImpactoRisco);


            if (result.status === 201) {
                criacaoBemSucedida = true;
                toast.success("Impacto de risco salvo com sucesso.");
            } else {
                toast.error('Erro ao tentar salvar o impacto de risco');
            }

        } catch (error) {
            toast.error('Erro ao tentar salvar o impacto de risco`', error);
        } finally {
            if (criacaoBemSucedida) {

                //Limpa todos os dados do formulário

                setFormTipoImpactoRisco('');
                setFormDescricaoImpacto('');
                setFormValorImpacto('');
            }
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastro : Risco" nomeSessao="Cadastro de Impacto de Risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

                    <InternalArea>

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

export default CriarRiscoImpacto;
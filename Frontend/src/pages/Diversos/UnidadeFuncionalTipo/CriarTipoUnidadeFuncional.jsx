import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../../../data/routes';

import Actions from '../../../components/geral/Actions'
import MainLayout from '../../MainLayout';
import InternalButtonArea from '../../../components/body/InternalButtonArea';
import FormPadrao from '../../../components/body/FormPadrao';
import ButtonComponent from '../../../components/button/ButtonComponent';
import TextInput from '../../../components/textinput/TextInput';

import axios from 'axios';
import InternalArea from '../../../components/body/InternalArea';

const CriarTipoUnidadeFuncional = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.diversos_tipo_unidade_funcional_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formTipoUnidade, setFormTipoUnidade] = useState('');

    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------
    const handleTipoUnidade = (e) => {
        setFormTipoUnidade(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novoTipoUnidadeFuncional = {
            tipo: formTipoUnidade
        };

        let criacaoBemSucedida = false;

        try {
            const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_UNIDADE_FUNCIONAL_TIPO, novoTipoUnidadeFuncional);

            if (result.status === 201) {
                criacaoBemSucedida = true;
                toast.success("Tipo de Unidade Funcional salvo com sucesso.");
            } else {
                toast.error('Erro ao tentar salvar o tipo de Unidade Funcional');
            }
        } catch (error) {
            toast.error('Erro ao tentar salvar o tipo de Unidade Funcional', error);
        }

        if (criacaoBemSucedida) {
            //Limpa todos os dados do formulário
            setFormTipoUnidade('');
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Cadastro de Tipo Unidade Funcional" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

                    <InternalArea>

                        <TextInput
                            maxLength="50"
                            nomeComponente="tipounidadefuncional"
                            required
                            valorComponente={formTipoUnidade}
                            valorLabel="Tipo de Unidade"
                            autoComplete="Tipo da unidade"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o tipo de unidade funcional"
                            type='text'
                            onChange={handleTipoUnidade}
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

export default CriarTipoUnidadeFuncional;
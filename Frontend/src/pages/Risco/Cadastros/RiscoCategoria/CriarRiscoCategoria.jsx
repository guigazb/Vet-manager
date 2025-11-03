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

const CriarRiscoCategoria = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_categoria_risco_listar);
    }


    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formCategoriaRisco, setFormCategoriaRisco] = useState('');
    const [formDescricaoCategoria, setFormDescricaoCategoria] = useState('');


    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------
    const handleCategoriaRisco = (e) => {
        setFormCategoriaRisco(e.target.value);
    };

    const handleDescricao = (e) => {
        setFormDescricaoCategoria(e.target.value);
    };


    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novaCategoriaRisco = {
            nome: formCategoriaRisco,
            descricao: formDescricaoCategoria
        };

        let criacaoBemSucedida = false;

        try {
            const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_CATEGORIA, novaCategoriaRisco);

            if (result.status === 201) {

                criacaoBemSucedida = true;
                toast.success("Categoria de risco salva com sucesso.");
            } else {
                toast.error('Erro ao tentar salvar a categoria de risco`');
            }
        } catch (error) {
            toast.error('Erro ao tentar salvar a categoria de risco`', error);
        } finally {
            if (criacaoBemSucedida) {

                //Limpa todos os dados do formulário

                setFormCategoriaRisco('');
                setFormDescricaoCategoria('');
            }
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastros : Risco" nomeSessao="Cadastro de Categoria de Risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

                    <InternalArea>

                        <TextInput
                            maxLength="100"
                            nomeComponente="categoriarisco"
                            required
                            valorComponente={formCategoriaRisco}
                            valorLabel="Categoria de risco"
                            autoComplete="categoria"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite a categoria"
                            type='text'
                            onChange={handleCategoriaRisco}
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoCategoria}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            onChange={handleDescricao}
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

export default CriarRiscoCategoria;
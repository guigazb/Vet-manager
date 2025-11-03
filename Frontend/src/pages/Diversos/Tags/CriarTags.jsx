import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../../../data/routes';

import Actions from '../../../components/geral/Actions'
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import TextInput from '../../../components/textinput/TextInput';

import ButtonComponent from '../../../components/button/ButtonComponent';
import axios from 'axios';


const CriarTags = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.diversos_tags_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------
    const [formTag, setFormTag] = useState('');

    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------
    const handleTag = (e) => {
        setFormTag(e.target.value);
    };

  
    const formataTextTag = (text) => {

        if (!text || typeof text !== 'string') return '';

        // Remove espaços extras e divide em palavras
        const palavras = text.trim().split(/\s+/);

        if (palavras.length === 0) return '';

        // Primeira palavra com primeira letra maiúscula
        const primeiraPalavra = palavras[0].charAt(0).toUpperCase() + palavras[0].slice(1).toLowerCase();

        // Demais palavras com primeira letra maiúscula (camelCase)
        const camelCase = palavras.slice(1).map(word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join('');

        // Retorna a combinação (sem espaços)
        return primeiraPalavra + camelCase;
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const tagFormatada = formataTextTag(formTag);

        const novaTag = {
            nome: tagFormatada
        };

        let criacaoBemSucedida = false;

        try {
            const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_TAGS, novaTag);

            if (result.status === 201) {
                criacaoBemSucedida = true;
                toast.success("Tag salva com sucesso.");
            } else {
                toast.error('Erro ao tentar salvar a Tag');
            }
        } catch (error) {
            toast.error('Erro ao tentar salvar a Tag', error);
        }

        if (criacaoBemSucedida) {
            //Limpa todos os dados do formulário
            setFormTag('');
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Cadastro de Tags" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

                    <InternalArea>

                        <TextInput
                            maxLength="100"
                            nomeComponente="nometag"
                            required
                            valorComponente={formTag}
                            valorLabel="Tag"
                            autoComplete="nome da tag"
                            autofocus={true}
                            colSpan='3'
                            placeholder="Digite o nome da tag"
                            type='text'
                            onChange={handleTag}
                        />

                    </InternalArea>

                    <InternalButtonArea>
                        <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="sucesso">
                            Salvar Novo Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

            </React.Fragment>
        </MainLayout>
    );
}

export default CriarTags;
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../../data/routes';

import Actions from '../../../components/geral/Actions'
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import TextInput from '../../../components/textinput/TextInput';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';
import ButtonComponent from '../../../components/button/ButtonComponent';

import axios from 'axios';

import { useFetchTags } from '../../../hooks/diversos/useFetchTags';

function AtualizarTags() {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.diversos_tags_listar);
    }

    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { tags, loading: loadingTags } = useFetchTags(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------
    const [formTag, setFormTag] = useState(tags?.nome || '');
    const [formTagAtivo, setFormTagAtivo] = useState(tags?.ativo || '');

    useEffect(() => {
        if (tags && tags.nome !== undefined) {
            setFormTag(tags.nome);
        }
        if (tags && tags.ativo !== undefined) {
            setFormTagAtivo(tags.ativo);
        }
    }, [tags])

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
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const tagFormatada = formataTextTag(formTag);

        const tagAtualizada = {
            nome: tagFormatada,
            ativo: formTagAtivo
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_TAGS + '/' + id, tagAtualizada);

            if (result.status === 201) {
                atualizacaoBemSucedida = true;
                setAtualizarDesabilitado(true);

                toast.success("Tag atualizada com sucesso.", {
                    onClose: () => navegar(routes.diversos_tags_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar a Tag');
            }
        } catch (error) {
            toast.error('Erro ao tentar atualizar a Tag', error);
        }

        if (atualizacaoBemSucedida) {
            //Limpa todos os dados do formulário
            setFormTag('');
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Atualizar Tag" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingTags}>

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

                        <RadioButtonBooleanInput
                            valorComponente={formTagAtivo}
                            nomeComponenteAtivo="tag-ativo"
                            nomeComponenteInativo="tag-inativo"
                            onChange={setFormTagAtivo}
                            valorLabel="Tag ativa ?"
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingTags}>
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

export default AtualizarTags;
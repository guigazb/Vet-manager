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

import { useFetchRiscoCategoria } from '../../../../hooks/risco/useFetchRiscoCategoria';


const AtualizarRiscoCategoria = () => {

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
        navegar(routes.risco_categoria_risco_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoCategoria, loading: loadingRiscoCategoria } = useFetchRiscoCategoria(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------
    const [formCategoriaRisco, setFormCategoriaRisco] = useState(riscoCategoria?.nome || '');
    const [formDescricaoCategoria, setFormDescricaoCategoria] = useState(riscoCategoria?.descricao || '');
    const [formCategoriaAtivo, setFormCategoriaAtivo] = useState(riscoCategoria?.ativo || '');

    useEffect(() => {
        // alert(JSON.stringify(unidadeFuncionalTipo));
        if (riscoCategoria && riscoCategoria.nome !== undefined) {
            setFormCategoriaRisco(riscoCategoria.nome);
        }
        if (riscoCategoria && riscoCategoria.descricao !== undefined) {
            setFormDescricaoCategoria(riscoCategoria.descricao);
        }
        if (riscoCategoria && riscoCategoria.ativo !== undefined) {
            setFormCategoriaAtivo(riscoCategoria.ativo);
        }
    }, [riscoCategoria])


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
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const categoriaRiscoAtualizada = {
            nome: formCategoriaRisco,
            descricao: formDescricaoCategoria,
            ativo: formCategoriaAtivo
        };

        try {
            await axios.put(urlBackend + '/risco/categoria/' + id, categoriaRiscoAtualizada);

            //Limpa todos os dados do formulário
            setFormCategoriaRisco('');
            setFormDescricaoCategoria('');
            setFormCategoriaAtivo('');

            setAtualizarDesabilitado(true);

            toast.success("Categoria de risco atualizada com sucesso.", {
                onClose: () => navegar(routes.risco_categoria_risco_listar)
            });

        } catch (error) {
            toast.error('Erro ao tentar atualizar a Categoria de risco`', error);
        }
    };


    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastros : Risco" nomeSessao="Atualizar Categoria de Risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingRiscoCategoria}>

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


                        <RadioButtonBooleanInput
                            valorComponente={formCategoriaAtivo}
                            nomeComponenteAtivo="categoria-ativo"
                            nomeComponenteInativo="categoria-inativo"
                            onChange={setFormCategoriaAtivo}
                            valorLabel="Categoria ativa ?"
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingRiscoCategoria}>
                        <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
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

export default AtualizarRiscoCategoria;
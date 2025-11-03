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

const CriarPerfil = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.diversos_perfil_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [formNomePerfil, setFormNomePerfil] = useState('');
    const [formDescricao, setFormDescricao] = useState('');

    // ----------------------------------------------------------------------------------------------
    // Handles de componentes do formulário
    // ----------------------------------------------------------------------------------------------
    const handleNomePerfil = (e) => {
        setFormNomePerfil(e.target.value);
    };

    const handleDescricao = (e) => {
        setFormDescricao(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novoPerfil = {
            nome: formNomePerfil,
            descricao: formDescricao
        };

        let criacaoBemSucedida = false;

        try {
            const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PERFIL, novoPerfil);

            if (result.status === 201) {
                criacaoBemSucedida = true
                toast.success("Perfil salvo com sucesso.");
            } else {
                toast.error('Erro ao tentar salvar o Perfil');
            }
        } catch (error) {
            toast.error('Erro ao tentar salvar o Perfil`', error);
        }

        if (criacaoBemSucedida) {
            //Limpa todos os dados do formulário
            setFormNomePerfil('');
            setFormDescricao('');
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Cadastro de Perfil" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

                    <InternalArea>

                        <TextInput
                            maxLength="50"
                            nomeComponente="nomeperfil"
                            required
                            valorComponente={formNomePerfil}
                            valorLabel="Perfil"
                            autoComplete="nome do perfil"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o nome do perfil"
                            type='text'
                            onChange={handleNomePerfil}
                        />

                        <TextInput
                            maxLength="512"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricao}
                            valorLabel="Descrição"
                            autoComplete="descricao"
                            autofocus={false}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite a descricao"
                            type='text'
                            onChange={handleDescricao}
                        />

                    </InternalArea>

                    <InternalButtonArea>
                        <ButtonComponent tipo="cancelar" tipoBotao='button' onClick={handleNavegacaoPaginaAnterior}>
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

export default CriarPerfil;
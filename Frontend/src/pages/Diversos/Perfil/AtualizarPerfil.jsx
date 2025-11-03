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

import { useFetchPerfis } from '../../../hooks/diversos/useFetchPerfis';

const AtualizarPerfil = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.diversos_perfil_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { perfis, loading: loadingPerfis } = useFetchPerfis(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------
    const [formNomePerfil, setFormNomePerfil] = useState(perfis?.nome || '');
    const [formDescricao, setFormDescricao] = useState(perfis?.descricao || '');
    const [formAtivo, setFormAtivo] = useState(perfis?.ativo || '');

    useEffect(() => {
        if (perfis && perfis.nome !== undefined) {
            setFormNomePerfil(perfis.nome);
        }
        if (perfis && perfis.descricao !== undefined) {
            setFormDescricao(perfis.descricao);
        }
        if (perfis && perfis.ativo !== undefined) {
            setFormAtivo(perfis.ativo);
        }
    }, [perfis])

    // ----------------------------------------------------------------------------------------------
    // Handle de componentes de formulário
    // ----------------------------------------------------------------------------------------------
    const handleNomePerfilChange = (e) => {
        setFormNomePerfil(e.target.value);
    };

    const handleDescricaochange = (e) => {
        setFormDescricao(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setAtualizarDesabilitado(false);

        const unidadeFuncionalAtualizada = {
            nome: formNomePerfil,
            descricao: formDescricao,
            ativo: formAtivo
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PERFIL + "/" + id, unidadeFuncionalAtualizada);

            if (result.status === 201) {
                atualizacaoBemSucedida = false;
                setAtualizarDesabilitado(true);

                toast.success("Perfil atualizado com sucesso.", {
                    onClose: () => navegar(routes.diversos_perfil_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar o Perfil');
            }
        } catch (error) {
            toast.error('Erro ao tentar atualizar o Perfil', error);
        }

        if (atualizacaoBemSucedida) {
            //Limpa todos os dados do formulário
            setFormNomePerfil('');
            setFormDescricao('');
            setFormAtivo('');
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Atualizar Perfil" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingPerfis}>

                        <TextInput
                            maxLength="50"
                            nomeComponente="nomeperfil"
                            required
                            valorComponente={formNomePerfil}
                            valorLabel="Perfil"
                            autoComplete="nome do perfil"
                            autofocus={true}
                            colSpan='3'
                            placeholder="Digite o nome do perfil"
                            type='text'
                            onChange={handleNomePerfilChange}
                        />

                        <TextInput
                            maxLength="512"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricao}
                            valorLabel="Descrição"
                            autoComplete="descricao"
                            autofocus={true}
                            colSpan='3'
                            placeholder="Digite a descricao"
                            type='text'
                            onChange={handleDescricaochange}
                        />

                        <RadioButtonBooleanInput
                            valorLabel="Perfil ativo ?"
                            valorComponente={formAtivo}
                            nomeComponenteAtivo="perfil-ativo"
                            nomeComponenteInativo="perfil-inativo"
                            onChange={setFormAtivo}
                            col_span='1'
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingPerfis}>
                        <ButtonComponent tipo="cancelar" tipoBotao='button' onClick={handleNavegacaoPaginaAnterior}>
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

export default AtualizarPerfil;
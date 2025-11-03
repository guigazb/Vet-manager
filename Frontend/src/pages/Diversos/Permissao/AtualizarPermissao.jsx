import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../../data/routes';

import Actions from '../../../components/geral/Actions'
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import TextInput from '../../../components/textinput/TextInput';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';
import ButtonComponent from '../../../components/button/ButtonComponent';

import axios from 'axios';

import { useFetchPermissaoGrupo } from '../../../hooks/diversos/useFetchPermissaoGrupo';
import { useFetchPermissao } from '../../../hooks/diversos/useFetchPermissao';

const AtualizarPermissao = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.diversos_permissao_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { permissoes, loading: loadingPermissoes } = useFetchPermissao(id);
    const { permissaoGrupo, loading: loadingPermissaoGrupo } = useFetchPermissaoGrupo();

    // ----------------------------------------------------------------------------------------------
    // Variaveis de Formulário
    // ----------------------------------------------------------------------------------------------
    const [formNomePermissao, setFormNomePermissao] = useState(permissoes?.nome || '');
    const [formRota, setFormRota] = useState(permissoes?.rota || '');
    const [formGrupoPermissaoId, setFormGrupoPermissaoId] = useState(permissoes?.grupo_id || '');
    const [formPermissaoAtiva, setFormPermissaoAtiva] = useState(permissoes?.ativo || '');
    const [formVisivelMenu, setFormVisivelMenu] = useState(permissoes?.visivel_menu || false);
    const [formNomeMenu, setFormNomeMenu] = useState(permissoes?.nome_menu || '');
    const [formOrdemMenu, setFormOrdemMenu] = useState(permissoes?.ordem || '');

    useEffect(() => {
        if (permissoes && permissoes.nome !== undefined) {
            setFormNomePermissao(permissoes.nome);
        }
        if (permissoes && permissoes.rota !== undefined) {
            setFormRota(permissoes.rota);
        }
        if (permissoes && permissoes.grupo_id !== undefined) {
            setFormGrupoPermissaoId(permissoes.grupo_id);
        }
        if (permissoes && permissoes.ativo !== undefined) {
            setFormPermissaoAtiva(permissoes.ativo);
        }
        if (permissoes && permissoes.nome_menu !== undefined) {
            setFormNomeMenu(permissoes.nome_menu);
        }
        if (permissoes && permissoes.ordem !== undefined) {
            setFormOrdemMenu(permissoes.ordem);
        }
    }, [permissoes])

    // ----------------------------------------------------------------------------------------------
    // Handle de componentes de formulário
    // ----------------------------------------------------------------------------------------------
    const handleFormNomePermissao = (e) => {
        setFormNomePermissao(e.target.value);
    };

    const handleFormRota = (e) => {
        setFormRota(e.target.value);
    };

    const handleFormNomeMenu = (e) => {
        setFormNomeMenu(e.target.value);
    };

    const handleFormOrdemMenu = (e) => {
        setFormOrdemMenu(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const permissaoAtualizada = {
            nome: formNomePermissao,
            rota: formRota,
            grupo_id: formGrupoPermissaoId,
            visivel_menu: formVisivelMenu,
            nome_menu: formNomeMenu,
            ordem: formOrdemMenu,
            ativo: formPermissaoAtiva
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PERMISSAO + '/' + id, permissaoAtualizada);

            if (result.status === 201) {
                atualizacaoBemSucedida = true;
                setAtualizarDesabilitado(true);

                toast.success("Permissão atualizada com sucesso.", {
                    onClose: () => navegar(routes.diversos_permissao_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar a Permissão');
            }

        } catch (error) {
            toast.error('Erro ao tentar atualizar a Permissão', error);
        }

        if (atualizacaoBemSucedida) {
            //Limpa todos os dados do formulário
            setFormNomePermissao("");
            setFormRota("");
            setFormGrupoPermissaoId("");
            setFormPermissaoAtiva("");
            setFormVisivelMenu(false);
            setFormNomeMenu("");
            setFormOrdemMenu("");
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Atualizar Permissão" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingPermissoes}>

                        <TextInput
                            maxLength="100"
                            nomeComponente="nomepermissao"
                            required
                            valorComponente={formNomePermissao}
                            valorLabel="Permissão"
                            autoComplete="nome da permissão"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o nome da permissão"
                            type='text'
                            onChange={handleFormNomePermissao}
                        />

                        <TextInput
                            maxLength="256"
                            nomeComponente="rotapermissao"
                            required
                            valorComponente={formRota}
                            valorLabel="Rota"
                            autoComplete="rota da permissão"
                            colSpan='3'
                            mt='2'
                            placeholder="Digite a rota da permissão"
                            type='text'
                            onChange={handleFormRota}
                        />

                        <SelectInputPadrao
                            label="Grupo Permissão"
                            options={permissaoGrupo}
                            optionKey="id"
                            optionValue="nome"
                            value={formGrupoPermissaoId}
                            onChange={setFormGrupoPermissaoId}
                            loading={loadingPermissaoGrupo}
                            nomeSelect="permissaoGrupo"
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formVisivelMenu}
                            nomeComponenteAtivo="visivel-ativo"
                            nomeComponenteInativo="visivel-inativo"
                            onChange={setFormVisivelMenu}
                            valorLabel="Visível no Menu?"
                        />

                        <TextInput
                            maxLength="22"
                            nomeComponente="nomemenu"
                            required
                            valorComponente={formNomeMenu}
                            valorLabel="Nome para exibição em Menu"
                            autoComplete="Nome para exibição em Menu"
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o nome para exibição em Menu"
                            type='text'
                            onChange={handleFormNomeMenu}
                        />

                        <TextInput
                            maxLength="3"
                            nomeComponente="ordem"
                            required
                            valorComponente={formOrdemMenu}
                            valorLabel="Ordem do Menu"
                            autoComplete="ordem menu"
                            colSpan='1'
                            mt='2'
                            type='text'
                            onChange={handleFormOrdemMenu}
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formPermissaoAtiva}
                            nomeComponenteAtivo="permissao-ativo"
                            nomeComponenteInativo="permissao-inativo"
                            onChange={setFormPermissaoAtiva}
                            valorLabel="Permissão ativa ?"
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingPermissoes}>
                        <ButtonComponent tipo="cancelar" tipoBotao='button' onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registro
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

export default AtualizarPermissao;
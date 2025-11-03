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

import { useFetchPermissaoGrupo } from '../../../hooks/diversos/useFetchPermissaoGrupo';

const AtualizarPermisaoGrupo = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.diversos_permissao_grupo_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { permissaoGrupo, loading: loadingPermissaoGrupo } = useFetchPermissaoGrupo(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------
    const [formNomeGrupo, setFormNomeGrupoPermissao] = useState(permissaoGrupo?.nome || '');
    const [formGrupoAtivo, setFormGrupoAtivo] = useState(permissaoGrupo?.ativo || '');
    const [formOrdemGrupo, setFormOrdemGrupo] = useState(permissaoGrupo?.ordem || '');

    useEffect(() => {
        if (permissaoGrupo && permissaoGrupo.nome !== undefined) {
            setFormNomeGrupoPermissao(permissaoGrupo.nome);
        }
        if (permissaoGrupo && permissaoGrupo.ativo !== undefined) {
            setFormGrupoAtivo(permissaoGrupo.ativo);
        }
        if (permissaoGrupo && permissaoGrupo.ordem !== undefined) {
            setFormOrdemGrupo(permissaoGrupo.ordem);
        }
    }, [permissaoGrupo])

    // ----------------------------------------------------------------------------------------------
    // Handle de componentes de formulário
    // ----------------------------------------------------------------------------------------------
    const handleNomeGrupoPermissao = (e) => {
        setFormNomeGrupoPermissao(e.target.value);
    };

    const handleOrdemGrupoPermissao = (e) => {
        setFormOrdemGrupo(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const grupoPermissaoAtualizada = {
            nome: formNomeGrupo,
            ordem: formOrdemGrupo,
            ativo: formGrupoAtivo
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PERMISSAO_GRUPO + '/' + id, grupoPermissaoAtualizada);

            if (result.status === 201) {
                atualizacaoBemSucedida = true;
                setAtualizarDesabilitado(true);
                toast.success("grupo de permissão atualizado com sucesso.", {
                    onClose: () => navegar(routes.diversos_permissao_grupo_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar o grupo de permissão');
            }
        } catch (error) {
            toast.error('Erro ao tentar atualizar o grupo de permissão', error);
        }

        if (atualizacaoBemSucedida) {
            //Limpa todos os dados do formulário
            setFormNomeGrupoPermissao("");
            setFormOrdemGrupo("");
            setFormGrupoAtivo("");
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Atualizar Grupo Permissão" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingPermissaoGrupo}>
                        <TextInput
                            maxLength="50"
                            nomeComponente="nomegrupopermissao"
                            required
                            valorComponente={formNomeGrupo}
                            valorLabel="Grupo de permissão"
                            autoComplete="nome grupo"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o nome do grupo"
                            type='text'
                            onChange={handleNomeGrupoPermissao}
                        />

                        <TextInput
                            maxLength="3"
                            nomeComponente="ordemgrupo"
                            required
                            valorComponente={formOrdemGrupo}
                            valorLabel="Ordem do Grupo"
                            autoComplete="ordem grupo"
                            colSpan='1'
                            mt='2'
                            type='text'
                            onChange={handleOrdemGrupoPermissao}
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formGrupoAtivo}
                            nomeComponenteAtivo="grupo-ativo"
                            nomeComponenteInativo="grupo-inativo"
                            onChange={setFormGrupoAtivo}
                            valorLabel="Grupo ativo ?"
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingPermissaoGrupo}>
                        <ButtonComponent tipo="cancelar" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="alerta" desabilitar={atualizarDesabilitado}>
                            Atualizar Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

            </React.Fragment>
        </MainLayout>
    );

}

export default AtualizarPermisaoGrupo;
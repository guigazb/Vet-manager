import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions';
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';
import TextInput from '../../../components/textinput/TextInput';
import ButtonComponent from '../../../components/button/ButtonComponent';
import routes from '../../../data/routes';
import { useFetchUsuario } from '../../../hooks/diversos/useFetchUsuario';

const ModificarSenha = () => {
    const location = useLocation();
    const { id } = location.state || {};
    const navigate = useNavigate();

    const { usuarios, loading: loadingUsuarios } = useFetchUsuario(id);

    // Estados para os campos de senha
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [novaSenhaRedigitada, setNovaSenhaRedigitada] = useState('');
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // Atualizar campos com dados do usuário
    useEffect(() => {
        if (usuarios) {
            // Os outros campos são apenas para exibição e já estão desabilitados
        }
    }, [usuarios]);

    // Handlers para os campos de senha
    const handleSenhaAtualChange = (e) => setSenhaAtual(e.target.value);
    const handleNovaSenhaChange = (e) => setNovaSenha(e.target.value);
    const handleNovaSenhaRedigitadaChange = (e) => setNovaSenhaRedigitada(e.target.value);

    // Handler para navegação
    const handleNavegacaoPaginaAnterior = () => {
        navigate(routes.diversos_usuario_listar);
    };

    // Handler para submissão do formulário
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        // Validação local
        if (novaSenha !== novaSenhaRedigitada) {
            toast.error('As novas senhas não coincidem.');
            return;
        }

        const dadosSenha = {
            senhaAntiga: senhaAtual,
            senhaNova: novaSenha,
            senhaRedigitada: novaSenhaRedigitada,
        };

        try {
            const result = await axios.put(
                `${import.meta.env.VITE_API_URL_BACKEND}${import.meta.env.VITE_API_URL_USUARIO}/${id}/atualizarsenha`,
                dadosSenha,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Inclui o token JWT
                    },
                }
            );

            if (result.status === 204) {
                setAtualizarDesabilitado(true);
                toast.success('Senha atualizada com sucesso.', {
                    onClose: () => navigate(routes.diversos_usuario_listar),
                });
            } else {
                toast.error('Erro ao tentar atualizar a senha.');
            }
        } catch (error) {
            toast.error(`Erro ao tentar atualizar a senha: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <MainLayout>
            <Actions
                breadcrumb="Início : Diversos"
                nomeSessao="Mudar Senha de Usuário"
                hasAddViewButton={false}
                hasFilter={false}
            />
            <FormPadrao onSubmit={handleUpdateSubmit}>
                <InternalArea loading={loadingUsuarios}>
                    <TextInput
                        nomeComponente="nomelogin"
                        type="text"
                        placeholder="Digite o nome de login usuário."
                        maxLength="50"
                        valorLabel="Nome de Login"
                        valorComponente={usuarios?.nome_login || ''}
                        autoComplete="nomeusuario"
                        colSpan="2"
                        mt="2"
                        desabilitado={true}
                    />
                    <TextInput
                        nomeComponente="nomeusuario"
                        type="text"
                        placeholder="Digite o nome completo do usuário."
                        maxLength="100"
                        valorLabel="Nome de Usuário"
                        valorComponente={usuarios?.nome || ''}
                        autoComplete="nomeusuario"
                        colSpan="4"
                        mt="2"
                        desabilitado={true}
                    />
                    <TextInput
                        nomeComponente="emailusuario"
                        type="text"
                        placeholder="Digite o e-mail do usuário."
                        maxLength="100"
                        valorLabel="E-mail de Usuário"
                        valorComponente={usuarios?.email || ''}
                        autoComplete="email"
                        colSpan="3"
                        mt="2"
                        desabilitado={true}
                    />
                    <TextInput
                        nomeComponente="senhaatual"
                        type="password"
                        placeholder="Digite a senha atual."
                        maxLength="255"
                        valorLabel="Senha Atual"
                        valorComponente={senhaAtual}
                        onChange={handleSenhaAtualChange}
                        autoComplete="current-password"
                        required
                        colSpan="3"
                        mt="2"
                        autofocus={true}
                    />
                    <TextInput
                        nomeComponente="novasenha"
                        type="password"
                        placeholder="Digite a nova senha."
                        maxLength="255"
                        valorLabel="Nova Senha"
                        valorComponente={novaSenha}
                        onChange={handleNovaSenhaChange}
                        autoComplete="new-password"
                        required
                        colSpan="3"
                        mt="2"
                    />
                    <TextInput
                        nomeComponente="novasenharedigitada"
                        type="password"
                        placeholder="Digite a nova senha redigitada."
                        maxLength="255"
                        valorLabel="Nova Senha Redigitada"
                        valorComponente={novaSenhaRedigitada}
                        onChange={handleNovaSenhaRedigitadaChange}
                        autoComplete="new-password"
                        required
                        colSpan="3"
                        mt="2"
                    />
                </InternalArea>
                <InternalButtonArea loading={loadingUsuarios}>
                    <ButtonComponent tipo="cancelar" onClick={handleNavegacaoPaginaAnterior}>
                        Retornar para Lista de Registros
                    </ButtonComponent>
                    <ButtonComponent tipo="alerta" desabilitado={atualizarDesabilitado}>
                        Atualizar Senha
                    </ButtonComponent>
                </InternalButtonArea>
            </FormPadrao>
        </MainLayout>
    );
};

export default ModificarSenha;
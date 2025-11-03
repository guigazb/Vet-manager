import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/utils/AuthContext';

import ButtonComponent from '../components/button/ButtonComponent';
import TextInput from '../components/textinput/TextInput';

function Login() {
    const [nomeLogin, setNomeLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!nomeLogin || !senha) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        setIsLoading(true);
        try {
            const sucesso = await login(nomeLogin, senha);
            if (sucesso) navigate('/');
        } catch (err) {
            const mensagemErro = err.response?.data?.mensagem || 'Erro ao fazer login. Verifique suas credenciais.';
            setError(mensagemErro);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Login - Gestão do Ciclo BPM</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">

                    <TextInput
                        maxLength="50"
                        nomeComponente="loginNome"
                        required
                        valorComponente={nomeLogin}
                        valorLabel="Nome de Login"
                        autoComplete="Nome de Login"
                        autofocus={true}
                        colSpan='3'
                        onChange={(e) => setNomeLogin(e.target.value)}
                        mt='2'
                        placeholder="Digite o nome de login do usuário"
                        type='text'
                    />

                </div>
                <div className="mb-4">

                    <TextInput
                        maxLength="50"
                        nomeComponente="senha"
                        required
                        valorComponente={senha}
                        valorLabel="Senha"
                        autoComplete="Senha"
                        colSpan='3'
                        onChange={(e) => setSenha(e.target.value)}
                        mt='2'
                        placeholder="Digite a senha do usuário"
                        type='password'
                    />

                </div>
                {error && (
                    <p className="text-red-500 text-center mb-4" aria-live="polite">{error}</p>
                )}

                <ButtonComponent tipo="primario" tipoBotao="submit" disabled={isLoading}>
                    {isLoading ? (
                        <span>
                            <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            </svg>
                            Tentando efetuar login...
                        </span>
                    ) : (
                        'Efetuar Login no Sistema'
                    )}
                </ButtonComponent>

            </form>
        </div>
    );
}

export default Login;
// src/components/utils/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL_BACKEND, // http://localhost:8001/api
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        // console.log('Token no localStorage:', token); // Log para depuração
        // console.log('URL da requisição:', config.url); // Log para depuração
        if (token && !config.url.endsWith(import.meta.env.VITE_API_URL_LOGIN)) {
            config.headers['Authorization'] = `Bearer ${token}`;
            // console.log('Header Authorization adicionado:', config.headers['Authorization']); // Log para confirmar
        } else {
            console.log('Token não adicionado. Motivo:', !token ? 'Token não existe' : 'Rota de login'); // Log para depuração
        }
        return config;
    },
    (error) => {
        console.error('Erro no interceptor:', error);
        return Promise.reject(error);
    }
);

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    // Função para verificar se o token está expirado
    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (error) {
            console.error('Erro ao decodificar token:', error);
            return true;
        }
    };

    // Carregar e validar token na inicialização
    useEffect(() => {
        const token = localStorage.getItem('token');
        // console.log('Token carregado na inicialização:', token); // Log para depuração
        if (token) {
            try {
                if (isTokenExpired(token)) {
                    logout();
                } else {
                    const decoded = jwtDecode(token);
                    setAuth(decoded);
                }
            } catch (error) {
                console.error('Erro ao processar token na inicialização:', error);
                localStorage.removeItem('token');
                setAuth(null);
            }
        }
        setLoading(false);
    }, []);

    // Monitorar expiração do token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !isTokenExpired(token)) {
            const decoded = jwtDecode(token);
            const timeToExpire = decoded.exp * 1000 - Date.now();
            const timeout = setTimeout(() => {
                logout();
            }, timeToExpire);
            return () => clearTimeout(timeout);
        }
    }, [auth]);

    const login = async (nomeLogin, senha) => {
        try {
            // console.log('Tentando login com:', { nomeLogin }); // Log para depuração
            // console.log('URL do login:', import.meta.env.VITE_API_URL_LOGIN); // Log para depuração
            // console.log('Base URL do axios:', import.meta.env.VITE_API_URL_BACKEND); // Log para depuração
            const response = await api.post(import.meta.env.VITE_API_URL_LOGIN, { nomeLogin, senha });
            // console.log('Resposta completa da API de login:', response); // Log para depuração
            // console.log('Dados da resposta:', response.data); // Log para depuração
            const { token } = response.data;
            if (!token) {
                throw new Error('Token não encontrado na resposta da API.');
            }
            // console.log('Token recebido no login:', token); // Log para confirmar
            localStorage.setItem('token', token);
            // console.log('Token salvo no localStorage:', localStorage.getItem('token')); // Log para confirmar
            const decoded = jwtDecode(token);
            // console.log('Token decodificado:', decoded); // Log para confirmar
            setAuth(decoded);
            return true;
        } catch (error) {
            console.error('Erro ao logar:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth(null);
        console.log('Logout realizado, token removido do localStorage');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
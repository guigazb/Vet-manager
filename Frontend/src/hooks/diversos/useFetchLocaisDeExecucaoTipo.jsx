import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchLocaisDeExecucaoTipo = () => {

    const [locaisExecucaoTipo, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_LOCAL_EXECUCAO_TIPO;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Tipos de Locais de Execução:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return { locaisExecucaoTipo, loading };
};

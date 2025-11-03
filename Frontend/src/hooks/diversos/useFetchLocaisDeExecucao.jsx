import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchLocaisDeExecucao = (idLocalExecucao = "") => {

    const [locais, setLocais] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_LOCAL_EXECUCAO + "/" + idLocalExecucao;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setLocais(response.data);
            } catch (error) {
                console.error('Erro ao buscar locais de execução:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idLocalExecucao]);

    return { locais, loading };
};

import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchProcesso = (processoId = "") => {
    const [processos, setDados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const URLFinal = `${import.meta.env.VITE_API_URL_BACKEND}${import.meta.env.VITE_API_URL_PROCESSO}/${processoId}`;
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Processos(s):', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [processoId]);

    return { processos, loading, error };
};

export default useFetchProcesso;
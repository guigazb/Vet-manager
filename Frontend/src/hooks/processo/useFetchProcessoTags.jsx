import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchProcessoTags = (idProcesso = "") => {

    const [tagsProcesso, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PROCESSO_TAGS + "/" + idProcesso;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar tags de processo:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idProcesso]);

    return { tagsProcesso, loading };
};

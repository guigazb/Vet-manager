import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoTags = (idRisco = "") => {

    const [tagsRisco, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_TAGS + "/" + idRisco;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar tags de risco:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idRisco]);

    return { tagsRisco, loading };
};

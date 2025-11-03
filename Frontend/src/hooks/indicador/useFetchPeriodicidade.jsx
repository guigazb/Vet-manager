import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchPeriodicidade = (idPeriodicidade = "") => {

    const [periodicidades, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_INDICADOR_PERIODICIDADE + "/" + idPeriodicidade;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Periodicidades do Indicador:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idPeriodicidade]);

    return { periodicidades, loading };
};

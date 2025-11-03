import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchIndicadoresPorProcesso = (processoId = "") => {

    const [indicadoresPorProcesso, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PROCESSO + "/" + processoId + "/indicadores"

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);

            } catch (error) {
                console.error('Erro ao buscar Indicadores(s) por Processo:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [processoId]);

    return { indicadoresPorProcesso, loading };
};

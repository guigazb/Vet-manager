import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchOportunidadesPorMatrizSwot = (swotId = "") => {

    const [oportunidadesSwot, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_MATRIZ_SWOT_DADOS + "/" + swotId + "/oportunidades"

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);

            } catch (error) {
                console.error('Erro ao buscar Oportunidade(s) da matriz swot:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [swotId]);

    return { oportunidadesSwot, loading };
};

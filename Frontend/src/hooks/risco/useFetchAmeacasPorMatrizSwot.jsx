import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchAmeacasPorMatrizSwot = (swotId = "") => {

    const [ameacasSwot, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_MATRIZ_SWOT_DADOS + "/" + swotId + "/ameacas"

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);

            } catch (error) {
                console.error('Erro ao buscar Ameaça(s) de matriz Swot:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [swotId]);

    return { ameacasSwot, loading };
};

import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoImpacto = (idimpacto = "") => {

    const [riscoImpacto, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_IMPACTO + "/" + idimpacto;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Impacto(s) de Risco:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idimpacto]);

    return { riscoImpacto, loading };
};

export default useFetchRiscoImpacto;
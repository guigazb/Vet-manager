import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoNivelReal = (idNivel = "") => {

    const [riscoNivelReal, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_NIVEL_REAL + "/" + idNivel;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Nivel(is) Reais de Risco:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idNivel]);

    return { riscoNivelReal, loading };
};

export default useFetchRiscoNivelReal;
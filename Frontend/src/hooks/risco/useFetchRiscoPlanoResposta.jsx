import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoPlanoResposta = (idPlano = "") => {

    const [riscoPlanoResposta, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_PLANO_RESPOSTA + "/" + idPlano;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Plano(s) Resposta de risco:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idPlano]);

    return { riscoPlanoResposta, loading };
};

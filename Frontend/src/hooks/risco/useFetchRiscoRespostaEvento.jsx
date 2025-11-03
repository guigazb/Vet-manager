import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoRespostaEvento = (idRespostaEvento = "") => {

    const [riscoRespostaEvento, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_RESPOSTA_EVENTO_RISCO+ "/" + idRespostaEvento;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Respostas para Eventos de risco:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idRespostaEvento]);

    return { riscoRespostaEvento, loading };
};

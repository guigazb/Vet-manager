import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchRiscoAvaliacaoProbImpListaPorProcesso = (processoId) => {
    const [riscosPorProcesso, setRiscos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PROCESSO + "/" + processoId + "/avaliacaoprobabilidadeimpacto/"

    useEffect(() => {
        const fetchRiscos = async () => {
            try {
                setLoading(true);

                const response = await axios.get(URLFinal);
                if (!Array.isArray(response.data)) {
                    throw new Error('Resposta da API não é um array');
                }
                setRiscos(response.data);
                setError(null);
            } catch (err) {
                setError(err.message || 'Erro ao buscar riscos');
            } finally {
                setLoading(false);
            }
        };

        if (processoId) {
            fetchRiscos();
        }
    }, [processoId]);

    return { riscosPorProcesso, loading, error };
};

export default useFetchRiscoAvaliacaoProbImpListaPorProcesso;
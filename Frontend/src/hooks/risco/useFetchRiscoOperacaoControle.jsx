import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoOperacaoControle = (idOperacao = "") => {

    const [riscoOperacaoControle, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_OPERACAO_CONTROLE + "/" + idOperacao;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Operação(ões) Controle de Risco:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idOperacao]);

    return { riscoOperacaoControle, loading };
};

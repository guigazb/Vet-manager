import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoPlanoRespostaAcao = (idPlanoRespostaAcao = "") => {

    const [riscoPlanoRespostaAcao, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_PLANO_RESPOSTA_ACAO + "/" + idPlanoRespostaAcao;

    useEffect(() => {

        if (!idPlanoRespostaAcao || idPlanoRespostaAcao === "0") {
            setDados([]);
            setLoading(false);
            return;
        }

        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Plano Resposta Ação de Risco:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idPlanoRespostaAcao]);

    return { riscoPlanoRespostaAcao, loading };
};

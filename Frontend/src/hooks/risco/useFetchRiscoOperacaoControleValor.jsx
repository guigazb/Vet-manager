import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoOperacaoControleValor = (idRiscoOperacaoControle = "0") => {

    const [riscoOperacaoControleValor, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!idRiscoOperacaoControle || idRiscoOperacaoControle === "0") {
            setDados([]);
            setLoading(false);
            return;
        }

        const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_OPERACAO_CONTROLE + "/" + idRiscoOperacaoControle + "/valor-operacao";

        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Valor do Risco Desenho Controle de Risco:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idRiscoOperacaoControle]);

    return { riscoOperacaoControleValor, loading };
};

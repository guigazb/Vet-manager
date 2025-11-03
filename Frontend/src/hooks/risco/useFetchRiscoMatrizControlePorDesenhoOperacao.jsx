// Em useFetchRiscoMatrizControlePorDesenhoOperacao.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoMatrizControlePorDesenhoOperacao = (valorDesenhoControle = "0", valorOperacaoControle = "0") => {
    const [riscoMatrizControlePorDesenhoOperacao, setDados] = useState(null); // Alterar para null
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!valorDesenhoControle || valorDesenhoControle === "0" || !valorOperacaoControle || valorOperacaoControle === "0") {
            setDados(null);
            setLoading(false);
            return;
        }

        const URLFinal = `${import.meta.env.VITE_API_URL_BACKEND}${import.meta.env.VITE_API_URL_RISCO_MATRIZ_CONTROLE}/${valorDesenhoControle}/${valorOperacaoControle}`;

        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                // Assumindo que a API retorna um único objeto ou um array com um único objeto
                const data = Array.isArray(response.data) ? response.data[0] : response.data;
                setDados(data || null);
            } catch (error) {
                console.error('Erro ao buscar Matriz Controle de Risco:', error);
                setDados(null);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [valorDesenhoControle, valorOperacaoControle]);

    return { riscoMatrizControlePorDesenhoOperacao, loading };
};
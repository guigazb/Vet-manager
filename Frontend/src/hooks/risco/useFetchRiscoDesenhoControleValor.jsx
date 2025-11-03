import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoDesenhoControleValor = (idRiscoDesenhoControle = "0") => {

    const [riscoDesenhoControleValor, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!idRiscoDesenhoControle || idRiscoDesenhoControle === "0") {
            setDados([]);
            setLoading(false);
            return;
        }

        const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_DESENHO_CONTROLE + "/" + idRiscoDesenhoControle + "/valor-desenho";

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
    }, [idRiscoDesenhoControle]);

    return { riscoDesenhoControleValor, loading };
};

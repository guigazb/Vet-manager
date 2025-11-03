import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoDesenhoControle = (idRiscoDesenhoControle = "") => {

    const [riscoDesenhoControle, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_DESENHO_CONTROLE + "/" + idRiscoDesenhoControle;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Risco Desenho Controle de Risco:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idRiscoDesenhoControle]);

    return { riscoDesenhoControle, loading };
};

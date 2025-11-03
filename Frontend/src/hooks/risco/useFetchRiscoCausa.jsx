import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoCausa = (idCausa = "",grid = false) => {

    const [riscoCausa, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    let URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_CAUSA + "/" + idCausa;

    if (idCausa && grid) {
        URLFinal += "/grid";
    }

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Causas de risco:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idCausa]);

    return { riscoCausa, loading };
};

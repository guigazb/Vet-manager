import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoCategoria = (idCategoria = "") => {

    const [riscoCategoria, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_CATEGORIA + "/" + idCategoria;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Categoria(s) de Risco:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idCategoria]);

    return { riscoCategoria, loading };
};

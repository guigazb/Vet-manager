import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchEstados = () => {

    const [estados, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_ESTADO;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Estados:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return { estados, loading };
};

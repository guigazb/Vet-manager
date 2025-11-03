import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchFerramentaSistema = (ferramentaSistemaId = "") => {

    const [ferramentaSistema, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_FERRAMENTA_SISTEMA + "/" + ferramentaSistemaId;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Ferramenta(s) de Sistema:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [ferramentaSistemaId]);

    return { ferramentaSistema, loading };
};

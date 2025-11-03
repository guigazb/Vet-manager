import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoControleExistente = (idControleExistente = "", grid = false) => {

    const [controleExistente, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    let URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_CONTROLES_EXISTENTES + "/" + idControleExistente;
    
    if (idControleExistente && grid) {
        URLFinal += "/grid";
    }

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Controle Existenet:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idControleExistente]);

    return { controleExistente, loading };
};

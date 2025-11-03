import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchPolaridade = (idPolaridade = "") => {

    const [polaridades, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_INDICADOR_POLARIDADE + "/" + idPolaridade;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Polaridades do Indicador:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idPolaridade]);

    return { polaridades, loading };
};

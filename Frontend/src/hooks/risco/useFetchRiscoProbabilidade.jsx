import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoProbabilidade = (idProbabilidade = "") => {

    const [riscoProbabilidade, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_PROBABILIDADE + "/" + idProbabilidade;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Probalidadade(s) de Risco:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idProbabilidade]);

    return { riscoProbabilidade, loading };
};

export default useFetchRiscoProbabilidade;
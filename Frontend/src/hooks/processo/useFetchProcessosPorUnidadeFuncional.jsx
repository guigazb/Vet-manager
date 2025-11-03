import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchProcessosPorUnidadeFuncional = (unidadeFuncionalId = "") => {

    const [processos, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_UNIDADE_FUNCIONAL + "/" + unidadeFuncionalId + "/processos"

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);

            } catch (error) {
                console.error('Erro ao buscar Processos(s) por Unidade Funcional:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [unidadeFuncionalId]);

    return { processos, loading };
};

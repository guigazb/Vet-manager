import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchUnidadeFuncionalFiltrado = (nome, localExecucaoId) => {
    const [unidadeFuncionalFiltrada, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_UNIDADE_FUNCIONAL;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(URLFinal);
                let filteredData = response.data;

                if (nome) {
                    filteredData = filteredData.filter(item => item.nome.includes(nome));
                }

                if (localExecucaoId) {
                    filteredData = filteredData.filter(item => item.local_execucao_id === localExecucaoId);
                }

                setData(filteredData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [nome, localExecucaoId]);

    return { unidadeFuncionalFiltrada, loading, error };
};
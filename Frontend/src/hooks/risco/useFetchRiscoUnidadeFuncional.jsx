import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoUnidadeFuncional = (idUnidadeFuncional = "") => {

    const [riscoUnidadesFuncionais, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO + import.meta.env.VITE_API_URL_RISCO_UNIDADE_FUNCIONAL + "/" + idUnidadeFuncional;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Riscos da Unidade Funcional:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idUnidadeFuncional]);

    return { riscoUnidadesFuncionais, loading };
};

export default useFetchRiscoUnidadeFuncional;
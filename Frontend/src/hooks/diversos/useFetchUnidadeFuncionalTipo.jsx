import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchUnidadeFuncionalTipo = (idUnidadeFuncionalTipo = "") => {

    const [unidadeFuncionalTipo, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_UNIDADE_FUNCIONAL_TIPO + "/" + idUnidadeFuncionalTipo;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Tipo(s) de Unidade Funcional:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idUnidadeFuncionalTipo]);

    return { unidadeFuncionalTipo, loading };
};

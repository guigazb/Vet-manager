import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchPermissao = (permissaoId = "") => {

    const [permissoes, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PERMISSAO + "/" + permissaoId;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Permissão(ões):', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [permissaoId]);

    return { permissoes, loading };
};

import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchCidades = (estadoId) => {

    const [cidades, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!estadoId || estadoId === "0") {
            setDados([]);
            setLoading(false);
            return;
        }

        const URLFinal =
            import.meta.env.VITE_API_URL_BACKEND +
            import.meta.env.VITE_API_URL_ESTADO + "/" +
            estadoId +
            import.meta.env.VITE_API_URL_CIDADE_POR_ESTADO + "/";

        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Cidades:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [estadoId]);

    return { cidades, loading };
};

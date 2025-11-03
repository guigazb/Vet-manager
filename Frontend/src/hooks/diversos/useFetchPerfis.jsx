import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchPerfis = (idPerfil = "") => {

    const [perfis, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PERFIL + "/" + idPerfil;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Perfis:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idPerfil]);

    return { perfis, loading };
};

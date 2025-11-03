import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchUsuario = (usuarioId = "") => {

    const [usuarios, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_USUARIO + "/" + usuarioId;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Usuario(s):', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [usuarioId]);

    return { usuarios, loading };
};

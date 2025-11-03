import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchPermissaoGrupo = (idPermissaoGrupo = "") => {

    const [permissaoGrupo, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_PERMISSAO_GRUPO + "/" + idPermissaoGrupo;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Permissões de Grupo:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idPermissaoGrupo]);

    return { permissaoGrupo, loading };
};

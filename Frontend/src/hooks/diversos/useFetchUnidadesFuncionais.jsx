import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchUnidadesFuncionais = (unidadeFuncionalId = "") => {
    const [unidades, setUnidades] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const URLFinal =
            import.meta.env.VITE_API_URL_BACKEND +
            import.meta.env.VITE_API_URL_UNIDADE_FUNCIONAL + "/" +
            unidadeFuncionalId

        const fetchUnidades = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setUnidades(response.data);
            } catch (error) {
                console.error('Erro ao buscar Unidades Funcionais:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUnidades();
    }, [unidadeFuncionalId]);

    return { unidades, loading };
};

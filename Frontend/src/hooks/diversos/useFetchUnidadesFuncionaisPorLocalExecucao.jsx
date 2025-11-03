import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchUnidadesFuncionaisPorLocalExecucao = (localExecucaoId = "") => {
    const [unidadesPorLocalExecucao, setUnidades] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!localExecucaoId) {
            setUnidades([]);
            return;
        }

        const URLFinal =
            import.meta.env.VITE_API_URL_BACKEND +
            import.meta.env.VITE_API_URL_LOCAL_EXECUCAO + "/" +
            localExecucaoId + "/" +
            import.meta.env.VITE_API_URL_UNIDADE_FUNCIONAL_POR_LOCAL_EXECUCAO + '?sortCampo=unidade_funcional_nome&sortOrdem=ASC';

        const fetchUnidades = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setUnidades(response.data);
            } catch (error) {
                console.error('Erro ao buscar Unidades Funcionais por Local de Execução:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUnidades();
    }, [localExecucaoId]);

    return { unidadesPorLocalExecucao, loading };
};

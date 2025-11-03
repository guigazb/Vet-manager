import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoTabelaPeriodica = (idTabelaPeriodica = "") => {

    const [tabelaPeriodica, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_TABELA_PERIODICA + "/" + idTabelaPeriodica + "/dados";

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar tabela periodica: ', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idTabelaPeriodica]);

    return { tabelaPeriodica, loading };
};

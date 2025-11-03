import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRiscoConsequencia = (idConsequencia = "", grid = false) => {

    const [riscoConsequencia, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    let URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_CONSEQUENCIA + "/" + idConsequencia;
    
    if (idConsequencia && grid) {
        URLFinal += "/grid";
    }

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Consequencias de risco:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idConsequencia]);

    return { riscoConsequencia, loading };
};

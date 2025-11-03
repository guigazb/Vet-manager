import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchDocumentoNormativoTipo = (idDocumentoNormativoTipo = "") => {

    const [documentosNormativosTipo, setDocumentoNormativoTipo] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_DOCUMENTO_NORMATIVO_TIPO + "/" + idDocumentoNormativoTipo;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDocumentoNormativoTipo(response.data);
            } catch (error) {
                console.error('Erro ao buscar Tipos de Documentos Normativos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [idDocumentoNormativoTipo]);

    return { documentosNormativosTipo, loading };
};

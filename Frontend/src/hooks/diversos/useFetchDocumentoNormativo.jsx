import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchDocumentoNormativo = (documentoNormativoId = "") => {

    const [documentosNormativos, setDados] = useState([]);
    const [loading, setLoading] = useState(false);

    const URLFinal = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_DOCUMENTO_NORMATIVO + "/" + documentoNormativoId;

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await axios.get(URLFinal);
                setDados(response.data);
            } catch (error) {
                console.error('Erro ao buscar Documento(s) Normativos(s):', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [documentoNormativoId]);

    return { documentosNormativos, loading };
};

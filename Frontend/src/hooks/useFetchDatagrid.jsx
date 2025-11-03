import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchDatagrid = (URLBackend, refetchTrigger) => {
    const [linhas, setLinhas] = useState([]);
    const [colunas, setColunas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(URLBackend);

                // Tenta extrair linhas e colunas
                const data = response.data?.result ||
                    response.data ||
                    response;

                // Certifica que as linhas são um array
                const rows = Array.isArray(data) ? data :
                    Array.isArray(data.rows) ? data.rows :
                        [];

                const columns = data.columns || Object.keys(rows[0] || {}).map(key => ({
                    field: key,
                    headerName: key,
                    width: 200
                }));

                setLinhas(rows.map((row, index) => ({
                    ...row,
                    id: row.id || index
                })));
                setColunas(columns);

            } catch (err) {
                console.error('Fetch error:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [URLBackend, refetchTrigger]);

    return { linhas, colunas, loading, error };
};
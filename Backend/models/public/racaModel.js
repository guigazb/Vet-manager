import pool from '../../db.js';

export const getTodasTags = async (sortCampo, sortOrdem) => {
    const result = await pool.query(`
        SELECT * FROM public.tags where ativo = true ORDER BY ${sortCampo} ${sortOrdem}
    `);
    return result.rows;
};

export const getTagPorId = async (id) => {
    const result = await pool.query('SELECT * FROM public.tags WHERE id = $1', [id]);
    return result.rows[0];
};

export const getTodasTagsParaDatagrid = async () => {

    const result = await pool.query(`
        SELECT COALESCE(
            json_agg(row_to_json(p)), 
            '[]'::json
        ) as resultados
        FROM (
            SELECT
                pt.id as "ID",
                pt.nome as "Tag"
            FROM public.tags pt
            WHERE 
                pt.ativo = true
                ORDER BY pt.nome
        ) AS p;
    `, []);

    // Extraia o array excluindo o nó inicial resultados.
    const registros = result.rows[0]?.resultados || [];

    return registros;
}

export const getTodasTagsParaDatagridMUI = async () => {

  const result = await pool.query(`
    WITH table_data AS (
        SELECT *
            FROM (
                SELECT DISTINCT ON (pt.id)
                   pt.id as "ID",
                   pt.nome as "Tag"
            	FROM public.tags pt
           	 	WHERE pt.ativo = true
                GROUP BY 
                   pt.id, pt.nome
                ORDER BY 
                    pt.id, pt.nome
        ) 
            subquery
          ORDER BY 
              "Tag"
    ),
    column_info AS (
        SELECT 
            column_name,
            data_type,
            COALESCE(character_maximum_length, 20) AS character_maximum_length
        FROM (
            VALUES 
                ('ID', 'integer', NULL),
                ('Tag', 'text', 30)
        ) AS custom_columns(column_name, data_type, character_maximum_length)
    )
    SELECT 
        json_build_object(
            'rows', (
                SELECT json_agg(row_to_json(table_data))
                FROM table_data
            ),
            'columns', (
                SELECT json_agg(
                    json_build_object(
                        'field', column_name,
                        'headerName', column_name,
                        'width', character_maximum_length * 5,
                        'type', CASE 
                            WHEN data_type IN ('integer', 'bigint', 'smallint') THEN 'number'
                            WHEN data_type IN ('timestamp', 'date') THEN 'date'
                            ELSE 'string'
                        END
                    )
                )
                FROM column_info
            )
        ) as result;
  `);

  //return result;
  return result.rows[0]?.result || { rows: [], columns: [] };

}

export const inserirTag = async (nome) => {
    const result = await pool.query(`
        INSERT INTO 
            public.tags
            (nome,ativo) 
        VALUES 
            ($1, true) 
        RETURNING *`,
        [nome]
    );
    return result.rows[0];
};

export const atualizarTag = async (id, nome, ativo) => {
    const result = await pool.query(`
        UPDATE 
            public.tags
        SET 
            nome = $1, 
            ativo = $2
        WHERE id = $3
        RETURNING *`,
        [nome, ativo, id]
    );
    return result.rows[0];
};

export const excluirTag = async (id) => {
    const result = await pool.query(`
        SELECT public.delete_tag_logically($1);`,
        [id]);
    return result.rows[0];
};
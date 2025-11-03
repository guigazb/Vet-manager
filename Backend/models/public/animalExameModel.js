import pool from '../../db.js';

export const getTodosExamesAnimal = async (sortCampo, sortOrdem) => {
  const result = await pool.query(`
    SELECT * FROM public.animal_exame ORDER BY ${sortCampo} ${sortOrdem}`);
  return result.rows;
};

export const getTodosExamesAnimalParaDataGrid = async () => {

  const result = await pool.query(`
      SELECT COALESCE(
          json_agg(row_to_json(p)), 
          '[]'::json
      ) as resultados
      FROM (
          SELECT
	              dn.id as "ID",
	              dn.nome_normativo as "Normativo",
	              dn.data_publicacao as "Data de publicação",
				  dn.ano_publicacao as "Ano de Publicação",
	              tn.tipo_normativo as "Tipo"				        
	          FROM public.documentos_normativos dn
	          LEFT JOIN public.tipo_normativo tn ON tn.id = dn.tipo_normativo_id
	          WHERE 
	              dn.ativo = true
			      ORDER BY dn.nome_normativo
      ) AS p;
  `, []);

  // Extraia o array excluindo o nó inicial resultados.
  const registros = result.rows[0]?.resultados || [];

  return registros;
}

export const getExamesAnimalParaDatagridMUI = async () => {

  const result = await pool.query(`
    WITH table_data AS (
        SELECT *
            FROM (
                SELECT DISTINCT ON (dn.id)
                 dn.id as "ID",
	                dn.nome_normativo as "Normativo",
	                TO_CHAR(dn.data_publicacao AT TIME ZONE 'America/Fortaleza', 'DD/MM/YYYY') as "Data de Publicação",
				          dn.ano_publicacao as "Ano de Publicação",
	                tn.tipo_normativo as "Tipo"				        
	              FROM public.documentos_normativos dn
	              LEFT JOIN public.tipo_normativo tn ON tn.id = dn.tipo_normativo_id
	              WHERE 
	                dn.ativo = true
                GROUP BY 
                    dn.id, dn.nome_normativo, dn.data_publicacao, dn.ano_publicacao, tn.tipo_normativo
                ORDER BY 
                    dn.id, dn.nome_normativo
        ) 
            subquery
          ORDER BY 
              "Normativo"
    ),
    column_info AS (
        SELECT 
            column_name,
            data_type,
            COALESCE(character_maximum_length, 20) AS character_maximum_length
        FROM (
            VALUES 
                ('ID', 'integer', NULL),
                ('Normativo', 'text', 220),
                ('Data de Publicação', 'text', 80),
                ('Ano de Publicação', 'text', 50),
                ('Tipo', 'text', 100)
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
                        'width', character_maximum_length * 3,
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

export const getExameAnimalPorId = async (id) => {
  const result = await pool.query(`
    SELECT * FROM public.animal_exame WHERE id = $1`,
    [id]);
  return result.rows[0];
};

export const getExamesPorAnimalId = async (id) => {
  const result = await pool.query(`
    SELECT 
	    dn.id as documento_normativo_id, 
	    p.id as processo_id,
	    p.nome as processo_nome
    FROM public.documentos_normativos dn
    JOIN processo.rel_processo_normativo pn ON pn.normativo_id = dn.id
    JOIN processo.processos  p ON p.id = pn.processo_id
    WHERE dn.id = $1 AND dn.ativo = true AND p.ativo = true
    ORDER BY p.nome
    `,
    [id]);
  return result.rows;
};


export const excluirDocumentoNormativo = async (codigo_animal, codigo_exame) => {
  const result = await pool.query(
    `UPDATE 
        public.animal_exame
     SET 
        ativo = false 
     WHERE codigo_animal = $1 and codigo_exame = $2 RETURNING *`,
    [codigo_animal, codigo_exame]);
  return result.rows[0];
};
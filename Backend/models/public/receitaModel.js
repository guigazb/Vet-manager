import pool from '../../db.js';

export const getTiposDeNormativos = async (sortCampo, sortOrdem) => {
  const result = await pool.query(`
    SELECT * FROM TIPO_NORMATIVO where ativo = true ORDER BY ${sortCampo} ${sortOrdem}
  `);
  return result.rows;
};

export const getTodosTiposNormativosParaDataGrid = async () => {

  const result = await pool.query(`
      SELECT COALESCE(
          json_agg(row_to_json(p)), 
          '[]'::json
      ) as resultados
      FROM (
          SELECT
	              tn.id as "ID",
	              tn.tipo_normativo as "Tipo"	        
	          FROM public.tipo_normativo tn
	          WHERE 
	              tn.ativo = true
			      ORDER BY tn.tipo_normativo
      ) AS p;
  `, []);

  // Extraia o array excluindo o nó inicial resultados.
  const registros = result.rows[0]?.resultados || [];

  return registros;
}

export const getTodosTiposNormativosParaDatagridMUI = async () => {

  const result = await pool.query(`
    WITH table_data AS (
        SELECT *
            FROM (
                SELECT DISTINCT ON (tn.id)
                   tn.id as "ID",
	                 tn.tipo_normativo as "Tipo Normativo"	        
	          FROM public.tipo_normativo tn
	          WHERE 
	              tn.ativo = true
            GROUP BY 
                tn.id, tn.tipo_normativo
            ORDER BY 
                tn.id, tn.tipo_normativo
        ) 
            subquery
          ORDER BY 
              "Tipo Normativo"
    ),
    column_info AS (
        SELECT 
            column_name,
            data_type,
            COALESCE(character_maximum_length, 20) AS character_maximum_length
        FROM (
            VALUES 
                ('ID', 'integer', NULL),
                ('Tipo Normativo', 'text', 100)
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

export const getTipoDeNormativoPorId = async (id) => {
  const result = await pool.query(`SELECT * FROM TIPO_NORMATIVO WHERE id = $1`, [id]);
  return result.rows[0];
};

export const getDocumentosPorTipoDeNormativoId = async (id) => {
  const result = await pool.query(`
    SELECT * FROM documentos_normativos 
    WHERE tipo_normativo_id = $1 and ativo = true
    ORDER BY nome_normativo
  `, [id]);
  return result.rows;
};

export const inserirTipoNormativo = async (tipo_normativo) => {
  const result = await pool.query(
    `INSERT INTO 
        tipo_normativo (tipo_normativo,ativo) 
        VALUES ($1, $2) 
    RETURNING *`,
    [tipo_normativo, true]
  );
  return result.rows[0];
};

export const atualizarTipoNormativo = async (id, tipo_normativo, ativo) => {
  const result = await pool.query(
    `UPDATE 
        tipo_normativo 
      SET 
        tipo_normativo = $1, 
        ativo = $2 
      WHERE 
        id = $3 
     RETURNING *`,
    [tipo_normativo, ativo, id]
  );
  return result.rows[0];
};

export const excluirTipoNormativo = async (id) => {
  const result = await pool.query(
    `UPDATE 
        tipo_normativo 
      SET 
        ativo = false 
      WHERE id = $1 
     RETURNING *`,
    [id]);
  return result.rows[0];
};
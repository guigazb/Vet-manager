import pool from '../../db.js';

export const getTodosTiposDeUnidadeFuncionais = async (sortCampo, sortOrdem) => {
  const result = await pool.query(`
    SELECT * FROM public.unidade_funcional_tipo where ativo = true ORDER BY ${sortCampo} ${sortOrdem}
  `);
  return result.rows;
};

export const getTodosTiposDeUnidadesFuncionaisParaDatagrid = async () => {

  const result = await pool.query(`
      SELECT COALESCE(
          json_agg(row_to_json(p)), 
          '[]'::json
      ) as resultados
      FROM (
          SELECT
              uft.id as "ID",
			        uft.tipo as "Tipo"   
          FROM public.unidade_funcional_tipo uft
          WHERE 
              uft.ativo = true 
              ORDER BY uft.tipo
      ) AS p;
  `, []);

  // Extraia o array excluindo o nó inicial resultados.
  const registros = result.rows[0]?.resultados || [];

  return registros;
}


export const getTiposUnidadeFuncionalParaDatagridMUI = async () => {

  const result = await pool.query(`
    WITH table_data AS (
        SELECT *
            FROM (
                SELECT DISTINCT ON (uft.id)
                 uft.id as "ID",
			     uft.tipo as "Tipo"   
          FROM public.unidade_funcional_tipo uft
          WHERE 
              uft.ativo = true 
            GROUP BY 
                uft.id,  uft.tipo
            ORDER BY 
                uft.id, uft.tipo
        ) 
            subquery
          ORDER BY 
              "Tipo"
    ),
    column_info AS (
        SELECT 
            column_name,
            data_type,
            COALESCE(character_maximum_length, 20) AS character_maximum_length
        FROM (
            VALUES 
                ('ID', 'integer', NULL),
                ('Tipo', 'text', 50)
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

export const getTipoDeUnidadeFuncionalPorId = async (id) => {
  const result = await pool.query(`
    SELECT * FROM public.unidade_funcional_tipo WHERE id = $1
  `, [id]);
  return result.rows[0];
};

export const inserirTipoUnidadeFuncional = async (tipo) => {
  const result = await pool.query(`
    INSERT INTO 
        public.unidade_funcional_tipo
        (tipo, ativo)
    VALUES
        ($1, $2)
    RETURNING *`,
    [tipo, true]
  );
  return result.rows[0];
};

export const atualizarTipoUnidadeFuncional = async (id, tipo, ativo) => {
  const result = await pool.query(`
    UPDATE public.unidade_funcional_tipo
    SET 
        tipo = $1,
        ativo = $2
	WHERE 
        id = $3
    RETURNING *`,
    [tipo, ativo, id]
  );
  return result.rows[0];
};

export const excluirTipoUnidadeFuncional = async (id) => {
  const result = await pool.query(`
    UPDATE public.unidade_funcional_tipo
    SET 
        ativo = false
	WHERE 
        id = $1
    RETURNING *`,
    [id]);
  return result.rows[0];
};
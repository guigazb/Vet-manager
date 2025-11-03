import pool from '../../db.js';

export const getTodasFerramentasSistemas = async (sortCampo, sortOrdem) => {
  const result = await pool.query(`
    SELECT * FROM public.ferramenta_sistema where ativo = true ORDER BY ${sortCampo} ${sortOrdem}
  `);
  return result.rows;
};

export const getTodasFerramentaSistemaParaDatagrid = async () => {

  const result = await pool.query(`
      SELECT COALESCE(
          json_agg(row_to_json(p)), 
          '[]'::json
      ) as resultados
      FROM (
          SELECT
              f.id as "ID",
              f.nome as "Ferramenta Sistema"
          FROM public.ferramenta_sistema f
          
          WHERE 
              f.ativo = true
		      ORDER BY f.nome
      ) AS p;
  `, []);

  // Extraia o array excluindo o nó inicial resultados.
  const registros = result.rows[0]?.resultados || [];

  return registros;
}

export const getFerramentasDeSistemaParaDatagridMUI = async () => {

  const result = await pool.query(`
    WITH table_data AS (
        SELECT *
            FROM (
                SELECT DISTINCT ON (f.id)
                  f.id as "ID",
              f.nome as "Ferramenta Sistema"
          FROM public.ferramenta_sistema f
          WHERE 
              f.ativo = true
            GROUP BY 
			  f.id, f.nome
			ORDER BY 
                f.id, f.nome
        ) 
            subquery
          ORDER BY 
              "Ferramenta Sistema"
    ),
    column_info AS (
        SELECT 
            column_name,
            data_type,
            COALESCE(character_maximum_length, 20) AS character_maximum_length
        FROM (
            VALUES 
                ('ID', 'integer', NULL),
                ('Ferramenta Sistema', 'text', 180)
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

export const getTodasFerramentaSistemaCadastradosNoProcessoParaDatagridMUI = async (id) => {

  const result = await pool.query(`
    WITH table_data AS (
      select
        fe.id as "ID", 
        fe.nome as "Nome do Processo"
      from processo.rel_processo_ferramenta_sistema rf
      join public.ferramenta_sistema fe on fe.id = rf.ferramentasistema_id
      where rf.processo_id = $1
      order by fe.nome 
    ),
    column_info AS (
        SELECT 
            column_name,
            data_type,
            COALESCE(character_maximum_length, 20) AS character_maximum_length
        FROM (
            VALUES 
                ('ID', 'integer', NULL),
                ('Nome do Processo', 'text', 150)
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
  `, [id]);

  //return result;
  return result.rows[0]?.result || { rows: [], columns: [] };

};

export const getTodasFerramentaSistemaDisponiveisParaProcessoParaDatagridMUI = async (id) => {

  const result = await pool.query(`
    WITH table_data AS (
        SELECT 
          fs.id as "ID",
          fs.nome as "Nome do Processo"
        FROM public.ferramenta_sistema fs
        LEFT JOIN processo.rel_processo_ferramenta_sistema rpfs
            ON fs.id = rpfs.ferramentasistema_id
            AND rpfs.processo_id = $1
            AND fs.ativo = true
        WHERE rpfs.ferramentasistema_id IS NULL
        ORDER BY fs.nome
    ),
    column_info AS (
        SELECT 
            column_name,
            data_type,
            cCOALESCE(character_maximum_length, 20) AS character_maximum_length
        FROM (
            VALUES 
                ('ID', 'integer', NULL),
                ('Nome do Processo', 'text', 150)
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
  `, [id]);

  //return result;
  return result.rows[0]?.result || { rows: [], columns: [] };

};

export const getFerramentaSistemaPorId = async (id) => {
  const result = await pool.query(`SELECT * FROM public.ferramenta_sistema WHERE id = $1`, [id]);
  return result.rows[0];
};

export const getTodosProcessosPorFerramentaSistemaId = async (id) => {
  const result = await pool.query(`
    SELECT 
      fs.id as ferramenta_sistema_id,
      p.id as processo_id,
      p.nome as processo_nome
    FROM public.ferramenta_sistema fs
    JOIN processo.rel_processo_ferramenta_sistema rf ON rf.ferramentasistema_id = fs.id
    JOIN processo.processos p ON p.id = rf.processo_id
    WHERE fs.ativo = true and fs.id = $1 and p.ativo = true
    ORDER BY p.nome
    `,
    [id]
  );
  return result.rows;
};

export const inserirFerramentaSistema = async (nome) => {
  const result = await pool.query(
    `INSERT INTO 
        public.ferramenta_sistema (nome, ativo) 
     VALUES 
        ($1, $2) RETURNING *`,
    [nome, true]
  );
  return result.rows[0];
};

export const atualizarFerramentaSistema = async (id, nome, ativo) => {
  const result = await pool.query(
    `UPDATE public.ferramenta_sistema 
        SET 
          nome = $1, 
          ativo = $2 
        WHERE 
          id = $3 
     RETURNING *`,
    [nome, ativo, id]
  );
  return result.rows[0];
};

export const excluirFerramentaSistema = async (id) => {
  const result = await pool.query(
    `UPDATE 
        public.ferramenta_sistema 
     SET 
        ativo = false 
     WHERE 
        id = $1 
     RETURNING *`,
    [id]);
  return result.rows[0];
};
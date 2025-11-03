import pool from '../../db.js';

export const getTodosLocaisExecucao = async (sortCampo, sortOrdem) => {
  const result = await pool.query(`
    SELECT * FROM public.locais_execucao where ativo = true ORDER BY ${sortCampo} ${sortOrdem}
  `);
  return result.rows;
};


export const getLocalExecucaoPorId = async (id) => {
  const result = await pool.query(`
    SELECT 
        le.id,
        le.nome,
        le.endereco,
        le.bairro,
        es.id as estado_id,
        le.cidade_id,
        le.ativo,
        le.tipo_local_execucao_id
    FROM public.locais_execucao le
    LEFT JOIN public.cidades ci ON le.cidade_id = ci.id
    LEFT JOIN public.estados es ON ci.estado_id = es.id
    WHERE le.id = $1`, [id]);
  return result.rows[0];
};

export const getTodasUnidadesFuncionaisPorLocalExecucaoId = async (id) => {
  const result = await pool.query(`
    SELECT 
      le.id as local_execucao_id,
      uf.id as unidade_funcional_id,
      uf.nome as unidade_funcional_nome
    FROM public.locais_execucao le
    JOIN public.unidade_funcional uf on uf.local_execucao_id = le.id
    WHERE 
      le.id = $1 and 
      le.ativo = true
      and uf.ativo = true
    ORDER BY uf.nome
    `,
    [id]);
  return result.rows;
};

export const getTodosLocaisExecucaoParaDatagrid = async () => {

  const result = await pool.query(`
      SELECT COALESCE(
          json_agg(row_to_json(p)), 
          '[]'::json
      ) as resultados
      FROM (
          SELECT
              le.id as "ID",
              le.nome as "Local de Execução",
              le.endereco as "Endereço",
              le.bairro as "Bairro",
              ci.nome as "Cidade",
              es.nome as "Estado",
			        let.nome as "Tipo"
          FROM public.locais_execucao le
          LEFT JOIN public.cidades ci ON le.cidade_id = ci.id
		      LEFT JOIN public.estados es ON es.id = ci.estado_id
		      LEFT JOIN public.locais_execucao_tipo let ON let.id = le.tipo_local_execucao_id
          WHERE 
              le.ativo = true
		      ORDER BY le.nome
      ) AS p;
  `, []);

  // Extraia o array excluindo o nó inicial resultados.
  const registros = result.rows[0]?.resultados || [];

  return registros;
}

export const getLocalExecucaoParaDatagridMUI = async () => {

  const result = await pool.query(`
    WITH table_data AS (
        SELECT *
            FROM (
                SELECT DISTINCT ON (le.id)
                 le.id as "ID",
              le.nome as "Local de Execução",
              le.endereco as "Endereço",
              le.bairro as "Bairro",
              ci.nome as "Cidade",
              es.nome as "Estado",
			        let.nome as "Tipo"
          FROM public.locais_execucao le
          LEFT JOIN public.cidades ci ON le.cidade_id = ci.id
		      LEFT JOIN public.estados es ON es.id = ci.estado_id
		      LEFT JOIN public.locais_execucao_tipo let ON let.id = le.tipo_local_execucao_id
          WHERE 
              le.ativo = true
            GROUP BY 
				le.id, le.nome, le.endereco, le.bairro, ci.nome, es.nome, let.nome          
			ORDER BY 
                le.id, le.nome
        ) 
            subquery
          ORDER BY 
              "Local de Execução"
    ),
    column_info AS (
        SELECT 
            column_name,
            data_type,
            COALESCE(character_maximum_length, 20) AS character_maximum_length
        FROM (
            VALUES 
                ('ID', 'integer', NULL),
                ('Local de Execução', 'text', 100),
                ('Endereço', 'text', 255),
                ('Bairro', 'text', 50),
                ('Cidade', 'text', 100),
                ('Estado', 'text', 50),
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

export const inserirLocalExecucao = async (nome, endereco, bairro, cidade_id, tipo_local_execucao_id) => {
  const result = await pool.query(
    `INSERT INTO 
        public.locais_execucao 
          (nome, endereco, bairro, cidade_id, tipo_local_execucao_id, ativo) 
        VALUES 
          ($1, $2, $3, $4, $5, $6) 
      RETURNING *`,
    [nome, endereco, bairro, cidade_id, tipo_local_execucao_id, true]
  );
  return result.rows[0];
};

export const atualizarLocalExecucao = async (id, nome, endereco, bairro, cidade_id, tipo_local_execucao_id, ativo) => {
  const result = await pool.query(
    `UPDATE 
          public.locais_execucao 
        SET
          nome = $1, 
          endereco = $2, 
          bairro = $3, 
          cidade_id = $4, 
          tipo_local_execucao_id = $5, 
          ativo = $6 
        WHERE id = $7 
    RETURNING *`,
    [nome, endereco, bairro, cidade_id, tipo_local_execucao_id, ativo, id]
  );
  return result.rows[0];
};

export const excluirLocalExecucao = async (id) => {
  const result = await pool.query(
    `UPDATE 
          public.locais_execucao 
        SET 
          ativo = false 
        WHERE id = $1 
     RETURNING *`,
    [id]);
  return result.rows[0];
};

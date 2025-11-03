import pool from '../../db.js';

export const getTodosGruposPermissao = async (sortCampo, sortOrdem) => {
    const result = await pool.query(`
        SELECT * FROM public.permissao_grupo where ativo = true ORDER BY ${sortCampo} ${sortOrdem}
    `);
    return result.rows;
};

export const getTodaspermissoesGrupoParaDatagrid = async () => {

    const result = await pool.query(`
        SELECT COALESCE(
            json_agg(row_to_json(p)), 
            '[]'::json
        ) as resultados
        FROM (
            SELECT
                pg.id as "ID",
                pg.nome as "Permissão",
                pg.ordem as "Ordem"
            FROM public.permissao_grupo pg
            WHERE 
                pg.ativo = true
                ORDER BY pg.nome
        ) AS p;
    `, []);

    // Extraia o array excluindo o nó inicial resultados.
    const registros = result.rows[0]?.resultados || [];

    return registros;
}

export const getPermissoesGrupoParaDatagridMUI = async () => {

  const result = await pool.query(`
    WITH table_data AS (
        SELECT *
            FROM (
                SELECT DISTINCT ON (pg.id)
                  pg.id as "ID",
                pg.nome as "Permissão Grupo",
                pg.ordem as "Ordem"
            FROM public.permissao_grupo pg
            WHERE 
                pg.ativo = true
            GROUP BY 
				pg.id, pg.nome, pg.ordem       
			ORDER BY 
                pg.id, pg.nome
        ) 
            subquery
          ORDER BY 
              "Permissão Grupo"
    ),
    column_info AS (
        SELECT 
            column_name,
            data_type,
            COALESCE(character_maximum_length, 20) AS character_maximum_length
        FROM (
            VALUES 
                ('ID', 'integer', NULL),
                ('Permissão Grupo', 'text', 50),
                ('Ordem', 'text', 30)
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

export const getGrupoPermissaoPorId = async (id) => {
    const result = await pool.query('SELECT * FROM public.permissao_grupo WHERE id = $1', [id]);
    return result.rows[0];
};

export const getPermissaoPorGrupoId = async (id) => {
    const result = await pool.query(`
        SELECT 
	        pg.id as grupo_id,
	        pg.nome as nome_grupo,
	        p.id as permissao_id,
	        p.nome as nome_permissao
        FROM public.permissao_grupo pg
        JOIN public.permissao p ON pg.id = p.grupo_id
        WHERE pg.id = $1 AND pg.ativo = true and p.ativo = true
        order by p.nome
        `,
        [id]
    );
    return result.rows;
};

export const inserirGrupoPermissao = async (nome, ordem) => {
    const result = await pool.query(`
        INSERT INTO public.permissao_grupo(
	        nome, ordem, ativo)
	    VALUES 
            ($1, $2, true)
        RETURNING *`,
        [nome, ordem]
    );
    return result.rows[0];
};

export const atualizarGrupoPermissao = async (id, nome, ordem, ativo) => {
    const result = await pool.query(`
        UPDATE 
            public.permissao_grupo
	    SET 
            nome = $1, 
            ordem = $2,
            ativo = $3
        WHERE 
            id = $4
        RETURNING *`,
        [nome, ordem, ativo, id]
    );
    return result.rows[0];
};

export const excluirPermissao = async (id) => {
    const result = await pool.query(`
        UPDATE 
            public.permissao_grupo
        SET 
            ativo = false 
        WHERE id = $1 
        RETURNING *`,
        [id]);
    return result.rows[0];
};
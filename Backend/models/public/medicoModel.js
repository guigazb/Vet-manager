import pool from '../../db.js';

export const getTodasPermissoes = async (sortCampo, sortOrdem) => {
    const result = await pool.query(`
        SELECT * FROM public.permissao where ativo = true ORDER BY ${sortCampo} ${sortOrdem}
    `);
    return result.rows;
};

export const getPermissaoPorId = async (id) => {
    const result = await pool.query('SELECT * FROM public.permissao WHERE id = $1', [id]);
    return result.rows[0];
};

export const getTodasPermissoesParaDatagrid = async () => {

    const result = await pool.query(`
        SELECT COALESCE(
            json_agg(row_to_json(p)), 
            '[]'::json
        ) as resultados
        FROM (
            SELECT
                p.id as "ID",
                p.nome as "Permissão",
				p.rota as "Rota",
				pg.nome as "Grupo"
            FROM public.permissao p
			LEFT JOIN public.permissao_grupo pg on p.grupo_id = pg.id
            WHERE 
                p.ativo = true
                ORDER BY p.nome
        ) AS p;
    `, []);

    // Extraia o array excluindo o nó inicial resultados.
    const registros = result.rows[0]?.resultados || [];

    return registros;
}

export const getPermissoesParaDatagridMUI = async () => {
  const result = await pool.query(`
    WITH table_data AS (
        SELECT *
            FROM (
                SELECT DISTINCT ON (p.id)
                  p.id as "ID",
                p.nome as "Permissão",
				p.rota as "Rota",
				pg.nome as "Grupo"
            FROM public.permissao p
			LEFT JOIN public.permissao_grupo pg on p.grupo_id = pg.id
            WHERE 
                p.ativo = true
            GROUP BY 
				p.id, p.nome, p.rota, pg.nome       
			ORDER BY 
                p.id, p.nome
        ) 
            subquery
          ORDER BY 
              "Permissão"
    ),
    column_info AS (
        SELECT 
            column_name,
            data_type,
            COALESCE(character_maximum_length, 20) AS character_maximum_length
        FROM (
            VALUES 
                ('ID', 'integer', NULL),
                ('Permissão', 'text', 100),
                ('Rota', 'text', 256),
                ('Grupo', 'text', 100)
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

};

export const getTodasPermissoesParaDatagridMUIDisponiveisPorPerfil = async (id) => {

    if (!id || id === "0") {
        return;
    }

    const result = await pool.query(`
        WITH table_data AS (
            select
                pe.id as "ID", 
                pe.nome as "Nome Permissão",
                pg.nome as "Grupo Nome"
            from public.permissao pe
            left join public.permissao_grupo pg ON pg.id = pe.grupo_id
            left join public.rel_perfil_permissao rp ON rp.permissao_id = pe.id
            and rp.perfil_id = $1
            and pe.ativo = true
            where rp.permissao_id is null
            order by pe.nome
        ),
        column_info AS (
            SELECT 
                column_name,
                data_type,
                COALESCE(character_maximum_length, 20) AS character_maximum_length
            FROM (
                VALUES 
                    ('ID', 'integer', NULL),
                    ('Nome Permissão', 'text', 120),
                    ('Grupo', 'text', 150)
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

    // Extraia o array excluindo o nó inicial resultados.
    return result.rows[0]?.result || { rows: [], columns: [] };
}

export const getTodasPermissoesParaDatagridMUICadastradasPorPerfil = async (id) => {

    const result = await pool.query(`
        WITH table_data AS (
            select
                pe.id as "ID", 
                pe.nome as "Nome Permissão", 
                pg.nome as "Grupo"
            from public.rel_perfil_permissao rp
            join public.permissao pe on pe.id = rp.permissao_id
            join public.permissao_grupo pg on pe.grupo_id = pg.id
            where rp.perfil_id = $1
            order by pe.nome
        ),
        column_info AS (
            SELECT 
                column_name,
                data_type,
                COALESCE(character_maximum_length, 20) AS character_maximum_length
            FROM (
                VALUES 
                    ('ID', 'integer', NULL),
                    ('Nome Permissão', 'text', 120),
                    ('Grupo', 'text', 150)
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

    // Extraia o array excluindo o nó inicial resultados.
    return result.rows[0]?.result || { rows: [], columns: [] };
}

export const getPermissoesPorGrupoId = async (id) => {
    const result = await pool.query(`
        select 
	        p.id as permissao_id,
	        pg.id as grupo_permissao_id,
	        pg.nome as nome_grupo
        from public.permissao p
        join public.permissao_grupo pg on pg.id = p.grupo_id
        where p.grupo_id = $1 and p.ativo = true
        ORDER BY pg.nome
        `, [id]);
    return result.rows;
};

export const getPerfisPorPermissaoId = async (id) => {
    const result = await pool.query(`
        select 
	        p.id  as permissao_id,
	        pe.id as perfil_id,
	        pe.nome as perfil_nome
        from public.permissao p
        join public.rel_perfil_permissao rpp on rpp.permissao_id = p.id
        join public.perfis pe on pe.id = rpp.perfil_id
        where p.id = $1 and p.ativo = true and pe.ativo = true
        ORDER BY pe.nome
        `, [id]);
    return result.rows;
};

export const inserirPermissao = async (nome, rota, grupo_id, visivel_menu, nome_menu, ordem) => {
    const result = await pool.query(`
        INSERT INTO 
            public.permissao
            (nome, rota, grupo_id, visivel_menu, nome_menu, ordem, ativo) 
        VALUES 
            ($1, $2, $3, $4, $5, $6, true) 
        RETURNING *`,
        [nome, rota, grupo_id, visivel_menu, nome_menu, ordem]
    );
    return result.rows[0];
};

export const atualizarPermissao = async (id, nome, rota, grupo_id, visivel_menu, nome_menu, ordem, ativo) => {
    const result = await pool.query(`
        UPDATE 
            public.permissao 
        SET 
            nome = $1, 
            rota = $2,
            grupo_id = $3,
            visivel_menu = $4, 
            nome_menu = $5, 
            ordem = $6,
            ativo = $7
        WHERE id = $8 
        RETURNING *`,
        [nome, rota, grupo_id, visivel_menu, nome_menu, ordem, ativo, id]
    );
    return result.rows[0];
};

export const excluirPermissao = async (id) => {
    const result = await pool.query(`
        UPDATE 
            public.permissao
        SET 
            ativo = false 
        WHERE id = $1 
        RETURNING *`,
        [id]);
    return result.rows[0];
};
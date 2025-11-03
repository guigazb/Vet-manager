import pool from '../../db.js';

export const getTodosPerfis = async (sortCampo, sortOrdem) => {
    const result = await pool.query(`
        SELECT * FROM public.perfis where ativo = true ORDER BY ${sortCampo} ${sortOrdem}
    `);
    return result.rows;
};

export const getPerfilPorId = async (id) => {
    const result = await pool.query('SELECT * FROM public.perfis WHERE id = $1', [id]);
    return result.rows[0];
};

export const getTodosPerfisParaDatagrid = async () => {

    const result = await pool.query(`
        SELECT COALESCE(
            json_agg(row_to_json(p)), 
            '[]'::json
        ) as resultados
        FROM (
               SELECT
                p.id as "ID",
                p.nome as "Perfil",
				p.descricao as "Descrição"
            FROM public.perfis p
            WHERE 
                p.ativo = true
                ORDER BY p.nome
        ) AS p;
    `, []);

    // Extraia o array excluindo o nó inicial resultados.
    const registros = result.rows[0]?.resultados || [];

    return registros;
};

export const getPerfisParaDatagridMUI = async () => {

    const result = await pool.query(`
    WITH table_data AS (
        SELECT *
            FROM (
                SELECT DISTINCT ON (p.id)
                  p.id as "ID",
                p.nome as "Perfil",
				p.descricao as "Descrição"
            FROM public.perfis p
            WHERE 
                p.ativo = true
            GROUP BY 
				p.id, p.nome, p.descricao         
			ORDER BY 
                p.id, p.nome
        ) 
            subquery
          ORDER BY 
              "Perfil"
    ),
    column_info AS (
        SELECT 
            column_name,
            data_type,
            COALESCE(character_maximum_length, 20) AS character_maximum_length
        FROM (
            VALUES 
                ('ID', 'integer', NULL),
                ('Perfil', 'text', 50),
                ('Descrição', 'text', 512)
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

export const inserirPerfil = async (nome, descricao) => {
    const result = await pool.query(`
        INSERT INTO 
            public.perfis
            (nome, descricao, ativo) 
        VALUES 
            ($1, $2, true) 
        RETURNING *`,
        [nome, descricao]
    );
    return result.rows[0];
};

export const atualizarPerfil = async (id, nome, descricao, ativo) => {
    const result = await pool.query(`
        UPDATE 
            public.perfis 
        SET 
            nome = $1, 
            descricao = $2,
            ativo = $3
        WHERE id = $4 
        RETURNING *`,
        [nome, descricao, ativo, id]
    );
    return result.rows[0];
};

export const excluirPerfil = async (id) => {
    const result = await pool.query(`
        UPDATE 
            public.perfis 
        SET 
            ativo = false 
        WHERE id = $1 
        RETURNING *`,
        [id]);
    return result.rows[0];
};

export const getPermissoesPorPerfilId = async (id) => {
    const result = await pool.query(`
        SELECT
	        pe.id as idPermissao,
	        pe.nome as nomePermissao,
            pe.rota
        FROM
	        public.perfis p
        LEFT JOIN 
	        public.rel_perfil_permissao pp ON p.id = pp.perfil_id
        LEFT JOIN 
	        public.permissao pe ON pp.permissao_id = pe.id
        WHERE 
	        p.id = $1 and 
	        p.ativo = true and 
	        pe.ativo = true`,
        [id]);
    return result.rows;
};

export const getUsuariosPorPerfilId = async (id) => {
    const result = await pool.query(`
        SELECT
            pe.id as perfil_id,
            us.id as usuario_id,
            us.nome as usuario_nome,
            us.nome_login as usuario_nome_login
        FROM public.perfis pe
        JOIN public.usuarios us ON us.perfil_id = pe.id
        WHERE 
            pe.ativo = true and 
            us.ativo = true and 
            pe.id = $1`,
        [id]);
    return result.rows;
};
import pool from '../../db.js';

export const getTodasUnidadesFuncionais = async (sortCampo, sortOrdem) => {
    const result = await pool.query(`
        SELECT * FROM unidade_funcional where ativo = true ORDER BY ${sortCampo} ${sortOrdem}
    `);
    return result.rows;
};

export const getTodasUnidadesFuncionaisParaDatagrid = async () => {

    const result = await pool.query(`
        SELECT COALESCE(
            json_agg(row_to_json(p)), 
            '[]'::json
        ) as resultados
        FROM (
            SELECT
                uf.id as "ID",
				le.nome as "Local Execução",
                uf.nome as "Unidade Funcional",
                af.nome as "Unidade Funcional Pai",
				uft.tipo as "Tipo",
				uf.sigla as "Sigla"
            FROM public.unidade_funcional uf
            LEFT JOIN public.locais_execucao le on uf.local_execucao_id = le.id
			LEFT JOIN public.unidade_funcional af on uf.unidade_funcional_pai = af.id
			LEFT JOIN public.unidade_funcional_tipo uft on uf.tipo_unidade_id = uft.id
            WHERE 
                uf.ativo = true and le.ativo = true
                ORDER BY uf.nome
        ) AS p;
    `, []);

    // Extraia o array excluindo o nó inicial resultados.
    const registros = result.rows[0]?.resultados || [];

    return registros;
}


export const getUnidadesFuncionaisParaDatagridMUI = async () => {

  const result = await pool.query(`
    WITH table_data AS (
        SELECT *
            FROM (
                SELECT DISTINCT ON (uf.id)
                  uf.id as "ID",
				le.nome as "Local Execução",
                uf.nome as "Unidade Funcional",
                af.nome as "Unidade Funcional Pai",
				uft.tipo as "Tipo",
				uf.sigla as "Sigla"
            FROM public.unidade_funcional uf
            LEFT JOIN public.locais_execucao le on uf.local_execucao_id = le.id
			LEFT JOIN public.unidade_funcional af on uf.unidade_funcional_pai = af.id
			LEFT JOIN public.unidade_funcional_tipo uft on uf.tipo_unidade_id = uft.id
            WHERE 
                uf.ativo = true and le.ativo = true
            GROUP BY 
                uf.id,  uf.nome, le.nome, af.nome, uft.tipo, uf.sigla
            ORDER BY 
                uf.id, uf.nome
        ) 
            subquery
          ORDER BY 
              "Unidade Funcional"
    ),
    column_info AS (
        SELECT 
            column_name,
            data_type,
            COALESCE(character_maximum_length, 20) AS character_maximum_length
        FROM (
            VALUES 
                ('ID', 'integer', NULL),
                ('Local Execução', 'text', 50),
                ('Unidade Funcional', 'text', 100),
                ('Unidade Funcional Pai', 'text', 100),
                ('Tipo', 'text', 50),
                ('Sigla', 'text', 30)
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

export const getOrganogramaFuncionalPorId = async (id, result = []) => {
    const tuplas = await pool.query(`
        SELECT
            uf.id as unidade_funcional_id,
            le.id as local_execucao_id,
            uf.unidade_funcional_pai as unidade_funcional_pai,
            uf.nome as unidade_funcional_nome,
            le.nome as local_execucao_nome
        FROM public.unidade_funcional uf
        JOIN public.locais_execucao le ON le.id = uf.local_execucao_id
        WHERE 
            uf.ativo = true and 
            le.ativo = true and
            uf.id = $1
    `, [id]);

    if (tuplas.rows.length > 0) {
        const informacao = tuplas.rows[0];
        result.push(informacao);

        // Se existir um pai, continua fazendo a busca recursiva
        if (informacao.unidade_funcional_pai) {
            return getOrganogramaFuncionalPorId(informacao.unidade_funcional_pai, result);
        }
    }

    return result;
};

export const getUnidadeFuncionalPorId = async (id) => {
    const result = await pool.query(`SELECT * FROM unidade_funcional WHERE id = $1`, [id]);
    return result.rows[0];
};

export const getUsuarioPorUnidadeFuncionalId = async (id) => {
    const result = await pool.query(`
        SELECT
	        uf.id as unidade_funcional_id,
	        u.id as usuario_id,
	        u.nome as nome_usuario,
	        u.nome_login as login_usuario
        from public.unidade_funcional uf
        join public.usuarios u ON u.unidade_funcional_id = uf.id  
        where uf.id = $1 AND uf.ativo = true and u.ativo = true
        ORDER BY u.nome
        `,
        [id]);
    return result.rows;
};

export const getProcessosPorUnidadeFuncionalId = async (id) => {
    const result = await pool.query(`
        SELECT 
            uf.id as unidade_funcional_id,
            pr.id as processo_id,
            pr.nome as processo_nome,
            pr.macroprocesso as processo_macroprocesso
        FROM public.unidade_funcional uf
        JOIN processo.rel_processo_area ra on uf.id = ra.area_id
        JOIN processo.processos pr on pr.id = ra.processo_id
        WHERE 
            uf.ativo = true
            and pr.ativo = true
            and uf.id = $1
        ORDER BY pr.nome
            `,
        [id]);
    return result.rows;
};

export const getMatrizesSwotPorUnidadeFuncionalIdParaDatagridMui = async (id) => {
    const result = await pool.query(`
        WITH table_data AS (
        SELECT 
            rms.id as "ID",
            uf.id as "ID Unidade Funcional",
            uf.nome as "Unidade Funcional",
            rms.data_matriz_swot as "Data de vigencia",
            rms.ativo as "Ativo"
        FROM public.unidade_funcional uf
        JOIN risco.matriz_swot rms on rms.unidade_funcional_id = uf.id
        WHERE 
            uf.ativo = true
            and uf.id = $1
        ORDER BY rms.data_matriz_swot 
    ),
    column_info AS (
        SELECT 
            column_name,
            data_type,
            COALESCE(character_maximum_length, 20) AS character_maximum_length
        FROM (
            VALUES 
                ('ID', 'integer', NULL),
                ('ID Unidade Funcional', 'integer', NULL),
                ('Unidade Funcional', 'text', 120),
                ('Data de vigencia', 'text', 80),
                ('Ativo', 'boolean', 50)
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
        ) as result;`
        , [id]);
    return result.rows[0]?.result || { rows: [], columns: [] };
};

export const inserirUnidadeFuncional = async (local_execucao_id, nome, unidade_funcional_pai, organograma, tipo_unidade_id, sigla) => {

    // Captura um cliente da pool
    const cliente = await pool.connect();

    try {
        // Inicia a transação
        await cliente.query('BEGIN');

        const insercaoUnidFuncionalNova = await pool.query(`
            INSERT INTO public.unidade_funcional
                (local_execucao_id, nome, unidade_funcional_pai, organograma, tipo_unidade_id, sigla, ativo)
	        VALUES 
                ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING * `,
            [local_execucao_id, nome, unidade_funcional_pai, organograma, tipo_unidade_id, sigla, true]
        );

        // Se todas as queries tiverem sucesso, realiza o COMMIT da transação
        await cliente.query('COMMIT');
        console.log('Transação completada com sucesso');

        return insercaoUnidFuncionalNova.rows[0];

    } catch (err) {

        // Se quaisquer das queries falharem, realiza o ROLLBACK da transação
        await cliente.query('ROLLBACK');
        console.error('Transação falhou, mudanças foram revertidas.');

        // Propaga o erro para que a aplicação possa capturar e reagir de acordo
        throw err;

    } finally {
        // Faz a liberação do cliente na Pool do banco de dados
        cliente.release();
    }

};

export const atualizarUnidadeFuncional = async (
    id, local_execucao_id, nome, unidade_funcional_pai, organograma, tipo_unidade_id, sigla, ativo
) => {

    const cliente = await pool.connect(); // Captura um cliente da pool

    try {
        await cliente.query('BEGIN'); // Inicia a transação

        const result1 = await cliente.query(`
            UPDATE 
                public.unidade_funcional
            SET 
                local_execucao_id = $1, 
                nome = $2, 
                unidade_funcional_pai = $3, 
                organograma = $4, 
                tipo_unidade_id = $5, 
                sigla = $6, 
                ativo = $7
            WHERE id = $8 
            RETURNING *`,
            [local_execucao_id, nome, unidade_funcional_pai, organograma, tipo_unidade_id, sigla, ativo, id]
        );

        // Se todas as queries tiverem sucesso, realiza o COMMIT da transaçãotransaction
        await cliente.query('COMMIT');
        console.log('Transação completada com sucesso');

        return result1.rows[0];

    } catch (err) {

        // Se quaisquer das queries falharem, realiza o ROLLBACK da transação
        await cliente.query('ROLLBACK');
        console.error('Transação falhou, mudanças foram revertidas.');

        // Propaga o erro para que a aplicação possa capturar e reagir de acordo
        throw err;

    } finally {
        // Faz a liberação do cliente na Pool do banco de dados
        cliente.release();
    }

};

export const excluirUnidadeFuncional = async (id) => {
    const result = await pool.query(
        `UPDATE 
            public.unidade_funcional 
         SET 
            ativo = false 
         WHERE 
            id = $1 
         RETURNING *`,
        [id]);
    return result.rows[0];
};

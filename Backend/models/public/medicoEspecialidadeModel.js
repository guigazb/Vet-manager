import pool from '../../db.js';

export const getTodasPermissoesPorPerfilId = async (perfil_id) => {
    const result = await pool.query(`
        SELECT 
            p.id as perfil_id,
            pe.id as permissao_id,
            p.nome as perfil_nome, 
            pe.nome as permissao_nome,
            pe.rota as permissao_rota
        FROM public.rel_perfil_permissao pp
        LEFT join public.perfis p ON pp.perfil_id = p.id
        JOIN public.permissao pe ON pp.permissao_id = pe.id
        WHERE 
            p.ativo = true
            and pe.ativo = true
            and p.id = $1
        ORDER BY pe.nome
        `, [perfil_id]);
    return result.rows;
};

export const getTodosPerfisComPermissaoId = async (permissao_id) => {
    const result = await pool.query(`
        SELECT 
            p.id as perfil_id,
            pe.id as permissao_id,
            p.nome as perfil_nome, 
            pe.nome as permissao_nome,
            pe.rota as permissao_rota
        FROM public.rel_perfil_permissao pp
        JOIN public.perfis p ON pp.perfil_id = p.id
        LEFT join public.permissao pe ON pp.permissao_id = pe.id
        WHERE 
            p.ativo = true
            and pe.ativo = true
            and pe.id = $1
        ORDER BY p.nome
    `, [permissao_id]);
    return result.rows[0];
};

export const inserirPermissaoPorPerfil = async (perfil_id, permissao_id) => {
    const result = await pool.query(`
        INSERT INTO public.rel_perfil_permissao
        (perfil_id, permissao_id)
	    VALUES 
            ($1, $2)
        RETURNING *`,
        [perfil_id, permissao_id]
    );
    return result.rows[0];
};

export const excluirPermissaoDePerfil = async (perfil_id, permissao_id) => {
    const result = await pool.query(`
        DELETE FROM 
            public.rel_perfil_permissao
	    WHERE 
            perfil_id = $1 and
            permissao_id = $2
        RETURNING *`,
        [perfil_id, permissao_id]);
    return result.rows[0];
};
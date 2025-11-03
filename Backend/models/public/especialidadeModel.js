import pool from '../../db.js';

export const getTodosTiposLocaisExecucao = async () => {
  const result = await pool.query(`
    SELECT * FROM public.locais_execucao_tipo
  `);
  return result.rows;
};

export const getTipoLocalExecucaoPorId = async (id) => {
  const result = await pool.query(`SELECT * FROM public.locais_execucao_tipo WHERE id = $1`, [id]);
  return result.rows[0];
};

export const getTodasLocaisExecucaoPorLocalExecucaoId = async (id) => {
  const result = await pool.query(`
    SELECT 
        le.id as local_execucao_id,
        let.id as tipo_local_execucao_id,
        le.nome as local_execucao_nome,
        let.nome as tipo_local_execucao_nome
    FROM public.locais_execucao_tipo let
    JOIN public.locais_execucao le ON le.tipo_local_execucao_id = let.id
    WHERE let.id = $1
    `, 
    [id]);
  return result.rows;
};

export const inserirTipoLocalExecucao = async (nome) => {
  const result = await pool.query(
    `INSERT INTO 
        public.locais_execucao_tipo
          (nome) 
        VALUES 
          ($1) 
      RETURNING *`,
    [nome]
  );
  return result.rows[0];
};

export const atualizarTipoLocalExecucao = async (id, nome) => {
  const result = await pool.query(
    `UPDATE 
          public.locais_execucao_tipo
        SET
          nome = $1
        WHERE id = $2
    RETURNING *`,
    [nome, id]
  );
  return result.rows[0];
};

export const excluirTipoLocalExecucao = async (id) => {
  const result = await pool.query(`
    DELETE FROM public.locais_execucao_tipo
	    WHERE id = $1
    RETURNING *`,
    [id]);
  return result.rows[0];
};

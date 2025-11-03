import pool from '../../db.js';

export const getCidades = async () => {
  const result = await pool.query('SELECT * FROM public.cidades order by nome');
  return result.rows;
};

export const getCidadePorId = async (id) => {
  const result = await pool.query('SELECT * FROM public.cidades WHERE id = $1', [id]);
  return result.rows[0];
};
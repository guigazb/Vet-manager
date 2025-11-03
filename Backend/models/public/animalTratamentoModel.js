import pool from '../../db.js';

export const getEstados = async (sortCampo, sortOrdem) => {
  const result = await pool.query(`
    SELECT * FROM public.estados ORDER BY ${sortCampo} ${sortOrdem}
  `);
  return result.rows;
};

export const getEstadosPorId = async (id) => {
  const result = await pool.query(`SELECT * FROM public.estados WHERE id = $1`, [id]);
  return result.rows[0];
};

export const getCidadesPorIdEstado = async (id) => {
  const result = await pool.query(`
    SELECT * FROM public.cidades WHERE estado_id = $1 order by nome
  `, [id]);
  return result.rows;
};
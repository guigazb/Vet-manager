import * as telefoneMedicoModel from '../../models/public/telefoneMedicoModel.js'
import { validationResult } from 'express-validator';

export const getTodosUsuarios = async (req, res) => {
    try {
        const sortCampo = req.query.sortCampo || 'nome';
        const ordenamento = req.query.sortOrdem;
        const ordemUpperCase = ordenamento ? ordenamento.toUpperCase() : '';
        const sortOrdem = ordemUpperCase === 'DESC' ? 'DESC' : 'ASC';

        const usuario = await telefoneMedicoModel.getTodosUsuarios(sortCampo, sortOrdem);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTodosUsuariosParaDatagrid = async (req, res) => {
    try {
        const id = req.params.id;
        // const { ativo } = req.body;

        const usuarioDG = await telefoneMedicoModel.getTodosUsuariosParaDatagrid(id);

        res.status(201).json(usuarioDG);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsuariosParaDatagridMUI = async (req, res) => {
    try {
        const id = req.params.id;
        // const { ativo } = req.body;

        const usuarioDGMUI = await telefoneMedicoModel.getUsuariosParaDatagridMUI(id);
        if (usuarioDGMUI) {
            res.status(201).json(usuarioDGMUI);
        } else {
            res.status(404).json({ message: 'Usuários não encontrados' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsuarioPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await telefoneMedicoModel.getUsuarioPorId(id);
        if (usuario) {
            res.status(201).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPermissoesPorUsuarioId = async (req, res) => {
    try {
        const id = req.params.id
        const permissoesUsuario = await telefoneMedicoModel.getPermissoesPorUsuarioId(id);
        if (permissoesUsuario) {
            res.status(201).json(permissoesUsuario);
        } else {
            res.status(404).json({ message: 'Permissões não encontradas' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUnidadeFuncionalPorUsuarioId = async (req, res) => {
    try {
        const id = req.params.id
        const perfilPorUsuario = await telefoneMedicoModel.getUnidadeFuncionalPorUsuarioId(id);
        if (perfilPorUsuario) {
            res.status(201).json(perfilPorUsuario);
        } else {
            res.status(404).json({ message: 'Perfil não encontrado para usuário' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPerfilPorUsuarioId = async (req, res) => {
    try {
        const id = req.params.id
        const unidadeFuncionalPorUsuario = await telefoneMedicoModel.getPerfilPorUsuarioId(id);
        if (unidadeFuncionalPorUsuario) {
            res.status(201).json(unidadeFuncionalPorUsuario);
        } else {
            res.status(404).json({ message: 'Usuário não possui Perfil' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const inserirUsuario = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {
            nome, email, senha, perfil_id, local_execucao_id,
            nome_login, unidade_funcional_id, gerente_de_area
        } = req.body;
        const novousuario =
            await telefoneMedicoModel.inserirUsuario(
                nome, email, senha, perfil_id, local_execucao_id,
                nome_login, unidade_funcional_id, gerente_de_area);
        res.status(201).json(novousuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const atualizarUsuario = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = req.params.id;

        const { nome, email, ativo, perfil_id, local_execucao_id,
            unidade_funcional_id, gerente_de_area
        } = req.body;

        const usuarioAtualizado =
            await telefoneMedicoModel.atualizarUsuario(
                id,
                nome, email, ativo, perfil_id,
                local_execucao_id,
                unidade_funcional_id, gerente_de_area
            );

        if (usuarioAtualizado) {
            res.status(201).json(usuarioAtualizado);
        } else {
            res.status(404).json({ message: 'Usuario não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const excluirUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const usuarioExcluido = await telefoneMedicoModel.excluirUsuario(id);
        if (usuarioExcluido) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Usuario não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const atualizarSenha = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = req.params.id;
        const { senhaAntiga, senhaNova, senhaRedigitada } = req.body;
        const usuarioSenhaAtualizada = await telefoneMedicoModel.atualizarSenha(id, senhaAntiga, senhaNova, senhaRedigitada);
        if (usuarioSenhaAtualizada) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Usuario não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const efetuarLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nomeLogin, senha } = req.body;
        const efetuarLogin = await telefoneMedicoModel.efetuarLogin(nomeLogin, senha);
        if (efetuarLogin) {
            res.status(200).json(efetuarLogin);
        } else {
            res.status(404).json({ message: 'Credenciais inválidas para login. Tente novamente.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
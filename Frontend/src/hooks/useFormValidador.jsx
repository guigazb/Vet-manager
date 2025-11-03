import { useState } from 'react';
import { toast } from 'react-toastify';

const regrasValidacao = {
    requerido: (value, nome) => value ? null : `O campo "${nome}" é obrigatório`,
    apenasTexto: (value, nome) => (value && /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(value)) ? null : `O campo "${nome}" aceita apenas letras`,
    texto: (value, nome) => (value && /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/.test(value)) ? null : `O campo "${nome}" aceita apenas letras e números`,
    numero: (value, nome) => (value && !isNaN(value)) ? null : `O campo "${nome}" aceita apenas números`,
    email: (value, nome) => /\S+@\S+\.\S+/.test(value) ? null : `O campo "${nome}" deve conter um e-mail válido`,
    tamanhoMinimo: (value, nome, length) => value.length >= length ? null : `O campo "${nome}" exige mínimo de ${length} caracteres`,
    tamanhoMaximo: (value, nome, length) => value.length <= length ? null : `O campo "${nome}" permite máximo de ${length} caracteres`,
    regex: (value, nome, pattern) => pattern.test(value) ? null : `O campo "${nome}" tem formato inválido`,
    data: (value, nome, { min, max }) => {
        if (!/^\d{2}-\d{2}-\d{4}$/.test(value)) return `O campo "${nome}" deve estar no formato dd-mm-yyyy`;
        const [dia, mes, ano] = value.split('-').map(Number);
        const dataInterna = new Date(ano, mes - 1, dia);
        if (isNaN(dataInterna) || dataInterna.getDate() !== dia || dataInterna.getMonth() !== mes - 1) {
            return `O campo "${nome}" contém uma data inválida`;
        }
        const dataHoje = new Date();
        dataHoje.setHours(0, 0, 0, 0);
        if (dataInterna < dataHoje) return `O campo "${nome}" não pode ser uma data no passado`;
        if (min) {
            const dataMinima = new Date(min.split('-').reverse().join('-'));
            if (dataInterna < dataMinima) return `O campo "${nome}" deve ser uma data após ${min}`;
        }
        if (max) {
            const dataMaxima = new Date(max.split('-').reverse().join('-'));
            if (dataInterna > dataMaxima) return `O campo "${nome}" deve ser uma data antes de ${max}`;
        }
        return null;
    },
    tiposEspeciais: (value, nome, type) => {
        const patterns = {
            cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
            cnpj: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
        };
        return patterns[type]?.test(value) ? null : `O campo "${nome}" contém um ${type.toUpperCase()} inválido`;
    }
};

export const useFormValidator = (valoresIniciais, regras) => {
    const [valores, setValores] = useState(valoresIniciais);
    const [erros, setErros] = useState({});

    const validarCampo = (name, value) => {
        const regrasDoCampo = regras[name];
        if (!regrasDoCampo) return;

        let erroEncontrado = null;
        for (const regra of regrasDoCampo) {
            const [nomeRegra, parametroRegra] = Array.isArray(regra) ? regra : [regra];
            const erro = regrasValidacao[nomeRegra](value, name, parametroRegra); // Passa o nome do campo
            if (erro) {
                erroEncontrado = erro;
                break;
            }
        }

        setErros((prev) => ({ ...prev, [name]: erroEncontrado }));
        if (erroEncontrado) toast.error(erroEncontrado);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValores((prev) => ({ ...prev, [name]: value }));
        validarCampo(name, value);
    };

    const handleSubmit = (callback) => (e) => {
        e.preventDefault();
        const novosErros = {};

        Object.keys(regras).forEach((campo) => {
            const regrasDoCampo = regras[campo];
            for (const regra of regrasDoCampo) {
                const [nomeRegra, parametroRegra] = Array.isArray(regra) ? regra : [regra];
                const erro = regrasValidacao[nomeRegra](valores[campo], campo, parametroRegra); // Passa o nome do campo
                if (erro) {
                    novosErros[campo] = erro;
                    toast.error(erro);
                    break;
                }
            }
        });

        setErros(novosErros);
        if (Object.keys(novosErros).length === 0) callback(valores);
    };

    return { valores, erros, handleChange, handleSubmit };
};
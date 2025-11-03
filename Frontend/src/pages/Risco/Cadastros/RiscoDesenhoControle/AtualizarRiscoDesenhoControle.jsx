import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import routes from '../../../../data/routes';

import Actions from '../../../../components/geral/Actions'
import MainLayout from '../../../MainLayout';
import FormPadrao from '../../../../components/body/FormPadrao';
import InternalArea from '../../../../components/body/InternalArea';
import InternalButtonArea from '../../../../components/body/InternalButtonArea';

import TextInput from '../../../../components/textinput/TextInput';
import TextAreaInput from '../../../../components/textinput/TextAreaInput';
import RadioButtonBooleanInput from '../../../../components/radiobutton/RadioButtonBooleanInput';
import ButtonComponent from '../../../../components/button/ButtonComponent';

import axios from 'axios';

import { useFetchRiscoDesenhoControle } from '../../../../hooks/risco/useFetchRiscoDesenhoControle';


const AtualizarRiscoDesenhoControle = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_desenho_controle_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { riscoDesenhoControle, loading: loadingRiscoDesenhoControle } = useFetchRiscoDesenhoControle(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------
    const [formDesenhoControleRisco, setFormDesenhoControleRisco] = useState(riscoDesenhoControle?.desenho_controle || '');
    const [formDescricaoDesenhoControle, setFormDescricaoDesenhoControle] = useState(riscoDesenhoControle?.descricao || '');
    const [formValorDesenhoControle, setFormValorDesenhoControle] = useState(riscoDesenhoControle?.valor || '');
    const [formDesenhoAtivo, setFormDesenhoAtivo] = useState(riscoDesenhoControle?.ativo || '');

    useEffect(() => {
        if (riscoDesenhoControle && riscoDesenhoControle.desenho_controle !== undefined) {
            setFormDesenhoControleRisco(riscoDesenhoControle.desenho_controle);
        }
        if (riscoDesenhoControle && riscoDesenhoControle.descricao !== undefined) {
            setFormDescricaoDesenhoControle(riscoDesenhoControle.descricao);
        }
        if (riscoDesenhoControle && riscoDesenhoControle.valor !== undefined) {
            setFormValorDesenhoControle(riscoDesenhoControle.valor);
        }
        if (riscoDesenhoControle && riscoDesenhoControle.ativo !== undefined) {
            setFormDesenhoAtivo(riscoDesenhoControle.ativo);
        }
    }, [riscoDesenhoControle])

    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------
    const handleDesenhoControleRisco = (e) => {
        setFormDesenhoControleRisco(e.target.value);
    };

    const handleDescricao = (e) => {
        setFormDescricaoDesenhoControle(e.target.value);
    };

    const handleValor = (e) => {
        const value = e.target.value;
        setFormValorDesenhoControle(value);

        if ((value < 1 || value > 5) && value) {
            toast.error('O valor deve ser um inteiro entre 1 e 5');
        }
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const desenhoControleAtualizado = {
            desenho_controle: formDesenhoControleRisco,
            descricao: formDescricaoDesenhoControle,
            valor: formValorDesenhoControle,
            ativo: formDesenhoAtivo
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_DESENHO_CONTROLE + "/" + id, desenhoControleAtualizado);

            if (result.status === 201) {

                atualizacaoBemSucedida = true;
                toast.success("Desenho controle de risco atualizado com sucesso.", {
                    onClose: () => navegar(routes.risco_desenho_controle_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar desenho de Controle de risco`');
            }

        } catch (error) {
            toast.error('Erro ao tentar atualizar desenho de Controle de risco`', error);
        } finally {
            if (atualizacaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormDesenhoControleRisco('');
                setFormDescricaoDesenhoControle('');
                setFormValorDesenhoControle('');
                setFormDesenhoAtivo('');
            }
            setAtualizarDesabilitado(true);
        }
    };


    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastros : Risco" nomeSessao="Atualizar Desenho controle" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingRiscoDesenhoControle}>

                        <TextInput
                            maxLength="50"
                            nomeComponente="desenhocontrole"
                            required
                            valorComponente={formDesenhoControleRisco}
                            valorLabel="Desenho Controle"
                            autoComplete="desenho"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o desenho"
                            type='text'
                            onChange={handleDesenhoControleRisco}
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoDesenhoControle}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            onChange={handleDescricao}
                        />

                        <TextInput
                            maxLength="1"
                            nomeComponente="valordesenho"
                            required
                            valorComponente={formValorDesenhoControle}
                            valorLabel="Valor"
                            autoComplete="valor"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o valor"
                            type='text'
                            onChange={handleValor}
                        />

                        <RadioButtonBooleanInput
                            valorComponente={formDesenhoAtivo}
                            nomeComponenteAtivo="desenho-ativo"
                            nomeComponenteInativo="desenho-inativo"
                            onChange={setFormDesenhoAtivo}
                            valorLabel="Desenho Ativo ?"
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingRiscoDesenhoControle}>
                        <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>
                        <ButtonComponent tipo="alerta" desabilitado={atualizarDesabilitado}>
                            Atualizar Registro
                        </ButtonComponent>
                    </InternalButtonArea>

                </FormPadrao>

            </React.Fragment>
        </MainLayout>
    );

}

export default AtualizarRiscoDesenhoControle;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import routes from '../../../../data/routes';

import Actions from '../../../../components/geral/Actions'
import MainLayout from '../../../MainLayout';
import InternalButtonArea from '../../../../components/body/InternalButtonArea';
import FormPadrao from '../../../../components/body/FormPadrao';
import ButtonComponent from '../../../../components/button/ButtonComponent';
import TextInput from '../../../../components/textinput/TextInput';
import TextAreaInput from '../../../../components/textinput/TextAreaInput';
import InternalArea from '../../../../components/body/InternalArea';

import axios from 'axios';

const CriarRiscoRespostaEvento = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_resposta_risco_listar);
    }


    // ----------------------------------------------------------------------------------------------
    // Variaveis internas
    // ----------------------------------------------------------------------------------------------    
    const [formRespostaEventoRisco, setFormRespostaEventoRisco] = useState('');
    const [formDescricaoRespostaEventoRisco, setFormDescricaoRespostaEventoRisco] = useState('');



    // ----------------------------------------------------------------------------------------------
    // Handles do formulário
    // ----------------------------------------------------------------------------------------------
    const handleRespostaEventoRisco = (e) => {
        setFormRespostaEventoRisco(e.target.value);
    };

    const handleDescricao = (e) => {
        setFormDescricaoRespostaEventoRisco(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const novaRepostaEventoRisco = {
            nome_resposta: formRespostaEventoRisco,
            descricao_resposta: formDescricaoRespostaEventoRisco
        };

        let insercaoBemSucedida = false;
        try {
            const result = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_RESPOSTA_EVENTO_RISCO, novaRepostaEventoRisco);

            if (result.status === 201) {

                insercaoBemSucedida = true;

                toast.success("Resposta de Evento de risco salva com sucesso.");
            } else {
                toast.error('Erro ao tentar salvar a Resposta de Evento de risco`', error);
            }

        } catch (error) {
            toast.error('Erro ao tentar salvar a Resposta de Evento de risco`', error);
        } finally {
            if (insercaoBemSucedida) {

                //Limpa todos os dados do formulário

                setFormRespostaEventoRisco('');
                setFormDescricaoRespostaEventoRisco('');
            }
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Cadastros : Risco" nomeSessao="Cadastro de Resposta de Evento de Risco" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

                    <InternalArea>

                        <TextInput
                            maxLength="20"
                            nomeComponente="respostaeventorisco"
                            required
                            valorComponente={formRespostaEventoRisco}
                            valorLabel="Resposta Evento de Risco"
                            autoComplete="resposta evento"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite a Resposta"
                            type='text'
                            onChange={handleRespostaEventoRisco}
                        />

                        <TextAreaInput
                            maxLength="500"
                            nomeComponente="descricao"
                            required
                            valorComponente={formDescricaoRespostaEventoRisco}
                            valorLabel="Descrição"
                            autoComplete="descrição"
                            autofocus={false}
                            placeholder="Digite a descrição"
                            rows='5'
                            cols='40'
                            onChange={handleDescricao}

                        />

                    </InternalArea>

                </FormPadrao>

                <InternalButtonArea>
                    <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                        Retornar para Lista de Registros
                    </ButtonComponent>
                    <ButtonComponent tipo="sucesso" onClick={handleCreateSubmit}>
                        Salvar Novo Registro
                    </ButtonComponent>
                </InternalButtonArea>

            </React.Fragment>
        </MainLayout>
    );
}

export default CriarRiscoRespostaEvento;
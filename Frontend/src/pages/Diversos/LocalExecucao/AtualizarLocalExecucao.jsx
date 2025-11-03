import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions'
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import InternalButtonArea from '../../../components/body/InternalButtonArea';

import TextInput from '../../../components/textinput/TextInput';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';
import RadioButtonInput from '../../../components/radiobutton/RadioButtonInput';
import ButtonComponent from '../../../components/button/ButtonComponent';

import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';

import routes from '../../../data/routes';
import axios from 'axios';

import { useFetchLocaisDeExecucao } from '../../../hooks/diversos/useFetchLocaisDeExecucao';
import { useFetchEstados } from '../../../hooks/diversos/useFetchEstados';
import { useFetchCidades } from '../../../hooks/diversos/useFetchCidades';
import { useFetchLocaisDeExecucaoTipo } from '../../../hooks/diversos/useFetchLocaisDeExecucaoTipo';

const AtualizarLocalExecucao = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.diversos_local_execucao_listar);
    }
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variável para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { locais, loading: loadingLocais } = useFetchLocaisDeExecucao(id);

    // ----------------------------------------------------------------------------------------------
    // Variaveis de Formulário
    // ----------------------------------------------------------------------------------------------
    const [formNomeLocalidade, setFormNomeLocalidade] = useState(locais?.nome || '');
    const [formEnderecoLocalidade, setFormEnderecoLocalidade] = useState(locais?.endereco || '');
    const [formBairroLocalidade, setFormBairroLocalidade] = useState(locais?.bairro || '');
    const [formLocalidadeAtivo, setFormLocalidadeAtivo] = useState(locais?.ativo || '');
    const [formEstadoLocalidadeId, setFormEstadoLocalidadeId] = useState(locais?.estado_id || '');
    const [formCidadePorEstadoId, setFormCidadePorEstadoId] = useState(locais?.cidade_id || '');
    const [formTipoLocalExecucaoId, setFormTipoLocalExecucaoId] = useState(locais?.tipo_local_execucao_id || '');
    const [formCEP, setFormCEP] = useState(locais?.cep || '');

    useEffect(() => {
        if (locais && locais.nome !== undefined) {
            setFormNomeLocalidade(locais.nome);
        }
        if (locais && locais.endereco !== undefined) {
            setFormEnderecoLocalidade(locais.endereco);
        }
        if (locais && locais.bairro !== undefined) {
            setFormBairroLocalidade(locais.bairro);
        }
        if (locais && locais.estado_id !== undefined) {
            setFormEstadoLocalidadeId(locais.estado_id);
        }
        if (locais && locais.cidade_id !== undefined) {
            setFormCidadePorEstadoId(locais.cidade_id);
        }
        if (locais && locais.ativo !== undefined) {
            setFormLocalidadeAtivo(locais.ativo);
        }
        if (locais && locais.tipo_local_execucao_id !== undefined) {
            setFormTipoLocalExecucaoId(locais.tipo_local_execucao_id);
        }
        if (locais && locais.cep !== undefined) {
            setFormCEP(locais.cep);
        }
    }, [locais])

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados DEPOIS de buscar as informações na base de dados
    // ----------------------------------------------------------------------------------------------
    const { estados, loading: loadingEstados } = useFetchEstados();
    const { cidades, loading: loadingCidades } = useFetchCidades(formEstadoLocalidadeId);
    const { locaisExecucaoTipo, loading: loadingLocaisExecucaoTipo } = useFetchLocaisDeExecucaoTipo();

    // ----------------------------------------------------------------------------------------------
    // Handle de componentes de formulário
    // ----------------------------------------------------------------------------------------------
    const handleNomeLocalidade = (e) => {
        setFormNomeLocalidade(e.target.value);
    };

    const handleEnderecoLocalidade = (e) => {
        setFormEnderecoLocalidade(e.target.value);
    };

    const handleBairroLocalidade = (e) => {
        setFormBairroLocalidade(e.target.value);
    };

    const handleTipoSedeFilial = (e) => {
        setFormTipoLocalExecucaoId(parseInt(e.target.value, 10));
    };

    const handleCEP = (e) => {
        setFormCEP(e.target.value);
    };

    // ----------------------------------------------------------------------------------------------
    // Handler da Submissão de dados para backend
    // ----------------------------------------------------------------------------------------------
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setAtualizarDesabilitado(false);

        const localExecucaoAtualizado = {
            nome: formNomeLocalidade,
            endereco: formEnderecoLocalidade,
            bairro: formBairroLocalidade,
            cidade_id: formCidadePorEstadoId,
            tipo_local_execucao_id: formTipoLocalExecucaoId,
            ativo: formLocalidadeAtivo,
            cep: formCEP
        };

        let atualizacaoBemSucedida = false;

        try {
            const result = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_LOCAL_EXECUCAO + '/' + id, localExecucaoAtualizado);

            if (result.status === 201) {
                atualizacaoBemSucedida = true;
                setAtualizarDesabilitado(true);

                toast.success("Local de execução atualizado com sucesso.", {
                    onClose: () => navegar(routes.diversos_local_execucao_listar)
                });
            } else {
                toast.error('Erro ao tentar atualizar o Local de execução`');
            }
        } catch (error) {
            toast.error('Erro ao tentar atualizar o Local de execução`', error);
        }

        if (atualizacaoBemSucedida) {
            //Limpa todos os dados do formulário
            setFormNomeLocalidade("");
            setFormEnderecoLocalidade("");
            setFormBairroLocalidade("");
            setFormLocalidadeAtivo("");
            setFormEstadoLocalidadeId("");
            setFormCidadePorEstadoId("");
            setFormTipoLocalExecucaoId("");
            setFormCEP("");
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Diversos" nomeSessao="Atualizar Locais de Execução" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea loading={loadingLocais}>

                        <TextInput
                            maxLength="100"
                            nomeComponente="nomelocalidade"
                            required
                            valorComponente={formNomeLocalidade}
                            valorLabel="Nome da Localidade"
                            autoComplete="nomelocalidade"
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o Nome da Localidade"
                            type='text'
                            onChange={handleNomeLocalidade}
                            desabilitado={true}
                        />

                        <TextInput
                            maxLength="255"
                            autofocus={true}
                            nomeComponente="endereco"
                            required
                            valorComponente={formEnderecoLocalidade}
                            valorLabel="Endereço"
                            autoComplete="endereco"
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o Endereço da localidade"
                            type='text'
                            onChange={handleEnderecoLocalidade}
                        />

                        <TextInput
                            maxLength="100"
                            nomeComponente="bairro"
                            required
                            valorComponente={formBairroLocalidade}
                            valorLabel="Bairro"
                            autoComplete="bairro"
                            autofocus={false}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o Bairro da localidade"
                            type='text'
                            onChange={handleBairroLocalidade}
                        />

                        <TextInput
                            maxLength="9"
                            nomeComponente="cep"
                            required
                            valorComponente={formCEP}
                            valorLabel="CEP"
                            autoComplete="CEP"
                            autofocus={false}
                            colSpan='1'
                            mt='2'
                            placeholder="Digite o CEP"
                            type='text'
                            onChange={handleCEP}
                        />

                        <SelectInputPadrao
                            label="Escolha um Estado"
                            options={estados}
                            optionKey="id"
                            optionValue="nome"
                            value={formEstadoLocalidadeId}
                            onChange={setFormEstadoLocalidadeId}
                            loading={loadingEstados}
                            nomeSelect="estado"
                        />

                        <SelectInputPadrao
                            label="Escolha uma Cidade"
                            options={cidades}
                            optionKey="id"
                            optionValue="nome"
                            value={formCidadePorEstadoId}
                            onChange={setFormCidadePorEstadoId}
                            loading={loadingCidades}
                            nomeSelect="cidade"
                        />

                        <RadioButtonInput
                            colSpan='2'
                            valorLabel="Tipo Local Execução"
                            opcoesLabelValue={locaisExecucaoTipo}
                            nomeComponente="tipoLocalExecucao"
                            id="id"
                            descricao="nome"
                            onChange={handleTipoSedeFilial}
                            valorSelecionado={formTipoLocalExecucaoId}
                            desabilitado={loadingLocaisExecucaoTipo}
                        />

                        <RadioButtonBooleanInput
                            valorLabel="Local de Execução Ativo?"
                            valorComponente={formLocalidadeAtivo}
                            onChange={setFormLocalidadeAtivo}
                            nomeComponenteAtivo="localidade-ativo"
                            nomeComponenteInativo="localidade-inativo"
                            colSpan='2'
                            inactiveLabel='false'
                        />

                    </InternalArea>

                    <InternalButtonArea loading={loadingLocais}>
                        <ButtonComponent tipo="cancelar" onClick={handleNavegacaoPaginaAnterior}>
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

export default AtualizarLocalExecucao;
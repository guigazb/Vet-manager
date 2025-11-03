import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useFetchDatagrid } from '../../../hooks/useFetchDatagrid';
import { useFetchRiscoRespostaEvento } from '../../../hooks/risco/useFetchRiscoRespostaEvento';
import { useFetchRiscoTipoControleAcao } from '../../../hooks/risco/useFetchRiscoTipoControleAcao';
import { useFetchRiscoUnidadeFuncional } from '../../../hooks/risco/useFetchRiscoUnidadeFuncional';
import { useFetchRiscoPlanoRespostaAcao } from '../../../hooks/risco/useFetchRiscoPlanoRespostaAcao';

import { Box } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import { DataGrid } from '@mui/x-data-grid';
import Modal from '../../../components/body/modal/Modal'

import MainLayout from '../../MainLayout';
import Actions from '../../../components/geral/Actions'
import routes from '../../../data/routes';

import axios from 'axios';
import { toast } from 'react-toastify';

import InternalButtonArea from '../../../components/body/InternalButtonArea';
import ButtonComponent from '../../../components/button/ButtonComponent';
import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import TextInput from '../../../components/textinput/TextInput';
import DatePickerUnit from '../../../components/geral/DatePickerUnit';

const ListarRiscoPlanoRespostaAcao = () => {

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { idPlanoAcaoGrupo } = location.state || {};
    const navegar = useNavigate(); // Hook para navegação

    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_plano_resposta_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Modal
    // ----------------------------------------------------------------------------------------------
    const [modalAbertoExclusao, setModalAbertoExclusao] = useState(false);

    const handleAbrirModalExclusao = () => {
        setModalAbertoExclusao(true);
    };

    const handleFecharModalExclusao = () => {
        setModalAbertoExclusao(false);
    };

    // ----------------------------------------------------------------------------------------------
    // Variaveis de backend
    // ----------------------------------------------------------------------------------------------
    const URLBackend = import.meta.env.VITE_API_URL_BACKEND +
        import.meta.env.VITE_API_URL_RISCO_PLANO_RESPOSTA_ACAO +
        "/" + idPlanoAcaoGrupo + "/datagrid";

    // ----------------------------------------------------------------------------------------------
    // Busca informações via hook
    // ----------------------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------------------
    // Variáveis de Hook
    // ----------------------------------------------------------------------------------------------    
    const { riscoRespostaEvento, loading: loadingRiscoRespostaEvento, error: errorRespostaEvento } = useFetchRiscoRespostaEvento();
    const { tipoControleAcao, loading: loadingTipoControleAcao, error: errorTipoControleAcao } = useFetchRiscoTipoControleAcao();
    const { riscoUnidadesFuncionais, loading: loadingRiscoUnidadeFuncional, error: errorRiscoUnidadeFuncional } = useFetchRiscoUnidadeFuncional(23);

    const [refetchTriggerAcaoPlanoResposta, setRefetchTriggerAcaoPlanoResposta] = useState(0);
    const { linhas, colunas, loading, error } = useFetchDatagrid(URLBackend, refetchTriggerAcaoPlanoResposta);

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [formRespostaEventoRiscoId, setFormRespostaEventoRiscoId] = useState('0');
    const [formRiscoId, setFormRiscoId] = useState('0');
    const [formControleSistematizado, setFormControleSistematizado] = useState('');
    const [formTipoControleAcaoId, setFormTipoControleAcaoId] = useState('0');
    const [formAcoesControle, setFormAcoesControle] = useState('');
    const [formAreaImplantacaoControle, setFormAreaImplantacaoControle] = useState('');
    const [formDataFinalImplantacaoControle, setFormDataFinalImplantacaoControle] = useState('');
    const [formGestorRiscoNome, setFormGestorRiscoNome] = useState('');
    const [formResponsavelAcoes, setFormResponsavelAcoes] = useState('');

    const [nomeRisco, setNomeRisco] = useState('');
    const [respostaEventoRisco, setrespostaEventoRisco] = useState('');

    const [selectedId, setSelectedId] = useState('');
    const [formRespostaEventoDesabilitado, setFormRespostaEventoDesabilitado] = useState(false);
    const [formTipoControleDesabilitado, setFormTipoControleDesabilitado] = useState(false);

    const { riscoPlanoRespostaAcao, loading: loadingRiscoPlanoRespostaAcao, error: errorRiscoPlanoRespostaAcao } = useFetchRiscoPlanoRespostaAcao(selectedId);

    useEffect(() => {
        if (riscoPlanoRespostaAcao) {
            setFormRespostaEventoRiscoId(String(riscoPlanoRespostaAcao.resposta_evento_risco_id ?? '0'));
            setFormRiscoId(String(riscoPlanoRespostaAcao.risco_id ?? '0'));
            setFormTipoControleAcaoId(String(riscoPlanoRespostaAcao.tipo_controle_acao_id ?? '0'));

            setFormControleSistematizado(riscoPlanoRespostaAcao.controle_sistematizado ?? '');
            setFormAcoesControle(riscoPlanoRespostaAcao.acao_controle ?? '');
            setFormAreaImplantacaoControle(riscoPlanoRespostaAcao.area_implantacao_controle ?? '');
            setFormDataFinalImplantacaoControle(riscoPlanoRespostaAcao.data_final_implantacao_controle ?? '');
            setFormGestorRiscoNome(riscoPlanoRespostaAcao.gestor_risco_nome ?? '');
            setFormResponsavelAcoes(riscoPlanoRespostaAcao.responsavel_nome ?? '');
        }
    }, [riscoPlanoRespostaAcao]);

    useEffect(() => {
        if (formRespostaEventoRiscoId === '4') {
            setFormRespostaEventoDesabilitado(true);
        } else {
            setFormRespostaEventoDesabilitado(false);
        }
    }, [formRespostaEventoRiscoId])

    useEffect(() => {
        if (formTipoControleAcaoId === '2' || formTipoControleAcaoId === '0') {
            setFormTipoControleDesabilitado(true);
            setFormAreaImplantacaoControle('');
        } else {
            setFormTipoControleDesabilitado(false);
        }
    }, [formTipoControleAcaoId])

    const handleControleEstabelecido = (e) => {
        setFormControleSistematizado(e.target.value);
    };

    const handleAcoesDesenhoOperacionalizacao = (e) => {
        setFormAcoesControle(e.target.value);
    }

    const handleDataIdentificacao = (e) => {
        setFormDataFinalImplantacaoControle(e.target.value);
    };

    const handleAreaResponsavel = (e) => {
        setFormAreaImplantacaoControle(e.target.value);
    }

    const handleGestorEventoRisco = (e) => {
        setFormGestorRiscoNome(e.target.value);
    }

    const handleResponsavelAcoes = (e) => {
        setFormResponsavelAcoes(e.target.value);
    }

    const handleCancelarSelecao = (e) => {
        setFormRespostaEventoRiscoId('0');
        setFormRiscoId('0');
        setFormControleSistematizado('');
        setFormTipoControleAcaoId('0');
        setFormAcoesControle('');
        setFormAreaImplantacaoControle('');
        setFormDataFinalImplantacaoControle('');
        setFormGestorRiscoNome('');
        setFormResponsavelAcoes('');
        setSelectedId('');
        setFormRespostaEventoDesabilitado(false);
        setFormTipoControleDesabilitado(false);
    }

    const handleRowClick = (param) => {
        setSelectedId(param.row.ID);
        setNomeRisco(param.row["Nome Risco"]);
        setrespostaEventoRisco(param.row["Resposta Evento Risco"]);
        setFormRespostaEventoRiscoId('0');
        setFormRiscoId('0');
        setFormControleSistematizado('');
        setFormTipoControleAcaoId('0');
        setFormAcoesControle('');
        setFormAreaImplantacaoControle('');
        setFormDataFinalImplantacaoControle('');
        setFormGestorRiscoNome('');
        setFormResponsavelAcoes('');
        setFormRespostaEventoDesabilitado(false);
        setFormTipoControleDesabilitado(false);
    }

    const handleInsertData = async (e) => {
        e.preventDefault();

        const novaAcaoPlanoResposta = {
            plano_resposta_id: idPlanoAcaoGrupo,
            risco_id: formRiscoId,
            resposta_evento_risco_id: formRespostaEventoRiscoId,
            controle_sistematizado: formControleSistematizado,
            tipo_controle_acao_id: formTipoControleAcaoId === '0' ? '' : formTipoControleAcaoId,
            acao_controle: formAcoesControle,
            gestor_risco_nome: formGestorRiscoNome,
            area_implantacao_controle: formAreaImplantacaoControle,
            data_final_implantacao_controle: formDataFinalImplantacaoControle,
            responsavel_nome: formResponsavelAcoes,
            ativo: true
        };

        let criacaoBemSucedida = false;

        try {
            const url = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_PLANO_RESPOSTA_ACAO;
            const result = await axios.post(url, novaAcaoPlanoResposta);

            if (result.status === 201) {

                criacaoBemSucedida = true;

                setRefetchTriggerAcaoPlanoResposta(prev => prev + 1);
                toast.success("Ação de Plano de Resposta salva com sucesso.");

            } else {
                toast.error('Erro ao tentar salvar Ação de Plano de Resposta `');
            }
        } catch (error) {
            toast.error('Erro ao tentar salvar Ação de Plano de Resposta `', error);
        } finally {
            if (criacaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormRespostaEventoRiscoId('0');
                setFormRiscoId('0');
                setFormControleSistematizado('');
                setFormTipoControleAcaoId('0');
                setFormAcoesControle('');
                setFormAreaImplantacaoControle('');
                setFormDataFinalImplantacaoControle('');
                setFormGestorRiscoNome('');
                setFormResponsavelAcoes('');
                setSelectedId('');
                setFormRespostaEventoDesabilitado(false);
                setFormTipoControleDesabilitado(false);
            }
        }
    }

    const handleUpdateData = async (e) => {
        e.preventDefault();

        const atualizacaoAcaoPlanoResposta = {
            id: selectedId,
            risco_id: formRiscoId,
            resposta_evento_risco_id: formRespostaEventoRiscoId,
            tipo_controle_acao_id: formTipoControleAcaoId === '0' ? '' : formTipoControleAcaoId,
            controle_sistematizado: formControleSistematizado,
            acao_controle: formAcoesControle,
            gestor_risco_nome: formGestorRiscoNome,
            area_implantacao_controle: formAreaImplantacaoControle,
            data_final_implantacao_controle: formDataFinalImplantacaoControle,
            responsavel_nome: formResponsavelAcoes
        };

        let atualizacaoBemSucedida = false;

        try {
            const url = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_PLANO_RESPOSTA_ACAO + "/" + selectedId;
            const result = await axios.put(url, atualizacaoAcaoPlanoResposta);

            if (result.status === 200) {

                atualizacaoBemSucedida = true;

                setRefetchTriggerAcaoPlanoResposta(prev => prev + 1);
                toast.success("Ação de Plano de Resposta atualizada com sucesso.");

            } else {
                toast.error('Erro ao tentar atualizar Ação de Plano de Resposta `');
            }
        } catch (error) {
            toast.error('Erro ao tentar atualizar Ação de Plano de Resposta `', error);
        } finally {
            if (atualizacaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormRespostaEventoRiscoId('0');
                setFormRiscoId('0');
                setFormControleSistematizado('');
                setFormTipoControleAcaoId('0');
                setFormAcoesControle('');
                setFormAreaImplantacaoControle('');
                setFormDataFinalImplantacaoControle('');
                setFormGestorRiscoNome('');
                setFormResponsavelAcoes('');
                setSelectedId('');
                setFormRespostaEventoDesabilitado(false);
                setFormTipoControleDesabilitado(false);
            }
        }
    }

    const handleDeleteData = async (e) => {
        e.preventDefault();

        let exclusaoBemSucedida = false;

        try {
            const url = import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO_PLANO_RESPOSTA_ACAO + '/' + selectedId;
            const result = await axios.delete(url);

            if (result.status === 200) {

                exclusaoBemSucedida = true;
                setRefetchTriggerAcaoPlanoResposta(prev => prev + 1);
                toast.success("Ação de Plano de Resposta excluído com sucesso.");
                setModalAbertoExclusao(false);
            } else {
                toast.error('Erro ao tentar excluir Ação de Plano de Resposta `');
            }
        } catch (error) {
            toast.error('Erro ao tentar excluir Ação de Plano de Resposta `', error);
        } finally {
            if (exclusaoBemSucedida) {

                //Limpa todos os dados do formulário
                setFormRespostaEventoRiscoId('0');
                setFormRiscoId('0');
                setFormControleSistematizado('');
                setFormTipoControleAcaoId('0');
                setFormAcoesControle('');
                setFormAreaImplantacaoControle('');
                setFormDataFinalImplantacaoControle('');
                setFormGestorRiscoNome('');
                setFormResponsavelAcoes('');
                setSelectedId('');
                setFormRespostaEventoDesabilitado(false);
                setFormTipoControleDesabilitado(false);
            }
        }
    }

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Risco"
                    nomeSessao="Listagem das Ações do Plano de Resposta" hasAddViewButton={false} hasFilter={false} />

                <table className="w-full border-collapse">
                    <tbody>
                        <tr className="bg-white align-text-bottom text-center">
                            <td className="border p-2 font-bold w-[18%] min-w-[100px]" rowSpan={4}>
                                <div className='p-2 text-left'>
                                    Evento de Risco
                                </div>
                                <hr></hr>
                                <div className='p-2 h-[170px] text-left text-blue-600'>
                                    <SelectInputPadrao
                                        options={riscoUnidadesFuncionais}
                                        optionKey="id"
                                        optionValue="descricao"
                                        value={formRiscoId}
                                        onChange={setFormRiscoId}
                                        loading={loadingRiscoUnidadeFuncional}
                                        nomeSelect="unidadeFuncional"
                                        autofocus={true}
                                    />
                                </div>
                            </td>
                            <td className="border p-2 bg-yellow-100 w-[12%]">
                                <b>Resposta ao<br></br>Evento</b>
                            </td>
                            <td className="border p-2 bg-green-100 w-[22%]">
                                <b>Controle estabelecido ou <br></br>a ser estabelecido</b>
                            </td>
                            <td className="border p-2 bg-green-100 w-[18%]">
                                <b>Tipo de Controle</b>
                            </td>
                            <td className="border p-2 bg-green-100 w-[22%]">
                                <b>Ações para o Desenho e/ou <br></br>Operacionalização do Controle</b>
                            </td>
                        </tr>
                        <tr className="bg-white">
                            <td className="border p-2 bg-white align-text-top text-center">
                                <SelectInputPadrao
                                    options={riscoRespostaEvento}
                                    optionKey="id"
                                    optionValue="nome_resposta"
                                    value={formRespostaEventoRiscoId}
                                    onChange={setFormRespostaEventoRiscoId}
                                    loading={loadingRiscoRespostaEvento}
                                    nomeSelect="respostaEvento"
                                    autofocus={true}
                                />
                            </td>
                            <td className="border p-2 bg-white align-text-top">
                                <TextInput
                                    maxLength="500"
                                    nomeComponente="controleEstabelecido"
                                    required
                                    valorComponente={formControleSistematizado}
                                    autoComplete="Risco"
                                    colSpan='3'
                                    mt='2'
                                    placeholder="Digite o Controle"
                                    type='text'
                                    onChange={handleControleEstabelecido}
                                    desabilitado={formRespostaEventoDesabilitado}
                                />
                            </td>
                            <td className="border p-2 bg-white">
                                <SelectInputPadrao
                                    options={tipoControleAcao}
                                    optionKey="id"
                                    optionValue="nome_tipo_controle"
                                    value={formTipoControleAcaoId}
                                    onChange={setFormTipoControleAcaoId}
                                    loading={loadingTipoControleAcao}
                                    nomeSelect="tipoControle"
                                    desabilitado={formRespostaEventoDesabilitado}
                                />
                            </td>
                            <td className="border p-2 bg-white">
                                <TextInput
                                    maxLength="50"
                                    nomeComponente="AcaoDesenhoOperacionalizacao"
                                    required
                                    valorComponente={formAcoesControle}
                                    autoComplete="AcoesDesenhoOperacionalizacao"
                                    colSpan='3'
                                    mt='2'
                                    placeholder="Ações para Desenho ou Operacionalização"
                                    type='text'
                                    onChange={handleAcoesDesenhoOperacionalizacao}
                                    desabilitado={formRespostaEventoDesabilitado}
                                />
                            </td>
                        </tr>
                        <tr className="bg-blue-100 text-center">
                            <td className="border p-2 bg-blue-100">
                                <b>Prazo Final</b>
                            </td>
                            <td className="border p-2 bg-blue-100">
                                <b>Área Responsável</b>
                            </td>
                            <td className="border p-2 bg-blue-100">
                                <b>Gestor do Evento de Risco</b>
                            </td>
                            <td className="border p-2 bg-blue-100">
                                <b>Responsável pelas ações</b>
                            </td>
                        </tr>
                        <tr className="bg-white text-center">
                            <td className="border p-2">
                                <DatePickerUnit
                                    required
                                    valorLabel={formDataFinalImplantacaoControle}
                                    onChange={handleDataIdentificacao}
                                    desabilitado={formRespostaEventoDesabilitado}
                                />
                            </td>
                            <td className="border p-2">
                                <TextInput
                                    maxLength="250"
                                    nomeComponente="areaResponsavel"
                                    required
                                    valorComponente={formAreaImplantacaoControle}
                                    autoComplete="Risco"
                                    colSpan='3'
                                    mt='2'
                                    placeholder="Digite a Área Responsável"
                                    type='text'
                                    onChange={handleAreaResponsavel}
                                    desabilitado={formRespostaEventoDesabilitado || formTipoControleDesabilitado}
                                />
                            </td>
                            <td className="border p-2">
                                <TextInput
                                    maxLength="250"
                                    nomeComponente="gestorEventoRisco"
                                    required
                                    valorComponente={formGestorRiscoNome}
                                    autoComplete="Risco"
                                    colSpan='3'
                                    mt='2'
                                    placeholder="Digite o Nome do Gestor"
                                    type='text'
                                    onChange={handleGestorEventoRisco}
                                    desabilitado={formRespostaEventoDesabilitado}
                                />
                            </td>
                            <td className="border p-2">
                                <TextInput
                                    maxLength="250"
                                    nomeComponente="ResponsavelAcoes"
                                    required
                                    autoComplete="responsavelAcoes"
                                    valorComponente={formResponsavelAcoes}
                                    colSpan='3'
                                    mt='2'
                                    placeholder="Digite o Responsável pelas Ações"
                                    type='text'
                                    onChange={handleResponsavelAcoes}
                                    desabilitado={formRespostaEventoDesabilitado}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table >

                <InternalButtonArea>

                    <ButtonComponent tipo="sucesso" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                        Retornar para tela anterior
                    </ButtonComponent>

                    <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleCancelarSelecao}>
                        Limpar Campos
                    </ButtonComponent>

                    <ButtonComponent tipo="primario" desabilitado={selectedId !== ''} tipoBotao="button" onClick={handleInsertData}>
                        Salvar Registro
                    </ButtonComponent>

                    <ButtonComponent tipo="alerta" desabilitado={!selectedId} onClick={handleUpdateData}>
                        Atualizar Registro
                    </ButtonComponent>

                    <ButtonComponent tipo="perigo" tipoBotao="button" desabilitado={!selectedId} onClick={handleAbrirModalExclusao}>
                        Excluir Registro
                    </ButtonComponent>

                </InternalButtonArea>
                <br></br>
                <Box sx={{ height: 532, width: '100%' }}>
                    <DataGrid
                        rows={linhas}
                        columns={colunas}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            }
                        }}
                        pageSizeOptions={[5, 10, 25, 50]}
                        disableMultipleSelection={true}
                        onRowClick={handleRowClick}
                        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                        showToolbar
                    />
                </Box>

                <Modal modalAberto={modalAbertoExclusao} tamanho='m' onFechar={handleFecharModalExclusao}>
                    <Modal.ModalCabecalho onFechar={handleFecharModalExclusao}>
                        Exclusão de Ação de Plano de Ação
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Deseja excluir a Ação <b>{respostaEventoRisco}</b> do Risco <b>{nomeRisco}</b>?
                    </Modal.ModalCorpo>
                    <Modal.ModalRodape>
                        <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModalExclusao}>
                            Fechar Janela
                        </ButtonComponent>
                        <ButtonComponent tipo="perigo" tipoBotao="button" onClick={handleDeleteData}>
                            Excluir Registro
                        </ButtonComponent>

                    </Modal.ModalRodape>
                </Modal>

            </React.Fragment >
        </MainLayout >
    )
}

export default ListarRiscoPlanoRespostaAcao;
import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../components/utils/AuthContext';

import routes from '../../../data/routes';
import { toast } from 'react-toastify';
import axios from 'axios';

import Actions from '../../../components/geral/Actions'
import MainLayout from '../../MainLayout';
import FormPadrao from '../../../components/body/FormPadrao';
import InternalArea from '../../../components/body/InternalArea';
import TextInput from '../../../components/textinput/TextInput';
import SelectInputPadrao from '../../../components/selectinput/SelectInputPadrao';
import InternalButtonArea from '../../../components/body/InternalButtonArea';
import ButtonComponent from '../../../components/button/ButtonComponent';
import DatePickerUnit from '../../../components/geral/DatePickerUnit';
import RadioButtonBooleanInput from '../../../components/radiobutton/RadioButtonBooleanInput';
import ComboBoxTagInput from '../../../components/body/comboBoxTagInput/ComboBoxTagInput';
import GridInterna from '../../../components/datagrid/GridInterna';
import DesenhoOperacaoRisco from '../../../components/body/DesenhoOperacaoRisco';
import Modal from '../../../components/body/modal/Modal';

import { useFetchRiscos } from '../../../hooks/risco/useFetchRiscos';
import { useFetchLocaisDeExecucao } from '../../../hooks/diversos/useFetchLocaisDeExecucao';
import { useFetchProcessosPorUnidadeFuncional } from '../../../hooks/processo/useFetchProcessosPorUnidadeFuncional';
import { useFetchUnidadeFuncionalFiltrado } from '../../../hooks/diversos/useFetchUnidadeFuncionalFiltrado';
import { useFetchRiscoCategoria } from '../../../hooks/risco/useFetchRiscoCategoria';
import { useFetchRiscoDesenhoControle } from '../../../hooks/risco/useFetchRiscoDesenhoControle';
import { useFetchRiscoOperacaoControle } from '../../../hooks/risco/useFetchRiscoOperacaoControle';
import { useFetchRiscoMatrizControle } from '../../../hooks/risco/useFetchRiscoMatrizControle';

import { useFetchRiscoDesenhoControleValor } from '../../../hooks/risco/useFetchRiscoDesenhoControleValor';
import { useFetchRiscoMatrizControlePorDesenhoOperacao } from '../../../hooks/risco/useFetchRiscoMatrizControlePorDesenhoOperacao';
import { useFetchRiscoOperacaoControleValor } from '../../../hooks/risco/useFetchRiscoOperacaoControleValor';
import { useFetchRiscoTags } from '../../../hooks/risco/useFetchRiscoTags';
import { useFetchTags } from '../../../hooks/diversos/useFetchTags';
import { useFetchRiscoCausa } from '../../../hooks/risco/useFetchRiscoCausa';
import { useFetchRiscoControleExistente } from '../../../hooks/risco/useFetchRiscoControleExistente';
import { useFetchRiscoConsequencia } from '../../../hooks/risco/useFetchRiscoConsequencia';

const getCorDeFundoMatrizRisco = (limiteInicial, limiteFinal) => {
    if (limiteInicial === 1) return '#E31E36';
    if (limiteInicial >= 2 && limiteFinal <= 4) return '#C25C68';
    if (limiteInicial >= 5 && limiteFinal <= 9) return '#F8BA00';
    if (limiteInicial >= 10 && limiteFinal <= 16) return '#FFDD00';
    if (limiteInicial >= 17 && limiteFinal <= 20) return '#DAFF47';
    if (limiteInicial >= 20) return '#B0C23D';
    return 'white';
};

const getCorDeFundoGeral = (valor) => {
    return valor === '1'
        ? '#FF4F64'
        : valor === '2'
            ? '#F8BA00'
            : valor === '3'
                ? '#FFDD00'
                : valor === '4'
                    ? '#DAFF47'
                    : valor === '5'
                        ? '#B0C23D'
                        : 'white';
};

const AtualizarRisco = () => {

    // Acessa o AuthContext para pegar os dados do usuário autenticado
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate(); // Hook para navegação

    // ----------------------------------------------------------------------------------------------
    // Variáveis de backend
    // ----------------------------------------------------------------------------------------------
    const localExecucaoId = auth?.local_execucao_id;

    useEffect(() => {
        if (!localExecucaoId) { // Verifica se é null ou undefined
            logout(); // Executa o logout do AuthContext
            localStorage.removeItem('token'); // Remove o token do localStorage (se aplicável)
            navigate('/login', { replace: true }); // Redireciona para a página de login
        }
    }, [localExecucaoId, logout, navigate]);

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Modal
    // ----------------------------------------------------------------------------------------------
    const [modalAberto, setModalAberto] = useState(false);

    const handleAbrirModal = () => {
        setModalAberto(true);
    };

    const handleFecharModal = () => {
        setModalAberto(false);
    };

    // ----------------------------------------------------------------------------------------------
    // URLs de retorno do Backend
    // ----------------------------------------------------------------------------------------------
    const [atualizarDesabilitado, setAtualizarDesabilitado] = useState(false);

    // ----------------------------------------------------------------------------------------------
    // Variáveis de estado
    // ----------------------------------------------------------------------------------------------
    const location = useLocation();
    const { id, unidadeFuncional } = location.state || {};

    const navegar = useNavigate();
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { risco, loading: loadingRisco } = useFetchRiscos(id);

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [formDescricao, setFormDescricao] = useState(risco?.descricao || '');
    const [formProcessoId, setFormProcessoId] = useState(risco?.processo_id || '0');
    const [formDataIdentificacao, setFormDataIdentificacao] = useState(risco?.data_identificacao || '');
    const [formCategoriaId, setFormCategoriaId] = useState(risco?.categoria_id || '0');
    const [formDesenhoControleId, setFormDesenhoControleId] = useState(risco?.desenho_controle_id || '0');
    const [formOperacaoControleId, setFormOperacaoControleId] = useState(risco?.operacao_controle_id || '0');
    const [formMatrizControleId, setFormMatrizControleId] = useState(risco?.matriz_controle_id || '0');
    const [formAtivo, setFormAtivo] = useState(risco?.ativo || '');

    const [formRiscoTagIds, setFormRiscoTagIds] = useState([]);

    const [formUnidadeFuncionalFiltradaId, setFormUnidadeFuncionalFiltradaId] = useState('0');
    const [formNomeLocal, setFormNomeLocal] = useState('');
    const [desenhoControleValor, setDesenhoControleValor] = useState('0');
    const [operacaoControleValor, setOperacaoControleValor] = useState('0');

    const [causas, setCausas] = useState([]);
    const [consequencias, setConsequencias] = useState([]);
    const [controles, setControlesExistentes] = useState([]);

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { locais, loading: loadingLocais } = useFetchLocaisDeExecucao(localExecucaoId);
    const { riscoCategoria, loading: loadingRiscoCategoria } = useFetchRiscoCategoria();
    const { riscoDesenhoControle, loading: loadingRiscoDesenhoControle } = useFetchRiscoDesenhoControle();
    const { riscoOperacaoControle, loading: loadingRiscoOperacaoControle } = useFetchRiscoOperacaoControle()
    const { riscoMatrizControle, loading: loadingRiscoMatrizControle } = useFetchRiscoMatrizControle();

    const { tags, loading: loadingTags } = useFetchTags();
    const { tagsRisco, loading: loadingRiscoTags } = useFetchRiscoTags(id);

    const { riscoCausa, loading: loadingCausas } = useFetchRiscoCausa(id, true);
    const { riscoConsequencia, loading: loadingRiscoConsequencia } = useFetchRiscoConsequencia(id, true);
    const { controleExistente, loading: loadingRiscoControleExistente } = useFetchRiscoControleExistente(id, true);

    useEffect(() => {
        if (tagsRisco && tagsRisco.length > 0) {
            // Extrair os IDs das tags associadas ao risco
            const tagIds = tagsRisco.map(tag => tag.Tid).filter(id => id);
            setFormRiscoTagIds(tagIds);
        }
    }, [tagsRisco]);

    useEffect(() => {
        if (locais) {
            setFormNomeLocal(locais.nome);
        }
    }, [locais])

    useEffect(() => {
        if (riscoCausa) {
            setCausas(riscoCausa);
        }
    }, [riscoCausa]);

    useEffect(() => {
        if (riscoConsequencia) {
            setConsequencias(riscoConsequencia);
        }
    }, [riscoConsequencia]);

    useEffect(() => {
        if (controleExistente) {
            setControlesExistentes(controleExistente);
        }
    }, [controleExistente]);

    useEffect(() => {
        if (risco && risco.descricao !== undefined) {
            setFormDescricao(risco.descricao);
        }
        if (risco && risco.processo_id !== undefined) {
            setFormProcessoId(risco.processo_id);
        }
        if (risco && risco.categoria_id !== undefined) {
            setFormCategoriaId(risco.categoria_id);
        }
        if (risco && risco.data_identificacao !== undefined) {
            setFormDataIdentificacao(risco.data_identificacao);
        }
        if (risco && risco.desenho_controle_id !== undefined) {
            setFormDesenhoControleId(risco.desenho_controle_id);
        }
        if (risco && risco.operacao_controle_id !== undefined) {
            setFormOperacaoControleId(risco.operacao_controle_id);
        }
        if (risco && risco.matriz_controle_id !== undefined) {
            setFormMatrizControleId(risco.matriz_controle_id);
        }
        if (tagsRisco && tagsRisco.length != undefined && tagsRisco.length > 0) {
            // Extrair os IDs das tags associadas ao risco
            const tagIds = tagsRisco.map(tag => tag.Tid).filter(id => id);
            setFormRiscoTagIds(tagIds);
        }
        if (risco && risco.ativo !== undefined) {
            setFormAtivo(risco.ativo);
        }
    }, [risco])

    const { unidadeFuncionalFiltrada, loading: loadingUnidadeFuncionalFiltrada } = useFetchUnidadeFuncionalFiltrado(unidadeFuncional, 1)

    useEffect(() => {
        if (unidadeFuncionalFiltrada && unidadeFuncionalFiltrada.length > 0) {
            setFormUnidadeFuncionalFiltradaId(unidadeFuncionalFiltrada[0].id);
        }
    }, [unidadeFuncionalFiltrada]);

    const { processos: processosPorUnidadeFuncional, loading: loadingProcessosPorUnidadeFuncional } = useFetchProcessosPorUnidadeFuncional(formUnidadeFuncionalFiltradaId)
    const { riscoDesenhoControleValor, loading: loadingRiscoDesenhoControleValor } = useFetchRiscoDesenhoControleValor(formDesenhoControleId);
    const { riscoOperacaoControleValor, loading: loadingRiscoOperacaoControleValor } = useFetchRiscoOperacaoControleValor(formOperacaoControleId);
    const { riscoMatrizControlePorDesenhoOperacao, loading: loadingRiscoMatrizControleFinal } = useFetchRiscoMatrizControlePorDesenhoOperacao(desenhoControleValor, operacaoControleValor);

    useEffect(() => {
        if (riscoDesenhoControleValor && riscoDesenhoControleValor.valor !== undefined) {
            setDesenhoControleValor(riscoDesenhoControleValor.valor);
        }
    }, [riscoDesenhoControleValor])

    useEffect(() => {
        if (riscoOperacaoControleValor && riscoOperacaoControleValor.valor !== undefined) {
            setOperacaoControleValor(riscoOperacaoControleValor.valor);
        }
    }, [riscoOperacaoControleValor])

    useEffect(() => {
        if (riscoMatrizControlePorDesenhoOperacao && riscoMatrizControlePorDesenhoOperacao.id !== undefined) {
            const matrizSelecionada = riscoMatrizControle.find(
                (opcao) => opcao.id.toString() === riscoMatrizControlePorDesenhoOperacao.id.toString()
            );
            if (matrizSelecionada) {
                setFormMatrizControleId(riscoMatrizControlePorDesenhoOperacao.id.toString());
            } else {
                setFormMatrizControleId('0');
            }
        } else {
            setFormMatrizControleId('0');
        }
    }, [riscoMatrizControlePorDesenhoOperacao, riscoMatrizControle, desenhoControleValor, operacaoControleValor]);

    // ----------------------------------------------------------------------------------------------
    // Handles dos campos do formulário
    // ----------------------------------------------------------------------------------------------
    const handleDescricaoChange = (e) => {
        setFormDescricao(e.target.value);
    };

    const handleDataIdentificacao = (e) => {
        setFormDataIdentificacao(e.target.value);
    };

    const handleNavegacaoCausasRisco = () => {
        const riscoId = id;
        navegar(routes.risco_causa_listar, { state: { riscoId, unidadeFuncional } });
    };

    const handleNavagacaoConsequenciasRisco = () => {
        const riscoId = id;
        navegar(routes.risco_consequencia_listar, { state: { riscoId, unidadeFuncional } });
    };

    const handleNavegacaoControlesRisco = () => {
        const riscoId = id;
        navegar(routes.risco_controle_existente_listar, { state: { riscoId, unidadeFuncional } });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setAtualizarDesabilitado(false);

        // Validar se as tags são um array válido
        const tagsArray = Array.isArray(formRiscoTagIds) ? formRiscoTagIds : [];

        const atualizacaoRisco = {
            processo_id: formProcessoId,
            descricao: formDescricao,
            data_identificacao: formDataIdentificacao,
            categoria_id: formCategoriaId,
            desenho_controle_id: formDesenhoControleId,
            operacao_controle_id: formOperacaoControleId,
            matriz_controle_id: formMatrizControleId,
            tags: tagsArray, // Enviando as tags como array
            ativo: true
        };

        let criacaoBemSucedida = false;

        try {
            const resultRisco = await axios.put(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO + "/" + id, atualizacaoRisco);

            if (resultRisco.status === 201) {
                criacaoBemSucedida = true;
                setAtualizarDesabilitado(true);

                // Verifica se as tags foram inseridas
                const tagsInseridas = resultRisco.data.tags || [];

                if (tagsArray.length > 0 && tagsInseridas.length > 0) {
                    toast.success(`Risco salvo com sucesso! ${tagsInseridas.length} tag(s) associada(s).`);
                } else if (tagsArray.length > 0 && tagsInseridas.length === 0) {
                    toast.warning("Risco salvo, mas houve um problema ao associar as tags.");
                } else {
                    toast.success("Risco salvo com sucesso.", {
                        onClose: () => navegar(routes.risco_listar)
                    });
                }
            } else {
                toast.error('Erro ao tentar atualizar o Risco');
            }
        } catch (error) {
            toast.error('Erro ao tentar atualizar o Risco', error);
        }

        if (criacaoBemSucedida) {
            //Limpa todos os dados do formulário
            setFormDescricao('');
            setFormDataIdentificacao('');
            setFormProcessoId('0');
            setFormCategoriaId('0');
            setFormDesenhoControleId('0');
            setFormOperacaoControleId('0');
            setFormMatrizControleId('0');
            setDesenhoControleValor('0');
            setOperacaoControleValor('0');
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Riscos" nomeSessao="Atualizar Riscos" hasAddViewButton={false} hasFilter={false} />

                <InternalArea>
                    <div className="sm:col-span-9 text-center">
                        Local de Execução: <b className='font-bold text-black'>{formNomeLocal}</b> | Unidade Funcional: <b className='font-bold text-red-600'>{unidadeFuncional}</b>
                    </div>
                </InternalArea>

                <FormPadrao onSubmit={handleUpdateSubmit}>

                    <InternalArea>

                        <TextInput
                            maxLength="50"
                            nomeComponente="risco"
                            required
                            valorComponente={formDescricao}
                            valorLabel="Risco"
                            autoComplete="Risco"
                            autofocus={true}
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o Risco"
                            type='text'
                            onChange={handleDescricaoChange}
                        />

                        <SelectInputPadrao
                            label="Processos"
                            options={processosPorUnidadeFuncional}
                            optionKey="processo_id"
                            optionValue="processo_nome"
                            value={formProcessoId}
                            onChange={setFormProcessoId}
                            loading={loadingProcessosPorUnidadeFuncional}
                            nomeSelect="processo"
                            colSpan="4"
                        />

                        <SelectInputPadrao
                            label="Categoria do Risco"
                            options={riscoCategoria}
                            optionKey="id"
                            optionValue="nome"
                            value={formCategoriaId}
                            onChange={setFormCategoriaId}
                            loading={loadingRiscoCategoria}
                            nomeSelect="categoria"
                            colSpan="3"
                        />

                        <DatePickerUnit
                            nomeComponente="Data de Identificação"
                            required
                            valorLabel={formDataIdentificacao}
                            onChange={handleDataIdentificacao}
                            colSpan='2'
                        />

                        <ComboBoxTagInput
                            nomeComponente="Tags"
                            valorLabel="tags"
                            options={tags}          // Array de objetos com suas opções
                            optionKey="id"          // Propriedade usada como valor
                            optionValue="nome"      // Propriedade exibida na interface
                            value={formRiscoTagIds} // Array de valores selecionados
                            onChange={setFormRiscoTagIds} // Função ao selecionar
                            placeholder="Selecione ou adicione uma tag"
                            multiple={true}        // Permite múltiplas seleções
                            loading={loadingTags}
                            required={true}
                            colSpan="4"
                            autofocus={false}
                            open={false}
                        />

                        <RadioButtonBooleanInput
                            valorLabel="Risco Ativo?"
                            valorComponente={formAtivo}
                            onChange={setFormAtivo}
                            nomeComponenteAtivo="risco-ativo"
                            nomeComponenteInativo="risco-inativo"
                            colSpan='1'
                            inactiveLabel='true'
                        />

                    </InternalArea>

                    <InternalArea>

                        <SelectInputPadrao
                            label="Desenho Controle"
                            options={riscoDesenhoControle}
                            optionKey="id"
                            optionValue="desenho_controle"
                            value={formDesenhoControleId}
                            onChange={setFormDesenhoControleId}
                            loading={loadingRiscoDesenhoControle}
                            nomeSelect="desenhoControle"
                            tipoDado="desenho"
                            colSpan="3"
                            style={{
                                backgroundColor: getCorDeFundoGeral(desenhoControleValor?.toString() || '0'),
                                color: 'black',
                                padding: '8px',
                                borderRadius: '0.375rem',
                                border: '1px solid #e5e7eb',
                            }}
                            optionStyle={(option) => ({
                                backgroundColor: getCorDeFundoGeral(option.valor?.toString() || '0'),
                                color: 'black',
                            })}
                        />

                        <SelectInputPadrao
                            label="Operação Controle"
                            options={riscoOperacaoControle}
                            optionKey="id"
                            optionValue="operacao_controle"
                            value={formOperacaoControleId}
                            onChange={setFormOperacaoControleId}
                            loading={loadingRiscoOperacaoControle}
                            nomeSelect="operacaoControle"
                            tipoDado="operacao"
                            colSpan="3"
                            style={{
                                backgroundColor: getCorDeFundoGeral(operacaoControleValor?.toString() || '0'),
                                color: 'black',
                                padding: '8px',
                                borderRadius: '0.375rem',
                                border: '1px solid #e5e7eb',
                            }}
                            optionStyle={(option) => ({
                                backgroundColor: getCorDeFundoGeral(option.valor?.toString() || '0'),
                                color: 'black',
                            })}
                        />

                        <SelectInputPadrao
                            label="Matriz Controle"
                            options={riscoMatrizControle}
                            optionKey="id"
                            optionValue="matriz_controle"
                            value={formMatrizControleId}
                            onChange={setFormMatrizControleId}
                            loading={loadingRiscoMatrizControle}
                            nomeSelect="matrizcontrole"
                            tipoDado="matriz_controle"
                            colSpan="3"
                            desabilitado={true}
                            mapearCorFundo={(opcao) =>
                                opcao && opcao.limite_inicial !== undefined && opcao.limite_final !== undefined
                                    ? getCorDeFundoMatrizRisco(opcao.limite_inicial, opcao.limite_final)
                                    : 'white'
                            }
                            corForcada={
                                riscoMatrizControlePorDesenhoOperacao?.limite_inicial !== undefined &&
                                    riscoMatrizControlePorDesenhoOperacao?.limite_final !== undefined
                                    ? getCorDeFundoMatrizRisco(
                                        riscoMatrizControlePorDesenhoOperacao.limite_inicial,
                                        riscoMatrizControlePorDesenhoOperacao.limite_final
                                    )
                                    : 'white'
                            }
                        />

                        <div className={`sm:col-span-2`}>
                            <br></br>
                            <div className="mt-2">
                                <a onClick={handleAbrirModal} className='text-blue-700 underline cursor-pointer'>Ajuda</a>
                            </div>
                        </div>

                    </InternalArea>

                    <InternalArea>

                        <GridInterna data={causas} campo_exibicao="descricao" titulo="Causas" registrosNaoEncontrados="Causas não cadastradas">
                            <ButtonComponent tipo="info" tipoBotao='button' onClick={handleNavegacaoCausasRisco}>
                                Editar Causas do risco
                            </ButtonComponent>
                            <br></br><br></br>
                        </GridInterna>

                        <GridInterna data={consequencias} campo_exibicao="descricao" titulo="Consequencias" registrosNaoEncontrados="Consequencias não cadastradas">
                            <ButtonComponent tipo="info" tipoBotao='button' onClick={handleNavagacaoConsequenciasRisco}>
                                Editar Consequencias do risco
                            </ButtonComponent>
                            <br></br><br></br>
                        </GridInterna>

                        <GridInterna data={controles} campo_exibicao="nome_controle_existente" titulo="Controles" registrosNaoEncontrados="Controles não cadastrados">
                            <ButtonComponent tipo="info" tipoBotao='button' onClick={handleNavegacaoControlesRisco}>
                                Editar Controles do risco
                            </ButtonComponent>
                            <br></br><br></br>
                        </GridInterna>

                    </InternalArea>

                    <InternalButtonArea loading={loadingRisco}>

                        <ButtonComponent tipo="cancelar" tipoBotao='button' onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>

                        <ButtonComponent tipo="alerta" tipoBotao='submit' desabilitado={atualizarDesabilitado}>
                            Atualizar Registro
                        </ButtonComponent>

                    </InternalButtonArea>

                </FormPadrao>

                <Modal modalAberto={modalAberto} tamanho='gg' onFechar={handleFecharModal}>
                    <Modal.ModalCabecalho onFechar={handleFecharModal}>
                        Explicação sobre Desenho Controle, Operação Controle e Matriz Controle
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        <DesenhoOperacaoRisco></DesenhoOperacaoRisco>
                    </Modal.ModalCorpo>
                    <Modal.ModalRodape>
                        <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModal}>
                            Fechar Janela
                        </ButtonComponent>
                    </Modal.ModalRodape>
                </Modal>

            </React.Fragment>
        </MainLayout>
    )
}

export default AtualizarRisco
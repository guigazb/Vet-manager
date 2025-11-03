import React, { useState, useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import routes from '../../../data/routes';
import { toast } from 'react-toastify';
import axios from 'axios';

import { AuthContext } from '../../../components/utils/AuthContext';

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

import Modal from '../../../components/body/modal/Modal';

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

const ExcluirRisco = () => {

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
    const [modalAbertoExclusao, setModalAbertoExclusao] = useState(false);
    const [modalAbertoAjuda, setModalAbertoAjuda] = useState(false);
    const formRef = useRef(null); // Cria uma referência para o formulário

    const handleAbrirModalExclusao = () => {
        setModalAbertoExclusao(true);
    };

    const handleFecharModalExclusao = () => {
        setModalAbertoExclusao(false);
    };

    const handleAbrirModalAjuda = () => {
        setModalAbertoAjuda(true);
    };

    const handleFecharModalAjuda = () => {
        setModalAbertoAjuda(false);
    };

    const handleConfirmarExclusaoNoModal = () => {
        if (formRef.current) {
            formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
        }
    };

    // ----------------------------------------------------------------------------------------------
    // URLs de retorno do Backend
    // ----------------------------------------------------------------------------------------------
    const [excluirDesabilitado, setExcluirDesabilitado] = useState(false);

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
    const { tipoControleExistente, loading: loadingRiscoControleExistente } = useFetchRiscoControleExistente(id, true);

    useEffect(() => {
        if (locais) {
            setFormNomeLocal(locais.nome);
        }
    }, [locais]);

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
        if (tipoControleExistente) {
            setControlesExistentes(tipoControleExistente);
        }
    }, [tipoControleExistente]);

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
            setFormMatrizControleId(riscoMatrizControlePorDesenhoOperacao.id);
        }
    }, [riscoMatrizControlePorDesenhoOperacao])

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        setExcluirDesabilitado(false);

        try {
            const result = await axios.delete(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO + "/" + id);

            if (result.status === 204) {
                setExcluirDesabilitado(true);
                setModalAbertoExclusao(false);

                toast.success("Risco excluido com sucesso.",
                    {
                        onClose: () => navegar(routes.risco_listar)
                    });
            } else {
                toast.error('Erro ao tentar excluir o Risco');
            }
        } catch (error) {
            toast.error('Erro ao tentar excluir o Risco', error);
        }
    };

    return (
        <MainLayout>
            <React.Fragment>

                <Actions breadcrumb="Início : Riscos" nomeSessao="Excluir Riscos" hasAddViewButton={false} hasFilter={false} />

                <InternalArea>
                    <div className="sm:col-span-9 text-center">
                        Local de Execução: <b className='font-bold text-black'>{formNomeLocal}</b> | Unidade Funcional: <b className='font-bold text-red-600'>{unidadeFuncional}</b>
                    </div>
                </InternalArea>

                <FormPadrao Ref={formRef} onSubmit={handleDeleteSubmit}>

                    <InternalArea>

                        <TextInput
                            maxLength="50"
                            nomeComponente="risco"
                            required
                            valorComponente={formDescricao}
                            valorLabel="Risco"
                            autoComplete="Risco"
                            colSpan='3'
                            mt='2'
                            placeholder="Digite o Risco"
                            type='text'
                            desabilitado={true}
                        />

                        <SelectInputPadrao
                            label="Processos"
                            options={processosPorUnidadeFuncional}
                            optionKey="processo_id"
                            optionValue="processo_nome"
                            value={formProcessoId}
                            loading={loadingProcessosPorUnidadeFuncional}
                            nomeSelect="processo"
                            colSpan="4"
                            desabilitado={true}
                        />

                        <SelectInputPadrao
                            label="Categoria do Risco"
                            options={riscoCategoria}
                            optionKey="id"
                            optionValue="nome"
                            value={formCategoriaId}
                            loading={loadingRiscoCategoria}
                            nomeSelect="categoria"
                            colSpan="3"
                            desabilitado={true}
                        />

                        <DatePickerUnit
                            nomeComponente="Data de Identificação"
                            required
                            valorLabel={formDataIdentificacao}
                            colSpan='2'
                            desabilitado={true}
                        />

                        <ComboBoxTagInput
                            nomeComponente="Tags"
                            valorLabel="tags"
                            options={tags}          // Array de objetos com suas opções
                            optionKey="id"          // Propriedade usada como valor
                            optionValue="nome"      // Propriedade exibida na interface
                            value={formRiscoTagIds} // Array de valores selecionados
                            placeholder="Selecione ou adicione uma tag"
                            multiple={true}        // Permite múltiplas seleções
                            loading={loadingTags}
                            required={true}
                            colSpan="4"
                            autofocus={true}
                            desabilitado
                        />

                        <RadioButtonBooleanInput
                            valorLabel="Risco Ativo?"
                            valorComponente={formAtivo}
                            onChange={setFormAtivo}
                            nomeComponenteAtivo="risco-ativo"
                            nomeComponenteInativo="risco-inativo"
                            colSpan='1'
                            inactiveLabel='true'
                            desabilitado={true}
                        />

                    </InternalArea>

                    <InternalArea>

                        <SelectInputPadrao
                            label="Desenho Controle"
                            options={riscoDesenhoControle}
                            optionKey="id"
                            optionValue="desenho_controle"
                            value={formDesenhoControleId}
                            loading={loadingRiscoDesenhoControle}
                            nomeSelect="desenhoControle"
                            colSpan="3"
                            desabilitado={true}
                        />

                        <SelectInputPadrao
                            label="Operação Controle"
                            options={riscoOperacaoControle}
                            optionKey="id"
                            optionValue="operacao_controle"
                            value={formOperacaoControleId}
                            loading={loadingRiscoOperacaoControle}
                            nomeSelect="operacaoControle"
                            colSpan="3"
                            desabilitado={true}
                        />

                        <SelectInputPadrao
                            label="Matriz Controle"
                            options={riscoMatrizControle}
                            optionKey="id"
                            optionValue="matriz_controle"
                            value={formMatrizControleId}
                            loading={loadingRiscoMatrizControle}
                            nomeSelect="matrizcontrole"
                            colSpan="3"
                            desabilitado={true}
                        />

                        <div className={`sm:col-span-2`}>
                            <br></br>
                            <div className="mt-2">
                                <a onClick={handleAbrirModalAjuda} className='text-blue-700 underline cursor-pointer'>Ajuda</a>
                            </div>
                        </div>

                    </InternalArea>

                    <InternalArea>

                        <GridInterna data={causas} campo_exibicao="descricao" titulo="Causas" registrosNaoEncontrados="Causas não cadastradas">
                        </GridInterna>

                        <GridInterna data={consequencias} campo_exibicao="descricao" titulo="Consequencias" registrosNaoEncontrados="Consequencias não cadastradas">
                        </GridInterna>

                        <GridInterna data={controles} campo_exibicao="nome_controle_existente" titulo="Controles" registrosNaoEncontrados="Controles não cadastrados">
                        </GridInterna>

                    </InternalArea>

                    <InternalButtonArea>

                        <ButtonComponent tipo="cancelar" tipoBotao='button' onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>

                        <ButtonComponent tipo="alerta" tipoBotao='button' desabilitado={excluirDesabilitado} onClick={handleAbrirModalExclusao}>
                            Excluir Registro
                        </ButtonComponent>

                    </InternalButtonArea>

                </FormPadrao>

                <Modal modalAberto={modalAbertoExclusao} onFechar={handleFecharModalExclusao}>
                    <Modal.ModalCabecalho onFechar={handleFecharModalExclusao}>
                        Exclusão de Risco
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>
                        Tem certeza que deseja excluir o registro <br />[<b>{formDescricao}</b>]?
                    </Modal.ModalCorpo>
                    <Modal.ModalRodape>
                        <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModalExclusao}>
                            Fechar Janela
                        </ButtonComponent>
                        <ButtonComponent tipo="perigo" tipoBotao="button" onClick={handleConfirmarExclusaoNoModal}>
                            Excluir Registro
                        </ButtonComponent>
                    </Modal.ModalRodape>
                </Modal>

                <Modal modalAberto={modalAbertoAjuda} tamanho='gg' onFechar={handleFecharModalAjuda}>
                    <Modal.ModalCabecalho onFechar={handleFecharModalAjuda}>
                        Explicação sobre Desenho Controle, Operação Controle e Matriz Controle
                    </Modal.ModalCabecalho>
                    <Modal.ModalCorpo>

                        <table className="w-full border-collapse border-spacing-3">
                            <thead className='text-white bg-black h-[30px]'>
                                <tr>
                                    <th className="w-1/3 bg-gray-800 text-center">Desenho dos Controles</th>
                                    <th className="w-1/3 bg-gray-800 text-center border-l-2 border-r-2">Operação dos Controles</th>
                                    <th className="w-1/3 bg-gray-800 text-center">Matriz de Controle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-black text-[12px]'>
                                    <td className="w-1/3 bg-[#FF4F64] text-center p-2">
                                        <b>1 - Não há controle</b>
                                    </td>
                                    <td className="w-1/3 bg-[#FF4F64] text-center p-2 border-l-2 border-r-2">
                                        <b>1 - Não executado</b>
                                    </td>
                                    <td className="w-1/3 bg-[#B0C23D] text-center p-2">
                                        <b>Controle Forte (25)</b> - Controles que mitigam todos os aspectos
                                        relevantes do risco. Totalmente
                                        automatizado (quando possível) e detectível.
                                        Não há necessidade de mais ações.
                                    </td>
                                </tr>
                                <tr className='text-black text-[12px]'>
                                    <td className="w-1/3 bg-[#F8BA00] text-center p-2">
                                        <b>2 - Controle Informal</b> - Existe controle, mas é executado de acordo
                                        com a dinâmica do dia a dia e/ou de acordo
                                        com a experiência dos servidores/empregados, sem formalização.
                                    </td>
                                    <td className="w-1/3 bg-[#F8BA00] text-center p-2 border-l-2 border-r-2">
                                        <b>2 - Parcialmente executado</b> - O controle não está completo e, apesar de uma
                                        parte estar em execução, apresenta falhas.
                                    </td>
                                    <td className="w-1/3 bg-[#DAFF47] text-center p-2">
                                        <b>Controle Suficiente (20)</b> - São usadas ferramentas adequadas que
                                        mitigam satisfatoriamente o risco. Mas, deve
                                        haver um aprimoramento, com controles
                                        confiáveis e seguros, a fim de garantir
                                        consistência, precisão e tempestividade.
                                    </td>
                                </tr>
                                <tr className='text-black text-[12px]'>
                                    <td className="w-1/3 bg-[#FFDD00] text-center p-2">
                                        <b>3 - Controle formalizado, mas insuficiente</b> -
                                        Há controle, mas não atende à necessidade. Não está
                                        adequado e sem revisões periódicas.
                                    </td>
                                    <td className="w-1/3 bg-[#FFDD00] text-center p-2 border-l-2 border-r-2">
                                        <b>3 - Executado e sem evidência</b> - O controle existe e está em execução. No
                                        entanto, apresenta falhas e não há
                                        comprovações de que está sendo executado.
                                    </td>
                                    <td className="w-1/3 bg-[#FFDD00] text-center p-2">
                                        <b>Controle Mínimo (10-16)</b> - Há controles formalizados que mitigam
                                        alguns aspectos do risco, mas não todos. Há a
                                        necessidade de planejamento e formalização
                                        de mais ou novas atividades de controle.
                                    </td>
                                </tr>
                                <tr className='text-black text-[12px]'>
                                    <td className="w-1/3 bg-[#DAFF47] text-center p-2">
                                        <b>4 - Controle formalizado e suficiente</b> - O controle foi planejado, discutido e
                                        formalizado. É suficiente, mas necessita de
                                        melhorias para ser potencializado.
                                    </td>
                                    <td className="w-1/3 bg-[#DAFF47] text-center p-2 border-l-2 border-r-2">
                                        <b>4 - Executado e com evidências</b> - O controle existe e está em execução. Há
                                        comprovações de que está sendo executado.
                                        Todavia, necessita de melhorias a fim de atender,
                                        em sua totalidade, à dinâmica do dia a dia.
                                    </td>
                                    <td className="w-1/3 bg-[#F8BA00] text-center p-2">
                                        <b>Controle Inicial (5-9)</b> - Pode estar mal desenhado ou
                                        implementado. Obrigatoriamente, deve
                                        haver melhorias significativas nos
                                        controles. Repensá-los é fundamental.
                                    </td>
                                </tr>
                                <tr className='text-black text-[12px]'>
                                    <td className="w-1/3 bg-[#B0C23D] text-center p-2">
                                        <b>5 - Controle formalizado, suficiente e eficaz</b> - Adequadamente planejado, discutido, testado, compartilhado
                                        e documentado, com correções e aperfeiçoamentos
                                        planejados de forma tempestiva, possivelmente informatizado
                                        e atendendo à necessidade para mitigar o risco.
                                    </td>
                                    <td className="w-1/3 bg-[#B0C23D] text-center p-2 border-l-2 border-r-2">
                                        <b>5 - Executado, testado e com evidências</b> - Controle existente, realizado de maneira uniforme pela
                                        equipe e na frequência desejada. Há comprovações de que
                                        está sendo executado. Periodicamente, é testado e
                                        aperfeiçoado, atendendo satisfatoriamente à dinâmica do
                                        dia a dia, mitigando a existência do risco.
                                    </td>
                                    <td className="w-1/3 bg-[#C25C68] text-center p-2">
                                        <b>Controle Fraco (2-4)</b> - É executado de acordo com a dinâmica do dia a
                                        dia e/ou com base na experiência das pessoas.
                                        Obrigatoriamente, deve haver planejamento,
                                        análise, discussão e formalização dos controles.
                                        Torna-se um problema continuar neste nível.
                                    </td>
                                </tr>
                                <tr className='text-black text-[12px]'>
                                    <td className="w-1/3 bg-[transparent] text-center p-2">
                                        &nbsp;
                                    </td>
                                    <td className="w-1/3 bg-[transparent] text-center p-2">
                                        &nbsp;
                                    </td>
                                    <td className="w-1/3 bg-[#E31E36] text-center p-2  border-l-2">
                                        <b>Controle Inexistente (1)</b> - Neste nível, nada foi feito ou perdeu-se o
                                        objetivo, necessitando de uma avaliação
                                        completa e planejamento de ações.
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </Modal.ModalCorpo>
                    <Modal.ModalRodape>
                        <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModalAjuda}>
                            Fechar Janela
                        </ButtonComponent>
                    </Modal.ModalRodape>
                </Modal>

            </React.Fragment>
        </MainLayout>
    )
}

export default ExcluirRisco
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

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
import ComboBoxTagInput from '../../../components/body/comboBoxTagInput/ComboBoxTagInput';

import Modal from '../../../components/body/modal/Modal';

import { useFetchTags } from '../../../hooks/diversos/useFetchTags';
import { useFetchRiscoCategoria } from '../../../hooks/risco/useFetchRiscoCategoria';
import { useFetchRiscoDesenhoControle } from '../../../hooks/risco/useFetchRiscoDesenhoControle';
import { useFetchRiscoOperacaoControle } from '../../../hooks/risco/useFetchRiscoOperacaoControle';
import { useFetchRiscoMatrizControle } from '../../../hooks/risco/useFetchRiscoMatrizControle';
import { useFetchUnidadesFuncionaisPorLocalExecucao } from '../../../hooks/diversos/useFetchUnidadesFuncionaisPorLocalExecucao';
import { useFetchProcessosPorUnidadeFuncional } from '../../../hooks/processo/useFetchProcessosPorUnidadeFuncional';

import { useFetchRiscoDesenhoControleValor } from '../../../hooks/risco/useFetchRiscoDesenhoControleValor';
import { useFetchRiscoMatrizControlePorDesenhoOperacao } from '../../../hooks/risco/useFetchRiscoMatrizControlePorDesenhoOperacao';
import { useFetchRiscoOperacaoControleValor } from '../../../hooks/risco/useFetchRiscoOperacaoControleValor';

const getCorDeFundoMatrizRisco = (limiteInicial, limiteFinal) => {
    if (limiteInicial === 1) return '#E31E36';
    if (limiteInicial >= 2 && limiteFinal <= 4) return '#C25C68';
    if (limiteInicial >= 5 && limiteFinal <= 9) return '#F8BA00';
    if (limiteInicial >= 10 && limiteFinal <= 16) return '#FFDD00';
    if (limiteInicial >= 17 && limiteFinal <= 20) return '#DAFF47';
    if (limiteInicial >= 20) return '#B0C23D';
    return 'transparent';
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
                        : 'transparent';
};

const CriarRisco = () => {

    // Acessa o AuthContext para pegar os dados do usuário autenticado
    const { auth, logout } = useContext(AuthContext);
    const navegar = useNavigate(); // Hook para navegação

    // ----------------------------------------------------------------------------------------------
    // Variáveis de backend
    // ----------------------------------------------------------------------------------------------
    const localExecucaoId = auth?.local_execucao_id;

    useEffect(() => {
        if (!localExecucaoId) { // Verifica se é null ou undefined
            logout(); // Executa o logout do AuthContext
            localStorage.removeItem('token'); // Remove o token do localStorage (se aplicável)
            navegar('/login', { replace: true }); // Redireciona para a página de login
        }
    }, [localExecucaoId, logout, navegar]);

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
    // Variáveis de navegação
    // ----------------------------------------------------------------------------------------------
    const handleNavegacaoPaginaAnterior = () => {
        navegar(routes.risco_listar);
    }

    // ----------------------------------------------------------------------------------------------
    // Variáveis do Form
    // ----------------------------------------------------------------------------------------------
    const [formDescricao, setFormDescricao] = useState('');
    const [formDataIdentificacao, setFormDataIdentificacao] = useState('');

    const [formUnidadeFuncionalId, setFormUnidadeFuncionalId] = useState('0');
    const [formProcessoId, setFormProcessoId] = useState('0');

    const [formCategoriaId, setFormCategoriaId] = useState('0');
    const [formTagId, setFormTagId] = useState('0');

    const [formDesenhoControleId, setFormDesenhoControleId] = useState('0');
    const [formOperacaoControleId, setFormOperacaoControleId] = useState('0');
    const [formMatrizControleId, setFormMatrizControleId] = useState('0');

    // ----------------------------------------------------------------------------------------------
    // Valores de Desenho e Operação
    // ----------------------------------------------------------------------------------------------
    const [desenhoControleValor, setDesenhoControleValor] = useState('0');
    const [operacaoControleValor, setOperacaoControleValor] = useState('0');

    // ----------------------------------------------------------------------------------------------
    // Variáveis para trazer dados 
    // ----------------------------------------------------------------------------------------------
    const { unidadesPorLocalExecucao, loading: loadingUnidadesPorLocalExecucao } = useFetchUnidadesFuncionaisPorLocalExecucao(localExecucaoId);
    const { processos, loading: loadingProcessos } = useFetchProcessosPorUnidadeFuncional(formUnidadeFuncionalId)

    const { riscoCategoria, loading: loadingRiscoCategoria } = useFetchRiscoCategoria();
    const { tags, loading: loadingTags } = useFetchTags();

    const { riscoDesenhoControle, loading: loadingRiscoDesenhoControle } = useFetchRiscoDesenhoControle();
    const { riscoOperacaoControle, loading: loadingRiscoOperacaoControle } = useFetchRiscoOperacaoControle()
    const { riscoMatrizControle, loading: loadingRiscoMatrizControle } = useFetchRiscoMatrizControle();

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
            console.log('matrizSelecionada:', matrizSelecionada);
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
    // Handles de componentes do formulário
    // ----------------------------------------------------------------------------------------------
    const handleDescricao = (e) => {
        setFormDescricao(e.target.value);
    };

    const handleDataIdentificacao = (e) => {
        setFormDataIdentificacao(e.target.value);
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        // Validar se as tags são um array válido
        const tagsArray = Array.isArray(formTagId) ? formTagId : [];

        const novoRisco = {
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
        let riscoId = null;

        try {

            const resultRisco = await axios.post(import.meta.env.VITE_API_URL_BACKEND + import.meta.env.VITE_API_URL_RISCO, novoRisco);

            if (resultRisco.status === 201) {

                // Captura o ID do Indicador recém-criado
                riscoId = resultRisco.data.risco?.id || resultRisco.data.id;
                criacaoBemSucedida = true;

                // Verifica se as tags foram inseridas
                const tagsInseridas = resultRisco.data.tags || [];

                if (tagsArray.length > 0 && tagsInseridas.length > 0) {
                    toast.success(`Risco salvo com sucesso! ${tagsInseridas.length} tag(s) associada(s).`);
                } else if (tagsArray.length > 0 && tagsInseridas.length === 0) {
                    toast.warning("Risco salvo, mas houve um problema ao associar as tags.");
                } else {
                    toast.success("Risco salvo com sucesso.");
                }

            } else {
                toast.error('Erro ao tentar salvar o Risco');
            }
        } catch (error) {
            toast.error('Erro ao tentar salvar o Risco', error);
        }

        if (criacaoBemSucedida) {
            // Limpa todos os dados do formulário
            setFormDescricao('');
            setFormDataIdentificacao('');
            setFormUnidadeFuncionalId('0');
            setFormProcessoId('0');
            setFormCategoriaId('0');
            setFormTagId([]); // Limpa as tags
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

                <Actions breadcrumb="Início : Riscos" nomeSessao="Cadastrar Riscos" hasAddViewButton={false} hasFilter={false} />

                <FormPadrao onSubmit={handleCreateSubmit}>

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
                            onChange={handleDescricao}
                        />

                        <SelectInputPadrao
                            label="Unidade Funcional"
                            options={unidadesPorLocalExecucao}
                            optionKey="unidade_funcional_id"
                            optionValue="unidade_funcional_nome"
                            value={formUnidadeFuncionalId}
                            onChange={setFormUnidadeFuncionalId}
                            loading={loadingUnidadesPorLocalExecucao}
                            nomeSelect="unidadeFuncional"
                        />

                        <SelectInputPadrao
                            label="Processos"
                            options={processos}
                            optionKey="processo_id"
                            optionValue="processo_nome"
                            value={formProcessoId}
                            onChange={setFormProcessoId}
                            loading={loadingProcessos}
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
                            optionKey="id"                // Propriedade usada como valor
                            optionValue="nome"            // Propriedade exibida na interface
                            value={formTagId}  // Valor selecionado
                            onChange={setFormTagId}  // Função ao selecionar
                            placeholder="Selecione ou adicione uma tag"
                            multiple={true} // Permite múltiplas seleções
                            loading={loadingTags}
                            required={true}
                            colSpan="4"
                            autofocus={false}
                            open={false}
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

                    <InternalButtonArea>

                        <ButtonComponent tipo="cancelar" tipoBotao="button" onClick={handleNavegacaoPaginaAnterior}>
                            Retornar para Lista de Registros
                        </ButtonComponent>

                        <ButtonComponent tipo="primario" tipoBotao="submit">
                            Salvar Novo Registro
                        </ButtonComponent>

                    </InternalButtonArea>

                </FormPadrao>

                <Modal modalAberto={modalAberto} tamanho='gg' onFechar={handleFecharModal}>
                    <Modal.ModalCabecalho onFechar={handleFecharModal}>
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
                        <ButtonComponent tipo="padrao" tipoBotao="button" onClick={handleFecharModal}>
                            Fechar Janela
                        </ButtonComponent>
                    </Modal.ModalRodape>
                </Modal>

            </React.Fragment>
        </MainLayout>
    )
}

export default CriarRisco
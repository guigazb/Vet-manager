import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SelectInputColor from '../../../components/selectinput/SelectInputColor';
import mapearCorFundo from '../../utils/ui/mapearCorFundo';
import ButtonComponent from '../../button/ButtonComponent';

const ListaAvaliacaoProbImpRow = React.memo(
    ({
        risco,
        processo_id,
        tipo,
        probabilidades,
        impactos,
        riscoReais,
        avaliacaoArea,
        avaliacaoGestao,
        avaliacaoEncerrada,
        widthPadrao,
        novoGrupoAvaliacaoId,
        onRiscoRealChange
    }) => {
        const [probabilidadeValor, setProbabilidadeValor] = useState(risco.probabilidade_id?.toString() || '0');
        const [impactoValor, setImpactoValor] = useState(risco.impacto_id?.toString() || '0');
        const [riscoRealValor, setRiscoRealValor] = useState(risco.risco_real_id?.toString() || '0');

        const [erroSalvamento, setErroSalvamento] = useState(null);
        const [statusSalvamento, setStatusSalvamento] = useState(null);
        const [tipoBotaoSalvar, setTipoBotaoSalvar] = useState('padrao');

        const userChanged = useRef(false);

        useEffect(() => {
            if (onRiscoRealChange) {
                onRiscoRealChange(risco.risco_id, riscoRealValor);
            }
        }, [riscoRealValor]);

        useEffect(() => {
            if (probabilidadeValor !== '0' && impactoValor !== '0') {
                const prob = parseInt(probabilidadeValor, 10);
                const imp = parseInt(impactoValor, 10);
                if (!isNaN(prob) && !isNaN(imp)) {
                    const valorCalculado = prob * imp;
                    const riscoRealSelecionado = riscoReais.find(
                        (r) => valorCalculado >= r.limite_inicial && valorCalculado <= r.limite_final
                    );
                    if (riscoRealSelecionado) {
                        setRiscoRealValor(riscoRealSelecionado.id.toString());
                    } else {
                        setRiscoRealValor('0');
                        setErroSalvamento('Nenhum risco real encontrado para o valor calculado.');
                    }
                } else {
                    setRiscoRealValor('0');
                    setErroSalvamento('Probabilidade ou impacto inválidos.');
                }
            } else {
                setRiscoRealValor('0');
            }
        }, [probabilidadeValor, impactoValor, riscoReais]);

        const handleSave = async () => {
            const probId = probabilidadeValor !== '0' ? parseInt(probabilidadeValor, 10) : null;
            const impId = impactoValor !== '0' ? parseInt(impactoValor, 10) : null;
            const riscoRealId = riscoRealValor !== '0' ? parseInt(riscoRealValor, 10) : null;
            const riscoId = risco.risco_id;

            setStatusSalvamento('Salvando...');
            setErroSalvamento(null);

            if (probId == null || impId == null || riscoId == null || riscoRealId == null) {
                setErroSalvamento('Probabilidade, Impacto e Nível de Risco são obrigatórios.');
                setStatusSalvamento(null);
                userChanged.current = false;
                setTipoBotaoSalvar('padrao');
                return;
            }

            const riscoRealValido = riscoReais.find((r) => r.id === riscoRealId);
            if (!riscoRealValido) {
                setErroSalvamento('Risco real inválido.');
                setStatusSalvamento(null);
                userChanged.current = false;
                setTipoBotaoSalvar('padrao');
                return;
            }

            try {
                const url = `${import.meta.env.VITE_API_URL_BACKEND}${import.meta.env.VITE_API_URL_RISCO_AVALIACAOPROBIMPACTO}/${riscoId}`;
                await axios.post(url, {
                    probabilidade_id: probId,
                    impacto_id: impId,
                    risco_real_id: riscoRealId,
                    processo_id: processo_id,
                    tipo_avaliacao: tipo,
                    grupo_avaliacao_id: novoGrupoAvaliacaoId,
                });
                setStatusSalvamento('Salvo!');
                setTipoBotaoSalvar('padrao');
                setTimeout(() => setStatusSalvamento(null), 2000);
            } catch (err) {
                console.error('Erro ao salvar avaliação:', {
                    status: err.response?.status,
                    data: err.response?.data,
                    message: err.message,
                });
                setErroSalvamento('Falha ao salvar. Tente novamente.');
                setStatusSalvamento(null);
            } finally {
                userChanged.current = false;
            }
        };

        const handleProbabilidadeChange = (valor) => {
            setProbabilidadeValor(valor);
            userChanged.current = true;
            setTipoBotaoSalvar('sucesso');
        };

        const handleImpactoChange = (valor) => {
            setImpactoValor(valor);
            userChanged.current = true;
            setTipoBotaoSalvar('sucesso');
        };

        const handleRiscoRealChange = (valor) => {
            setRiscoRealValor(valor);
            userChanged.current = true;
            setTipoBotaoSalvar('sucesso');
        };

        const prefixoUnico = `risco_${risco.risco_id}`;

        return (
            <tr className="hover:bg-gray-50 odd:bg-white even:bg-gray-100">
                <td
                    className="border p-2"
                    style={{ width: widthPadrao || '25%', wordBreak: 'break-word', whiteSpace: 'normal' }}
                >
                    {risco.risco_descricao}
                    {erroSalvamento && <span className="text-red-500 text-sm ml-2">{erroSalvamento}</span>}
                    {statusSalvamento && <span className="text-green-500 text-sm ml-2">{statusSalvamento}</span>}
                </td>
                {tipo === 'normal' && (
                    <>
                        <td className="border p-2" style={{ width: '10%' }}>
                            <SelectInputColor
                                label=""
                                options={probabilidades}
                                optionKey="id"
                                optionValue="tipo_probabilidade"
                                value={probabilidadeValor}
                                onChange={handleProbabilidadeChange}
                                nomeSelect={`${prefixoUnico}_unidade_probabilidade`}
                                mapearCorFundo={mapearCorFundo('probabilidade')}
                                corCarregando="#d3d3d3"
                                desabilitado={avaliacaoArea || avaliacaoEncerrada}
                            />
                        </td>
                        <td className="border p-2" style={{ width: '10%' }}>
                            <SelectInputColor
                                label=""
                                options={impactos}
                                optionKey="id"
                                optionValue="tipo_impacto"
                                value={impactoValor}
                                onChange={handleImpactoChange}
                                nomeSelect={`${prefixoUnico}_unidade_impacto`}
                                mapearCorFundo={mapearCorFundo('impacto')}
                                corCarregando="#d3d3d3"
                                desabilitado={avaliacaoArea || avaliacaoEncerrada}
                            />
                        </td>
                        <td className="border p-2" style={{ width: '10%' }}>
                            <SelectInputColor
                                label=""
                                options={riscoReais}
                                optionKey="id"
                                optionValue="nivel_real"
                                value={riscoRealValor}
                                onChange={handleRiscoRealChange}
                                nomeSelect={`${prefixoUnico}_unidade_risco_real`}
                                mapearCorFundo={mapearCorFundo('nivel_real')}
                                corCarregando="#d3d3d3"
                                desabilitado={true}
                            />
                        </td>
                        <td className="border p-2 items-center justify-center" style={{ width: '2%' }}>
                            <ButtonComponent tipo={tipoBotaoSalvar} tipoBotao='button' onClick={handleSave}>
                                Salvar
                            </ButtonComponent>
                        </td>
                    </>
                )}
                {tipo === 'gestao' && (
                    <>
                        <td className="border p-2" style={{ width: '10%' }}>
                            <SelectInputColor
                                label=""
                                options={probabilidades}
                                optionKey="id"
                                optionValue="tipo_probabilidade"
                                value={probabilidadeValor}
                                onChange={handleProbabilidadeChange}
                                nomeSelect={`${prefixoUnico}_gestao_probabilidade`}
                                mapearCorFundo={mapearCorFundo('probabilidade')}
                                corCarregando="#d3d3d3"
                                desabilitado={avaliacaoGestao || avaliacaoEncerrada}
                            />
                        </td>
                        <td className="border p-2" style={{ width: '10%' }}>
                            <SelectInputColor
                                label=""
                                options={impactos}
                                optionKey="id"
                                optionValue="tipo_impacto"
                                value={impactoValor}
                                onChange={handleImpactoChange}
                                nomeSelect={`${prefixoUnico}_gestao_impacto`}
                                mapearCorFundo={mapearCorFundo('impacto')}
                                corCarregando="#d3d3d3"
                                desabilitado={avaliacaoGestao || avaliacaoEncerrada}
                            />
                        </td>
                        <td className="border p-2" style={{ width: '10%' }}>
                            <SelectInputColor
                                label=""
                                options={riscoReais}
                                optionKey="id"
                                optionValue="nivel_real"
                                value={riscoRealValor}
                                onChange={handleRiscoRealChange}
                                nomeSelect={`${prefixoUnico}_gestao_risco_real`}
                                mapearCorFundo={mapearCorFundo('nivel_real')}
                                corCarregando="#d3d3d3"
                                desabilitado={true}
                            />
                        </td>
                        <td className="border p-2 items-center justify-center" style={{ width: '2%' }}>
                            <ButtonComponent tipo={tipoBotaoSalvar} tipoBotao='button' onClick={handleSave}>
                                Salvar
                            </ButtonComponent>
                        </td>
                    </>
                )}
            </tr>
        );
    }
);

ListaAvaliacaoProbImpRow.propTypes = {
    risco: PropTypes.shape({
        risco_id: PropTypes.number.isRequired,
        risco_descricao: PropTypes.string.isRequired,
        probabilidade_id: PropTypes.number,
        impacto_id: PropTypes.number,
        risco_real_id: PropTypes.number,
    }).isRequired,
    processo_id: PropTypes.number.isRequired,
    tipo: PropTypes.string.isRequired,
    probabilidades: PropTypes.array.isRequired,
    impactos: PropTypes.array.isRequired,
    riscoReais: PropTypes.array.isRequired,
    avaliacaoArea: PropTypes.any,
    avaliacaoGestao: PropTypes.any,
    avaliacaoEncerrada: PropTypes.bool,
    widthPadrao: PropTypes.string,
    novoGrupoAvaliacaoId: PropTypes.number,
    onRiscoRealChange: PropTypes.func,
};

export default ListaAvaliacaoProbImpRow;

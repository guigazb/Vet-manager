import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ButtonComponent = ({
    children,
    tipo = 'padrao',
    tipoBotao = 'submit',
    onClick,
    desabilitado = false,
    className,
    ...props }) => {

    // Define os estilos para os tipos diferentes de botões
    const estilosDeBotao = {
        padrao: 'text-black bg-zinc-300 hover:bg-zinc-200 focus-visible:outline-zinc-300',
        secundario: 'text-gray bg-stone-200 hover:bg-stone-200 focus-visible:outline-stone-200',
        primario: 'text-black bg-blue-400 hover:bg-blue-300 focus-visible:outline-blue-400',
        sucesso: 'text-white bg-green-500 hover:bg-green-400 focus-visible:outline-green-500',
        alerta: 'text-black bg-yellow-400 hover:bg-yellow-300 focus-visible:outline-yellow-400',
        perigo: 'text-white bg-red-600 hover:bg-red-500 focus-visible:outline-red-600',
        cancelar: 'text-black bg-fuchsia-300 hover:bg-fuchsia-200 focus-visible:outline-fuchsia-300',
        diversos: 'text-black bg-emerald-300 hover:bg-emerald-200 focus-visible:outline-emerald-300',
        info: 'text-black bg-lime-400 hover:bg-lime-300 focus-visible:outline-lime-400'
    };

    const estiloPadrao = 'min-w-[80px] rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

    // Compoe a classe dinamicamente
    const classDesabilitado = classNames(
        estiloPadrao,
        estilosDeBotao['secundario'],
        className
    );

    const classeDoBotao = classNames(
        estiloPadrao,
        estilosDeBotao[tipo], // Tipo de Estilo
        className             // Classe customizada passada como prop
    );

    return (
        <>
            {desabilitado ? (
                <button
                    className={classDesabilitado}
                    onClick={onClick}
                    {...props}
                    type={tipoBotao}
                    disabled
                >
                    {children}
                </button>
            ) : (
                <button
                    className={classeDoBotao}
                    onClick={onClick}
                    {...props}
                    type={tipoBotao}
                >
                    {children}
                </button>
            )}
        </>
    );
};

// Define as propTypes para validação
ButtonComponent.propTypes = {
    tipo: PropTypes.oneOf(['padrao', 'secundario', 'primario', 'sucesso', 'alerta', 'perigo', 'cancelar', 'diversos']),
    tipoBotao: PropTypes.oneOf(['submit', 'button']),
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

// Define os valores padrão para os `props`
ButtonComponent.defaultProps = {
    tipo: 'padrao',
    tipoBotao: 'submit',
};

export default ButtonComponent;

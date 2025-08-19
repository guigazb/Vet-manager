import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import ModalCorpo from './ModalCorpo';
import ModalRodape from './ModalRodape';
import ModalCabecalho from './ModalCabecalho';

const Modal = ({ modalAberto, onFechar, tamanho = 'p', children }) => {

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape' && modalAberto) {
                onFechar();
            }
        };

        // Adiciona o event listener quando o modal é aberto
        if (modalAberto) {
            document.addEventListener('keydown', handleEscapeKey);
        }

        // Faz a limpeza para remover o event listener
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [modalAberto, onFechar]);

    if (!modalAberto) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center rounded-lg justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-60"
                onClick={onFechar}
            />

            {/* Conteúdo do Modal */}
            <div className={`
                relative z-50 w-full max-w-lg bg-white rounded-lg shadow-xl
                ${tamanho === 'p' && 'max-w-sm max-h-[70vh]'}
                ${tamanho === 'm' && 'max-w-lg max-h-[80vh]'}
                ${tamanho === 'g' && 'max-w-4xl max-h-[90vh]'}
                `}>

                {React.Children.map(children, (child) => {
                    if (child.type === ModalCabecalho || child.type === ModalCorpo || child.type === ModalRodape) {
                        return child;
                    }
                    return null;
                })}

            </div>
        </div>
    );
};

// Anexa os componentes da composição
Modal.ModalCabecalho = ModalCabecalho;
Modal.ModalCorpo = ModalCorpo;
Modal.ModalRodape = ModalRodape;

// Define as propTypes para validação
Modal.propTypes = {
    modalAberto: PropTypes.bool,
    onFechar: PropTypes.func,
    tamanho: PropTypes.oneOf(['p', 'm', 'g']),
    children: PropTypes.node.isRequired
};

// Define os valores padrão para os `props`
Modal.defaultProps = {
    tamanho: 'p'
};

export default Modal;
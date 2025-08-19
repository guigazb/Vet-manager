import React from 'react';
import { X } from 'lucide-react';

import PropTypes from 'prop-types';

const ModalCabecalho = ({ children, mostrarBotaoDeFechar = true, onFechar }) => (
    <div className="flex items-center justify-between p-4 border-b">
        <div className="text-xl font-semibold">
            {children}
        </div>
        {mostrarBotaoDeFechar && (
            <button
                onClick={onFechar}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
        )}
    </div>
);

// Define os propTypes para validação
ModalCabecalho.propTypes = {
    children: PropTypes.node.isRequired
};

export default ModalCabecalho;
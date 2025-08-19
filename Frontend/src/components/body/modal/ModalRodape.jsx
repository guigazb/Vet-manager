import React from 'react';
import PropTypes from 'prop-types';

const ModalRodape = ({ children }) => (
    <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
        {children}
    </div>
);

// Define propTypes for validation
ModalRodape.propTypes = {
    children: PropTypes.node.isRequired
};

export default ModalRodape;
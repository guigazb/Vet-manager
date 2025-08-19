import React from 'react';
import PropTypes from 'prop-types';

const ModalCorpo = ({ children }) => (
    <div className="p-4">
        {children}
    </div>
);

// Define os propTypes para validação
ModalCorpo.propTypes = {
    children: PropTypes.node.isRequired
};

export default ModalCorpo;
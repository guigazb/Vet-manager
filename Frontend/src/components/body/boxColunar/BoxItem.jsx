import React from 'react';
import PropTypes from 'prop-types';

const BoxItem = ({ children, largura }) => {
    return (
        <div style={{ width: `${largura}%` }} className="p-4">
            {children}
        </div>
    );
}

// Define os propTypes para validação
BoxItem.propTypes = {
    children: PropTypes.node.isRequired,
    largura: PropTypes.number.isRequired
};

export default BoxItem;

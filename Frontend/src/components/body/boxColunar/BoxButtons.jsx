import React from 'react';
import PropTypes from 'prop-types';

const BoxButtons = ({ children }) => {
    return (
        <div className="flex-1 p-4 flex flex-col justify-start items-center">
            {children}
        </div>
    );
}

// Define os propTypes para validação
BoxButtons.propTypes = {
    children: PropTypes.node.isRequired
};

export default BoxButtons;

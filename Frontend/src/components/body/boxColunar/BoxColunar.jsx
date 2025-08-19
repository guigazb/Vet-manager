import React from 'react';
import PropTypes from 'prop-types';

import BoxItem from './BoxItem';
import BoxButtons from './BoxButtons';

const BoxColunar = ({ children, loading, altura = 400 }) => {
    return (
        <>
            {loading ? (
                <p className="mt-10">Carregando informações...</p>
            ) : (
                <div className={`flex h-[${altura}px] rounded-lg`}>
                    {React.Children.map(children, (child) => {
                        if (child.type === BoxItem || child.type === BoxButtons) {
                            return child;
                        }
                        return null;
                    })}
                </div >
            )}
        </>
    );
};

// Anexa os componentes BoxItem e BoxButtons ao BoxColunar
BoxColunar.BoxItem = BoxItem;
BoxColunar.BoxButtons = BoxButtons;

// Define os propTypes para validação
BoxColunar.propTypes = {
    children: PropTypes.node.isRequired
};

export default BoxColunar;

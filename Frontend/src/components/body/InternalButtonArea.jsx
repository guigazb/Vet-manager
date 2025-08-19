import React, { memo } from 'react';
const InternalButtonArea = ({ children, loading = false }) => (
    <>
        {loading ? (
            <p className="mt-6 flex items-center justify-end gap-x-6">Carregando área de botões...</p>
        ) : (
            <div className="mt-6 flex items-center justify-end gap-x-6">
                {children}
            </div>
        )}

    </>
);

export default memo(InternalButtonArea);

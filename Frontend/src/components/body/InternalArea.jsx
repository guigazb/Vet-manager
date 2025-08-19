import React, { memo } from 'react';
const InternalArea = ({ children, loading = false, bgcolor = "bg-slate-200" }) => (
    <>
        {loading ? (
            <p className="mt-10">Carregando informações...</p>
        ) : (
            <div className={`mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-9 rounded-lg p-6 ${bgcolor}`}>
                {children}
            </div>
        )}

    </>
)

export default memo(InternalArea);

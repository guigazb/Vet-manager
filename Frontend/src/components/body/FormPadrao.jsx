import React, { memo } from 'react';

const FormPadrao = ({
    children,
    onSubmit,
    Ref,
    idForm
}) => (
    <form id={idForm} name={idForm} ref={Ref} onSubmit={onSubmit}>
        <div className="space-y-12">

            <div className="pb-12">
                {children}
            </div>

        </div>
    </form>
);

export default memo(FormPadrao);

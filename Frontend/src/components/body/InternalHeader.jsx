import React, { memo } from 'react';

const InternalHeader = ({
    nome,
    descricaoTela
}) => (
    <>
        {/* <h2 className="text-base font-semibold leading-7">{nome}</h2>
        <p className="mt-1 text-sm leading-6 ">{descricaoTela}</p> */}
    </>

);

export default memo(InternalHeader);
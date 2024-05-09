import React, { useState } from 'react';
import ReactModal from "react-modal";



export const Popup = ({titulo, contenido, alCerrar}) => {
    const [abierta, setAbierta] = useState(true)
   
    return (
        <>
            <ReactModal isOpen={abierta} onRequestClose={alCerrar} contentLabel="test" >
                <h2>{titulo}</h2>
                <p>{contenido}</p>
                <button onClick={alCerrar}>Ok</button>
            </ReactModal>
        </>
    )
}


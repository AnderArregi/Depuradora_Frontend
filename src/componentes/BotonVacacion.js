import React from 'react';
import './assets/BotonVacacion.css'; // Asegúrate de crear este archivo CSS o ajusta el import según tus necesidades
import { useState } from 'react';


const BotonVacacion = ({ day, color, onClick, turno, planta, handleMouseEnter, handleMouseLeave}) => {
    
    return (
        <div className="vacation-button"
            style={{
                background: ` ${color}`
            }}
            onClick={onClick}
            onMouseEnter={(e) => handleMouseEnter(`turno: ${turno}\nsitio: ${planta}`, e)}
            onMouseLeave={handleMouseLeave}>
            <div className="vacacion-circulo">
                {day}
            </div>
        </div>
    );
};

export default BotonVacacion;

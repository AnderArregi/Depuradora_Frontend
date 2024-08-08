import React from 'react';
import './assets/BotonCalendario.css';
const BotonCalendario = ({ day, color1, color2, onClick }) => {
    return (
        <div className="calendar-button" 
             style={{ background: `linear-gradient(to bottom, ${color1} 50%, ${color2} 50%)` }}
             onClick={onClick}>
            <div className="vacacion-circulo">
                {day}
            </div>
        </div>
    );
};

export default BotonCalendario;

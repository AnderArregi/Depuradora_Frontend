import React from 'react';
import './assets/BotonVacacion.css'; // Asegúrate de crear este archivo CSS o ajusta el import según tus necesidades

const BotonVacacion = ({ day, color1, color2, color3, onClick }) => {
    return (
        <div className="vacation-button" 
             style={{ 
                 background: `linear-gradient(to right, ${color1} 33.3%, ${color2} 33.3%, ${color3} 33.3%)` 
             }}
             onClick={onClick}>
            <div className="day-circle">
                {day}
            </div>
        </div>
    );
};

export default BotonVacacion;

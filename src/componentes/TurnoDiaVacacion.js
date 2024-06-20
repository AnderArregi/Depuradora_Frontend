import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './assets/index.css';
import './assets/TurnoDia.css';

const TurnoDiaVacacion =  () => { //async

    const navigate = useNavigate();
    const { usuarioId, fecha } = useParams();
    // Función modificada para pasar fecha y usuarioId
    const navigateToFormulario = (turno) => {
        navigate(`/formulario/${usuarioId}/${fecha}/${turno}`);
    };

    //const fechaFormatted = fecha.replace(/-/g, '/');
    //const response = await fetch(`http://localhost:3006/api/turno/${fechaFormatted}`);

    return (
        <div className="turno-dia-container">
            <div className="content">
                <div className="date-display">FECHA: {fecha}</div>
                <button className="button-turno" onClick={() => navigateToFormulario('1M')}>TURNO DE MAÑANA</button>
                <button className="button-turno" onClick={() => navigateToFormulario('2T')}>TURNO DE TARDE</button>
            </div>
            <div className="footer">
                <button className="button-back" onClick={() => navigate(`/vacaciones/${usuarioId}`)}>ATRÁS</button>
            </div>
        </div>
    );
};

export default TurnoDiaVacacion;
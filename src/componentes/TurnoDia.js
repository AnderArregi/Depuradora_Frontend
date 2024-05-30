import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './assets/index.css';
import './assets/TurnoDia.css';

const TurnoDia =  () => { //async
    const { usuarioId, fecha } = useParams();
    const navigate = useNavigate();
    //const fechaFormatted = fecha.replace(/-/g, '/');
    //const response = await fetch(`http://localhost:3006/api/turno/${fechaFormatted}`);

    return (
        <div className="turno-dia-container">
            <div className="content">
                <div className="date-display">FECHA: {fecha}</div>
                <button className="button-turno" onClick={() => navigate('/formulario')}>TURNO DE MAÑANA</button>
                <button className="button-turno" onClick={() => navigate('/formulario')}>TURNO DE TARDE</button>
                <button className="button-turno" onClick={() => navigate('/formulario')}>TURNO DE NOCHE</button>
            </div>
            <div className="footer">
                <button className="button-back" onClick={() => navigate(`/calendario/${usuarioId}`)}>ATRÁS</button>
            </div>
        </div>
    );
};

export default TurnoDia;
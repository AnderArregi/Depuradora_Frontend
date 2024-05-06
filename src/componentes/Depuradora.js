// Depuradora.js
import React from 'react';
import DepuradoraImagen from './assets/Depuradora.png';
import { useNavigate } from 'react-router-dom';
import './assets/index.css';

export const Depuradora = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Cierre de sesión");
        navigate('/login');
    };

    // Función para navegar al calendario
    const goToCalendario = () => {
        navigate('/calendario');
    };
    const goToVacaciones = () => {
        navigate('/vacaciones');
    };

    return (
        <div className="depuradora-container">
            <div className="header">
                <button onClick={handleLogout}>Cerrar Sesión</button>
                <h1>TOMASENEKOBORDA</h1>
            </div>
            <img src={DepuradoraImagen} alt="Diagrama de Depuradora" className="background-image" />
            <div className="button-panel">
                <button>Depuradora</button>
                <button onClick={goToCalendario}>Calendario</button> {/* Navega al calendario */}
                <button>Datos</button>
                <button onClick={goToVacaciones}>Vacaciones</button>
            </div>
        </div>
    );
};

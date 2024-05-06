// Datos.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/index.css'; // Asegúrate de importar el archivo CSS correcto

const Datos = () => {
    const navigate = useNavigate();

    // Funciones para Navegación
    const handleLogout = () => {
        console.log("Cierre de sesión");
        navigate('/login');
    };

    const goToDepuradora = () => {
        navigate('/depuradora');
    };

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
                <h1>DATOS</h1>
            </div>
            <div className="datos-panel">
                <h2>Gestión de Datos</h2>
                {/* Aquí puedes colocar contenido específico para la gestión de datos */}
            </div>
            <div className="button-panel">
                <button onClick={goToDepuradora}>Depuradora</button>
                <button onClick={goToCalendario}>Calendario</button>
                <button>Datos</button>
                <button onClick={goToVacaciones}>Vacaciones</button>
            </div>
        </div>
    );
};

export default Datos;

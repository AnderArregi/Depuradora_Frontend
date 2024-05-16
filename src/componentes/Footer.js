import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
    const [activeRoute, setActiveRoute] = useState('/depuradora');  // Define la ruta inicial activa

    const handleNavigation = (route) => {
        setActiveRoute(route);  // Actualiza la ruta activa
        navigate(route);
    };

    // Función para generar el estilo de los botones basado en si están activos
    const getButtonStyle = (route) => ({
        backgroundColor: route === activeRoute ? '#E65100' : 'orange',  // Naranja más oscuro si está activo
        color: 'black',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        outline: 'none',
    });

    return (
        <footer style={{ backgroundColor: '#2C2C2C', padding: '10px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button
                    onClick={() => handleNavigation('/depuradora')}
                    style={getButtonStyle('/depuradora')}
                >
                    Depuradora
                </button>
                <button
                    onClick={() => handleNavigation('/calendario')}
                    style={getButtonStyle('/calendario')}
                >
                    Calendario
                </button>
                <button
                    onClick={() => handleNavigation('/datos')}
                    style={getButtonStyle('/datos')}
                >
                    Datos
                </button>
                <button
                    onClick={() => handleNavigation('/vacaciones')}
                    style={getButtonStyle('/vacaciones')}
                >
                    Vacaciones
                </button>
            </div>
        </footer>
    );
};

export default Footer;

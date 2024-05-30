import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = ({ usuarioId, rutaSeleccionada} ) => {
    const navigate = useNavigate();
    const handleNavigation = (route) => {
        navigate(route);
    };

    const getButtonStyle = (route) => ({
        backgroundColor: route === rutaSeleccionada ? '#E65100' : 'orange',  // Naranja más oscuro si está activo
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
                    onClick={() => handleNavigation(`/depuradora/${usuarioId}`)}
                    style={getButtonStyle('depuradora')}
                >
                    Depuradora
                </button>
                <button
                    onClick={() => handleNavigation(`/calendario/${usuarioId}`)}
                    style={getButtonStyle('calendario')}
                >
                    Calendario
                </button>
                <button
                    onClick={() => handleNavigation(`/datos/${usuarioId}`)}
                    style={getButtonStyle('datos')}
                >
                    Datos
                </button>
                <button
                    onClick={() => handleNavigation(`/vacaciones/${usuarioId}`)}
                    style={getButtonStyle('vacaciones')}
                >
                    Vacaciones
                </button>
            </div>
        </footer>
    );
};

export default Footer;

// Panel.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Panel = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Cierre de sesión");
        navigate('/login');
    };

    // Funciones para navegar a las diferentes secciones
    const goToCalendario = () => {
        navigate('/calendario');
    };

    const goToDepuradora = () => {
        navigate('/depuradora');
    };

    const goToDatos = () => {
        navigate('/datos');
    };

    const goToVacaciones = () => {
        navigate('/vacaciones');
    };

    return (
        <div className="panel-container" style={{ backgroundColor: '#2C2C2C', height: '100vh', color: 'white', padding: '20px' }}>
            {/* Encabezado */}
            <div className="header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <button
                    onClick={handleLogout}
                    style={{
                        backgroundColor: 'orange',
                        border: 'none',
                        padding: '10px 20px',
                        color: 'black',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Cerrar Sesión
                </button>
                <h1>TOMASENEKOBORDA</h1>
                <h2>ANDER</h2>
            </div>

            {/* Panel de Botones */}
            <div className="button-panel" style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>
                <button
                    onClick={goToCalendario}
                    style={{
                        backgroundColor: 'orange',
                        border: 'none',
                        padding: '10px 20px',
                        color: 'black',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Calendario
                </button>
                <button
                    onClick={goToDepuradora}
                    style={{
                        backgroundColor: 'orange',
                        border: 'none',
                        padding: '10px 20px',
                        color: 'black',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Depuradora
                </button>
                <button
                    onClick={goToDatos}
                    style={{
                        backgroundColor: 'orange',
                        border: 'none',
                        padding: '10px 20px',
                        color: 'black',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Datos
                </button>
                <button
                    onClick={goToVacaciones}
                    style={{
                        backgroundColor: 'orange',
                        border: 'none',
                        padding: '10px 20px',
                        color: 'black',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Vacaciones
                </button>
            </div>
        </div>
    );
};

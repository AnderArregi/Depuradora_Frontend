// NuevoPass.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NuevoPass = () => {
    const [usuario, setUsuario] = useState('');
    const [contraseñaActual, setContraseñaActual] = useState('');
    const [nuevaContraseña, setNuevaContraseña] = useState('');
    const [confirmarNuevaContraseña, setConfirmarNuevaContraseña] = useState('');

    // Inicializa useNavigate para la navegación
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para cambiar la contraseña, como realizar una llamada a la API
        console.log(`Cambio de contraseña para: ${usuario}`);
    };

    // Función para navegar de vuelta al login
    const goToLogin = () => {
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black' }}>
            <div style={{ width: '400px', padding: '20px', color: 'white' }}>
                <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>TOMASENEKOBORDA</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="usuario">Usuario:</label><br />
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            style={{ width: '100%', padding: '10px', backgroundColor: '#333', border: 'none', color: 'white' }}
                        /><br />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="passActual">Contraseña Actual:</label><br />
                        <input
                            type="password"
                            id="passActual"
                            name="passActual"
                            value={contraseñaActual}
                            onChange={(e) => setContraseñaActual(e.target.value)}
                            style={{ width: '100%', padding: '10px', backgroundColor: '#333', border: 'none', color: 'white' }}
                        /><br />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="nuevaPass">Nueva Contraseña:</label><br />
                        <input
                            type="password"
                            id="nuevaPass"
                            name="nuevaPass"
                            value={nuevaContraseña}
                            onChange={(e) => setNuevaContraseña(e.target.value)}
                            style={{ width: '100%', padding: '10px', backgroundColor: '#333', border: 'none', color: 'white' }}
                        /><br />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="confirmarNuevaPass">Confirmar Nueva Contraseña:</label><br />
                        <input
                            type="password"
                            id="confirmarNuevaPass"
                            name="confirmarNuevaPass"
                            value={confirmarNuevaContraseña}
                            onChange={(e) => setConfirmarNuevaContraseña(e.target.value)}
                            style={{ width: '100%', padding: '10px', backgroundColor: '#333', border: 'none', color: 'white' }}
                        /><br />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button
                            type="button"
                            onClick={goToLogin}
                            style={{
                                width: '48%',
                                padding: '10px',
                                backgroundColor: 'orange',
                                color: 'black',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Volver
                        </button>
                        <button
                            type="submit"
                            style={{
                                width: '48%',
                                padding: '10px',
                                backgroundColor: 'orange',
                                color: 'black',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NuevoPass;

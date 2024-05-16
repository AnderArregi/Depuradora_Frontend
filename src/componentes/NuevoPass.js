import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Popup} from './Popup'


const NuevoPass = () => {
    const [usuario, setUsuario] = useState('');
    const [contraseñaActual, setContraseñaActual] = useState('');
    const [nuevaContraseña, setNuevaContraseña] = useState('');
    const [confirmarNuevaContraseña, setConfirmarNuevaContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [contraseña_cambiada, set_contraseña_cambiada] = useState(false);
    const navigate = useNavigate();
    const comprobarNuevaContrasenaCoincide = ((confirmacionContrasena) => {
        return nuevaContraseña === confirmacionContrasena
    })
    const goToLogin = () => {
        set_contraseña_cambiada(false)
        navigate('/');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (nuevaContraseña !== confirmarNuevaContraseña) {
            setMensaje('La nueva contraseña no coincide con la confirmación.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3006/api/nuevoPass', {
                correo: usuario,
                pass: contraseñaActual,
                newPass: nuevaContraseña
            });

            if (response.status === 204) {
                set_contraseña_cambiada(true)
                
            } else {
                setMensaje('Error al actualizar la contraseña.');
            }
        } catch (error) {
            // Mostrar el mensaje del error proveniente del backend
            console.error('Error del servidor:', error.response ? error.response.data : error.message);
            setMensaje(error.response?.data?.mensaje || 'Usuario o contraseña incorrectos o error en el servidor.');
        }
    };

    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black' }}>
            <div style={{ width: '400px', padding: '20px', color: 'white' }}>
                <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>TOMASENEKOBORDA</h2>
                {mensaje && <p style={{ color: 'orange', textAlign: 'center' }}>{mensaje}</p>}
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
                            style={{ width: '100%', padding: '10px', backgroundColor: '#333', border: comprobarNuevaContrasenaCoincide(confirmarNuevaContraseña)? 'none': '1px solid red', color: 'white' }}
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
                {contraseña_cambiada && <Popup titulo={"Contraseña cambiada"} contenido={"Su contraseña se ha cambiado exitosamente"} alCerrar={goToLogin}/>} 
            </div>
        </div>
    );
};

export default NuevoPass;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [usuario, setUsername] = useState('');
    const [pass, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`Intento de inicio de sesión con usuario: ${usuario} y pass: ${pass}`);

        try {
            const response = await fetch('http://localhost:3006/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    correo: usuario,
                    pass: pass,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.token) {
                    const token = data.token;
                    document.cookie = `token = ${ token }; path =/; secure; samesite=strict;`
                }
                navigate(`/depuradora/${data.user.id}`);
            } else {
                console.log('Error al iniciar sesión:', data.message);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    // Alternar visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Navegar a la página de nueva contraseña
    const goToNuevoPass = () => {
        navigate('/nuevopass');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black' }}>
            <div style={{ width: '300px', padding: '20px', color: 'white' }}>
                <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>TOMASENEKOBORDA</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="usuario">Usuario:</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            value={usuario}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: '100%', padding: '10px', backgroundColor: '#333', border: 'none', color: 'white' }}
                        /><br />< br />
                    </div>
                    <div style={{ marginBottom: '20px', position: 'relative' }}>
                        <label htmlFor="pass">Contraseña:</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="pass"
                            name="pass"
                            value={pass}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '10px', backgroundColor: '#333', border: 'none', color: 'white' }}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '35px',
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'white'
                            }}
                        >
                            {showPassword ? '👁️' : '🙈'}
                        </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button
                            type="button"
                            onClick={goToNuevoPass}
                            style={{
                                width: '48%',
                                padding: '10px',
                                backgroundColor: 'orange',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Nueva Contraseña
                        </button>
                        <button
                            type="submit"
                            style={{
                                width: '48%',
                                padding: '10px',
                                backgroundColor: 'orange',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

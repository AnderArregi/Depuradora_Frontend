// Header.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from './utils';
const Header = ({ usuarioId }) => {
    const navigate = useNavigate();
    const [nombreUsuario, setUsuario] = useState('');
    useEffect(() => {
        obtenerNombreUsuario();
    }, []);

    const obtenerNombreUsuario = async () => {
        try {
            const response = await fetch(`http://localhost:3006/api/usuario/${usuarioId}`, {
                method: 'GET',
                headers: {
                    'x-access-token': getCookie('token'), 
                }
            })

            const data = await response.json();
            setUsuario(data.nombre);

        } catch (error) {
            console.log(error)
            handleLogout();
        }
    }
    
    // Función que maneja el cierre de sesión
    const handleLogout = async () => {
        console.log("Cierre de sesión");
        const token = getCookie('token');
        document.cookie = `token = ; path =/; secure; samesite=strict;`
        try {
            const response = await fetch(`http://localhost:3006/api/logout`, {
                method: 'POST',
                headers: {
                    'x-access-token': token, 
                }
            })

        } catch (error) {
            navigate('/login');
        }
        navigate('/login');
    };

    return (
        <header style={{
            backgroundColor: '#2C2C2C',
            padding: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        }}>
            {/* Botón para cerrar sesión, alineado a la izquierda */}
            <button
                onClick={handleLogout}
                style={{
                    position: 'absolute',
                    left: '10px',
                    backgroundColor: 'orange',
                    color: 'black',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Cerrar Sesión
            </button>
            {/* Título centrado */}
            <h1 style={{ color: 'orange', margin: 0 }}>TOMASENEKOBORDA</h1>
            <p style={{ position: 'absolute', right: '80px', color: 'orange', margin: 0 }}>Usuario: {nombreUsuario}</p>
        </header>
    );
};

export default Header;

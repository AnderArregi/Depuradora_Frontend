// Depuradora.js
import React, { useEffect, useState } from 'react';
import DepuradoraImagen from './assets/Depuradora.jpg';
import './assets/index.css';

// Definición del componente Depuradora
const Depuradora = ({token}) => {
    const [info, setInfo] = useState({});
    
    async function informacionDepuradora() {
        try {
            const response = await fetch('http://localhost:3006/api/depuradora/actual', {
                method:'GET',
                headers:{'x-access-token': token}
            });

            const data = await response.json();
            setInfo(data);
        } catch (error) {
            console.error("Error fetching depuradora information:", error);
        }
    }
    
    useEffect(() => {
        informacionDepuradora();
    }, []);
    
    return (
        <div className="depuradora-container">
            <div className="imagen-container">
                <img src={DepuradoraImagen} alt="Diagrama de Depuradora" className="background-image" />
                <div className="datosimagen-overlay">
                    <ul>
                        <li>PH_Salida: {info.PH_Salida}</li>
                        <li>CL_Salida: {info.CL_Salida}</li>
                        <li>PH_Decantador: {info.PH_Decantador}</li>
                        <li>CL_Decantador: {info.CL_Decantador}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Depuradora;

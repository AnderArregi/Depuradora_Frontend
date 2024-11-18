// Depuradora.js
import React, { useEffect, useState } from 'react';
import DepuradoraImagen from './assets/Depuradora.jpg';
import './assets/depuradora.css';
import { useNavigate } from 'react-router-dom';

// Definición del componente Depuradora
const Depuradora = ({token}) => {
    const [info, setInfo] = useState({});
    const navigate = useNavigate();
    async function informacionDepuradora() {
        try {
            const response = await fetch('http://localhost:3006/api/depuradora/actual', {
                method:'GET',
                headers:{'x-access-token': token}
            });
            if(response.status === 401){
                navigate('/')
            }
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
                <div className="analisis_salida">
                    Salida
                    <li>{info.PH_Salida}ph</li>
                    <li>{info.CL_Salida} cl</li>
                </div>
                <div className="analisis_decantador">
                    Decantador
                    <li>{info.PH_Decantador} ph</li>
                    <li>{info.CL_Decantador} cl</li>
                </div>
                <div className="analisis_oxidacion">
                    <li>PH Oxidacion: {info.PH_Oxidacion}</li>
                    <li>PH Laboratorio: {info.PH_Laboratorio}</li>
                </div>
                <div className="prensa">
                    Prensa
                    <li>1.5</li>
                    <li>10 bar</li>
                </div>
                <div className="fabrica">
                    Fabrica
                    <li>75</li> 
                </div>
                <div className="caudal_fabrica">
                    <li>12m3/h</li> 
                </div>
                <div className="aguas_acidas">
                    Aguas ácidas
                    <li>45 m3</li>
                    <li>45%</li>
                </div>
                <div className="caudal_salida">
                    <li>12m3/h</li> 
                </div>
                <div className="zalain">
                    Zalain
                    <li>15 m3</li>
                    <li>50%</li>
                </div>
            </div>
        </div>
    );
};

export default Depuradora;

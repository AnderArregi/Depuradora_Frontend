import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './assets/index.css';
import './assets/TurnoDia.css';
import { Popup } from './Popup.js';
import axios from 'axios';
import { getCookie } from './utils';

const TurnoDiaVacacion = () => { //async

    const navigate = useNavigate();
    const { usuarioId, fecha } = useParams();
    const [turnoElegido, setTurnoElegido] = useState('');

    const [isPopupMañanaAbierto, setIsPopupMañanaAbierto] = useState(false);
    const [isPopupTardeAbierto, setIsPopupTardeAbierto] = useState(false);
    const [isPopupNocheAbierto, setIsPopupNocheAbierto] = useState(false);


    const insertarVacacion = async () => {
        try {
            const response = await axios.post('http://localhost:3006/api/vacacion', {
                usuario: usuarioId,
                planta: 'Lesaka',
                fecha: fecha,
                turno: turnoElegido


            }, { headers: { 'x-access-token': getCookie('token') } });
            if(response.status === 401){
                navigate('/')
            }
            if (response.status !== 201) {
                console.log(response)

                alert('¡No puedes reservar, el dia ya esta ocupado!');
                console.log('el status')

            }
            navigate(`/vacaciones/${usuarioId}`);
        } catch (error) {
            alert('¡No puedes reservar, el dia ya esta ocupado!');
            console.log('el catch')
            navigate(`/vacaciones/${usuarioId}`);
        }

    };

    const volverVacacion = () => {
        setIsPopupMañanaAbierto(false);
        setIsPopupTardeAbierto(false);
        setIsPopupNocheAbierto(false);
        navigate(`/vacaciones/${usuarioId}/${fecha}`);
    };

    const abrirPopupMañana = () => {
        setTurnoElegido('1M')
        setIsPopupMañanaAbierto(true)
    }
    const abrirPopupTarde = () => {
        setTurnoElegido('2T')
        setIsPopupTardeAbierto(true)
    }
    const abrirPopupNoche = () => {
        setTurnoElegido('3N')
        setIsPopupNocheAbierto(true)
    }
    return (
        <div className="turno-vacacion-container">
            <div className="content">
                <div className="date-display">FECHA: {fecha}</div>
                <h1>¿En que turno quieres coger las vacaciones?</h1>
                <button className="button-turno" onClick={abrirPopupMañana}>TURNO DE MAÑANA</button>
                {isPopupMañanaAbierto && <Popup titulo={"Confirmar vacacion"} contenido={"¿Quieres reservar vacaciones el turno de mañana?"} alCerrar={insertarVacacion} alAtras={volverVacacion} />}

                <button className="button-turno" onClick={abrirPopupTarde}>TURNO DE TARDE</button>
                {isPopupTardeAbierto && <Popup titulo={"Confirmar vacacion"} contenido={"¿Quieres reservar vacaciones el turno de tarde?"} alCerrar={insertarVacacion} alAtras={volverVacacion} />}


                <button className="button-turno" onClick={abrirPopupNoche}>TURNO DE NOCHE</button>
                {isPopupNocheAbierto && <Popup titulo={"Confirmar vacacion"} contenido={"¿Quieres reservar vacaciones el turno de Noche?"} alCerrar={insertarVacacion} alAtras={volverVacacion} />}
            </div>
            <div className="footer">
                <button className="button-back" onClick={() => navigate(`/vacaciones/${usuarioId}`)}>ATRÁS</button>
            </div>
        </div>
    );
};

export default TurnoDiaVacacion;
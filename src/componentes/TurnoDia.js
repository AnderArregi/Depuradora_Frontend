import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './assets/index.css';
import './assets/TurnoDia.css';
import ClipLoader from 'react-spinners/ClipLoader';

const TurnoDia = () => {

    const navigate = useNavigate();
    const [turnoMañanaLibre, setTurnoMañanaLibre] = useState(true);
    const [turnoTardeLibre, setTurnoTardeLibre] = useState(true);
    const [turnoNocheLibre, setTurnoNocheLibre] = useState(true);
    const [cargando, setCargando] = useState(true);


    const { usuarioId, fecha } = useParams();
    // Función modificada para pasar fecha y usuarioId
    const navigateToFormulario = (turno) => {
        navigate(`/formulario/${usuarioId}/${fecha}/${turno}`);
    };

    const fechaFormatted = fecha.replace(/-/g, '/');


    useEffect(() => {

        async function datosDia() {
            const response = await fetch(`http://localhost:3006/api/turno/${fechaFormatted}`);
            if (response.ok) {
                const datos = await response.json();
                datos.forEach(element => {
                    if (element.DiaTurno.includes('1M')) {
                        setTurnoMañanaLibre(false);
                    }
                    if (element.DiaTurno.includes('2T')) {
                        setTurnoTardeLibre(false);
                    }
                    if (element.DiaTurno.includes('3N')) {
                        setTurnoNocheLibre(false);
                    }
                    // if(element.usuario)
                });
            }
            setCargando(false);
        }
        datosDia()
    }, [])


    return (
        <div className="turno-dia-container">
            {cargando ? (
                <ClipLoader size={50} />
            ) : (
                <div className="content">
                    <div className="date-display">FECHA: {fecha}</div>
                    {turnoMañanaLibre && (
                        <button className="button-turno" onClick={() => navigateToFormulario('1M')}>TURNO DE MAÑANA</button>
                    )}
                    {turnoTardeLibre && (
                        <button className="button-turno" onClick={() => navigateToFormulario('2T')}>TURNO DE TARDE</button>

                    )}
                    {turnoNocheLibre && (
                        <button className="button-turno" onClick={() => navigateToFormulario('3N')}>TURNO DE NOCHE</button>
                    )}
                </div>
            )
            }

            <div className="footer">
                <button className="button-back" onClick={() => navigate(`/calendario/${usuarioId}`)}>ATRÁS</button>
            </div>
        </div>
    );
};

export default TurnoDia;
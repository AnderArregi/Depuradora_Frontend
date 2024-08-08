import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './assets/index.css';
import './assets/TurnoDia.css';

const TurnoDiaVacacion =  () => { //async

    const navigate = useNavigate();
    const { usuarioId, fecha } = useParams();
    /*const [turnoMañanaLibre, setTurnoMañanaLibre] = useState(true);
    const [turnoTardeLibre, setTurnoTardeLibre] = useState(true);
    const [turnoNocheLibre, setTurnoNocheLibre] = useState(true);
    const [cargando, setCargando] = useState(true);


    const fechaFormatted = fecha.replace(/-/g, '/');


    useEffect(() => {

        async function datosDia() {
            console.log(fechaFormatted)
            const response = await fetch(`http://localhost:3006/api/turno/${fechaFormatted}`);
            
            if (response.ok) {
                const datos = await response.json();
                datos.forEach(element => {
                    if (element.DiaTurno.includes('1M') && element.usuario != usuarioId) {
                        setTurnoMañanaLibre(false);
                    }
                    if (element.DiaTurno.includes('2T') && element.usuario != usuarioId) {
                        setTurnoTardeLibre(false);
                    }
                    if (element.DiaTurno.includes('3N') && element.usuario != usuarioId) {
                        setTurnoNocheLibre(false);
                    }
                    // if(element.usuario)
                });
            }
            setCargando(false);
        }
        datosDia()
    }, [])*/


    return (
        <div className="turno-vacacion-container">
            <div className="content">
                <div className="date-display">FECHA: {fecha}</div>
                <h1>¿En que turno quieres coger las vacaciones?</h1>
                <button className="button-turno">TURNO DE MAÑANA</button>
                <button className="button-turno">TURNO DE TARDE</button>
                <button className="button-turno">TURNO DE NOCHE</button>
            </div>
            <div className="footer">
                <button className="button-back" onClick={() => navigate(`/vacaciones/${usuarioId}`)}>ATRÁS</button>
            </div>
        </div>
    );
};

export default TurnoDiaVacacion;
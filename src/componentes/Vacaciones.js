import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './assets/index.css';
//import BotonCalendario from './BotonCalendario';
import BotonVacacion from './BotonVacacion';
//import { Popup } from './Popup';

const Vacaciones = ({ token, usuarioId }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();
    const yearFormatter = new Intl.DateTimeFormat('en', { year: 'numeric' });
    const monthFormatter = new Intl.DateTimeFormat('en', { month: '2-digit' });
    const dayFormatter = new Intl.DateTimeFormat('en', { day: '2-digit' });
    const [vacacionesMes, setVacacionesMes] = useState([]);
    const [ano, setAno] = useState(selectedDate.getFullYear());
    const [mes, setMes] = useState(selectedDate.getMonth() + 1);
    useEffect(() => {

        const fetchVacacionesMes = async () => {
            const url = `http://localhost:3006/api/vacacion/${ano}/${mes}`;
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'x-access-token': token, // Token para la autenticación
                    }
                });
                if (response.status === 401) {
                    navigate('/')
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setVacacionesMes(data);
            } catch (error) {
                console.error('Error al cargar los datos de las vacaciones del mes:', error);
            }
        };

        fetchVacacionesMes();
    }, [ano, mes, token]); // Asegúrate de incluir token y usuarioId como dependencias si sus valores pueden cambiar



    // Función para cambiar la fecha seleccionada en el calendario
    const cambiarFecha = (date) => {
        setSelectedDate(date);
    };

    const irVacacionTurno = async (date) => {
        const year = yearFormatter.format(date);
        const month = monthFormatter.format(date);
        const day = dayFormatter.format(date);
        const formattedDate = `${year}-${month}-${day}`;
        const url = `http://localhost:3006/api/vacacion/${formattedDate}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'x-access-token': token, // Token para la autenticación
                }
            });
            if (response.status === 401) {
                navigate('/')
            }
            if (response.status === 404) {
                navigate(`/vacaciones/${usuarioId}/${formattedDate}`);
            }
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (data.usuario === usuarioId) {
                navigate(`/vacaciones/${usuarioId}/${formattedDate}`);//popup aqui

            } else {
                alert('Vacaciones reservadas por otro usuario');
            }
        } catch (error) {
            console.error('Error al cargar los datos de las vacaciones del mes:', error);
        }

    }

    const onActiveStartDateChange = ({ activeStartDate }) => {//cuando se hace clic en la flecha
        const ano = activeStartDate.getFullYear();
        const mes = activeStartDate.getMonth() + 1;
        setAno(ano);
        setMes(mes);

    };

    const [tooltipContent, setTooltipContent] = useState(null);
    const [tooltipStyle, setTooltipStyle] = useState({ display: 'none' });

    const handleMouseEnter = (content, event) => {
        setTooltipContent(content);
        setTooltipStyle({
            display: 'block',
            top: event.clientY + 10,
            left: event.clientX + 10
        });
    };

    const handleMouseLeave = () => {
        setTooltipContent(null);
        setTooltipStyle({ display: 'none' });
    };

    // Función para renderizar los botones en las celdas del calendario
    const renderDayButton = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
            const vacacion = vacacionesMes.find(v => v.fecha.startsWith(dateString));
            let color = '#ddd';
            let turno = '';
            let planta = '';
            if (vacacion) {
                switch (vacacion.usuario) {
                    case 'A':
                        color = '#E72900';
                        break;
                    case 'B':
                        color = '#1778FC';
                        break;
                    case 'C':
                        color = '#4FF60D';
                        break;
                    case 'D':
                        color = '#f99f1d';
                        break;
                    case 'E':
                        color = '#ad01ed';
                        break;
                    case 'F':
                        color = '#00f6fe';
                        break;
                    case 'G':
                        color = '#ebfe00';
                        break;
                    default:
                        color = '#ddd';
                }
                planta = vacacion.planta;
                turno = vacacion.turno;
            }
            return (
                <BotonVacacion
                    day={date.getDate()}
                    color={color} // Asumiendo que BotonVacacion usa un solo color
                    onClick={() => cambiarFecha(date)}
                    turno={turno}
                    planta={planta}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}

                />
            );
        }
        return null;
    };


    return (
        <div className="vacacion-container">
            <div className="header">
                <h1>VACACIONES</h1>
            </div>
            <div className='vacacion-body'>
                <div className="vacacion-panel">
                    <Calendar className="vacacion-cuadrado"
                        value={selectedDate}
                        locale="es-ES"
                        tileContent={renderDayButton}
                        showNeighboringMonth={false}  // Esto oculta los días de los meses adyacentes
                        onClickDay={irVacacionTurno}
                        onActiveStartDateChange={
                            onActiveStartDateChange
                        }

                    />
                    {tooltipContent && (
                        <div className="tooltip" style={tooltipStyle}>
                            {tooltipContent.split('\n').map((line, index) => (
                                <div key={index}>{line}</div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="vacacion-nombres">
                    <p style={{ color: "#E72900" }}>ANDER ARREGI (Lesaka)</p> 
                    <p style={{ color: "#1778FC" }}>ASIER MARTINEZ (Lesaka)</p>
                    <p style={{ color: "#f99f1d" }}>UNAI TELLETXEA (Lesaka)</p> 

                    <p style={{ color: "#ad01ed" }}>AITOR TELLETXEA (Legasa)</p>
                    <p style={{ color: "#00f6fe" }}>ENEKO SARRIAS (Legasa)</p> 
                    <p style={{ color: "#ebfe00" }}>ENRIQUE IRAZOQUI (Legasa)</p> 

                    <p style={{ color: "#4FF60D" }}>AITOR SAENZ</p> 

                    <button className="vacacion-pdf" >Crear PDF de vacaciones</button>

                </div>
            </div>
        </div>
    );
};

export default Vacaciones;
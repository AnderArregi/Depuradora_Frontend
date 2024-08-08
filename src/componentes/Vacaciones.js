import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './assets/index.css';
//import BotonCalendario from './BotonCalendario';
import BotonVacacion from './BotonVacacion';

const Vacaciones = ({ usuarioId }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();
    const yearFormatter = new Intl.DateTimeFormat('en', { year: 'numeric' });
    const monthFormatter = new Intl.DateTimeFormat('en', { month: '2-digit' });
    const dayFormatter = new Intl.DateTimeFormat('en', { day: '2-digit' });
    const [vacacionesMes, setVacacionesMes] = useState([]);
    const [ano, setAno] = useState(selectedDate.getFullYear());
    const [mes, setMes] = useState(selectedDate.getMonth() + 1);
    useEffect(() => {

        const fetchVaccacionesMes = async () => {
            const url = `http://localhost:3006/api/vacacion/${ano}/${mes}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)
                setVacacionesMes(data);
            } catch (error) {
                console.error('Error al cargar los datos de las vacaciones del mes:', error);
            }
        };

        fetchVaccacionesMes();
    }, [ano, mes]);



    // Función para cambiar la fecha seleccionada en el calendario
    const cambiarFecha = (date) => {
        setSelectedDate(date);
    };

    const irVacacionTurno = (date) => {
        const year = yearFormatter.format(date);
        const month = monthFormatter.format(date);
        const day = dayFormatter.format(date);
        const formattedDate = `${year}-${month}-${day}`;
        navigate(`/vacaciones/${usuarioId}/${formattedDate}`);
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
        </div>
    );
};

export default Vacaciones;
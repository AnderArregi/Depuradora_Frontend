import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './assets/index.css';
import BotonCalendario from './BotonCalendario';

const MiCalendario = ({ usuarioId }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();
    const yearFormatter = new Intl.DateTimeFormat('en', { year: 'numeric' });
    const monthFormatter = new Intl.DateTimeFormat('en', { month: '2-digit' });
    const dayFormatter = new Intl.DateTimeFormat('en', { day: '2-digit' });

    // Función para cambiar la fecha seleccionada en el calendario
    const cambiarFecha = (date) => {
        setSelectedDate(date);
    };

    const irFormulario = (date) => {
        const year = yearFormatter.format(date);
        const month = monthFormatter.format(date);
        const day = dayFormatter.format(date);
        const formattedDate = `${year}-${month}-${day}`;
        navigate(`/turno/${usuarioId}/${formattedDate}`);
    }
    // Función para renderizar los botones en las celdas del calendario
    const renderDayButton = ({ date, view }) => {
    
        if (view === 'month') {
            console.log(date)
            return (
                <BotonCalendario
                    day={date.getDate()}
                    onChange={cambiarFecha}
                    color1="#E72900" // Color por defecto
                    color2="#1778FC" // Color por defecto
                />
            );
        }
        return null;
    };

    return (
        <div className="calendario-container">
            <div className="header">
                <h1>CALENDARIO</h1>
            </div>
            <div className="calendar-panel">
                <Calendar className="calendario-cuadrado"
                    value={selectedDate}
                    locale="es-ES"
                    tileContent={renderDayButton}
                    showNeighboringMonth={false}  // Esto oculta los días de los meses adyacentes
                    onClickDay={irFormulario}
                />
            </div>
        </div>
    );
};

export default MiCalendario;
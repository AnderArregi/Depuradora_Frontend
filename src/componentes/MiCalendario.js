// MiCalendario.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './assets/index.css';
import BotonCalendario from './BotonCalendario';

const MiCalendario = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();

    // Función para cambiar la fecha seleccionada
    const onDateChange = (date) => {
        setSelectedDate(date);
    };

    // Función para renderizar los botones en las celdas del calendario
    const renderDayButton = ({ date, view }) => {
        if (view === 'month') {
            return (
                <BotonCalendario
                    day={date.getDate()}
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
                <Calendar
                    value={selectedDate}
                    onChange={onDateChange}
                    locale="es-ES"
                    tileContent={renderDayButton}
                />
            </div>
        </div>
    );
};

export default MiCalendario;

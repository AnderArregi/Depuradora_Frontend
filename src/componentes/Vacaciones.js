// Vacaciones.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './assets/index.css'; // Asegúrate de importar el archivo CSS correcto

const Vacaciones = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Función para cambiar la fecha seleccionada
    const onDateChange = (date) => {
        setSelectedDate(date);
    };


    return (
        <div className="calendario-container">
            <div className="header">
                <h1>VACACIONES</h1>
            </div>
            <div className="calendar-panel">
                <Calendar
                    value={selectedDate}
                    onChange={onDateChange}
                    locale="es-ES"
                />
            </div>
            
        </div>
    );
};

export default Vacaciones;

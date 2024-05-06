// MiCalendario.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './assets/index.css'; // Asegúrate de importar el archivo CSS correcto

const MiCalendario = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();

    // Función para cambiar la fecha seleccionada
    const onDateChange = (date) => {
        setSelectedDate(date);
    };

    // Funciones para Navegación
    const handleLogout = () => {
        console.log("Cierre de sesión");
        navigate('/login');
    };

    const goToDepuradora = () => {
        navigate('/depuradora');
    };

    const goToDatos = () => {
        navigate('/datos');
    };

    const goToVacaciones = () => {
        navigate('/vacaciones');
    };

    return (
        <div className="depuradora-container">
            <div className="header">
                <button onClick={handleLogout}>Cerrar Sesión</button>
                <h1>CALENDARIO</h1>
            </div>
            <div className="calendar-panel">
                <Calendar
                    value={selectedDate}
                    onChange={onDateChange}
                    locale="es-ES"
                />
            </div>
            <div className="button-panel">
                <button onClick={goToDepuradora}>Depuradora</button>
                <button>Calendario</button>
                <button onClick={goToDatos}>Datos</button>
                <button onClick={goToVacaciones}>Vacaciones</button>
            </div>
        </div>
    );
};

export default MiCalendario;

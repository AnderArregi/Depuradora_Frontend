import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './assets/index.css';
import BotonCalendario from './BotonCalendario';

const Vacaciones = ({ usuarioId }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();
    const yearFormatter = new Intl.DateTimeFormat('en', { year: 'numeric' });
    const monthFormatter = new Intl.DateTimeFormat('en', { month: '2-digit' });
    const dayFormatter = new Intl.DateTimeFormat('en', { day: '2-digit' });
    const [vacacionesMes, setVacacionesMes] =useState([]);
    const [ano, setAno]= useState(selectedDate.getFullYear());
    const [mes, setMes]= useState(selectedDate.getMonth()+1);
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
        console.log('cambiarFecha')
    };

    const irFormulario = (date) => {
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
   
    // Función para renderizar los botones en las celdas del calendario
    const renderDayButton = ({ date, view }) => {
        if (view === 'month') {
            return (
                <BotonCalendario
                    day={date.getDate()}
                    onChange={cambiarFecha}

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
                    onActiveStartDateChange={
                        onActiveStartDateChange
                    }
                />
            </div>
        </div>
    );
};

export default Vacaciones;
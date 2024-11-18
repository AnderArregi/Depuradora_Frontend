import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Asegúrate de que esta extensión esté disponible para las tablas.

const VacacionesPDF = ({ token }) => {
    const [vacacionesData, setVacacionesData] = useState([]);

    useEffect(() => {
        const fetchVacaciones = async () => {
            try {
                const response = await axios.get('http://localhost:3006/api/vacaciones', {
                    headers: { 'x-access-token': token }
                });
                setVacacionesData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos de vacaciones:', error);
            }
        };

        fetchVacaciones();
    }, [token]);

    const handleGeneratePDF = () => {
        const doc = new jsPDF();

        // Título del PDF
        doc.text('Vacaciones', 14, 10);

        // Formatea los datos para la tabla
        const tableColumn = ['ID', 'Usuario', 'Planta', 'Fecha', 'Turno'];
        const tableRows = [];

        vacacionesData.forEach(vacacion => {
            const vacacionData = [
                vacacion.id,
                vacacion.usuario,
                vacacion.planta,
                vacacion.fecha,
                vacacion.turno
            ];
            tableRows.push(vacacionData);
        });

        // Agrega la tabla al PDF
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20, // Comienza la tabla un poco más abajo de la parte superior
        });

        // Guarda el PDF
        doc.save('vacaciones.pdf');
    };

    return (
        <div>
            <button className="vacacion-pdf" onClick={handleGeneratePDF}>
                Crear PDF de vacaciones
            </button>
        </div>
    );
};

export default VacacionesPDF;

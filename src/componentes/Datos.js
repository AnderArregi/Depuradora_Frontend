import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from './utils';
import './assets/Datos.css';
import { useNavigate } from 'react-router-dom';

const Datos = ({ token }) => {
    const [datosPlanta, setDatosPlanta] = useState([]); // Estado para los datos de la tabla
    const [googleChartsLoaded, setGoogleChartsLoaded] = useState(false); // Estado para verificar si Google Charts está listo
    const navigate = useNavigate();

    // Cargar la API de Google Charts solo una vez
    useEffect(() => {
        const loadGoogleCharts = () => {
            if (!window.google) {
                const script = document.createElement('script');
                script.src = 'https://www.gstatic.com/charts/loader.js';
                script.onload = () => {
                    window.google.charts.load('current', { packages: ['corechart'] });
                    window.google.charts.setOnLoadCallback(() => setGoogleChartsLoaded(true));
                };
                document.head.appendChild(script);
            } else {
                window.google.charts.load('current', { packages: ['corechart'] });
                window.google.charts.setOnLoadCallback(() => setGoogleChartsLoaded(true));
            }
        };

        loadGoogleCharts();
    }, []);

    useEffect(() => {
        const drawChart = () => {
            console.log("drawChart ejecutándose");

            fetch('http://localhost:3006/api/datos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            })
                .then(response => {
                    if (response.status === 401) {
                        navigate('/');
                        return null;
                    }
                    return response.json();
                })
                .then(data => {
                    if (!data || data.length === 0) {
                        console.error("Datos no disponibles o vacíos:", data);
                        return;
                    }

                    console.log("Datos recibidos:", data);
                    const chartData = [['usuario', 'M3_Tratados']];
                    data.forEach(item => {
                        chartData.push([item.usuario, parseFloat(item.M3_Tratados)]);
                    });

                    const dataTable = window.google.visualization.arrayToDataTable(chartData);
                    const options = {
                        title: 'M3 Tratados por Usuario',
                        is3D: true
                    };
                    const chart = new window.google.visualization.PieChart(document.getElementById('myChart'));
                    chart.draw(dataTable, options);
                })
                .catch(error => console.error('Error al obtener los datos:', error));
        };

        // Intervalo para verificar repetidamente si Google Charts está listo
        const intervalId = setInterval(() => {
            if (googleChartsLoaded && window.google && window.google.visualization) {
                clearInterval(intervalId); // Limpia el intervalo una vez que Google Charts esté listo
                drawChart();
            } else {
                console.log("Google Charts API aún no está lista. Reintentando...");
            }
        }, 500); // Verifica cada 500 ms

        return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
    }, [token, googleChartsLoaded]); // Ejecuta cuando el token o googleChartsLoaded cambian

    // Obtener datos para la tabla
    useEffect(() => {
        const fetchDatosPlanta = async () => {
            try {
                const response = await axios.get('http://localhost:3006/api/datosPlanta', {
                    headers: { 'x-access-token': token || getCookie('token') }
                });
                if (response.status === 401) {
                    navigate('/');
                    return;
                }
                setDatosPlanta(response.data);
            } catch (error) {
                console.error('Error al obtener los datos de la planta:', error);
            }
        };

        fetchDatosPlanta();
    }, [token]);

    return (
        <div className='datos-contenedor'>
            <div id="myChart" ></div>
            <div className="tablaDatosPlanta">
                <h1>Datos de cada turno</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Dia y turno</th>
                            <th>M3 Tratadas Turno</th>
                            <th>Horas Tratadas Turno</th>
                            <th>Horas Turno</th>
                            <th>M3 Principio Turno</th>
                            <th>M3 Final Turno</th>
                            <th>M3/h</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosPlanta.map((item, index) => (
                            <tr key={index}>
                                <td>{item.DiaTurno}</td>
                                <td>{item.M3_Tratadas_Turno}m3</td>
                                <td>{item.Horas_Tratadas_Turno}h</td>
                                <td>{item.Horas_Turno}h</td>
                                <td>{item.M3_Principio_Turno}m3</td>
                                <td>{item.M3_Final_Turno}m3</td>
                                <td>{item.M3_h}m3/h</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default Datos;

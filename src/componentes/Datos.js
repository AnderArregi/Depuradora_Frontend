import React, { useEffect } from 'react';

const Datos = () => {
    useEffect(() => {
        // Cargar Google Charts
        const loadGoogleCharts = () => {
            if (!window.google) {
                const script = document.createElement('script');
                script.src = 'https://www.gstatic.com/charts/loader.js';
                script.onload = () => {
                    window.google.charts.load('current', {'packages':['corechart']});
                    window.google.charts.setOnLoadCallback(drawChart);
                };
                document.head.appendChild(script);
            } else {
                window.google.charts.load('current', {'packages':['corechart']});
                window.google.charts.setOnLoadCallback(drawChart);
            }
        };

        const drawChart = () => {
            fetch('http://localhost:3006/api/datos')
                .then(response => response.json())
                .then(data => {
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
                .catch(error => {
                    console.error('Error al obtener los datos:', error);
                });
        };

        loadGoogleCharts();
    }, []);

    return (
        <div id="myChart" style={{ width: '100%', maxWidth: '600px', height: '500px' }}></div>
    );
};

export default Datos;

import React, { useState } from 'react';
import './assets/index.css';

const Formulario = () => {
    const [formData, setFormData] = useState({
        diaTurno: '',
        usuario: '',
        m3TratadasTurno: '',
        horasTratadasTurno: '',
        horasTurno: '',
        prensadas: '',
        phSalida: '',
        clSalida: '',
        phDecantador: '',
        clDecantador: '',
        phOxidacion: '',
        phLaboratorio: '',
        zinc: '',
        hierro: '',
        cobre: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/formulario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);  // O manejar la respuesta según sea necesario
            alert('Datos guardados con éxito!');
        } catch (error) {
            console.error('Error al enviar datos: ', error);
            alert('Error al guardar los datos.');
        }
    };

    return (
        <div className="formulario-container">
            <h2>Registro de Datos del Turno</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3>Datos del Turno</h3>
                    <label>
                        Día del Turno:
                        <input type="text" name="diaTurno" value={formData.diaTurno} onChange={handleChange} />
                    </label>
                    <label>
                        Usuario:
                        <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} />
                    </label>
                    <label>
                        Metros Cúbicos Tratados:
                        <input type="number" name="m3TratadasTurno" value={formData.m3TratadasTurno} onChange={handleChange} />
                    </label>
                    <label>
                        Horas Tratadas por Turno:
                        <input type="number" name="horasTratadasTurno" value={formData.horasTratadasTurno} onChange={handleChange} />
                    </label>
                    <label>
                        Total de Horas por Turno:
                        <input type="number" name="horasTurno" value={formData.horasTurno} onChange={handleChange} />
                    </label>
                    <label>
                        Prensadas:
                        <input type="number" name="prensadas" value={formData.prensadas} onChange={handleChange} />
                    </label>
                </div>

                <div className="form-section">
                    <h3>Análisis</h3>
                    <label>
                        pH de Salida:
                        <input type="text" name="phSalida" value={formData.phSalida} onChange={handleChange} />
                    </label>
                    <label>
                        Cloro de Salida:
                        <input type="text" name="clSalida" value={formData.clSalida} onChange={handleChange} />
                    </label>
                    <label>
                        pH del Decantador:
                        <input type="text" name="phDecantador" value={formData.phDecantador} onChange={handleChange} />
                    </label>
                    <label>
                        Cloro del Decantador:
                        <input type="text" name="clDecantador" value={formData.clDecantador} onChange={handleChange} />
                    </label>
                    <label>
                        pH de Oxidación:
                        <input type="text" name="phOxidacion" value={formData.phOxidacion} onChange={handleChange} />
                    </label>
                    <label>
                        pH de Laboratorio:
                        <input type="text" name="phLaboratorio" value={formData.phLaboratorio} onChange={handleChange} />
                    </label>
                    <label>
                        Zinc:
                        <input type="text" name="zinc" value={formData.zinc} onChange={handleChange} />
                    </label>
                    <label>
                        Hierro:
                        <input type="text" name="hierro" value={formData.hierro} onChange={handleChange} />
                    </label>
                    <label>
                        Cobre:
                        <input type="text" name="cobre" value={formData.cobre} onChange={handleChange} />
                    </label>
                </div>
                <button type="submit" className="submit-button">Enviar Datos</button>
                
            </form>
        </div>
    );
};

export default Formulario;
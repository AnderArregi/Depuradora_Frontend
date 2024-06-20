import React, { useState } from 'react';
import './assets/formulario.css';
import { useNavigate, useParams } from 'react-router-dom';
const Formulario = () => {
    const { usuarioId, fecha, turno } = useParams();
    const [formData, setFormData] = useState({
        diaTurno: `${fecha} ${turno}`,
        usuario: usuarioId,
        m3TratadasTurno: '',
        horasTratadasTurno: '',
        horasTurno: '8',
        prensadas: '0',
        phSalida: '',
        clSalida: '',
        phDecantador: '',
        clDecantador: '',
        phOxidacion: '',
        phLaboratorio: '',
        zinc: '',
        hierro: '',
        cobre: '',
        Horas_8h: false,
        Horas_10h: false,
        Horas_13h: false,
        Horas_15h: false,
        Horas_18h: false,
        Horas_21h: false,
        Prensada_SI: false,
        Sacar_Prensa_SI: false,
        M3_Principio_Turno: '',
        M3_Final_Turno: '',
        M3_h: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        // Verifica si el campo es de tipo decimal y contiene una coma
        const isDecimalField = ['phSalida', 'clSalida', 'phDecantador', 'clDecantador', 'phOxidacion', 'phLaboratorio', 'zinc', 'hierro', 'cobre'].includes(name);
        const valorNormalizado = isDecimalField ? value.replace(',', '.') : value;

        // Establece un valor predeterminado para campos numéricos si están vacíos
        if (type === 'number' && (valorNormalizado === '' || valorNormalizado === null)) {
            valorNormalizado = '0';  // Usa '0' como valor predeterminado para campos numéricos
        }


        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : valorNormalizado
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(JSON.stringify(formData))
            const response = await fetch('http://localhost:3006/api/formulario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.status === 201) {
                alert('Datos guardados con éxito!');
                navigate(`/calendario/${usuarioId}`);
            }
            const data = await response.json();
            alert(data.massage)
        } catch (error) {
            console.error('Error al enviar datos: ', error);
            alert('Error al guardar los datos.');
        }
    };

    return (
        <div className="formulario-container">
            <div className="formulario-subcontainer">
                <h2>REGISTRO DE DATOS DEL TURNO</h2>
                <div className="turno-details" style={{ textAlign: 'center' }}>
                    <span>Fecha: {fecha}</span><br />
                    <span>Turno: {turno}</span><br />
                    <span>Usuario: {usuarioId}</span>
                </div>
                <form onSubmit={handleSubmit}>

                    <h3>-------------------------------------------------------------------------------</h3>
                    <h3>ANALISIS</h3>
                    <div className="form-section">

                        <label>
                            PH salida:<br />
                            <input type="text" name="phSalida" value={formData.phSalida} onChange={handleChange} />
                        </label>
                        <label>
                            Cloruros salida:<br />
                            <input type="text" name="clSalida" value={formData.clSalida} onChange={handleChange} />
                        </label>
                        <label>
                            PH decantador:<br />
                            <input type="text" name="phDecantador" value={formData.phDecantador} onChange={handleChange} />
                        </label>
                        <label>
                            Cloruros decantador:<br />
                            <input type="text" name="clDecantador" value={formData.clDecantador} onChange={handleChange} />
                        </label>
                        <label>
                            PH oxidación:<br />
                            <input type="text" name="phOxidacion" value={formData.phOxidacion} onChange={handleChange} />
                        </label>
                        <label>
                            PH laboratorio:<br />
                            <input type="text" name="phLaboratorio" value={formData.phLaboratorio} onChange={handleChange} />
                        </label>
                        <label>
                            Zinc:<br />
                            <input type="text" name="zinc" value={formData.zinc} onChange={handleChange} />
                        </label>
                        <label>
                            Hierro:<br />
                            <input type="text" name="hierro" value={formData.hierro} onChange={handleChange} />
                        </label>
                        <label>
                            Cobre:<br />
                            <input type="text" name="cobre" value={formData.cobre} onChange={handleChange} />
                        </label>
                    </div>
                    <h3>-------------------------------------------------------------------------------</h3>
                    <h3>LODOS</h3>
                    <div className="form-section">
                        {['8h', '10h', '13h', '15h', '18h', '21h'].map((hora) => (
                            <label key={hora}>
                                Horas {hora}:
                                <input
                                    type="checkbox"
                                    name={`Horas_${hora}`}
                                    checked={formData[`Horas_${hora}`]}
                                    onChange={handleChange}
                                />
                            </label>
                        ))}
                        {/* Campos para Prensada y Sacar Prensa */}
                        <label>
                            Prensada:
                            <input type="checkbox" name="Prensada_SI" checked={formData.Prensada_SI} onChange={handleChange} />
                        </label>
                        <label>
                            Prensada sacada:<br />
                            <select name="prensadas" value={formData.prensadas} onChange={handleChange}>
                                <option value="0">0.0</option>
                                <option value="0.5">0.5</option>
                                <option value="1">1.0</option>
                                <option value="1.5">1.5</option>
                                <option value="2">2.0</option>
                            </select>
                        </label>
                        <label>
                            Recogida de camión:
                            <input type="checkbox" name="Recogida_Camion" checked={formData.Recogida_Camion} onChange={handleChange} />
                        </label>
                    </div>
                    <h3>-------------------------------------------------------------------------------</h3>
                    <h3>DATOS DE TURNO</h3>
                    <div className="form-section">
                        <label>
                            M3 principio turno:<br />
                            <input type="number" name="M3_Principio_Turno" value={formData.M3_Principio_Turno} onChange={handleChange} />
                        </label>
                        <label>
                            M3 final turno:<br />
                            <input type="number" name="M3_Final_Turno" value={formData.M3_Final_Turno} onChange={handleChange} />
                        </label>
                        <label>
                            M3 Tratados:<br />
                            <input type="number" name="m3TratadasTurno" value={formData.m3TratadasTurno} onChange={handleChange} />
                        </label>
                        <label>
                            Horas tratadas:<br />
                            <input type="number" name="horasTratadasTurno" value={formData.horasTratadasTurno} onChange={handleChange} />
                        </label>
                        <label>
                            Horas de turno:<br />
                            <input type="number" name="horasTurno" value={formData.horasTurno} onChange={handleChange} />
                        </label>

                        <label>
                            M3 por hora:<br />
                            <input type="number" name="M3_h" value={formData.M3_h} onChange={handleChange} />
                        </label>

                    </div>
                    <div className="footer">
                        <button type="submit" className="submit-button">Enviar Datos</button>
                        <button className="button-back" onClick={() => navigate(`/calendario/${usuarioId}`)}>ATRÁS</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Formulario;
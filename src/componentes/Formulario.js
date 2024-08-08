import React, { useEffect, useState } from 'react';
import './assets/formulario.css';
import { useNavigate, useParams } from 'react-router-dom';


const Formulario = () => {
    const { usuarioId, fecha, turno } = useParams();
    console.log(fecha)
    console.log(turno)
    console.log(usuarioId)
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

    useEffect(() => {
        // Cargar los datos del turno al cargar el componente
        const cargarDatos = async () => {
            try {
                
                const url = `http://localhost:3006/api/formulario/${fecha}/${turno}`;
                console.log('Fetching:', url); // Para verificar la URL completa
                const response = await fetch(url);
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const datos = await response.json();
                setFormData(datos); // Actualiza el formulario con los datos recibidos
            } catch (error) {
                console.error('Error al cargar los datos del turno:', error);
            }
        };
        

        cargarDatos();
    }, [usuarioId, fecha, turno]);

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:3006/api/formulario/${fecha}/${turno}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setFormData(data); // Asumiendo que el servidor devuelve directamente el objeto adecuado
            } catch (error) {
                console.error('Error al cargar los datos del formulario:', error);
            }
        };

        fetchData();
    }, [fecha, turno, usuarioId]);

     // Calcula M3 Tratados cuando cambia M3_Principio_Turno o M3_Final_Turno
     useEffect(() => {
        if (formData.M3_Principio_Turno && formData.M3_Final_Turno) {
            const m3TratadasTurno = formData.M3_Final_Turno - formData.M3_Principio_Turno;
            setFormData(prevFormData => ({
                ...prevFormData,
                m3TratadasTurno: m3TratadasTurno >= 0 ? m3TratadasTurno : '' // Solo actualiza si el resultado es positivo
            }));
        }
    }, [formData.M3_Principio_Turno, formData.M3_Final_Turno]);

    // Calcular M3 por hora cuando cambian M3 Tratadas o Horas Tratadas
    useEffect(() => {
        if (formData.m3TratadasTurno && formData.horasTratadasTurno && formData.horasTratadasTurno !== '0') {
            const m3PorHora = formData.m3TratadasTurno / formData.horasTratadasTurno;
            setFormData(prevFormData => ({
                ...prevFormData,
                M3_h: m3PorHora.toFixed(2) // Redondear a dos decimales para precisión
            }));
        }
    }, [formData.m3TratadasTurno, formData.horasTratadasTurno]);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3006/api/formulario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        console.log(JSON.stringify(formData))
            if (response.ok) {
                alert('Datos guardados con éxito!');
                navigate(`/calendario/${usuarioId}`);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error desconocido al guardar');
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
            alert('Error al guardar los datos: ' + error.message);
        }
    };
    const actualizarDatos = async () => {
        try {
            const fechaFormatted = fecha.replace(/-/g, '/');
            const formDataJson = JSON.stringify(formData);

            const response = await fetch(`http://localhost:3006/api/formulario/${usuarioId}/${fechaFormatted}/${turno}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formDataJson
            });
    
            if (response.ok) {
                alert('Datos actualizados con éxito!');
                navigate(`/calendario/${usuarioId}`);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error desconocido al actualizar');
            }
        } catch (error) {
            console.error('Error al actualizar datos:', error);
            alert('Error al actualizar los datos: ' + error.message);
        }
    }
    
    const borrarFormulario = async () => {
        try {
            const response = await fetch(`http://localhost:3006/api/formulario/${formData.diaTurno}`, {
                method: 'DELETE'
            });
    
            if (response.ok) {
                alert('Formulario borrado con éxito');
                navigate(`/calendario/${usuarioId}`); // Redirige al usuario después de eliminar
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error desconocido al borrar');
            }
        } catch (error) {
            console.error('Error al borrar el formulario:', error);
            alert('Error al borrar el formulario: ' + error.message);
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
                        <button type="submit" className="enviar-boton" >ENVIAR DATOS</button>
                        <button type='button' className="actualizar-boton"onClick={actualizarDatos} >ACTUALIZAR</button>
                        <button type="button" className="borrar-boton" onClick={borrarFormulario}>BORRAR</button>
                        <button className="atras-boton" onClick={() => navigate(`/calendario/${usuarioId}`)}>ATRÁS</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Formulario;
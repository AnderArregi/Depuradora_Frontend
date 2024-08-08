// Panel.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Depuradora from './Depuradora'; 
import MiCalendario from './MiCalendario';
import Datos from './Datos';
import Vacaciones from './Vacaciones';
import './assets/index.css'; 

const Panel = ({ activePage }) => {
    const navigate = useNavigate();
    const{usuarioId, token} = useParams();
    const handleNavigation = (route) => {
        navigate(`/${route}`);
    };
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const renderPagina = () => {
        switch (activePage) {
            case 'depuradora':
                return <Depuradora token={getCookie('token')}/>;
            case 'calendario':
                return <MiCalendario  usuarioId={usuarioId}/>;
            case 'datos':
                return <Datos />;
            case 'vacaciones':
                return <Vacaciones usuarioId={usuarioId}/>;
    
            default:
                return <Depuradora />;
        }
    };

    const handleLogout = () => {
        console.log('Logging out...');
    };

    return (
        <div className="panel-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header onLogout={handleLogout} usuarioId={usuarioId} />

            <main style={{
                flex: '1',
                overflow: 'auto',
                backgroundColor: '#F5F5F5'
            }}>
                {renderPagina()}
            </main>

            <Footer handleNavigation={handleNavigation} usuarioId={usuarioId} rutaSeleccionada={activePage} />
        </div>
    );
};

export default Panel;

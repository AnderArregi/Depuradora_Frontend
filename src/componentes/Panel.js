// Panel.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Depuradora from './Depuradora'; 
import MiCalendario from './MiCalendario';
import Datos from './Datos';
import Vacaciones from './Vacaciones';
import './assets/index.css'; 

const Panel = ({ activePage }) => {
    const navigate = useNavigate();

    const handleNavigation = (route) => {
        navigate(`/${route}`);
    };

    const renderPagina = () => {
        switch (activePage) {
            case 'depuradora':
                return <Depuradora />;
            case 'calendario':
                return <MiCalendario />;
            case 'datos':
                return <Datos />;
            case 'vacaciones':
                return <Vacaciones />;
            default:
                return <Depuradora />;
        }
    };

    const handleLogout = () => {
        console.log('Logging out...');
    };

    return (
        <div className="panel-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header onLogout={handleLogout} />

            <main style={{
                flex: '1',
                overflow: 'auto',
                backgroundColor: '#F5F5F5'
            }}>
                {renderPagina()}
            </main>

            <Footer handleNavigation={handleNavigation} />
        </div>
    );
};

export default Panel;

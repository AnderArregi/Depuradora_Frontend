import React, { useEffect, useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import axios from 'axios'; // Asegúrate de instalar axios si decides usarlo

const Datos = () => {
    const [embedConfig, setEmbedConfig] = useState(null);
    
    useEffect(() => {
        const getPowerBIToken = async () => {
            try {
                const response = await axios.get('/api/powerbi-token'); // Ajusta esta URL a tu configuración
                console.log(response.data);  // Verifica que esta línea imprime los datos esperados
                const { accessToken, embedUrl, reportId } = response.data;

                setEmbedConfig({
                    type: 'report',
                    id: reportId,
                    embedUrl: embedUrl,
                    tokenType: models.TokenType.Embed,
                    accessToken: accessToken
                });
            } catch (error) {
                console.error('Error fetching PowerBI token:', error);
            }
        };

        getPowerBIToken();
    }, []);

    if (!embedConfig) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Informe de Power BI</h1>
            <PowerBIEmbed
                embedConfig={embedConfig}
                eventHandlers={
                    new Map([
                        ['loaded', function () { console.log('Report loaded'); }],
                        ['rendered', function () { console.log('Report rendered'); }],
                        ['error', function (event) { console.log(event.detail); }]
                    ])
                }
                getEmbeddedComponent={(embeddedReport) => {
                    window.report = embeddedReport;
                }}
            />
        </div>
    );
};

export default Datos;

import React, { useEffect, useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import axios from 'axios';

const Datos = () => {
    const [embedConfig, setEmbedConfig] = useState(null);

    useEffect(() => {
        const getPowerBIToken = async () => {
            try {
                // Suponiendo que tu servidor local devuelve el token de Power BI
                const response = await axios.get('http://localhost:3006/api/powerbi-token');
                console.log(response.data);  // Verifica que esta línea imprime los datos esperados
                const { accessToken, embedUrl, reportId, groupId } = response.data;
                const tokenEmbedUrl = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/GenerateToken`
                const tokenResponse = await axios.post(tokenEmbedUrl, {
                    accessLevel: 'View'
                  }, {
                    headers: {
                      'Authorization': `Bearer ${accessToken}`,
                      'Content-Type': 'application/json'
                    }
                  });
              
                setEmbedConfig({
                    type: 'report',
                    id: reportId,
                    embedUrl: embedUrl,
                    tokenType: models.TokenType.Embed,
                    accessToken: tokenResponse.data.token,
                    settings: {
                        panes: {
                            filters: {
                                visible: false
                            },
                            pageNavigation: {
                                visible: false
                            }
                        }
                    }
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
        <div style={{ height: '100vh' }}>
            <h1>Informe de Power BI</h1>
            <PowerBIEmbed
                embedConfig={embedConfig}
                cssClassName={"embed-container"}
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

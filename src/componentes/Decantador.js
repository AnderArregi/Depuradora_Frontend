import React, { useRef, useEffect } from 'react';

const Decantador = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const getVideo = async () => {
            try {
                const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
                // Asignar el stream al elemento de vídeo si este está disponible
                if (videoRef.current) {
                    videoRef.current.srcObject = videoStream;
                }
            } catch (error) {
                console.error('Error al acceder a la cámara:', error);
            }
        };

        getVideo();

        // Opcional: Detener el video cuando el componente se desmonte
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="decantador-container">
            <h1>Vista de la Cámara del Decantador</h1>
            <video ref={videoRef} autoPlay playsInline width="720" height="480"></video>
            <button onClick={() => {
                if (videoRef.current && videoRef.current.srcObject) {
                    const tracks = videoRef.current.srcObject.getTracks();
                    tracks.forEach(track => track.enabled = !track.enabled); // Esto pausa la transmisión
                }
            }}>Pausar/Reanudar</button>
        </div>
    );
};

export default Decantador;

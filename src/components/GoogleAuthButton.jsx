import React, { useEffect, useState } from 'react';

// Reemplaza con tu Client ID de Google Cloud
const CLIENT_ID = '877477047403-ldmpthesm875jsjeb9hh7rh87f3lc5kb.apps.googleusercontent.com';
// Define los ámbitos (scopes) necesarios para acceder al calendario
const SCOPES = 'https://www.googleapis.com/auth/calendar.events'; // O scopes más específicos

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

function GoogleAuthButton() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [googleAuth, setGoogleAuth] = useState(null);
    const [loading, setLoading] = useState(true); // Para indicar si gapi se está cargando

    useEffect(() => {
        // Cargar la biblioteca de gapi
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
            window.gapi.load('client:auth2', () => {
                window.gapi.client.init({
                    apiKey: null, // apiKey no es estrictamente necesaria para este caso con OAuth, pero puedes incluirla si la tienes
                    clientId: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES,
                }).then(() => {
                    // auth2 es la instancia de autenticación
                    const auth = window.gapi.auth2.getAuthInstance();
                    setGoogleAuth(auth);
                    setIsSignedIn(auth.isSignedIn.get());

                    // Escuchar cambios en el estado de inicio de sesión
                    auth.isSignedIn.listen(setIsSignedIn);
                    setLoading(false); // gapi cargado
                }).catch(error => {
                    console.error("Error initializing gapi client:", error);
                    setLoading(false);
                });
            }, error => {
                 console.error("Error loading gapi auth2:", error);
                 setLoading(false);
            });
        };
        script.onerror = () => {
            console.error("Failed to load gapi script");
            setLoading(false);
        };
        document.body.appendChild(script);

        return () => {
            // Limpiar el script si el componente se desmonta
             const gapiScript = document.querySelector('script[src="https://apis.google.com/js/api.js"]');
             if (gapiScript) {
                 gapiScript.remove();
             }
        };
    }, []);

    const handleLogin = () => {
        if (googleAuth) {
            googleAuth.signIn();
        }
    };

    const handleLogout = () => {
        if (googleAuth) {
            googleAuth.signOut();
        }
    };

    if (loading) {
        return <div>Cargando autenticación de Google...</div>;
    }

    return (
        <div>
            {isSignedIn ? (
                <div>
                    <p>Usuario autenticado con Google Calendar</p>
                    <button onClick={handleLogout}>Cerrar Sesión de Google</button>
                    {/* Aquí puedes agregar componentes o lógica para interactuar con el calendario */}
                </div>
            ) : (
                <button onClick={handleLogin}>Conectar con Google Calendar</button>
            )}
        </div>
    );
}

export default GoogleAuthButton;
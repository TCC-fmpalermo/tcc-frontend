import { useEffect, useRef, useState } from "react";
import Guacamole from 'guacamole-common-js';
import { useSearchParams } from "react-router-dom";
import { toast, Toaster } from "sonner";

const baseUrl = import.meta.env.VITE_GUACAMOLE_URL;

export function AccessDesktop() {
    const displayRef = useRef<HTMLDivElement>(null);
    const [connected, setConnected] = useState(false);
    const [client, setClient] = useState<Guacamole.Client | null>(null);
    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');

    useEffect(() => {
        // Defina uma função assíncrona dentro do useEffect
        const initializeConnection = async () => {
            if (!connected) {
                if (!token) return;
                const tunnel = new Guacamole.WebSocketTunnel(baseUrl);
                const newClient = new Guacamole.Client(tunnel);

                newClient.onerror = (error) => {
                    toast.error("Erro ao estabelecer conexão");
                    console.error("Guacamole Client Error:", error);
                };

                newClient.connect('token=' + token);

                const keyboard = new Guacamole.Keyboard(document);
                keyboard.onkeydown = (keysym) => {
                    if (newClient) newClient.sendKeyEvent(1, keysym);
                };
                keyboard.onkeyup = (keysym) => {
                    if (newClient) newClient.sendKeyEvent(0, keysym);
                };

                const mouse = new Guacamole.Mouse(newClient.getDisplay().getElement());
                mouse.onEach(['mousedown', 'mousemove', 'mouseup'], (e: any) => {
                    if (newClient) newClient.sendMouseState(e.state, true);
                });
                mouse.on('mouseout', () => {
                    if (newClient) newClient.getDisplay().showCursor(false);
                });

                setClient(newClient);
                setConnected(true);
            }
        };

        // Chame a função assíncrona dentro do useEffect
        initializeConnection();

        // Cleanup function
        return () => {
            if (client) {
                client.disconnect();
                setClient(null);
                setConnected(false);
            }
        };
    }, [connected, token]);

    useEffect(() => {
        if (client && displayRef.current) {
            const displayElement = client.getDisplay().getElement();
            displayRef.current.appendChild(displayElement);
        }
    }, [client]);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div ref={displayRef} style={{ border: '1px solid black' }} />
            </div>
            <Toaster />
        </>
    );
}

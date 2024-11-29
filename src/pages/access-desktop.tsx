import { useEffect, useRef, useState } from "react";
import Guacamole from 'guacamole-common-js';

const baseUrl = import.meta.env.VITE_GUACAMOLE_URL;
const CIPHER = import.meta.env.VITE_CIPHER;
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

interface EncryptedData {
    iv: string;
    value: string;
}

async function encryptToken(value: string): Promise<string> {
    const keyBuffer = new TextEncoder().encode(SECRET_KEY.padEnd(32, ' ')); // Garantir que tenha 32 bytes
    const iv = crypto.getRandomValues(new Uint8Array(16)); // Gerar IV aleatório

    // Gerar chave para o algoritmo AES-CBC
    const key = await crypto.subtle.importKey(
        'raw',
        keyBuffer,
        { name: CIPHER },
        false,
        ['encrypt']
    );

    const valueBuffer = new TextEncoder().encode(value); // Converter para ArrayBuffer

    // Realizar a criptografia
    const encryptedBuffer = await crypto.subtle.encrypt(
        { name: CIPHER, iv },
        key,
        valueBuffer
    );

    const encryptedBase64 = arrayBufferToBase64(encryptedBuffer);
    const ivBase64 = arrayBufferToBase64(iv);

    const data: EncryptedData = {
        iv: ivBase64,
        value: encryptedBase64,
    };

    // Retornar o objeto como base64
    return base64Encode(JSON.stringify(data));
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

// Função para converter string para base64
function base64Encode(str: string): string {
    return btoa(decodeURIComponent(encodeURIComponent(str)));
}

export function AccessDesktop() {
    const displayRef = useRef<HTMLDivElement>(null);
    const [connected, setConnected] = useState(false);
    const [client, setClient] = useState<Guacamole.Client | null>(null);

    useEffect(() => {
        // Defina uma função assíncrona dentro do useEffect
        const initializeConnection = async () => {
            if (!connected) {
                const token = await encryptToken(JSON.stringify({
                    connection: {
                        type: 'rdp',
                        settings: {
                            hostname: '10.1.4.164',
                            username: 'ubuntu',
                            password: '3zkbQC3G94',
                            width: 1820,
                            height: 900,
                        },
                    },
                }));

                const tunnel = new Guacamole.WebSocketTunnel(baseUrl);
                const newClient = new Guacamole.Client(tunnel);

                newClient.onerror = (error) => {
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
    }, [connected]);

    useEffect(() => {
        if (client && displayRef.current) {
            const displayElement = client.getDisplay().getElement();
            displayRef.current.appendChild(displayElement);
        }
    }, [client]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div ref={displayRef} style={{ border: '1px solid black' }} />
        </div>
    );
}

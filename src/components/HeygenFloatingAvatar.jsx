import { useEffect } from 'react';
import { HEYGEN_IFRAME_URL, HEYGEN_HOST } from '../config/heygenConfig';
import '../styles/HeygenFloatingAvatar.css';

export default function HeygenFloatingAvatar() {
    useEffect(() => {
        const wrapDiv = createWrapperDiv();
        const iframe = createIframe(HEYGEN_IFRAME_URL);
        const container = document.createElement('div');
        container.id = "heygen-streaming-container";
        container.appendChild(iframe);
        wrapDiv.appendChild(container);
        document.body.appendChild(wrapDiv);

        const handleMessage = createMessageHandler(wrapDiv);
        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
            wrapDiv.remove();
        };
    }, []);

    return null;
}

function createWrapperDiv() {
    const div = document.createElement("div");
    div.id = "heygen-streaming-embed";
    return div;
}

function createIframe(url) {
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.title = "Streaming Embed";
    iframe.allow = "microphone";
    iframe.role = "dialog";
    iframe.allowFullscreen = false;
    return iframe;
}

function createMessageHandler(wrapDiv) {
    let visible = false, initial = false;

    return function (e) {
        if (e.origin === HEYGEN_HOST && e.data?.type === "streaming-embed") {
            if (e.data.action === "init") {
                initial = true;
                wrapDiv.classList.toggle("show", initial);
            } else if (e.data.action === "show") {
                visible = true;
                wrapDiv.classList.toggle("expand", visible);
            } else if (e.data.action === "hide") {
                visible = false;
                wrapDiv.classList.toggle("expand", visible);
            }
        }
    };
}
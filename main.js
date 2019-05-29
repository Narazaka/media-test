function rand255() {
    return Math.floor(Math.random() * 256);
}

async function main() {
    // const mediaStream = await navigator.mediaDevices.getDisplayMedia({video: true, audio: true});
    const $console = document.getElementById("console");
    const canvas = /** @type {HTMLCanvasElement} */(document.getElementById("c"));
    const ctx = canvas.getContext("2d");
    setInterval(() => {
        ctx.strokeStyle = `rgb(${rand255()},${rand255()},${rand255()})`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * 100, Math.random() * 50);
        ctx.lineTo(Math.random() * 100, Math.random() * 50);
        ctx.stroke();
        ctx.closePath();
    }, 16);
    /** @type {MediaStream} */
    const mediaStream = canvas.captureStream(30);
    console.log(mediaStream);
    
    const rec = new MediaRecorder(mediaStream);
    const line = document.createElement("div");
    $console.prepend(line);
    rec.ondataavailable = ({data}) => {
        console.log(data);

        const reader = new FileReader();
        reader.onload = () => {
            line.textContent = Array.from(new Uint8Array(reader.result));
        }
        reader.readAsArrayBuffer(data);
    }
    rec.start(33);
}

async function main() {
    // const mediaStream = await navigator.mediaDevices.getDisplayMedia({video: true, audio: true});
    const $console = document.getElementById("c");
    const canvas = /** @type {HTMLCanvasElement} */(document.getElementById("c"));
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    setInterval(() => {
        ctx.lineTo(Math.random() * 100, Math.random() * 50);
        ctx.stroke();
    }, 400);
    /** @type {MediaStream} */
    const mediaStream = canvas.captureStream(30);
    console.log(mediaStream);
    
    const rec = new MediaRecorder(mediaStream);
    rec.ondataavailable = ({data}) => {
        console.log(data);
        const line = document.createElement("div");
        line.textContent = data.toString();
        $console.appendChild(line);
    }
    rec.start(500);
}

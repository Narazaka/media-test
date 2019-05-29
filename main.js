function rand255() {
    return Math.floor(Math.random() * 256);
}

let $console;

function addConsoleLine(txt) {
    const line = document.createElement("div");
    line.textContent = txt;
    $console.prepend(line);
    return line;
}

async function main() {
    // const mediaStream = await navigator.mediaDevices.getDisplayMedia({video: true, audio: true});
    $console = document.getElementById("console");

    const canvas = /** @type {HTMLCanvasElement} */(document.getElementById("c"));
    addConsoleLine("canvas = " + canvas);
    const ctx = canvas.getContext("2d");
    addConsoleLine("ctx = " + ctx);
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
    addConsoleLine("mediaStream = " + mediaStream);
    console.log(mediaStream);

    
    const rec = new MediaRecorder(mediaStream);
    addConsoleLine("MediaRecorder = " + rec);
    
    const dataLine = addConsoleLine();

    rec.ondataavailable = ({data}) => {
        console.log(data);

        const reader = new FileReader();
        reader.onload = () => {
            dataLine.textContent = Array.from(new Uint8Array(reader.result));
        }
        reader.readAsArrayBuffer(data);
    }
    rec.start(33);
}

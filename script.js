let timer;
let startTime;
let elapsedTime = 0;
let running = false;
let laps = [];

function start() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(timer);
        running = false;
        elapsedTime = Date.now() - startTime;
    }
}

function reset() {
    clearInterval(timer);
    running = false;
    elapsedTime = 0;
    document.getElementById("display").textContent = "00:00:00";
    laps = [];
    updateLaps();
}

function lap() {
    if (running) {
        let lapTime = Date.now() - startTime;
        let lapMinutes = Math.floor(lapTime / 60000);
        let lapSeconds = Math.floor((lapTime % 60000) / 1000);
        let lapMilliseconds = Math.floor((lapTime % 1000) / 10);
        laps.push({ time: lapTime, minutes: lapMinutes, seconds: lapSeconds, milliseconds: lapMilliseconds });
        updateLaps();
    }
}

function update() {
    let currentTime = Date.now() - startTime;
    let hours = Math.floor(currentTime / 3600000);
    let minutes = Math.floor((currentTime % 3600000) / 60000);
    let seconds = Math.floor((currentTime % 60000) / 1000);
    let milliseconds = Math.floor(currentTime % 1000 / 10);

    document.getElementById("display").textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function updateLaps() {
    let lapsList = document.getElementById("laps");
    lapsList.innerHTML = "";
    laps.forEach((lap, index) => {
        let lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${index + 1}: ${pad(lap.minutes)}:${pad(lap.seconds)}.${pad(lap.milliseconds)}`;
        lapsList.appendChild(lapItem);
    });
}

function pad(num) {
    return num.toString().padStart(2, "0");
}

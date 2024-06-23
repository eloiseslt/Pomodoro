let minutes = 50;
let seconds = 0;
let interval;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');

function updateDisplay() {
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function timer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(interval);
            isRunning = false;
            startStopButton.textContent = 'Commencer';
            alert('Temps écoulé!');
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    updateDisplay();
}

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(interval);
        startStopButton.textContent = 'Commencer';
    } else {
        interval = setInterval(timer, 1000);
        startStopButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
    clearInterval(interval);
    isRunning = false;
    minutes = 50;
    seconds = 0;
    updateDisplay();
    startStopButton.textContent = 'Commencer';
});

updateDisplay();

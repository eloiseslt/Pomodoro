let timer;
let isRunning = false;
let isWorkSession = true;
let workTime = 50 * 60; // 50 minutes in seconds
let breakTime = 10 * 60; // 10 minutes in seconds
let time = workTime;
let sessionCount = 0;

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const sessionCountElement = document.getElementById('sessionCount');

function updateDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startStopButton.textContent = 'Pause';
        timer = setInterval(() => {
            if (time > 0) {
                time--;
                updateDisplay();
            } else {
                clearInterval(timer);
                if (isWorkSession) {
                    isWorkSession = false;
                    time = breakTime;
                    alert('Temps de pause !');
                } else {
                    isWorkSession = true;
                    time = workTime;
                    sessionCount++;
                    sessionCountElement.textContent = sessionCount;
                    alert('Retour au travail !');
                }
                updateDisplay();
                startTimer(); // Démarre immédiatement la prochaine session
            }
        }, 1000);
    } else {
        clearInterval(timer);
        isRunning = false;
        startStopButton.textContent = 'Commencer';
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isWorkSession = true;
    time = workTime;
    updateDisplay();
    startStopButton.textContent = 'Commencer';
}

startStopButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay(); // Initialize display

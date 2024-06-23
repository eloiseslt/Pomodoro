let timer;
let isRunning = false;
let isWorkSession = true;
let workTime = 0;
let breakTime = 0;
let time = 0;
let sessionCount = 0;

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const sessionCountElement = document.getElementById('sessionCount');
const startConfigButton = document.getElementById('startConfig');
const workTimeSelect = document.getElementById('workTime');
const breakTimeSelect = document.getElementById('breakTime');
const timerContainer = document.getElementById('timerContainer');
const menu = document.getElementById('menu');

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

function startConfig() {
    workTime = parseInt(workTimeSelect.value) * 60;
    breakTime = parseInt(breakTimeSelect.value) * 60;
    time = workTime;
    updateDisplay();
    menu.style.display = 'none';
    timerContainer.style.display = 'block';
}

startStopButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
startConfigButton.addEventListener('click', startConfig);

updateDisplay(); // Initialize display

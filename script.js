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
const timerContainer = document.getElementById('timerContainer');
const menu = document.getElementById('menu');
const backToMenuButton = document.getElementById('backToMenu');

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
    time = workTime;
    updateDisplay();
    menu.style.display = 'none';
    timerContainer.style.display = 'block';
    backToMenuButton.style.display = 'block';
}

function backToMenu() {
    clearInterval(timer);
    isRunning = false;
    menu.style.display = 'block';
    timerContainer.style.display = 'none';
    backToMenuButton.style.display = 'none';
    startStopButton.textContent = 'Commencer';
    sessionCountElement.textContent = '0';
    sessionCount = 0;
    time = 0;
    updateDisplay();
}

document.querySelectorAll('.time-selection .time-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const timeValue = parseInt(event.target.getAttribute('data-time'));
        if (event.target.parentElement.previousElementSibling.textContent.includes('travail')) {
            workTime = timeValue * 60;
        } else {
            breakTime = timeValue * 60;
        }
    });
});

startStopButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
startConfigButton.addEventListener('click', startConfig);
backToMenuButton.addEventListener('click', backToMenu);

updateDisplay(); // Initialize display

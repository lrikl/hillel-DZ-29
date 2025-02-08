'use strict';

const timeVerification = /^([0-5][0-9]):([0-5][0-9])$/;
const timerButton = document.querySelector('.timer-button');
let countDownInterval = null;

function startCountDown(userTimerInput, endCallback) {
    endCallback(false);

    if (countDownInterval) {
        clearInterval(countDownInterval);
    }

    const userTimer = userTimerInput.split(':'); 
    let timerMinute = Number(userTimer[0]); 
    let timerSeconde = Number(userTimer[1]);  

    const timerInHTML = document.querySelector('.timer');

    countDownInterval = setInterval(() => {

        timerInHTML.innerHTML = `${String(timerMinute).padStart(2, '0')}:${String(timerSeconde).padStart(2, '0')}`;
        timerSeconde--;

        if (timerMinute !== 0 && timerSeconde < 0) {
            timerMinute--;
            timerSeconde = 59;
        }
        
        if (timerMinute === 0 && timerSeconde < 0) {
            clearInterval(countDownInterval);
            endCallback(true);
        }

    }, 1000);
}

timerButton.addEventListener('click', () => {
    const input = document.querySelector('.timer-controls__input');
    const userTimerInput = input.value.trim();

    if (!timeVerification.test(userTimerInput)) {
        showError(input, 'формат таймера невірний, напишіть кількість хвилин і секунд від 00 до 59, виду 00:00');
    }
    else {
        removeError(input);
        startCountDown(userTimerInput, showBannerEndTimer);
        input.value = '00:00';
    }
});

function showError(input, message) {
    removeError(input);

    const currentError = document.createElement('div');
    currentError.classList.add('error-message');
    currentError.textContent = message;

    input.after(currentError);
    input.classList.add('input-invalid');
}

function removeError(input) {
    const currentError = input.nextElementSibling;

    if (currentError && currentError.classList.contains('error-message')) {
        currentError.remove();
    }

    input.classList.remove('input-invalid');
}

function showBannerEndTimer(toggle) {
    document.querySelector('.timer-end').style.display = toggle ? 'block' : 'none';
    
    const audio = document.querySelector('.end-sound');
    if (toggle) {
        audio.play();
    } else {
        audio.pause();
        audio.currentTime = 0;
    }
}

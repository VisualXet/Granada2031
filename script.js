/**
 * CUENTA ATRÁS GRANADA 2026 / 2031 — LÓGICA FUNCIONAL DEL CONTADOR
 * Fecha objetivo: 2026-12-03T10:00:00+01:00
 */

let targetDate = new Date('2026-12-03T10:00:00+01:00').getTime();

const state = {
    days: -1,
    hours: -1,
    minutes: -1,
    seconds: -1
};

function animateValue(containerId, newValue) {
    const container = document.getElementById(`${containerId}-container`);
    const placeholder = document.getElementById(`${containerId}-placeholder`);
    if (!container || !placeholder) return;

    const currentElement = container.querySelector('.number-slide:not(.slide-up-leave-active)');
    const formattedValue = newValue.toString().padStart(2, '0');

    if (currentElement && currentElement.innerText === formattedValue) return;

    placeholder.innerText = formattedValue;

    const newElement = document.createElement('div');
    newElement.className = 'number-slide slide-up-enter';
    newElement.innerText = formattedValue;
    container.appendChild(newElement);

    void newElement.offsetWidth;

    newElement.classList.remove('slide-up-enter');
    newElement.classList.add('slide-up-enter-active');

    if (currentElement) {
        currentElement.classList.add('slide-up-leave-active');
        setTimeout(() => {
            if (currentElement.parentNode === container) {
                container.removeChild(currentElement);
            }
            newElement.classList.remove('slide-up-enter-active');
        }, 600);
    } else {
        newElement.classList.remove('slide-up-enter-active');
    }
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        if (state.seconds !== 0) {
            animateValue('days', 0);
            animateValue('hours', 0);
            animateValue('minutes', 0);
            animateValue('seconds', 0);
            state.seconds = 0;
        }
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (state.days !== days) {
        animateValue('days', days);
        state.days = days;
    }
    if (state.hours !== hours) {
        animateValue('hours', hours);
        state.hours = hours;
    }
    if (state.minutes !== minutes) {
        animateValue('minutes', minutes);
        state.minutes = minutes;
    }
    if (state.seconds !== seconds) {
        animateValue('seconds', seconds);
        state.seconds = seconds;
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);
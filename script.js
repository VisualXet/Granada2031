/**
 * CUENTA ATRÁS GRANADA 2026 / 2031 — 1. Fachada 1 con Simple contador — Tríptico Gigante (Copia) (Copia)
 * Fecha objetivo configurada: 2026-12-03T00:00:00+01:00
 */

const targetDate = new Date('2026-12-03T00:00:00+01:00').getTime();
const state = { days: -1, hours: -1, minutes: -1, seconds: -1 };

function animateUnitContainers(unitName, newValue) {
    const formattedValue = newValue.toString().padStart(2, '0');
    document.querySelectorAll('[data-unit="' + unitName + '"]').forEach((container) => {
        const placeholder = container.querySelector('.hidden-placeholder');
        const currentElement = container.querySelector('.number-slide:not(.slide-up-leave-active)');
        if (currentElement && currentElement.innerText === formattedValue) return;
        if (placeholder) placeholder.innerText = formattedValue;

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
                if (currentElement.parentNode === container) container.removeChild(currentElement);
                newElement.classList.remove('slide-up-enter-active');
            }, 600);
        } else {
            newElement.classList.remove('slide-up-enter-active');
        }
    });
}

function updateCountdown() {
    const distance = targetDate - Date.now();
    if (distance < 0 || Number.isNaN(distance)) {
        ['days', 'hours', 'minutes', 'seconds'].forEach(u => animateUnitContainers(u, 0));
        return;
    }
    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    if (state.days !== days) { animateUnitContainers('days', days); state.days = days; }
    if (state.hours !== hours) { animateUnitContainers('hours', hours); state.hours = hours; }
    if (state.minutes !== minutes) { animateUnitContainers('minutes', minutes); state.minutes = minutes; }
    if (state.seconds !== seconds) { animateUnitContainers('seconds', seconds); state.seconds = seconds; }
}

updateCountdown();
setInterval(updateCountdown, 1000);
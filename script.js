/**
 * CUENTA ATRÁS GRANADA 2026 / 2031 — 1. Fachada 3 con Tripe contador — Tríptico Gigante (Copia)
 * Fecha objetivo configurada: 2026-12-03T12:30:00+01:00
 */

let targetDate = new Date('2026-12-03T12:30:00+01:00').getTime();
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
// Auto-comprobación en directo de la hora oficial en narrativas.ideal.es (CORS habilitado)
async function syncFromOfficialIdeal() {
    try {
        const r = await fetch('https://narrativas.ideal.es/taigranada26/cuenta_atr_s_granada_2026%20%283%29.html?_t=' + Date.now(), { cache: 'no-store' });
        if (!r.ok) return;
        const txt = await r.text();
        const m = txt.match(/targetDate\s*=\s*new\s+Date\(\s*['"]([^'"]+)['"]\s*\)/i);
        if (m && m[1]) {
            const nextTs = new Date(m[1].trim()).getTime();
            if (!Number.isNaN(nextTs) && nextTs !== targetDate) {
                targetDate = nextTs;
                updateCountdown();
            }
        }
    } catch (_) {}
}
syncFromOfficialIdeal();
setInterval(syncFromOfficialIdeal, 600000);

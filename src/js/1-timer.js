import flatpickr from 'flatpickr'; // Описаний в документації
import 'flatpickr/dist/flatpickr.min.css'; // Додатковий імпорт стилів

import iziToast from 'izitoast'; // Описаний у документації
import 'izitoast/dist/css/iziToast.min.css'; // Додатковий імпорт стилів

const time = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
let userSelectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(time, options);

function formateTime(value) {
  return String(value).padStart(2, '0');
}

function updateTimer(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = formateTime(days);
  document.querySelector('[data-hours]').textContent = formateTime(hours);
  document.querySelector('[data-minutes]').textContent = formateTime(minutes);
  document.querySelector('[data-seconds]').textContent = formateTime(seconds);
}

let timerInterval = null;
function startTimer(userDate) {
  timerInterval = setInterval(() => {
    const now = new Date();
    const timeLeft = userDate - now;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      updateTimer(0, 0, 0, 0);

      time.disabled = false;
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      updateTimer(days, hours, minutes, seconds);
    }
  }, 1000);
}

startBtn.addEventListener('click', function () {
  if (userSelectedDate > new Date()) {
    startTimer(userSelectedDate);
    startBtn.disabled = true;
    time.disabled = true;
  }
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

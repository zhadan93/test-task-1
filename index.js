const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const disableButtonEl = (isDisabled) => {
  buttonEl.disabled = isDisabled;
}

disableButtonEl(true);

const convertToTimerFormat = (...timerElementsArr) => {
  return timerElementsArr.map((timerElement) => `0${timerElement}`.slice(-2)).join(':');
};

const convertSecondsToTimerFormat = (seconds) => {
  const SECOND_PER_MINUTE = MINUTES_PER_HOUR = 60;
  const secondsPerHour = SECOND_PER_MINUTE * MINUTES_PER_HOUR;
  const secondsPerMinutes = seconds % secondsPerHour;

  const timerHours = Math.trunc(seconds / secondsPerHour);
  const timerMinutes = Math.trunc(secondsPerMinutes / MINUTES_PER_HOUR);
  const timerSeconds = secondsPerMinutes % SECOND_PER_MINUTE;

  return convertToTimerFormat(timerHours, timerMinutes, timerSeconds);
};

const setValueInTimerEl = (seconds) => {
  timerEl.textContent = convertSecondsToTimerFormat(seconds);
}

const createTimerAnimator = () => {
  let timerId = null;

  return (seconds) => {
    clearTimeout(timerId);

    setValueInTimerEl(seconds);

    timerId = setTimeout(function tick() {
      if (seconds === 0) {
        clearTimeout(timerId);
      } else {
        seconds -= 1;
        setValueInTimerEl(seconds);
        timerId = setTimeout(tick, 1000);
      }
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  const { value } = e.target;
  const correctValue = value.replace(/\D/, '');

  e.target.value = correctValue;
  disableButtonEl(correctValue == 0);
});

buttonEl.addEventListener('click', () => {
    const seconds = Number(inputEl.value);

    animateTimer(seconds);

    inputEl.value = '';
    disableButtonEl(true);
});

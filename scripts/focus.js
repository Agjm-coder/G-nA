let focusButton = document.getElementById('focus');
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let backgroundVideo = document.querySelector('.back-video');
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 29;
time.textContent = `${minCount + 1}:00`;

const appendZero = (value) => {
    return value < 10 ? `0${value}` : value;
};

const stopVideo = () => {
    backgroundVideo.pause();
    backgroundVideo.currentTime = 0; // Rewind the video to the start
};

const pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    backgroundVideo.pause(); // Pause the video when the timer is paused
};

reset.addEventListener("click", () => {
    pauseTimer();
    stopVideo(); // Stop the video when the timer is reset
    switch(active){
        case "long":
            minCount = 14;
            break;
        case "short":
            minCount = 0;
            break;
        default:
            minCount = 29;
            break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
});

const removeFocus = () => {
    buttons.forEach((btn) => {
        btn.classList.remove("btn-focus");
    });
};

focusButton.addEventListener("click", () => {
    removeFocus();
    focusButton.classList.add("btn-focus");
    pauseTimer();
    stopVideo(); // Stop the video when switching to focus
    active = "focus";
    minCount = 29;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
});

shortBreakButton.addEventListener("click", () => {
    active = "short";
    removeFocus();
    shortBreakButton.classList.add("btn-focus");
    pauseTimer();
    stopVideo(); // Stop the video when switching to short break
    count = 59;
    minCount = 0;
    time.textContent = `${appendZero(minCount + 1)}:00`;
});

longBreakButton.addEventListener("click", () => {
    active = "long";
    removeFocus();
    longBreakButton.classList.add("btn-focus");
    pauseTimer();
    stopVideo(); // Stop the video when switching to long break
    count = 59;
    minCount = 14;
    time.textContent = `${minCount + 1}:00`;
});

pause.addEventListener("click", () => {
    pauseTimer();
});

startBtn.addEventListener("click", () => {
    reset.classList.add("show");
    pause.classList.add("show");
    startBtn.classList.add("hide");
    paused = false;

    backgroundVideo.play(); // Start the video when the timer starts

    set = setInterval(() => {
        if (paused) return; // Ensure the timer doesn't run when paused

        if (count === 0) {
            if (minCount === 0) {
                clearInterval(set);
                stopVideo(); // Stop the video when the timer reaches zero
            } else {
                minCount--;
                count = 59;
            }
        } else {
            count--;
        }
        time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    }, 1000);
});
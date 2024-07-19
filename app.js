let showCurrentTime = document.querySelector(".showCurrentTime");
let inputValid = document.querySelector("#showErrMsg");
let setAlarmBtn = document.querySelector("#setAlarm");
let formField = document.querySelector("#formField");
let audio = new Audio("alarmCopy.mp3");
let remTime = document.querySelector(".remTime");

// 5. calculate time for alarm
let compareTime = (inputHour, inputMinuts) => {
  // compare time in every Second
  setInterval(() => {
    let currentdate = new Date();
    let currentHour = currentdate.getHours();
    let currentMin = currentdate.getMinutes();

    // Convert input time to Integer formate
    inputHour = parseInt(inputHour);
    inputMinuts = parseInt(inputMinuts);

    // Get checkbox value
    let checkBox = document.querySelector("#checkbox");
    // console.log(`Input time: ${inputHour}:${inputMinuts}`);
    // console.log(`Current time: ${currentHour}:${currentMin}`);

    // Variable to store remaining time
    let remHour;
    let remMin;

    //calculate the Remaining time
    if (currentHour < inputHour) {
      if (currentMin <= inputMinuts) {
        remHour = inputHour - currentHour;
        remMin = inputMinuts - currentMin;
      } else if (currentMin > inputMinuts) {
        remHour = inputHour - 1 - currentHour;
        remMin = inputMinuts + 60 - currentMin;
      }
    } else if (currentHour > inputHour) {
      if (currentMin <= inputMinuts) {
        remHour = 24 - currentHour + inputHour;
        remMin = inputMinuts - currentMin;
      } else if (currentMin > inputMinuts) {
        remHour = 24 - currentHour + inputHour - 1;
        remMin = inputMinuts + 60 - currentMin;
      }
    } else {
      if (currentMin <= inputMinuts) {
        remHour = inputHour - currentHour;
        remMin = inputMinuts - currentMin;
      } else if (currentMin > inputMinuts) {
        remHour = 24 - currentHour + inputHour - 1;
        remMin = inputMinuts + 60 - currentMin;
      }
    }

    // Compare time only when checkbox is checked
    // if user unchecked the checkbox it's mean he want to stop alarm so run audio.pause
    if (checkBox.checked) {
      remTime.classList.add("remTime");
      remTime.classList.remove("remTimeHide");
      remTime.innerHTML = `Ring in ${remHour}h ${remMin}m`;
      if (inputHour == currentHour && inputMinuts == currentMin) {
        audio.play();
        // console.log("Alarm Ringing...");
      } else {
        // console.log("Time left");
      }
    } else {
      remTime.classList.add("remTimeHide");
      remTime.classList.remove("remTime");
      audio.pause();
    }
  }, 1000);
};

// 4. After enter details submit form
function validateForm() {
  // Get the input values of Hours and Minutes
  let inputHour = document.querySelector("#inputHour").value;
  let inputMinuts = document.querySelector("#inputMinuts").value;
  let amPm = document.querySelector("#selectAmPm").value;

  // Add 0 if there is only ! digit
  inputHour = inputHour < 10 ? "0" + inputHour : inputHour;
  inputMinuts = inputMinuts < 10 ? "0" + inputMinuts : inputMinuts;

  //print only last two digits of Hours and Minutes
  printAlarm.innerHTML = `${inputHour.slice(-2)}:${inputMinuts.slice(
    -2
  )} ${amPm}`;

  // Show alarm on Screen
  let showAlarm = document.querySelector(".hide-alarm");
  showAlarm.classList.add("show-alarm");

  // Make 12 Formate time to 24 Formate
  if (amPm == "PM") {
    if (inputHour < 12) {
      inputHour = parseInt(inputHour) + 12;
    }
  } else if (amPm == "AM") {
    if (inputHour == 12) {
      inputHour = 0;
    }
  }

  // Sent  entered time to another function
  compareTime(inputHour, inputMinuts);

  return false; //Stop to reload function on onSubmit
}

// 3.  Check tha input validation for Minutes
inputMinuts.addEventListener("input", () => {
  if (inputMinuts.value > 59) {
    inputValid.innerHTML = "Can't enter Greater than 59";
    inputMinuts.style.border = "1px solid red";
  }
  if (inputMinuts.value < 0) {
    inputValid.innerHTML = "Can't enter Less than 0";
    inputMinuts.style.border = "1px solid red";
  }
  if (
    (inputMinuts.value >= 0 && inputMinuts.value <= 59) ||
    inputMinuts.value === ""
  ) {
    inputValid.innerHTML = "";
    inputMinuts.style.border = "1px solid green";
  }
});

// 2. Check tha input validation for Hours
inputHour.addEventListener("input", () => {
  if (inputHour.value > 12) {
    inputValid.innerHTML = "Can't enter Greater than 12";
    inputHour.style.border = "1px solid red";
  }
  if (inputHour.value < 1) {
    inputValid.innerHTML = "Can't enter Less than 1";
    inputHour.style.border = "1px solid red";
  }
  if (
    (inputHour.value > 0 && inputHour.value <= 12) ||
    inputHour.value === ""
  ) {
    inputValid.innerHTML = "";
    inputHour.style.border = "1px solid green";
  }
});

// 1
// Display tha real Time in every Second
document.addEventListener("DOMContentLoaded", () => {
  setInterval(() => {
    let date1 = new Date();
    let currentTime = date1.toLocaleTimeString();

    // Print Live time on Screen
    showCurrentTime.innerHTML = currentTime;
  }, 1000);
});

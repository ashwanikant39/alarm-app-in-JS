let showCurrentTime = document.querySelector(".showCurrentTime");
let inputValid = document.querySelector("#showErrMsg");
let setAlarmBtn = document.querySelector("#setAlarm");
let formField = document.querySelector("#formField");
let audio = new Audio("alarmCopy.mp3");

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

let compareTime = (inputHour, inputMinuts) => {
  setInterval(() => {
    let currentdate = new Date();
    let currentHour = currentdate.getHours();
    let currentMin = currentdate.getMinutes();

    // Again conver Current Hour to string
    inputHour = parseInt(inputHour);
    inputMinuts = parseInt(inputMinuts);
    // console.log(`Current time ${currentHour}:${currentMin}`);
    // console.log(`input time ${inputHour}:${inputMinuts}`);

    // console.log("current h type " + typeof currentHour);
    // console.log("current m type " + typeof currentMin);
    // console.log("input h type " + typeof inputHour);
    // console.log("input m type " + typeof inputMinuts);

    let checkBox = document.querySelector("#checkBox");

    if (checkBox.checked) {
      if (inputHour == currentHour && inputMinuts == currentMin) {
        audio.play();
        // console.log("Alarm Ringing...");
      } else {
        // console.log("Time left");
      }
    } else {
      audio.pause();
    }
  }, 1000);

  // console.log("input Time " + inputHour + ":" + inputMinuts + " " + amPm);
  // console.log("Current time " + currentHour + ":" + currentMin);

  // console.log("current h " + currentHour);
  // console.log("input h " + inputHour.value);
  // console.log(typeof inputHour);

  // console.log(typeof inputHour);
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

  // console.log(
  //   "Entered time: " +
  //     inputHour +
  //     ":" +
  //     inputMinuts +
  //     ":" +
  //     amPm +
  //     " Type of AMPM" +
  //     typeof amPm
  // );

  // Add alarm to Screen
  // let showAlarm = document.querySelector(".hide-alarm");
  // let printAlarm = document.querySelector("#printAlarm");

  // showAlarm.classList.add("show-alarm");
  // showAlarm.classList.remove("show-alarms");

  printAlarm.innerHTML = `${inputHour.slice(-2)}:${inputMinuts.slice(
    -2
  )} ${amPm}`;

  // Make 12 Formate time to 24 Formate
  if (amPm == "PM") {
    if (inputHour < 12) {
      // inputHour=inputHour
      inputHour = parseInt(inputHour) + 12;
    }
  } else if (amPm == "AM") {
    if (inputHour == 12) {
      inputHour = 0;
    }
  }

  if (checkBox.checked) {
    compareTime(inputHour, inputMinuts);

    // console.log("checked");
  } else {
    audio.pause();
    // console.log("not checked");
  }

  // console.log("Formated time: " + inputHour + ":" + inputMinuts);

  // Call the funtion for compare input time and real time

  // Clear the input after submit form

  return false;
}

// 1
// Display tha real Time in every Second
document.addEventListener("DOMContentLoaded", () => {
  setInterval(() => {
    let date1 = new Date();
    let currentTime = date1.toLocaleTimeString();

    // console.log(typeof (parseInt(date1.getHours()) + " ") + date1.getHours());
    // console.log(currentTime.getHours);
    showCurrentTime.innerHTML = currentTime;
  }, 1000);
});

// Selectors
const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempDisplayResultEl = document.querySelector(".temp-display-result");
const numbersEl = document.querySelectorAll(".number");
const operationsEl = document.querySelectorAll(".operation");
const equalsEl = document.querySelector(".btn-equals");
const allClearEl = document.querySelector(".all-clear");
const lastEntityClearEl = document.querySelector(".last-entity-clear");
// console.log(display1El);
// console.log(display2El);
// console.log(tempDisplayResultEl);
// console.log(numbersEl);
// console.log(operationsEl);
// console.log(equalsEl);
// console.log(allClearEl);
// console.log(lastEntityClearEl);

// Variables
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

// Functionalities for number
numbersEl.forEach((number) => {
  number.addEventListener("click", (event) => {
    if (event.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (event.target.innerText === "." && haveDot) {
      return;
    }
    dis2Num = dis2Num + event.target.innerText;
    display2El.innerText = dis2Num;
  });
});

// Functionalities for number
operationsEl.forEach((operation) => {
  operation.addEventListener("click", (event) => {
    if (!dis2Num) {
      return;
    }
    haveDot = false;
    const operationsName = event.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dis2Num);
    }
    clearVar(operationsName);
    lastOperation = operationsName;
  });
});

function clearVar(name = "") {
  dis1Num += dis2Num + " " + name + " ";
  display1El.innerText = dis1Num;
  display2El.innerText = "";
  dis2Num = "";
  tempDisplayResultEl.innerText = result;
}

function mathOperation() {
  if (lastOperation === "X") {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(dis2Num);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(dis2Num);
  } else {
    return;
  }
}

equalsEl.addEventListener("click", (event) => {
  if (!dis1Num || !dis2Num) return;
  haveDot = false;
  mathOperation();
  clearVar();
  display2El.innerText = result;
  tempDisplayResultEl.innerText = "";
  dis2Num = result;
  dis1Num = "";
});

allClearEl.addEventListener("click", (event) => {
  display1El.innerText = "0";
  display2El.innerText = "0";
  dis1Num = "";
  dis2Num = "";
  result = "";
  tempDisplayResultEl.innerText = "0";
});

lastEntityClearEl.addEventListener("click", () => {
  display2El.innerText = "";
  dis2Num = "";
});

window.addEventListener("keydown", (event) => {
  if (
    event.key === "0" ||
    event.key === "1" ||
    event.key === "2" ||
    event.key === "3" ||
    event.key === "4" ||
    event.key === "5" ||
    event.key === "6" ||
    event.key === "7" ||
    event.key === "8" ||
    event.key === "9" ||
    event.key === "."
  ) {
    clickButtonEl(event.key);
  } else if (
    event.key === "-" ||
    event.key === "+" ||
    event.key === "/" ||
    event.key === "%"
  ) {
    clickOperation(event.key);
  } else if (event.key === "*") {
    clickOperation("X");
  } else if (event.key === "Enter" || event.key === "=") {
    clickEquals();
  }
});

function clickButtonEl(key) {
  numbersEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickOperation(key) {
  operationsEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickEquals() {
  equalsEl.click();
}

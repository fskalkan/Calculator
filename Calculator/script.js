const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".btn");

let currentValue = "";
let equation = [];
let shouldResetDisplay = false;

buttons.forEach(function (button) {
  button.addEventListener("click", clickButton);

  function clickButton(e) {
    const buttonValue = e.target.innerHTML;

    if (!isNaN(buttonValue) || buttonValue === ".") {
      if (shouldResetDisplay) {
        currentValue = "";
        shouldResetDisplay = false;
      }
      currentValue += buttonValue;
      result.value = formatNumber(currentValue);
    }

    if (
      buttonValue === "+" ||
      buttonValue === "-" ||
      buttonValue === "/" ||
      buttonValue === "*"
    ) {
      equation.push(currentValue);
      equation.push(buttonValue);
      currentValue = "";
      shouldResetDisplay = false;
    }

    if (buttonValue === "AC") {
      currentValue = "";
      equation = [];
      result.value = "";
    }

    if (buttonValue === "DE") {
      currentValue = currentValue.slice(0, -1);
      result.value = formatNumber(currentValue);
    }

    if (buttonValue === "=") {
      equation.push(currentValue);
      const finalResult = calculateEquation(equation);
      result.value = formatNumber(finalResult.toString());
      currentValue = finalResult.toString();
      equation = [];
      shouldResetDisplay = true;
    }
  }
});

function calculateEquation(equation) {
  let tempEquation = [...equation];
  let finalResult = 0;

  for (let i = 0; i < tempEquation.length; i++) {
    if (tempEquation[i] === "*") {
      tempEquation[i - 1] =
        parseFloat(tempEquation[i - 1]) * parseFloat(tempEquation[i + 1]);
      tempEquation.splice(i, 2);
      i--;
    } else if (tempEquation[i] === "/") {
      tempEquation[i - 1] =
        parseFloat(tempEquation[i - 1]) / parseFloat(tempEquation[i + 1]);
      tempEquation.splice(i, 2);
      i--;
    }
  }

  for (let i = 0; i < tempEquation.length; i++) {
    if (tempEquation[i] === "+") {
      tempEquation[i - 1] =
        parseFloat(tempEquation[i - 1]) + parseFloat(tempEquation[i + 1]);
      tempEquation.splice(i, 2);
      i--;
    } else if (tempEquation[i] === "-") {
      tempEquation[i - 1] =
        parseFloat(tempEquation[i - 1]) - parseFloat(tempEquation[i + 1]);
      tempEquation.splice(i, 2);
      i--;
    }
  }

  finalResult = tempEquation[0];
  return finalResult;
}

function formatNumber(number) {
  if (number === "") return "";
  return parseFloat(number).toLocaleString("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 10,
  });
}

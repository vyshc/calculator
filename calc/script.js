const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");

display.innerText = "0";
let container = {
    evalStr: "",
  },
  a,
  b,
  op,
  evalAr = [],
  opAr = [];

function operate(a, b, op) {
  console.log("a = " + a + " b = " + b + " op = " + op);
  switch (op) {
    case "+":
      return `${a + b}`;
    case "-":
      return `${a - b}`;
    case "*":
      return `${a * b}`;
    case "/":
      //in case of something over 12 digits, round it to 12 digits and return
      let r = `${a / b}`;
      if (r.length > 12) {
        return r.substring(0, 11);
      }
      return r;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (button.id == "allClear") {
      //reset everything when AC is clicked
      display.innerText = "0";
      container.evalStr = "";
      evalAr = [];
      opAr = [];
    } else if (button.classList.contains("number")) {
      if (display.innerText.length < 12) {
        if (display.innerText == "0") {
          display.innerText = button.innerText;
          container.evalStr = button.innerText;

          console.log(
            "evalStr = " + container.evalStr + " " + typeof container.evalStr
          );
        } else if (
          display.innerText == evalAr[0] ||
          display.innerText == evalAr[1]
        ) {
          display.innerText = "";
          display.innerText += button.innerText;
          container.evalStr += button.innerText;
          console.log("evalStr = " + container.evalStr);
        } else {
          display.innerText += button.innerText;
          container.evalStr += button.innerText;
          console.log(
            "evalStr = " + container.evalStr + " " + typeof container.evalStr
          );
        }
      }
    } else if (button.classList.contains("operator")) {
      if (container.evalStr != "") {
        if (evalAr.length == 0) {
          //num1 is entered in the display
          evalAr.push(+container.evalStr);
          container.evalStr = "";
          opAr.push(button.innerText);
        } else if (evalAr.length > 0) {
          //num1 is already entered //num2 is entered and ready in the display
          evalAr.push(+container.evalStr);
          container.evalStr = "";
          //evaluate the first expression
          a = evalAr.shift();
          b = evalAr.shift();
          op = opAr.shift();
          let ans = operate(a, b, op);
          console.log("ans = " + ans);
          display.innerText = ans;
          evalAr.push(+ans);
          opAr.push(button.innerText);
        }
      }
    } else if (button.classList.contains("decimal")) {
        if(!display.innerText.includes(".")){
            display.innerText += button.innerText;
            container.evalStr += button.innerText;
        }
        
    } else if (button.classList.contains("equals")) {
      //evaluate the expression
      evalAr.push(+container.evalStr);
      container.evalStr = "";
      a = evalAr.shift();
      b = evalAr.shift();
      op = opAr.shift();
      let ans = operate(a, b, op);
      console.log("ans = " + ans);
      display.innerText = ans;
      container.evalStr = `${ans}`;
    }
  });
});

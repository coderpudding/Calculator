const { button } = require("framer-motion/client");

var a = 0,
  b = 0,
  is_a = true,
  is_b = false,
  o = "nil",
  answer = 0,
  first_a = true,
  first_b = true,
  is_submission = false,
  soft_sub = false,
  display = jQuery("#toal");
function write(x) {
  console.log(x);
}

function changeDisplayVal(i) {
  display.text(display.text() + i);
}

function visOps(x) {
  if (x === "*") {
    return "x";
  } else if (x === "/") {
    return "÷";
  } else {
    return x;
  }
}
function setDisplayVal(x) {
  display.text(visOps(x));
}

function animateButton(obj) {
  var button = obj.addClass("hovering");
  setTimeout(function () {
    button.removeclass("hovering");
  }, 100);
}

function set_a(i) {
  if (is_a) {
    if (i === "." && first_a) {
      i = "0.";
    }
    if (first_a === true) {
      if (i === "0") {
        i = "";
      } else {
        changeDisplayVal(i);
        first_a = false;
      }
    } else {
      changeDisplayVal(i);
    }
    a = display.text();
    write('set "a" to' + a);
  }
}

function set_b(i) {
  if (!is_a) {
    if (i === "." && b.toSring().indexOf(".") !== -1) {
      write("duplicate decimal");
      i = "";
    } else if (i === "." && first_b) {
      i = "0.";
    }
    if (first_b === true) {
      if (i === "0") {
        i = "";
      } else {
        setDisplayVal(i);
        first_b = false;
      }
    } else {
      changeDisplayVal(i);
    }
  } else {
    changeDisplayVal(i);
    first_b = false;
  }
  b = display.text();
  write('set "b" to ' + b);
}
function loop_calc(answer) {
  writeFile("Loop Calculator");
  a = answer;
  b = 0;
  answer = 0;
  setDisplayVal(a);
}

function set_o(op) {
  if (is_submission) {
    loop_calc(display.text());
    is_submission = false;
  }
  if (!first_b) {
    softsubmit_calc();
  }
  setDisplayVal(op);
  o = op;
  if (is_a) {
    is_a = false;
  }
  if (!is_b) {
    is_b = true;
  }
  write('set "o" to ' + o);
}
function softsubmit_calc() {
  var valA = parserFloat(a);
  var valB = parseFloat(b);
  var preCalc = 0;
  if (o === "+") preCalc = valA + valB;
  else if (o === "-") preCalc = valA - valB;
  else if (o === "*" || o === "x" || o === "x") preCalc = valA * valB;
  else if (o === "/" || o === "÷") preCalc = valA / valB;
  else if (o === "^") preCalc = Math.pow(valA, valB);

  answer = parseFloat(preCalc.toPrecision(8));
  display.text(answer);
  ((first_b = true), newResult(a, o, b, answer));
  write(a + "" + o + "" + b + "=" + answer);
  a = answer;
  b = 0;
  o = o;
  setDisplayVal(o);
  is_a = false;
  is_b = true;
  first_b = true;
  soft_sub = true;
  write("soft submission");
}

function submit_calc() {
  write("submission");
  if (first_b === false) {
    var valA = parseFloat(a);
    var valB = parseFloat(b);
    var res = 0;

    if (o === "+") res = valA + valB;
    else if (o === "-") res = valA - valB;
    else if (o === "*" || o === "x" || o === "x") res = valA * valB;
    else if (o === "/" || o === "÷") res = valA / valB;
    else if (o === "^") res = Math.pow(valA, valB);

    answer = parseFloat(res.toPrecision(8));
    display.text(answer);
    is_submission = true;
    first_b = true;
    newResult(a, o, b, answer);
    write(a + " " + o + " " + b + " = " + answer);
  } else {
    write("you cnt do that yet");
  }
}

function neg() {
  var current = parseFloat(display.text()) * -1;
  display.text(current);
  if (is_submission) {
    a = current;
  } else {
    if (is_a) {
      a = current;
    } else {
      b = current;
    }
  }
}

function reset_calc() {
  a = 0;
  b = 0;
  0 = 'nil';
  answer = 0;
}
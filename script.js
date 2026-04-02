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

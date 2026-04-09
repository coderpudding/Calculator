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
  display = jQuery("#total");
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
    button.removeClass("hovering");
  }, 100);
}

function set_a(i) {
  if (is_a) {
    if (i === "." && a.toString().indexOf(".") !== -1) {
      write("Duplicate Decimal");
      i = "";
    } else if (i === "." && first_a) {
      i = "0.";
    }
    if (first_a === true) {
      if (i === "0") {
        i = "";
      } else {
        setDisplayVal(i);
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
    if (i === "." && b.toString().indexOf(".") !== -1) {
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
    b = display.text();
    write('set "b" to ' + b);
  }
}

function loop_calc(answer) {
  write("Loop Calculator");
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
  var valA = parseFloat(a);
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
  o = "nil";
  answer = 0;
  is_a = true;
  is_b = false;
  first_a = true;
  first_b = true;
  is_submission = false;
  soft_sub = false;
  display.text(0);
  setDisplayVal(0);
  write("Calculator Reset");
}

function backspace() {
  if (display.text() !== "" && display.text() !== "0") {
    display.text(display.text().substring(0, display.text().length - 1));
    if (is_a === true) {
      a = parseFloat(a.toString().substring(0, a.toString().length - 1));
    } else {
      b = parseFloat(b.toString().substring(0, b.toString().length - 1));
    }
  } else {
    write("Nothing left to backspace");
  }
}

function memory(i) {
  if (is_submission) {
    loop_calc(i);
  } else if (is_a) {
    loop_calc(i);
  } else {
    set_b(i);
  }
  answer = a;
}

function newResult(a, o, b, answer) {
  var results = jQuery("#results_list");
  var result =
    "" +
    '<li class="result"><span class="equation">' +
    a +
    visOps(o) +
    b +
    "</span>" +
    '<span class="answer">' +
    answer +
    '</span> <span class="use"><a class="calc_use" href="#">Use</a></span></li>';
  results.prepend(result).children("li").fadeIn(200);
  if (jQuery("#result_default")) {
    jQuery("#result_default").remove();
  }
  jQuery(".calc_use")
    .off("click")
    .on("click", function () {
      var i = jQuery(this).parent(".use").siblings(".answer").text();
      jQuery(this).parent(".result").animate(
        {
          opacity: "1",
        },
        200,
      );
      memory(i);
      return false;
    });
}

function square(i) {
  write("Square");
  var s = i * i;
  answer = s;
  loop_calc(s);
  newResult(i, "&#94; 2", "", s);
  display.text(answer);
  is_submission = true;
  first_b = true;
}

function sqrt(i) {
  write(" Square Root");
  var s = Math.sqrt(i);
  answer = s;
  write("u221A" + i + "=" + s);
  loop_calc(s);
  newResult("", "√", i, s);
  display.text(answer);
  is_submission = true;
  first_b = true;
}

function denom(i) {
  write("Denominator");
  var s = 1 / i;
  answer = s;
  write("1/" + i + "=" + s);
  loop_calc(s);
  newResult(1, "/", i, s);
  display.text(answer);
  is_submission = true;
  first_b = true;
}

jQuery(".calc_int, #calc_decimal").each(function () {
  jQuery(this).click(function () {
    var value = jQuery(this).val();
    if (is_submission === false) {
      if (is_a === true) {
        set_a(value);
      } else {
        set_b(value);
      }
    } else {
      reset_calc();
      set_a(value);
    }
  });
});

jQuery(".calc_op").each(function () {
  jQuery(this).click(function () {
    var value = jQuery(this).val();
    set_o(value);
  });
});

jQuery("#calc_eval").click(function () {
  submit_calc();
});

jQuery("#calc_clear").click(function () {
  reset_calc();
});
jQuery("#calc_neg").click(function () {
  neg();
});
jQuery("#calc_back").click(function () {
  backspace();
});

jQuery("#calc_sqrt").click(function () {
  if (display.text() !== "0") {
    if (is_submission) {
      sqrt(answer);
    } else if (is_a) {
      sqrt(a);
    }
  }
  return false;
});

jQuery("#calc_square").click(function () {
  if (display.text() !== "0") {
    if (is_submission) {
      square(answer);
    } else if (is_a) {
      square(a);
    }
  }
  return false;
});

jQuery("#calc_denom").click(function () {
  if (display.text() !== "0") {
    if (is_submission) {
      denom(answer);
    } else if (is_a) {
      denom(a);
    }
  }
  return false;
});

jQuery("#result_clear").click(function () {
  jQuery("#results_list")
    .children("li")
    .fadeOut(200, function () {
      jQuery(this).remove();
    });
  jQuery("#results_list").prepend(
    '<li id="result_default"> Memory is empty </li>',
  );
  return false;
});

jQuery(document).keypress(function (e) {
  var charcode = e.which;
  var key = String.fromCharCode(charcode);
  if (charcode >= 46 && charcode <= 58 && charcode !== 47) {
    if (!is_submission) {
      if (is_a) {
        set_a(key);
      } else {
        set_b(key);
      }
    } else if (soft_sub) {
      set_b(key);
    } else {
      reset_calc();
      set_a(key);
    }
  }
  if (
    (charcode >= 42 && charcode <= 45 && charcode !== 44) ||
    charcode === 47
  ) {
    set_o(key);
  }
  if (charcode === 61) {
    submit_calc();
  }
  jQuery("button").each(function () {
    var value = jQuery(this).val();
    if (value === key) {
      animateButton(jQuery(this));
    }
  });
});

jQuery(document).keydown(function (e) {
  var charcode = e.which;
  if (charcode === 8) {
    backspace();
    animateButton(jQuery("#calc_back"));
    return false;
  }
  if (charcode === 12) {
    reset_calc();
    animateButton(jQuery("#calc_clear"));
    return false;
  }
  if (charcode === 13) {
    submit_calc();
    animateButton(jQuery("#calc_eval"));
    return false;
  }
});

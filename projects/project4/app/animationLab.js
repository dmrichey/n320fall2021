let body = document.getElementById("body");
let one = document.getElementById("1");
let two = document.getElementById("2");
let three = document.getElementById("3");
let four = document.getElementById("4");
let five = document.getElementById("5");
let six = document.getElementById("6");

TweenLite.from(body, { duration: 2, x: 200, alpha: 0 });

function mouseover1() {
  one.style.backgroundColor = "#BBB3E3";
}
function mouseover2() {
  two.style.backgroundColor = "#BBB3E3";
}
function mouseover3() {
  three.style.backgroundColor = "#BBB3E3";
}
function mouseover4() {
  four.style.backgroundColor = "#BBB3E3";
}
function mouseover5() {
  five.style.backgroundColor = "#BBB3E3";
}
function mouseover6() {
  six.style.backgroundColor = "#BBB3E3";
}

function mouseout1() {
  one.style.backgroundColor = "purple";
}
function mouseout2() {
  two.style.backgroundColor = "purple";
}
function mouseout3() {
  three.style.backgroundColor = "purple";
}
function mouseout4() {
  four.style.backgroundColor = "purple";
}
function mouseout5() {
  five.style.backgroundColor = "purple";
}
function mouseout6() {
  six.style.backgroundColor = "purple";
}

function exit() {
  TweenLite.to(body, { duration: 2, x: 200, alpha: 0 });
}

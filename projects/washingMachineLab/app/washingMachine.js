let canvas = document.getElementById("canvas");

class WashingMachine {
  baseColor = [64, 64, 128];
  width = 150;
  height = 150;

  frontCircleLocation = { x: 75, y: 75 };
  frontCircleRadius = 65;
  frontCircleColor = [32, 32, 32];

  dialLocation = { x: 135, y: 15 };
  dialRadius = 5;
  dialColor = [128, 128, 128];

  constructor(canvas) {
    let baseEl = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    baseEl.setAttribute(
      "fill",
      `rgb(${this.baseColor[0]},${this.baseColor[1]},${this.baseColor[2]})`
    );
    baseEl.setAttribute("width", this.width);
    baseEl.setAttribute("height", this.height);
    canvas.appendChild(baseEl);

    let frontCircleEl = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    frontCircleEl.setAttribute(
      "fill",
      `rgb(${this.frontCircleColor[0]},${this.frontCircleColor[1]},${this.frontCircleColor[2]})`
    );
    frontCircleEl.setAttribute("cx", this.frontCircleLocation.x);
    frontCircleEl.setAttribute("cy", this.frontCircleLocation.y);
    frontCircleEl.setAttribute("r", this.frontCircleRadius);
    canvas.appendChild(frontCircleEl);

    let dialCircleEl = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    dialCircleEl.setAttribute(
      "fill",
      `rgb(${this.dialColor[0]},${this.dialColor[1]},${this.dialColor[2]})`
    );
    dialCircleEl.setAttribute("cx", this.dialLocation.x);
    dialCircleEl.setAttribute("cy", this.dialLocation.y);
    dialCircleEl.setAttribute("r", this.dialRadius);
    canvas.appendChild(dialCircleEl);
  }
}

class WashingMachineSet {
  constructor(canvas, baseMachine, machines) {}
}

let box = new WashingMachine(canvas);

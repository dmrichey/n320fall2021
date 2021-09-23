let canvas = document.getElementById("canvas");

class WashingMachine {
  // Properties of Washing Machine that do not change
  baseColor = [64, 64, 128];
  width = 150;
  height = 150;
  frontCircleColor = [32, 32, 32];
  dialColor = [128, 128, 128];

  constructor(baseX, baseY, frontX, frontY, frontR, dialX, dialY, dialR) {
    this.baseLocation = { x: baseX, y: baseY };

    this.frontCircleLocation = { x: frontX, y: frontY };
    this.frontCircleRadius = frontR;

    this.dialLocation = { x: dialX, y: dialY };
    this.dialRadius = dialR;
  }

  draw(canvas) {
    let baseEl = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    baseEl.setAttribute(
      "fill",
      `rgb(${this.baseColor[0]},${this.baseColor[1]},${this.baseColor[2]})`
    );
    baseEl.setAttribute("width", this.width);
    baseEl.setAttribute("height", this.height);
    baseEl.setAttribute("x", this.baseLocation.x);
    baseEl.setAttribute("y", this.baseLocation.y);
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
  machineArray = [];
  baseMachine;

  constructor(canvas) {
    console.log(this.baseMachine);
    this.createMachines(canvas);
  }

  createMachines(canvas) {
    if (this.baseMachine == undefined) {
      // populate machineArray
      let baseX;
      let baseY;
      for (let i = 0; i < 10; i++) {
        // top row of machines
        if (i < 5) {
          baseX = 75 + 225 * i;
          baseY = 75;
        } else {
          baseX = 75 + 225 * (i - 5);
          baseY = 300;
        }
        let frontX = baseX + 75;
        let frontY = baseY + 75;
        let frontR = Math.random() * 100;
        let dialX = baseX + 125;
        let dialY = baseY + 25;
        let dialR = Math.random() * 50;
        this.machineArray[i] = new WashingMachine(
          baseX,
          baseY,
          frontX,
          frontY,
          frontR,
          dialX,
          dialY,
          dialR
        );
        this.machineArray[i].draw(canvas);
      }
    } else {
      // populate machineArray
      let baseX;
      let baseY;
      for (let i = 0; i < 10; i++) {
        // top row of machines
        if (i < 5) {
          baseX = 75 + 225 * i;
          baseY = 75;
        } else {
          baseX = 75 + 225 * (i - 5);
          baseY = 300;
        }
        let frontX = baseX + 75;
        let frontY = baseY + 75;
        let frontR;
        if (Math.random() < 0.5) {
          frontR = this.baseMachine.frontCircleRadius + Math.random() * 15;
        } else {
          frontR = this.baseMachine.frontCircleRadius - Math.random() * 15;
          if (frontR < 0) {
            frontR = 0;
          }
        }
        let dialX = baseX + 125;
        let dialY = baseY + 25;
        let dialR;
        if (Math.random() < 0.5) {
          dialR = this.baseMachine.frontCircleRadius + Math.random() * 5;
        } else {
          dialR = this.baseMachine.frontCircleRadius - Math.random() * 5;
          if (dialR < 0) {
            dialR = 0;
          }
        }
        this.machineArray[i] = new WashingMachine(
          baseX,
          baseY,
          frontX,
          frontY,
          frontR,
          dialX,
          dialY,
          dialR
        );
        this.machineArray[i].draw(canvas);
      }
    }
  }

  removeMachines(canvas) {
    canvas.innerHTML = ``;
  }
}

let set = new WashingMachineSet(canvas);

function selectMachine(i) {
  set.baseMachine = set.machineArray[i];
  console.log(set.baseMachine);
  set.removeMachines(canvas);
  set.createMachines(canvas);
}

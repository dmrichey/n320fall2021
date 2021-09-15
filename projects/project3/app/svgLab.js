// game logic class
class Game {
  // class properties
  foundCircles = 0;
  totalCircles = 0;
  searchColor = "#99ff00";
  normalColor = "#7700aa";
  gameZone = document.getElementById("gameZone");
  foundBar = new FoundBar();

  constructor() {
    // make the circles
    for (var i = 0; i < 25; i++) {
      let newCirc = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );

      // circle style class
      newCirc.classList.add("gameCirc");
      newCirc.setAttribute("cx", Math.random() * 400);
      newCirc.setAttribute("cy", Math.random() * 400);

      // randomly choose reveal color
      if (Math.random() < 0.3) {
        // set to 'looking for' color
        newCirc.dataset.hiddenColor = this.searchColor;
        this.totalCircles++;
      } else {
        newCirc.dataset.hiddenColor = this.normalColor;
      }

      // mouse events
      // on mouseover, reveal hidden color
      newCirc.addEventListener("mouseover", (event) => {
        event.target.style.fill = event.target.dataset.hiddenColor;
      });
      newCirc.addEventListener("mouseout", (event) => {
        event.target.style.fill = "#000";
      });
      newCirc.addEventListener("click", (event) => {
        if (event.target.dataset.hiddenColor == this.searchColor) {
          event.target.remove();

          // store how many have been clicked
          this.foundCircles++;

          // update the found UI
          this.foundBar.setPercent(this.foundCircles / this.totalCircles);
        }
      });
      // add circle to screen
      this.gameZone.appendChild(newCirc);
    }
  }
}

class FoundBar {
  element = document.getElementById("foundBar");
  maxSize = 130;
  percent = 0;

  setPercent(percent) {
    this.percent = percent;
    this.element.setAttribute("width", this.percent * this.maxSize);
  }
}

let game = new Game();

import "./../App.css";
import React from "react";

export default class RandRoll extends React.Component {
  state = { roll: 0 };

  render() {
    return (
      <div className="roll">
        <h2>Roll: {this.state.roll}</h2>
        <button
          onClick={() => {
            this.roll();
          }}
        >
          Roll
        </button>
      </div>
    );
  }

  roll() {
    this.setState({
      roll: Math.floor(Math.random() * 6) + 1,
    });
  }
}

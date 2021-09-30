import "./../App.css";
import React from "react";

export default class TiredMeter extends React.Component {
  state = { tired: 7 };

  render() {
    return (
      <div className="tired">
        <p>
          I am level {this.state.tired} tired. Importance:{" "}
          {this.props.importance}
        </p>
      </div>
    );
  }
}

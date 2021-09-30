import "./../App.css";
import React from "react";

export default class UserName extends React.Component {
  state = { uname: "" };

  render() {
    return (
      <div className="userName">
        <p>{this.state.uname}</p>
        <input
          value={this.state.uname}
          onChange={(event) => {
            this.handleChange(event);
          }}
        />
      </div>
    );
  }

  handleChange(event) {
    this.setState({ uname: event.target.value });
  }
}

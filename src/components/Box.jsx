import React from "react";

class Box extends React.Component {
  render() {
    return (
      <div
        className={`box ${this.props.boxColor}`}
        onClick={this.props.clickHandler}
        data-box-id={this.props.boxId}
        data-color-code={this.props.boxColor}
      ></div>
    );
  }
}

export default Box;

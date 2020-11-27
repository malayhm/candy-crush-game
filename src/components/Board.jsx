import React from "react";

import Box from "./Box";

class Board extends React.Component {
  render() {
    const grid = [];

    this.props.grid.forEach((row, rowId) => {
      const rowElms = [];

      row.forEach((col, colId) => {
        rowElms.push(
          <Box
            clickHandler={this.props.handleClick}
            boxColor={col.colorCode}
            key={`r${rowId}-c${colId}`}
            boxId={rowId * 10 + (colId + 1)}
          />
        );
      });

      grid.push(
        <div className="row" key={`r${rowId}-`}>
          {rowElms}
        </div>
      );
    });

    return (
      <div className="board">
        {this.props.restartStatus && (
          <div className="restart-game">
            <div className="message">Game Over!</div>
            <div>
              <button onClick={this.props.restartGame}>Restart</button>
            </div>
          </div>
        )}
        {grid}
      </div>
    );
  }
}

export default Board;

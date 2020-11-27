import React from "react";

import Board from "./components/Board";

import grid_helper from "./utils/grid_helper";
import player from "./utils/player";

import "./styles/main.scss";

export default class CandyCrush extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: grid_helper.generateGrid(this.props.rows, this.props.cols),
      score: 0,
      moves: 0,
      restartStatus: false,
      enableSound: player.enableSound
    };

    this.handleClick = this.handleClick.bind(this);

    this.updateScore = this.updateScore.bind(this);
    this.updateRestart = this.updateRestart.bind(this);
    this.restartGame = this.restartGame.bind(this);

    this.toggleSound = this.toggleSound.bind(this);
  }

  componentDidMount() {
    player.playSound("#game-theme");
  }

  componentDidUpdate() {
    this.state.enableSound === true && this.state.restartStatus === false
      ? player.playSound("#game-theme")
      : player.stopSound("#game-theme");
  }

  handleClick(event) {
    if (event.target.classList.contains("white")) return;

    const clickedBox = event.target.getAttribute("data-box-id");

    const rowId = Math.ceil(clickedBox / 10) - 1;
    const colId = (clickedBox - 1) % 10;

    const [newGrid, removeBlocks] = grid_helper.updatedGrid(
      this.state.grid,
      rowId,
      colId
    );

    // Set the end game state
    if (
      this.state.score + removeBlocks.length ===
      this.props.rows * this.props.cols
    ) {
      player.stopSound("#game-theme");
      this.updateRestart();
    }

    // Update the score
    this.updateScore(this.state.score + removeBlocks.length);

    // Play the sound on removing the block(s)
    player.playSound();
    this.setState({
      grid: newGrid
    });

    setTimeout(player.stopSound, 100);
  }

  updateScore(newScore, moves) {
    this.setState((prevState) => ({
      score: newScore,
      moves: typeof moves === "undefined" ? prevState.moves + 1 : moves
    }));
  }

  restartGame() {
    this.updateScore(0, 0);

    this.setState({
      grid: grid_helper.generateGrid(this.props.rows, this.props.cols),
      restartStatus: false
    });

    player.playSound("#game-theme");
  }

  updateRestart() {
    this.setState({ restartStatus: true });
    player.stopSound("#game-theme");
  }

  toggleSound() {
    this.setState((prevState) => ({
      enableSound: !prevState.enableSound
    }));

    player.toggleSound();
  }

  render() {
    const { grid, score, moves, enableSound, restartStatus } = this.state;

    return (
      <div className="candy-crush-container">
        <h1>Candy Crush</h1>

        <div className="flex">
          <div className="description">Click on any of the box to crush it</div>
          <div>
            Score: {score} ({moves})
          </div>

          <button className="toggle-sound" onClick={this.toggleSound}>
            {enableSound && (
              <img
                alt="Disable sound"
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZGF0YS1uYW1lPSJMYXllciAzIiBpZD0iTGF5ZXJfMyIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxzdHlsZT4uY2xzLTEsLmNscy0ze2ZpbGw6bm9uZTtzdHJva2U6IzA4MzJmZjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fS5jbHMtMXtzdHJva2Utd2lkdGg6MnB4O30uY2xzLTJ7ZmlsbDojMDgzMmZmO308L3N0eWxlPjwvZGVmcz48dGl0bGUvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxOSA3IDExLjg0IDEyIDYgMTIgNiAyMCAxMS44NCAyMCAxOSAyNSAxOSA3Ii8+PHJlY3QgY2xhc3M9ImNscy0yIiBoZWlnaHQ9IjgiIHdpZHRoPSIyIiB4PSI2IiB5PSIxMiIvPjxsaW5lIGNsYXNzPSJjbHMtMyIgeDE9IjkuNSIgeDI9IjkuNSIgeTE9IjEyLjUiIHkyPSIxOS41Ii8+PGxpbmUgY2xhc3M9ImNscy0xIiB4MT0iMjMiIHgyPSIyNiIgeTE9IjE2IiB5Mj0iMTYiLz48bGluZSBjbGFzcz0iY2xzLTEiIHgxPSIyMi4wNiIgeDI9IjI0Ljk0IiB5MT0iMTIuNDIiIHkyPSIxMS41OCIvPjxsaW5lIGNsYXNzPSJjbHMtMSIgeDE9IjIyLjA2IiB4Mj0iMjQuOTQiIHkxPSIxOS41OCIgeTI9IjIwLjQyIi8+PC9zdmc+"
              />
            )}
            {!enableSound && (
              <img
                alt="Enable sound"
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZGF0YS1uYW1lPSJMYXllciAzIiBpZD0iTGF5ZXJfMyIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxzdHlsZT4uY2xzLTEsLmNscy0ze2ZpbGw6bm9uZTtzdHJva2U6IzA4MzJmZjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7fS5jbHMtMXtzdHJva2Utd2lkdGg6MnB4O30uY2xzLTJ7ZmlsbDojMDgzMmZmO308L3N0eWxlPjwvZGVmcz48dGl0bGUvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIyMiA3IDE0Ljg0IDEyIDkgMTIgOSAyMCAxNC44NCAyMCAyMiAyNSAyMiA3Ii8+PHJlY3QgY2xhc3M9ImNscy0yIiBoZWlnaHQ9IjgiIHdpZHRoPSIyIiB4PSI5IiB5PSIxMiIvPjxsaW5lIGNsYXNzPSJjbHMtMyIgeDE9IjEyLjUiIHgyPSIxMi41IiB5MT0iMTIuNSIgeTI9IjE5LjUiLz48L3N2Zz4="
              />
            )}
          </button>
        </div>

        <Board
          grid={grid}
          handleClick={this.handleClick}
          restartStatus={restartStatus}
          restartGame={this.restartGame}
        />

        <audio id="beep-one" preload="auto">
          <source src="https://css-tricks.com/examples/SoundOnHover/audio/beep.mp3" />
          <source src="https://css-tricks.com/examples/SoundOnHover/audio/beep.ogg" />
        </audio>

        <audio id="game-theme" preload="auto">
          <source src="https://www.w3schools.com/graphics/gametheme.mp3" />
        </audio>
      </div>
    );
  }
}

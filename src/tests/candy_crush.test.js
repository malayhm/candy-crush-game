import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mount } from "enzyme";

import Board from "../components/Board";
// import Box from "../components/Box";

import grid_helper from "../utils/grid_helper";

import sample_data from "../data/sample_data.json";

Enzyme.configure({ adapter: new Adapter() });

describe("CandyCrush App", () => {
  test("Verify Board is rendered", () => {
    const wrapper = mount(
      <Board grid={sample_data.grid} restartStatus={false} />
    );

    // Check if board is rendered
    expect(wrapper.find(".board").length).toEqual(1);
    expect(wrapper.find(".box").length).toEqual(
      sample_data.grid.length * sample_data.grid.length
    );
    expect(wrapper.find(".restart-game").length).toEqual(0);
  });

  test("Verify restart game is visible if game is finished", () => {
    const wrapper = mount(
      <Board grid={sample_data.grid} restartStatus={true} />
    );

    expect(wrapper.find(".restart-game").length).toEqual(1);
    expect(wrapper.find(".message").text()).toEqual("Game Over!");
  });
});

describe("Grid Helper", () => {
  test("Verify Grid is generated correctly", () => {
    const grid = grid_helper.generateGrid(5, 5);

    expect(grid.length).toEqual(5);
    grid.forEach((row) => {
      expect(row.length).toEqual(5);
    });
  });

  test("Verify findAdjacent returns correct blocks", () => {
    const grid = sample_data.small_grid;

    let adjacentBlocks = grid_helper.findAdjacent(grid, 0, 0);
    expect(adjacentBlocks.length).toEqual(1);

    adjacentBlocks = grid_helper.findAdjacent(grid, 1, 0);
    expect(adjacentBlocks.length).toEqual(3);
  });

  test("Verify removeAndDropBoxes returns correct grid", () => {
    const grid = sample_data.small_grid;

    // Move 1
    let adjacentBlocks = grid_helper.findAdjacent(grid, 0, 0);
    const gridState1 = grid_helper.removeAndDropBoxes(grid, adjacentBlocks);
    let move1WhiteBlocksCount = 0;
    gridState1.forEach((row) => {
      row.forEach((col) => {
        if (col.colorCode === "white") move1WhiteBlocksCount++;
      });
    });
    expect(move1WhiteBlocksCount).toBe(1);

    // Move 2
    adjacentBlocks = grid_helper.findAdjacent(grid, 1, 0);
    const gridState2 = grid_helper.removeAndDropBoxes(grid, adjacentBlocks);
    let move2WhiteBlocksCount = 0;
    gridState2.forEach((row) => {
      row.forEach((col) => {
        if (col.colorCode === "white") move2WhiteBlocksCount++;
      });
    });
    expect(move2WhiteBlocksCount).toBe(move1WhiteBlocksCount + 3);
  });

  test("Verify Get color returns the correct data", () => {
    const grid = sample_data.small_grid;

    expect(grid_helper.getColor(grid, 0, 0)).toEqual(grid[0][0].colorCode);
    expect(grid_helper.getColor(grid, 2, 3)).toEqual(grid[2][3].colorCode);
    expect(grid_helper.getColor(grid, 3, 1)).toEqual(grid[3][1].colorCode);
  });
});

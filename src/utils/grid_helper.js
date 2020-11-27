const generateGrid = (rows = 10, cols = 10) => {
  const colorCodes = ["red", "blue", "yellow", "green"];
  const grid = [];

  Array.from({ length: rows }).forEach((row, rowId) => {
    const rowElms = [];

    Array.from({ length: cols }).forEach((col, colId) => {
      const colorCode =
        colorCodes[Math.floor(Math.random() * colorCodes.length)];
      rowElms.push({
        colorCode
      });
    });

    grid.push(rowElms);
  });

  return grid;
};

const updatedGrid = (grid, y, x) => {
  const adjacentBlocks = findAdjacent(grid, y, x).sort((y, x) => {
    return y > x ? 1 : -1;
  });

  return [removeAndDropBoxes(grid, adjacentBlocks), adjacentBlocks];
};

const removeAndDropBoxes = (grid, adjacentBlocks) => {
  adjacentBlocks.forEach((block) => {
    let [row, col] = block;

    // Remove the block
    grid[row][col] = { colorCode: "white" };

    // Fall all the blocks above
    while (row > 0) {
      const tempColorCode = grid[row][col].colorCode;
      grid[row][col].colorCode = grid[row - 1][col].colorCode;
      grid[row - 1][col].colorCode = tempColorCode;
      row--;
    }
  });

  return grid;
};

const findAdjacent = (grid, rowN, colN) => {
  const visited = {};
  const stack = [[rowN, colN]];
  const crushed = [];

  while (stack.length > 0) {
    let curr = stack.pop();
    let [rowPos, colPos] = curr;

    if (visited[rowPos] && visited[rowPos][colPos]) continue;

    crushed.push([rowPos, colPos]);

    // Top
    curr[0] > 0 &&
      getColor(grid, rowPos - 1, colPos) === getColor(grid, rowPos, colPos) &&
      stack.push([rowPos - 1, colPos]);

    // Right
    curr[1] < grid[0].length - 1 &&
      getColor(grid, rowPos, colPos + 1) === getColor(grid, rowPos, colPos) &&
      stack.push([rowPos, colPos + 1]);

    // Bottom
    curr[0] < grid.length - 1 &&
      getColor(grid, rowPos + 1, colPos) === getColor(grid, rowPos, colPos) &&
      stack.push([rowPos + 1, colPos]);

    // Left
    curr[1] > 0 &&
      getColor(grid, rowPos, colPos - 1) === getColor(grid, rowPos, colPos) &&
      stack.push([rowPos, colPos - 1]);

    visited[rowPos] = visited[rowPos] || {};
    visited[rowPos][colPos] = true;
  }

  return crushed;
};

const getColor = (grid, rowPos, colPos) => {
  return grid[rowPos][colPos].colorCode;
};

export default {
  generateGrid,
  removeAndDropBoxes,
  updatedGrid,
  findAdjacent,
  getColor
};

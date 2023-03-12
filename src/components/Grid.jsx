import React, { Component } from "react";

class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: Array(4)
        .fill()
        .map(() => Array(4).fill(0)),
    };
  }

  render() {
    const { grid } = this.state;

    return (
      <div className="grid-container">
        {grid.map((row, rowIndex) => (
          <div className="grid-row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div className="grid-cell" key={`${rowIndex}-${colIndex}`}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Grid;

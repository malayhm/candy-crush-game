import React from "react";
import ReactDOM from "react-dom";

import CandyCrush from "./CandyCrush";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <CandyCrush rows={10} cols={10} />
  </React.StrictMode>,
  rootElement
);

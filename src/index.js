import React from "react";
import ReactDOM from "react-dom";
import Widget from "./Widget";

const App = () => (
  <div>
    <Widget />
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));

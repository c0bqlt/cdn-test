import React from "react";
import ReactDOM from "react-dom";
import Widget from "./Widget"; // Import your Widget component

const rootElement = document.getElementById("app");

// Define props for the Widget component
const widgetProps = {
  title: "Custom Widget Title",
};

// Render the Widget component
ReactDOM.render(React.createElement(Widget, widgetProps), rootElement);

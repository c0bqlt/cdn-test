import React from "react";
import ReactDOM from "react-dom";
import Widget from "./Widget"; // Import your Widget component

const rootElement = document.getElementById("app");

if (rootElement) {
  // Retrieve title prop from a global variable or from a data attribute on the root element
  const title =
    window.customWidgetTitle ||
    rootElement.getAttribute("data-title") ||
    "Default Title";

  // Define props for the Widget component
  const widgetProps = {
    title: title,
  };

  // Render the Widget component
  ReactDOM.render(React.createElement(Widget, widgetProps), rootElement);
}

import React from "react";
import ReactDOM from "react-dom";
import Widget from "./Widget"; // Import your Widget component

window.onload = function () {
  const rootElement = document.getElementById("app");

  if (rootElement) {
    const title =
      window.customWidgetTitle ||
      rootElement.getAttribute("data-title") ||
      "Default Title";

    const widgetProps = {
      title: title,
    };

    ReactDOM.render(React.createElement(Widget, widgetProps), rootElement);
  }
};

import React from "react";
import ReactDOM from "react-dom";
import ChatWidget from "./ChatWidget"; // Import your Widget component
import "./styles.css";

// Function to load an external CSS file by dynamically injecting a <link> tag
function loadExternalCSS(url) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

// Load FontAwesome from CDN
loadExternalCSS("https://kit.fontawesome.com/b51492ca5f.css");

// Load Google Fonts from CDN
loadExternalCSS(
  "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
);

class ChatBotElement extends HTMLElement {
  connectedCallback() {
    // This method is called when the element is added to the DOM
    ReactDOM.render(<ChatWidget />, this);
  }

  disconnectedCallback() {
    // Cleanup when the element is removed from the DOM
    ReactDOM.unmountComponentAtNode(this);
  }
}

// Define the custom element, associating it with the <chat-bot> tag
customElements.define("chat-bot", ChatBotElement);

window.onload = function () {
  // Check if a <chat-bot> element is present
  let chatBotElement = document.querySelector("chat-bot");

  // If no <chat-bot> is found, create one and add it to the DOM
  if (!chatBotElement) {
    chatBotElement = document.createElement("chat-bot");
    document.body.appendChild(chatBotElement);
  }
};

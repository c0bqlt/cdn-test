import React from "react";
import ReactDOM from "react-dom";
import ChatWidget from "./ChatWidget"; // Import your Widget component

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

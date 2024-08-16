import { useState } from "react";

const Widget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const title = "Dacă-i dau una pe ceafă, îl trimit la Doamne-Doamne";

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          cursor: "pointer",
        }}
        onClick={toggleOpen}
      >
        {!isOpen && <div>Click me</div>}
      </div>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "300px",
            height: "400px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            fontFamily: "Arial, sans-serif",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {title}
          </div>
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              borderBottom: "1px solid #ccc",
            }}
          >
            <div
              style={{
                padding: "5px",
                marginBottom: "10px",
                borderRadius: "5px",
                backgroundColor: "#f1f1f1",
                maxWidth: "80%",
              }}
            >
              Hello! How can I help you today?
            </div>
            <div
              style={{
                padding: "5px",
                marginBottom: "10px",
                borderRadius: "5px",
                backgroundColor: "#f1f1f1",
                maxWidth: "80%",
              }}
            >
              I have a question about your services.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #ccc",
            }}
          >
            <input
              type="text"
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <button
              style={{
                marginLeft: "10px",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#007bff",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Widget;

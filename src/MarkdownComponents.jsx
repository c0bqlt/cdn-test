import React from "react";

const MarkdownComponents = {
  a: ({ href, children }) => (
    <a href={href} className="text-blue-500 hover:underline">
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside ml-4">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside ml-4">{children}</ol>
  ),
  li: ({ children }) => <li className="mb-1">{children}</li>,
  p: ({ children }) => {
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    const phoneRegex = /(\+40\s\d{3}\s\d{3}\s\d{3})/g;

    const parseAndReplace = (text) => {
      if (!text) return text;
      const parts = text.split(
        /(\+40\s\d{3}\s\d{3}\s\d{3}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g
      );
      return parts.map((part, index) => {
        if (emailRegex.test(part)) {
          return (
            <a
              key={index}
              href={`mailto:${part}`}
              className="text-primary hover:underline"
            >
              {part}
            </a>
          );
        } else if (phoneRegex.test(part)) {
          return (
            <a
              key={index}
              href={`tel:${part.replace(/\s/g, "")}`}
              className="text-primary hover:underline"
            >
              {part}
            </a>
          );
        } else {
          return part;
        }
      });
    };

    const processChildren = (children) => {
      return React.Children.map(children, (child) => {
        // if the child is a string, parse for phone and email
        if (typeof child === "string") {
          return parseAndReplace(child);
        }
        // if the child is already a React element just ignore it
        return child;
      });
    };

    return <p className="mb-2">{processChildren(children)}</p>;
  },
};

export default MarkdownComponents;

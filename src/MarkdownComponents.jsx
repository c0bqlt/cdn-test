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
  p: ({ children }) => <p className="mb-2">{children}</p>,
};

export default MarkdownComponents;

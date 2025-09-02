import React from "react";
import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  const theme = props.theme || "light";

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      }}
      {...props}
    />
  );
};

export { Toaster };

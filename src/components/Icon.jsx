import React from "react";

function Icon({ children, style }) {
  return (
    <span style={style} className="material-symbols-outlined">
      {children}
    </span>
  );
}

export default Icon;

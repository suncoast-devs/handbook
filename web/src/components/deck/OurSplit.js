import React from "react";

const OurSplit = ({ children }) => {
  const [a, ...rest] = React.Children.toArray(children);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div style={{ padding: "1rem" }}>{a}</div>
      <div style={{ padding: "1rem" }}>{rest}</div>
    </div>
  );
};

export { OurSplit };

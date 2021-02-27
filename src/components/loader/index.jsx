import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: window.innerHeight / 3,
      }}
    >
      <img src="Ripple-1.3s-291px.gif" alt="Loader" />;
    </div>
  );
};

export default Loader;

import React, { useState } from "react";
import "./logandre.css";
import Login from "./Login";
import Register from './Register'
const LogAndRe = ({onClose }) => {
  const [layout, setLayout] = useState(true);

  return (
    <div>
      {layout ? (
        <div className="login">
          <p className="title-auth">Login</p>
          <Login layout={layout} setLayout={setLayout} onClose={onClose} />
        </div>
      ) : (
        <div className="register">
          <p className="title-auth">Registration</p>
          <Register layout={layout} setLayout={setLayout} />
        </div>
      )}
    </div>
  );
};

export default LogAndRe;

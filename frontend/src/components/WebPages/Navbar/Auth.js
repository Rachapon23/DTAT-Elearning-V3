import React, { useContext, useState } from "react";

import { Form, } from "antd";
import Form_login from "./Form_login";
import Form_register from "./Form_register";
import { NavbarContext } from "./NavbarContext";

const Auth = () => {
  // const navigate = useNavigate()
  const [status, setStatus] = useState(true);


  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      {status ? (
        <Form_login setStatus={setStatus} />
      ) : (
        <Form_register setStatus={setStatus} />
      )}
    </Form>
  );
};

export default Auth;

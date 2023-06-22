import React, { createContext, useState } from "react";

export const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {


  const [openAuth, setOpenAuth] = useState(false);

  const [isModalOpenAuth, setIsModalOpenAuth] = useState(false);

  const showModalAuth = () => {
    setIsModalOpenAuth(true);
  };
  const handleOkAuth = () => {
    setIsModalOpenAuth(false);
  };
  const handleCancelAuth = () => {
    setIsModalOpenAuth(false);
  };

  return (
    <NavbarContext.Provider
      value={{
        isModalOpenAuth,
        setIsModalOpenAuth,
        showModalAuth,
        handleOkAuth,
        handleCancelAuth,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

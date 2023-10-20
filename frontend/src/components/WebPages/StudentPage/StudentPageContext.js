import React, { createContext, useState } from "react";
export const StudentPageContext = createContext();
export const StudentPageProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(0);
    return (
        <StudentPageContext.Provider
            value={{
                currentPage,
                setCurrentPage,
            }}
        >
            {children}
        </StudentPageContext.Provider>
    );
};

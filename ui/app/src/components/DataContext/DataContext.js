import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isShop, setIsShop] = useState(true);

    return (
        <DataContext.Provider
        value={{
            isAdmin,
            isShop,
            setIsAdmin,
            setIsShop
        }}
        >
        {children}
        </DataContext.Provider>
    );
};
import { createContext, useState } from "react";
import React from "react";

const MoneyContext = createContext();

function MoneyCountProvider({ children }) {

    const [moneyLeft, setMoneyLeft] = useState(711)
    const value = [moneyLeft, setMoneyLeft]
    console.log("Moneyleft in context: ", moneyLeft);
    return(
        <MoneyContext.Provider value={value}>
            {children}
        </MoneyContext.Provider>    
    )
}

export { MoneyCountProvider, MoneyContext  };
'use client'
import { createContext, ReactNode, useState } from "react";

type Props = {
    children: ReactNode;
};

type AppContextType = {
    openMobile: boolean,
    setOpenMobile: (openMobile: boolean) => void,
} 

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: Props) => {
    const [openMobile, setOpenMobile] = useState(false)
    return (
        <AppContext.Provider value={{ openMobile, setOpenMobile }}>
            {children}
        </AppContext.Provider>
    )
}
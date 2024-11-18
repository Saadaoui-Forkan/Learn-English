'use client'
import { Message } from "@/utils/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type Props = {
    children: ReactNode;
};

type AppContextType = {
    openMobile: boolean,
    setOpenMobile: Dispatch<SetStateAction<boolean>>,
    messageValue: string,
    setMessageValue: Dispatch<SetStateAction<string>>,
    contextPreviousMessage: Message[],
    setContextPreviousMessage: Dispatch<SetStateAction<Message[]>>,
} 

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: Props) => {
    const [openMobile, setOpenMobile] = useState(false)
    const [messageValue, setMessageValue] = useState("")
    const [contextPreviousMessage, setContextPreviousMessage] = useState<Message[]>([])
    return (
        <AppContext.Provider value={{ 
            openMobile, 
            setOpenMobile, 
            messageValue, 
            setMessageValue, 
            contextPreviousMessage, 
            setContextPreviousMessage
        }}>
            {children}
        </AppContext.Provider>
    )
}
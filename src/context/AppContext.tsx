'use client'
import { AppContextType, Message, Props } from "@/utils/types";
import { createContext, useState } from "react";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: Props) => {
    const [promptContent, setPromptContent] = useState("")
    const [loading, setLoading] = useState(false)
    const [slug, setSlug] = useState("")
    const [message, setMessage] = useState("")
    const [openMobile, setOpenMobile] = useState(false)
    const [showFooterButton, setShowFooterButton] = useState(false)
    const [messageValue, setMessageValue] = useState("")
    const [textButton, setTextButton] = useState("")
    const [contextPreviousMessage, setContextPreviousMessage] = useState<Message[]>([])
    return (
        <AppContext.Provider value={{ 
            openMobile, 
            setOpenMobile, 
            messageValue, 
            setMessageValue, 
            contextPreviousMessage, 
            setContextPreviousMessage,
            textButton,
            setTextButton,
            showFooterButton,
            setShowFooterButton,
            slug,
            setSlug,
            message,
            setMessage,
            loading,
            setLoading,
            promptContent,
            setPromptContent,
        }}>
            {children}
        </AppContext.Provider>
    )
}
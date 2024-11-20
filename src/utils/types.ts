import { Dispatch, ReactNode, SetStateAction } from "react";

export type Props = {
    children: ReactNode;
};

export interface ParamsTypes {
    params: {item: string}
}

export interface Message {
    role: "user" | "assistant" | "system",
    content: string
}

export interface ApiResponse {
    status: number;
    data: {
      content: string;
      role: "user" | "assistant" | "system";
      error: string;
    };
}

export type AppContextType = {
    openMobile: boolean,
    setOpenMobile: Dispatch<SetStateAction<boolean>>,
    messageValue: string,
    setMessageValue: Dispatch<SetStateAction<string>>,
    contextPreviousMessage: Message[],
    setContextPreviousMessage: Dispatch<SetStateAction<Message[]>>,
    textButton: string,
    setTextButton: Dispatch<SetStateAction<string>>,
    showFooterButton: boolean,
    setShowFooterButton: Dispatch<SetStateAction<boolean>>,
    slug: string,
    setSlug: Dispatch<SetStateAction<string>>,
    message: string,
    setMessage: Dispatch<SetStateAction<string>>,
} 
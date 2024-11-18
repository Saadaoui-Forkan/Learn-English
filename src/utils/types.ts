export interface ParamsTypes {
    params: {item: string}
}

export interface Message {
    role: "user" | "assistant" | "system",
    content: string
}
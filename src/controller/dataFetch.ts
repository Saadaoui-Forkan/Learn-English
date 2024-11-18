import { Message } from "@/utils/types"

export const  getChatCompletion = async(message: Message[]) => {
    const options = {
        method: "POST",
        body: JSON.stringify({
            messages: message
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await fetch("/api/create-chat-completion", options)
        const data = await res.json()
        return {data, status: res.status}
    } catch (err) {
        console.error(err)
    }
}
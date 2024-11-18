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
        if(!res.ok){
            throw new Error('Failed to fetch articles')
        }
        const data = await res.json()
        return {data, status: res.status}
    } catch (err) {
        console.error(err)
        return { data: null, status: 500 };
    }
}
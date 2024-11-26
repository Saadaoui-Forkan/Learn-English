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

export const getTranscription = async (mediaBlobUrl: string) => {
    let file = await fetch(mediaBlobUrl).then(r => r.blob())
    const formData = new FormData()
    formData.append('file', file)

    try {
        const res = await fetch('/api/speech-to-text', {
            method: 'POST',
            body: formData
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch transcription: ${res.statusText}`);
        }

        const data = await res.json()
        return {data}
    } catch (error) {
        console.error(error)
    }
}

export const getTextCompletion = async (prompt: Message) => {
    const options = {
        method: 'POST',
        body: JSON.stringify({
            prompt: prompt
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await fetch('/api/create-text-completion', options)
        const data = await response.json()
        return { status: response.status, data }
    } catch (error) {
        console.error(error)
    }
}
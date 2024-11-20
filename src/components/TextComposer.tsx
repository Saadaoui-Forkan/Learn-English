"use client"
import { AppContext } from '@/context/AppContext'
import { getChatCompletion } from '@/controller/dataFetch'
import { ApiResponse, Message } from '@/utils/types'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { MdSend } from 'react-icons/md'
import { toast } from 'react-toastify'

const TextComposer = () => {
    const router = useRouter()
    const [value, setValue] = useState("")

    const context = useContext(AppContext);
    if (!context) {
        throw new Error("AppContext must be used within an AppProvider");
    }
    const {
        slug,
        setMessageValue,
        textButton,
        showFooterButton,
        setShowFooterButton,
        contextPreviousMessage,
        setContextPreviousMessage,
        setMessage
    } = context;

    const handleChange = () => {
        setMessageValue(value)
        router.push('/')
        setValue('')
    }

    const prompt = {
        role: "user",
        content: `I am an English student at the A2 level,
         and I want you to explain to me what it is ${slug}`,
    } as Message

    const getMoreData = async () => {
        setShowFooterButton(false)
        const res: ApiResponse = await getChatCompletion([
            ...contextPreviousMessage,
            {
                role: "user",
                content: `give me more explanation about ${slug}`,
            }
        ])
        if (res.status === 200) {
            setMessage(res.data.content)
            setContextPreviousMessage([
                ...contextPreviousMessage,
                prompt,
                {
                    role: res.data.role,
                    content: res.data.content
                }
            ])
        } else {
            toast.error(res.data.error)
        }
    }
    return (
        <div className="w-11/12 mx-auto my-2 max-w-sm min-w-[200px] flex flex-col space-y-2">
            {showFooterButton && (
                <button
                    className="py-2 bg-transparent placeholder:text-slate-400 text-slate-800 text-sm border border-slate-400 rounded-md hover:text-slate-400 hover:bg-slate-800"
                    onClick={getMoreData}
                >
                    {textButton}
                </button>
            )}
            <div className="relative">
                <input
                    type="text"
                    className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-800 text-sm border border-slate-400 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-800"
                    placeholder="Type here..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <MdSend
                    className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600 cursor-pointer"
                    onClick={handleChange}
                />
            </div>
        </div>
    );
}

export default TextComposer
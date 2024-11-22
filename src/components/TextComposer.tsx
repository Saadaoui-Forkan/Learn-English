"use client"
import { AppContext } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { MdSend } from 'react-icons/md'

const TextComposer = () => {
    const router = useRouter()
    const [value, setValue] = useState("")

    const context = useContext(AppContext);
    if (!context) {
        throw new Error("AppContext must be used within an AppProvider");
    }
    const {
        setMessageValue,
    } = context;

    const handleChange = () => {
        setMessageValue(value)
        router.push('/')
        setValue('')
    }

    return (
        <div className="w-11/12 mx-auto my-2 max-w-sm min-w-[200px] flex flex-col space-y-2">
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
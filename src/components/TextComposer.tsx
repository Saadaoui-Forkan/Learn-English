"use client"
import { getChatCompletion } from '@/controller/dataFetch'
import React, { useState } from 'react'
import { MdSend } from 'react-icons/md'

const TextComposer = () => {
    const [value, setValue] = useState("")

    const getData = async() => {
        const response = await getChatCompletion(
            [
                {
                    role: "user",
                    content: value
                }
            ]
        )
        console.log(response)
    }
    return (
        <div className="w-11/12 mx-auto my-2 max-w-sm min-w-[200px]">
            <div className="relative" >
                <input 
                    type="text" 
                    className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-800 text-sm border border-slate-400 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-800" 
                    placeholder="Type here..." 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <MdSend className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600 cursor-pointer" onClick={getData}/>
            </div>
        </div>
    )
}

export default TextComposer
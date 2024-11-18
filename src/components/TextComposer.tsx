import React from 'react'
import { MdSend } from 'react-icons/md'

const Box = () => {
    return (
        <div className="w-11/12 mx-auto my-2 max-w-sm min-w-[200px]">
            <div className="relative">
                <input 
                    type="text" 
                    className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-800 text-sm border border-slate-400 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-800" 
                    placeholder="Type here..." 
                />
                <MdSend className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600"/>
            </div>
        </div>
    )
}

export default Box
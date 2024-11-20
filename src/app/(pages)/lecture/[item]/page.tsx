"use client"
import Spinner from '@/components/Spinner';
import { AppContext } from '@/context/AppContext';
import { getChatCompletion } from '@/controller/dataFetch';
import { ApiResponse, Message } from '@/utils/types'
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Lecture = () => {
  const params = useParams<{ item: string }>()
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }
  const {
    setSlug,
    setTextButton,
    setShowFooterButton,
    contextPreviousMessage,
    setContextPreviousMessage,
    message,
    setMessage,
    slug
  } = context;

  const [loading, setLoading] = useState(false)

  const prompt = {
    role: "user",
    content: `I am an English student at the A2 level,
     and I want you to explain to me what it is ${slug}`,
  } as Message

  const getLecture = async () => {
    setLoading(true)
    const res = await getChatCompletion([
      prompt
    ])
    checkResponse(res)
    setShowFooterButton(true)
    setTextButton("More Explanation")
    setSlug(params.item)
    setLoading(false)
  }
  const checkResponse = (res: ApiResponse) => {
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

  useEffect(() => {
    getLecture()
  }, [])
  return (
    <>
      {
        loading ? (
          <Spinner />
        ) : (
          <div className="text-gray-800 rounded-md overflow-y-auto text-lg">
            {message.split(/\n/).map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )
      }
    </>
  )
}

export default Lecture
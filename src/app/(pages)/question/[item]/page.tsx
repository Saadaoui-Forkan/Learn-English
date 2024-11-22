'use client'
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import Spinner from '@/components/Spinner'
import { AppContext } from '@/context/AppContext'
import { useParams } from 'next/navigation'
import { getChatCompletion } from '@/controller/dataFetch'
import { ApiResponse, Message } from '@/utils/types'
import { toast } from 'react-toastify'
import Button from '@/components/Button'

const Question = () => {
  const params = useParams<{ item: string }>()
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const [ answersArray, setAnswersArray ] = useState<string[]>([])
  const [ question, setQuestion ] = useState("")
  
  const {
    loading,
    setLoading,
    message,
    setShowFooterButton,
    setMessage,
    setContextPreviousMessage,
    contextPreviousMessage,
    setTextButton,
    slug,
    showFooterButton,
    textButton,
  } = context;

  const prompt = {
    role: "user",
    content: `Please give me one multiple-choice question exercise about ${params.item} 
    without an answer so that I can work on solving it. Also, consider me an English language student learning 
    the ${params.item} section. Please put each answer on a separate line and choices should start by capital 
    letter A), B), C) and D). the question should be in level A2 in english, write the question in first line`
  } as Message

  const getQuestion = async () => {
    setLoading(true)
    setShowFooterButton(false)
    const res = await getChatCompletion([
      prompt
    ])
    checkResponse(res)
    setShowFooterButton(true)
    setTextButton("Give me other question")
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

  const getMoreData = async () => {
    setShowFooterButton(false);
    const res: ApiResponse = await getChatCompletion([
      ...contextPreviousMessage,
      {
        role: "user",
        content: `Please give me another multiple-choice question exercise in the same context as before. 
        The question should be related to ${params.item}, suitable for an A2 English language learner. 
        Ensure it is different from the previous question. Put each answer on a separate line, starting with capital letters A), B), C), and D).`,
      },
    ]);
    if (res.status === 200) {
      setMessage(res.data.content);
      setContextPreviousMessage([
        ...contextPreviousMessage,
        prompt,
        {
          role: res.data.role,
          content: res.data.content,
        },
      ]);
    } else {
      toast.error(res.data.error);
    }
  };

  const questionRegex = (message: string) => {
    const regex = /([A-Ea-e]\) | [A-Ea-e]\.)(.*)/g;
    const answerArray = message.match(regex) || []
    const firstLine = message.split("\n")[0]
    setAnswersArray(answerArray)
    setQuestion(firstLine)
    setMessage(message)
}

  useEffect(() => {
    getQuestion()
  }, [])

  console.log(question)
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="text-gray-800 rounded-md overflow-y-auto text-lg">
          {
            message && message.split(/\n/).map((line, index) => (
              <p key={index}>{line}</p>
            ))
          }

          {showFooterButton && (
            <Button 
              onClick={getMoreData}
              textButton={textButton}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Question
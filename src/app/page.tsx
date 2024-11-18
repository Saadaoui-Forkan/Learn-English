'use client'
import HomeWithoutMessage from "@/components/HomeWithoutMessage";
import Spinner from "@/components/Spinner";
import { AppContext } from "@/context/AppContext";
import { getChatCompletion } from "@/controller/dataFetch";
import React, { useContext, useEffect, useState } from "react";

const Home = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }
  const { messageValue, contextPreviousMessage, setContextPreviousMessage } = context

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const getAnswer = async () => {
    try {
      setLoading(true)
      console.log(loading)
      const res = await getChatCompletion([
        ...contextPreviousMessage,
        {
          role: "user",
          content: messageValue
        },
      ])
      setMessage(res.data.content)
      setContextPreviousMessage([
        ...contextPreviousMessage,
        {
          role: "user",
          content: messageValue
        },
        {
          role: res.data.role,
          content: res.data.content
        }
      ])
      setLoading(false)
      console.log(loading)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (messageValue) {
      getAnswer()
    } else {
      setMessage('')
    }
  }, [messageValue])
  return (
    <>
      {!message ? (
        <HomeWithoutMessage />
      ) : (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <div className="text-gray-800 rounded-md overflow-y-auto text-lg">
              {message.split(/\n/).map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;

"use client";
import Spinner from "@/components/Spinner";
import { AppContext } from "@/context/AppContext";
import { getChatCompletion, getTextCompletion, getTranscription } from "@/controller/dataFetch";
import { ApiResponse, Message } from "@/utils/types";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { toast } from "react-toastify";
import { useReactMediaRecorder } from "react-media-recorder";
import { FaRegCircleStop } from "react-icons/fa6";

const Conversation = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

  const params = useParams<{ item: string }>();
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }
  const {
    setShowFooterButton,
    setTextButton,
    setMessage,
    setContextPreviousMessage,
    contextPreviousMessage,
    message,
  } = context;

  const [loading, setLoading] = useState(false);
  const [sentence, setSentence] = useState("")
  const [assistAnswer, setAssistAnswer] = useState("")

  const prompt = {
    role: "user",
    content: `I am an English student at the A2 level,
     give me a simple english sentence that contains the ${params.item}`,
  } as Message;

  const getConversation = async () => {
    setLoading(true);
    setShowFooterButton(false);
    const res = await getChatCompletion([prompt]);
    checkResponse(res);
    setShowFooterButton(true);
    setTextButton("More Explanation");
    setLoading(false);
  };

  const checkResponse = (res: ApiResponse) => {
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

  const fetchText = async () => {
    setLoading(true)
    if (!mediaBlobUrl) {
      return;
    }
    const res = await getTranscription(mediaBlobUrl)
    setSentence(res?.data.text)
    getConfirmSentence(res?.data.text)
  }

  const getConfirmSentence = async (confirmSentence: string) => {
    const confirmPrompt = {
      role: "user",
      content: `I am an English teacher and I want you to evaluate if the student has correctly read the following sentence.
      
      1. Here is the sentence from the computer: "${message}".
      2. Here is the sentence spoken by the student: "${confirmSentence}".
      
      Please provide detailed feedback. If the student read the sentence correctly, reply with: 
      "Perfect match, well done!".
      If the student made mistakes, highlight the incorrect words or phrases and suggest corrections. Be specific and constructive.`,
    } as Message;
  
    setLoading(true);
  
    try {
      const response = await getChatCompletion([confirmPrompt]);
      setAssistAnswer(response?.data?.content || "Error processing the response");
    } catch (error) {
      console.error("Error in getConfirmSentence:", error);
      setAssistAnswer("Failed to evaluate the spoken sentence.");
    }
  
    setLoading(false);
  };

  useEffect(() => {
    getConversation();
  }, []);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="text-gray-800 rounded-md overflow-y-auto text-lg">
            <h1 className="font-bold p-4 border-b border-slate-200 my-3">
              Try reading this sentence.
            </h1>
            <p className="mb-3">{message}</p>
          </div>
          <div className="flex space-x-4 items-center justify-center my-5 cursor-pointer">
            {status === "recording" ? (
              <span className="text-red-500" onClick={() => stopRecording()}>
                <FaRegCircleStop />
              </span>
            ) : (
              <span className="text-blue-500" onClick={() => startRecording()}>
                <FaMicrophone />
              </span>
            )}
          </div>
          {mediaBlobUrl && (
            <div className="mx-auto text-center">
              <div className="flex items-center justify-center">
                <audio src={mediaBlobUrl} controls autoPlay />
              </div>
              {loading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-white inline-block"></span>
                ) : (
                <button
                  className="m-3 py-1 px-2 border border-slate-500 bg-slate-500 text-white"
                  onClick={() => fetchText()}
                >
                  verify
                </button>
              )}
              <div className="text-center mt-4">
                {assistAnswer && (
                  <div className="p-4 border border-gray-300 rounded-lg">
                    <h2 className="font-bold">The sentence as you read it.</h2>
                    <p>{sentence}</p>
                    <h2 className="font-bold">AI Feedback:</h2>
                    <p>{assistAnswer}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Conversation;

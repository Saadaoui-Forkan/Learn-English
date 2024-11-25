"use client";
import Spinner from "@/components/Spinner";
import { AppContext } from "@/context/AppContext";
import { getChatCompletion } from "@/controller/dataFetch";
import { ApiResponse, Message } from "@/utils/types";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { toast } from "react-toastify";
import { useReactMediaRecorder } from "react-media-recorder";
import { FaRegCircleStop } from "react-icons/fa6";

const Conversation = () => {
  const params = useParams<{ item: string }>();
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }
  const {
    slug,
    setShowFooterButton,
    setTextButton,
    setSlug,
    setMessage,
    setContextPreviousMessage,
    contextPreviousMessage,
    message,
  } = context;

  const [loading, setLoading] = useState(false);

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
    setSlug(params.item);
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

  useEffect(() => {
    getConversation();
  }, []);

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });
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
              <button className="m-3 py-1 px-2 border border-slate-500 bg-slate-500 text-white">
                verify
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Conversation;

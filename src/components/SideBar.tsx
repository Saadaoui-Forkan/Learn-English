'use client'
import { AppContext } from "@/context/AppContext";
import { lessons, listItemObj } from "@/utils/data";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

const SideBar: React.FC = () => {
  const router = useRouter()
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }
  const { openMobile } = context; 
  
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const toggleAccordion = (id: number) => {
    setActiveLesson(id)
  }

  return (
    <div
      className={`fixed top-12 w-64 bg-gray-100 h-screen p-2 transition-transform duration-500 ease-in-out 
        transform overflow-y-auto ${
          openMobile ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
    >
      <h2 className="text-xl font-bold mb-4">Lessons</h2>
      <ul>
        {lessons.map((lesson, index) => (
          <li key={index} className="mb-2">
           
            <button
              onClick={() => toggleAccordion(index + 1)}
              className="w-full flex justify-between items-center border-b border-gray-400 p-2 hover:bg-gray-300 transition duration-300"
            >
              <span>{lesson}</span>
              <span>{index + 1 === activeLesson ? "-" : "+"}</span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                index + 1 === activeLesson ? "max-h-40" : "max-h-0"
              }`}
            >
                {
                    listItemObj.map((el, key) => (
                        <div key={key} className="mt-2 ml-4 bg-gray-50 border-l-2 border-gray-300 pl-4">
                            <p 
                              className="mb-2 cursor-pointer" 
                              onClick={() => {
                                console.log(`Navigating to /${el}/${lesson}`); // Debug URL
                                router.push(`/${el}/${lesson}`);
                              }}
                            >
                              <strong>{el}</strong> 
                            </p>
                        </div>
                    ))
                }
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;

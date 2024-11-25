'use client'
import { AppContext } from "@/context/AppContext";
import { lessons, listItemObj } from "@/utils/data";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import Footer from "./Footer";
import { IoChevronDown, IoChevronUpSharp } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";

const SideBar: React.FC = () => {
  const router = useRouter()
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }
  const { openMobile, setOpenMobile } = context;

  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const toggleAccordion = (id: number) => {
    setActiveLesson(id)
  }

  return (
    <div
      className={`fixed top-12 bg-gray-100 p-2 transition-transform duration-500 ease-in-out 
        transform min-h-screen z-10 ${openMobile ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
    >
      <h2 className="text-xl font-bold mb-4">Lessons</h2>
      <div className="p-2 max-h-[450px] overflow-y-auto">
        <ul className="text-sm">
          {lessons.map((lesson, index) => (
            <li key={index} className="mb-2">
              <button
                onClick={() => toggleAccordion(index + 1)}
                className="w-full flex justify-between items-center p-2 hover:bg-gray-200 transition duration-300"
              >
                <span>{lesson}</span>
                <span>
                  {index + 1 === activeLesson ? (
                    <IoChevronUpSharp className="text-sm" />
                  ) : (
                    <IoChevronDown className="text-sm" />
                  )}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${index + 1 === activeLesson ? "max-h-40" : "max-h-0"
                  }`}
              >
                {listItemObj.map((el, key) => (
                  <div
                    key={key}
                    className="flex items-center py-1 "
                  >
                    <GiCheckMark className="text-sm mx-4" />
                    <p
                      className="cursor-pointer"
                      onClick={() => {
                        router.push(`/${el}/${lesson}`);
                        setOpenMobile(false)
                      }}
                    >
                      {el}
                    </p>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SideBar;

"use client"
import React, { useContext, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { AppContext } from "@/context/AppContext";

const Toolbar = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }
  const { openMobile, setOpenMobile } = context; 

  const toggleMenu = () => setOpenMobile(!openMobile);

  return (
    <header className="fixed top-0 left-0 w-full h-12 bg-slate-600 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold">Learn English with AI</h1>

        <div className="block md:hidden">
          {openMobile ? (
            <AiOutlineClose size={28} onClick={toggleMenu} className="cursor-pointer" />
          ) : (
            <FiMenu size={28} onClick={toggleMenu} className="cursor-pointer" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Toolbar;

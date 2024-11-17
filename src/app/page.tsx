import React from "react";
import { FaBook, FaQuestion, FaComments, FaLanguage, FaRobot } from "react-icons/fa";

const Home = () => {
  return (
    <div className="mx-auto p-6 text-gray-800 rounded-md overflow-y-auto">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">
        Teach Me App for Learning English
      </h1>
      <ul className="list-none space-y-4 mb-4">
        {[
          { icon: <FaBook className="text-blue-700 w-6 h-6" />, text: "A full explanation of the lesson." },
          { icon: <FaQuestion className="text-green-600 w-6 h-6" />, text: "Questions about the same grammar rules you're studying." },
          { icon: <FaComments className="text-yellow-500 w-6 h-6" />, text: "A conversation section where you'll take a sentence, practice saying it, and the app will check your pronunciation." },
          { icon: <FaLanguage className="text-red-600 w-6 h-6" />, text: "A translation section where you'll translate a sentence and verify your translation." },
        ].map((item, index) => (
          <li key={index} className="flex items-center space-x-3">
            {item.icon}
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
      <p className="text-lg leading-relaxed mb-4">
        You can access these sections from the right-hand sidebar.
      </p>
      <p className="text-lg leading-relaxed mb-4">
        First, choose the lesson you want and then click on it. A small menu will appear with four sections: Lesson Explanation, Questions, Conversation, and Translation.
      </p>
      <p className="text-lg leading-relaxed mb-4">
        The section you choose will be displayed through ChatGPT, which we've used to help you learn English.
      </p>
      <p className="text-lg leading-relaxed flex items-center space-x-3">
        <FaRobot className="text-purple-700 w-6 h-6" />
        <span>
          Additionally, at the bottom, there is an <strong>"Ask Me"</strong> section where you can talk to ChatGPT and ask it to explain or help you with anything you want.
        </span>
      </p>
    </div>

  );
};

export default Home;

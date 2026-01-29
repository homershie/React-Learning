"use client";

import { useState } from "react";
import UseStatePractice from "./components/practices/UseStatePractice";
import UseEffectPractice from "./components/practices/UseEffectPractice";
import ErrorHandlingPractice from "./components/practices/ErrorHandlingPractice";

type PracticeTab = "useState" | "useEffect" | "errorHandling";

export default function Home() {
  const [activeTab, setActiveTab] = useState<PracticeTab>("useState");

  return (
    <div className="min-h-screen p-10 md:p-5 bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="text-center text-white mb-10">
        <h1 className="text-4xl md:text-3xl font-bold mb-2.5">
          🎯 React 面試練習區
        </h1>
        <p className="text-lg opacity-90">面試常考的變化題練習</p>
      </div>

      <div className="flex justify-center gap-2.5 mb-8 flex-wrap">
        <button
          className={`px-6 py-3 text-base font-semibold border-none rounded-lg cursor-pointer transition-all ${
            activeTab === "useState"
              ? "bg-white text-indigo-500 shadow-lg"
              : "bg-white/20 text-white hover:bg-white/30"
          } hover:-translate-y-0.5`}
          onClick={() => setActiveTab("useState")}
        >
          useState 更新物件
        </button>
        <button
          className={`px-6 py-3 text-base font-semibold border-none rounded-lg cursor-pointer transition-all ${
            activeTab === "useEffect"
              ? "bg-white text-indigo-500 shadow-lg"
              : "bg-white/20 text-white hover:bg-white/30"
          } hover:-translate-y-0.5`}
          onClick={() => setActiveTab("useEffect")}
        >
          useEffect 依賴陣列
        </button>
        <button
          className={`px-6 py-3 text-base font-semibold border-none rounded-lg cursor-pointer transition-all ${
            activeTab === "errorHandling"
              ? "bg-white text-indigo-500 shadow-lg"
              : "bg-white/20 text-white hover:bg-white/30"
          } hover:-translate-y-0.5`}
          onClick={() => setActiveTab("errorHandling")}
        >
          錯誤處理技巧
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-10 md:p-5 shadow-2xl">
        {activeTab === "useState" && <UseStatePractice />}
        {activeTab === "useEffect" && <UseEffectPractice />}
        {activeTab === "errorHandling" && <ErrorHandlingPractice />}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

const scaleArray = {
  "486尺寸": 486 / 416,
  "454尺寸": 454 / 416,
  "416尺寸": 416 / 416,
  "390尺寸": 390 / 416,
  "360尺寸": 360 / 416,
  "280尺寸": 280 / 416,
  "260尺寸": 260 / 416,
  "240尺寸": 240 / 416,
  "218尺寸": 218 / 416,
  "208尺寸": 208 / 416,
};

interface FontSizes {
  fontSize1: string;
  fontSize2: string;
  fontSize3: string;
}

interface CalculatedResult {
  device: string;
  font1: number;
  font2: number;
  font3: number;
}

export default function GarminCalculator() {
  const [inputs, setInputs] = useState<FontSizes>({
    fontSize1: "",
    fontSize2: "",
    fontSize3: "",
  });
  const [results, setResults] = useState<CalculatedResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: keyof FontSizes, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateFontSizes = () => {
    const fontSize1 = parseFloat(inputs.fontSize1);
    const fontSize2 = parseFloat(inputs.fontSize2);
    const fontSize3 = parseFloat(inputs.fontSize3);

    // 驗證輸入
    if (!fontSize1 || !fontSize2 || !fontSize3) {
      alert("請輸入所有三個字體大小！");
      return;
    }

    if (fontSize1 <= 0 || fontSize2 <= 0 || fontSize3 <= 0) {
      alert("字體大小必須大於 0！");
      return;
    }

    // 計算結果
    const calculatedResults: CalculatedResult[] = Object.keys(scaleArray).map(
      (key) => {
        const scale = scaleArray[key as keyof typeof scaleArray];
        return {
          device: key,
          font1: Math.round(fontSize1 * scale * 10) / 10,
          font2: Math.round(fontSize2 * scale * 10) / 10,
          font3: Math.round(fontSize3 * scale * 10) / 10,
        };
      }
    );

    setResults(calculatedResults);
    setShowResults(true);

    // 平滑滾動到結果區域
    setTimeout(() => {
      const resultsSection = document.getElementById("resultsSection");
      if (resultsSection) {
        resultsSection.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      calculateFontSizes();
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-5 bg-gradient-to-b from-purple-400 to-purple-600">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 text-center">
          <h1 className="text-3xl font-semibold mb-2">Garmin 字體大小計算器</h1>
          <p className="text-sm opacity-90">計算不同裝置尺寸的字體大小 (基準: 416尺寸)</p>
        </div>

        <div className="p-10 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="flex flex-col">
              <label htmlFor="fontSize1" className="text-sm font-semibold text-gray-700 mb-2">
                字體大小 1 (pt)
              </label>
              <input
                type="number"
                id="fontSize1"
                placeholder="例如: 16"
                min="1"
                step="0.5"
                value={inputs.fontSize1}
                onChange={(e) => handleInputChange("fontSize1", e.target.value)}
                onKeyPress={handleKeyPress}
                className="px-4 py-3 text-base border-2 border-gray-300 rounded-lg transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="fontSize2" className="text-sm font-semibold text-gray-700 mb-2">
                字體大小 2 (pt)
              </label>
              <input
                type="number"
                id="fontSize2"
                placeholder="例如: 14"
                min="1"
                step="0.5"
                value={inputs.fontSize2}
                onChange={(e) => handleInputChange("fontSize2", e.target.value)}
                onKeyPress={handleKeyPress}
                className="px-4 py-3 text-base border-2 border-gray-300 rounded-lg transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="fontSize3" className="text-sm font-semibold text-gray-700 mb-2">
                字體大小 3 (pt)
              </label>
              <input
                type="number"
                id="fontSize3"
                placeholder="例如: 12"
                min="1"
                step="0.5"
                value={inputs.fontSize3}
                onChange={(e) => handleInputChange("fontSize3", e.target.value)}
                onKeyPress={handleKeyPress}
                className="px-4 py-3 text-base border-2 border-gray-300 rounded-lg transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
          <button
            onClick={calculateFontSizes}
            className="w-full py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 border-none rounded-lg cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
          >
            計算字體大小
          </button>
        </div>

        {showResults && (
          <div className="p-10" id="resultsSection">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">📊 計算結果</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
                <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <tr>
                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide">裝置寬度</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide">字體 1</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide">字體 2</th>
                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide">字體 3</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 transition-colors hover:bg-gray-50 last:border-b-0"
                    >
                      <td className="px-4 py-4 font-semibold text-indigo-600">{result.device}</td>
                      <td className="px-4 py-4 font-mono text-gray-700">{result.font1} pt</td>
                      <td className="px-4 py-4 font-mono text-gray-700">{result.font2} pt</td>
                      <td className="px-4 py-4 font-mono text-gray-700">{result.font3} pt</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

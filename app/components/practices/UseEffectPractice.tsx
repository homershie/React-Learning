"use client";

import { useState, useEffect } from "react";

/**
 * 🎯 練習 2: useEffect 依賴陣列
 *
 * 任務：
 * 1. 實作只在 mount 時執行的 useEffect
 * 2. 實作依賴特定值的 useEffect
 * 3. 實作 cleanup function（清理計時器、取消請求等）
 */

export default function UseEffectPractice() {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState<{ name: string; id: number } | null>(null);
  const [timer, setTimer] = useState(0);

  // TODO: 練習 1 - 只在組件 mount 時執行一次
  useEffect(() => {
    console.log("組件已載入");
    // 這裡可以做一些初始化工作
  }, []); // 空依賴陣列(比較是否改變，空陣列始終為 null，所以只執行一次)

  // TODO: 練習 2 - count 改變時執行
  useEffect(() => {
    console.log("count 改變了:", count);
    // 每次 count 改變時執行
  }, [count]); // 依賴 count(count 改變時執行)

  // TODO: 練習 3 - 計時器（需要 cleanup）
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        const newTimer = prev + 1;
        // console.log("timer", newTimer);
        return newTimer;
      });
    }, 1000);

    // cleanup 函數是在 effect 的 return 語句中返回的函數
    // 在組件 unmount 時執行，所以每次渲染都會執行
    // ⚠️ 重要：一定要清理，否則會記憶體洩漏
    return () => {
      clearInterval(interval);
    };
  }, []);

  // TODO: 練習 4 - 根據 userId 載入使用者資料（需要 cleanup 防止 race condition）
  useEffect(() => {
    let cancelled = false; // 防止 race condition

    async function fetchUser() {
      // 模擬 API 請求
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();

      if (!cancelled) {
        setUser(data);
      }
    }

    fetchUser();

    return () => {
      cancelled = true; // cleanup: 標記為已取消
    };
  }, [userId]);

  return (
    <div className="w-full">
      <h2 className="text-3xl mb-5 text-gray-800">🔄 useEffect 依賴陣列練習</h2>

      <div className="bg-gray-50 p-5 rounded-lg mb-8 border-l-4 border-indigo-500">
        <h3 className="mb-4 text-gray-700">💡 重點提示</h3>
        <ul className="list-none p-0">
          <li className="mb-2.5 pl-5 text-gray-800">
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm text-gray-800">
              useEffect(() =&gt; {}, [])
            </code>{" "}
            - 只執行一次（component mount）
          </li>
          <li className="mb-2.5 pl-5 text-gray-800">
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm text-gray-800">
              useEffect(() =&gt; {})
            </code>{" "}
            - 每次渲染都執行（不建議）
          </li>
          <li className="mb-2.5 pl-5 text-gray-800">
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm text-gray-800">
              useEffect(() =&gt; {}, [count])
            </code>{" "}
            - count 改變時執行
          </li>
          <li className="mb-2.5 pl-5 text-gray-800">
            <strong>重要</strong>: 一定要實作 cleanup function
            來清理計時器、訂閱等
          </li>
        </ul>
      </div>

      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-5 mb-8">
        <h3 className="mb-4 text-gray-700">練習區 1: 計數器</h3>
        <p className="text-gray-800 mb-2">當前計數: {count}</p>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors mr-2.5 text-sm"
        >
          增加
        </button>
        {/* TODO: 實作 useEffect 來監聽 count 的變化 */}
      </div>

      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-5 mb-8">
        <h3 className="mb-4 text-gray-700">練習區 2: 計時器（需要 cleanup）</h3>
        <p className="text-gray-800">計時器: {timer} 秒</p>
        {/* TODO: 實作 useEffect 來啟動計時器，並在 unmount 時清理 */}
      </div>

      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-5 mb-8">
        <h3 className="mb-4 text-gray-700">練習區 3: 載入使用者資料</h3>
        <div>
          <label className="text-gray-800">
            User ID:{" "}
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(Number(e.target.value))}
              min="1"
              className="px-3 py-1.5 border-2 border-gray-300 rounded text-sm ml-2.5 text-gray-800 bg-white"
            />
          </label>
        </div>
        {/* TODO: 實作 useEffect 來根據 userId 載入資料，並處理 cleanup */}
        {user && <p className="text-gray-800 mt-2">使用者: {user.name}</p>}
      </div>

      <div className="bg-gray-800 text-gray-300 p-5 rounded-lg overflow-x-auto">
        <h3 className="text-blue-400 mb-4">📚 參考程式碼</h3>
        <pre className="m-0 font-mono text-sm leading-relaxed">{`// 每次渲染都執行
useEffect(() => { });

// 只執行一次 (component mount)
useEffect(() => { }, []);

// count 改變時執行
useEffect(() => { }, [count]);

// 計時器範例（需要 cleanup）
useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);
  
  // ⚠️ 一定要清理，否則記憶體洩漏
  return () => {
    clearInterval(timer);
  };
}, []);

// 防止 race condition
useEffect(() => {
  let cancelled = false;
  
  async function fetchData() {
    const res = await fetch(url);
    const data = await res.json();
    
    if (!cancelled) {
      setData(data);
    }
  }
  
  fetchData();
  
  return () => {
    cancelled = true;
  };
}, [userId]);`}</pre>
      </div>
    </div>
  );
}

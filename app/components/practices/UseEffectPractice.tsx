'use client';

import { useState, useEffect } from 'react';

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
  // useEffect(() => {
  //   console.log('組件已載入');
  //   // 這裡可以做一些初始化工作
  // }, []); // 空依賴陣列

  // TODO: 練習 2 - count 改變時執行
  // useEffect(() => {
  //   console.log('count 改變了:', count);
  //   // 每次 count 改變時執行
  // }, [count]); // 依賴 count

  // TODO: 練習 3 - 計時器（需要 cleanup）
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimer(prev => prev + 1);
  //   }, 1000);
  //
  //   // ⚠️ 重要：一定要清理，否則會記憶體洩漏
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // TODO: 練習 4 - 根據 userId 載入使用者資料（需要 cleanup 防止 race condition）
  // useEffect(() => {
  //   let cancelled = false; // 防止 race condition
  //
  //   async function fetchUser() {
  //     // 模擬 API 請求
  //     const response = await fetch(`/api/users/${userId}`);
  //     const data = await response.json();
  //
  //     if (!cancelled) {
  //       setUser(data);
  //     }
  //   }
  //
  //   fetchUser();
  //
  //   return () => {
  //     cancelled = true; // cleanup: 標記為已取消
  //   };
  // }, [userId]);

  return (
    <div className="practice-section">
      <h2>🔄 useEffect 依賴陣列練習</h2>

      <div className="practice-note">
        <h3>💡 重點提示</h3>
        <ul>
          <li>
            <code>useEffect(() =&gt; { }, [])</code> - 只執行一次（component mount）
          </li>
          <li>
            <code>useEffect(() =&gt; { })</code> - 每次渲染都執行（不建議）
          </li>
          <li>
            <code>useEffect(() =&gt; { }, [count])</code> - count 改變時執行
          </li>
          <li>
            <strong>重要</strong>: 一定要實作 cleanup function 來清理計時器、訂閱等
          </li>
        </ul>
      </div>

      <div className="practice-area">
        <h3>練習區 1: 計數器</h3>
        <p>當前計數: {count}</p>
        <button onClick={() => setCount(count + 1)}>增加</button>
        {/* TODO: 實作 useEffect 來監聽 count 的變化 */}
      </div>

      <div className="practice-area">
        <h3>練習區 2: 計時器（需要 cleanup）</h3>
        <p>計時器: {timer} 秒</p>
        {/* TODO: 實作 useEffect 來啟動計時器，並在 unmount 時清理 */}
      </div>

      <div className="practice-area">
        <h3>練習區 3: 載入使用者資料</h3>
        <div>
          <label>
            User ID:{' '}
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(Number(e.target.value))}
              min="1"
            />
          </label>
        </div>
        {/* TODO: 實作 useEffect 來根據 userId 載入資料，並處理 cleanup */}
        {user && <p>使用者: {user.name}</p>}
      </div>

      <div className="code-example">
        <h3>📚 參考程式碼</h3>
        <pre>{`// 每次渲染都執行
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

      <style jsx>{`
        .practice-section {
          width: 100%;
        }

        .practice-section h2 {
          font-size: 28px;
          margin-bottom: 20px;
          color: #212529;
        }

        .practice-note {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 30px;
          border-left: 4px solid #667eea;
        }

        .practice-note h3 {
          margin-bottom: 15px;
          color: #495057;
        }

        .practice-note ul {
          list-style: none;
          padding: 0;
        }

        .practice-note li {
          margin-bottom: 10px;
          padding-left: 20px;
          position: relative;
          color: #212529;
        }

        .practice-note code {
          background: #e9ecef;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 14px;
        }

        .practice-area {
          background: #fff;
          border: 2px dashed #dee2e6;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 30px;
        }

        .practice-area h3 {
          margin-bottom: 15px;
          color: #495057;
        }

        .practice-area button {
          padding: 8px 16px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          margin-right: 10px;
        }

        .practice-area button:hover {
          background: #5568d3;
        }

        .practice-area input {
          padding: 6px 12px;
          border: 2px solid #dee2e6;
          border-radius: 6px;
          font-size: 14px;
          margin-left: 10px;
        }

        .code-example {
          background: #282c34;
          color: #abb2bf;
          padding: 20px;
          border-radius: 10px;
          overflow-x: auto;
        }

        .code-example h3 {
          color: #61afef;
          margin-bottom: 15px;
        }

        .code-example pre {
          margin: 0;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}


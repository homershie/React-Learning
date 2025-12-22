'use client';

import { useState } from 'react';

/**
 * 🎯 練習 3: 錯誤處理技巧
 * 
 * 任務：
 * 1. 實作安全的 fetch 函數（包含錯誤處理）
 * 2. 實作 loading 和 error state 管理
 * 3. 實作 try-catch 錯誤處理
 * 4. 理解如何回傳預設值而非 null
 */

export default function ErrorHandlingPractice() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: 練習 1 - 實作安全的 fetch 函數
  // async function safelyFetch(url: string) {
  //   try {
  //     const res = await fetch(url);
  //     if (!res.ok) {
  //       throw new Error(\`\${res.status}: \${res.statusText}\`);
  //     }
  //     return await res.json();
  //   } catch (err) {
  //     console.error('請求失敗:', err.message);
  //     // 回傳預設值而非 null
  //     return { error: true, message: err.message };
  //   }
  // }

  // TODO: 練習 2 - 實作載入資料的函數（包含 loading 和 error state）
  // const loadData = async (url: string) => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //
  //     const res = await fetch(url);
  //     if (!res.ok) {
  //       throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
  //     }
  //
  //     const json = await res.json();
  //     setData(json);
  //   } catch (err: any) {
  //     setError(err.message || '載入失敗');
  //     setData(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // TODO: 練習 3 - 實作平行請求（使用 Promise.all）
  // const loadMultipleData = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //
  //     // ✅ 平行執行（快）
  //     const [user, posts] = await Promise.all([
  //       fetch('/api/user').then(res => res.json()),
  //       fetch('/api/posts').then(res => res.json())
  //     ]);
  //
  //     setData({ user, posts });
  //   } catch (err: any) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // 測試用的模擬 API
  const testSuccess = async () => {
    // TODO: 使用 loadData 函數
    // 模擬成功請求
    setTimeout(() => {
      setData({ message: '成功載入資料！', timestamp: new Date().toISOString() });
      setLoading(false);
    }, 1000);
  };

  const testError = async () => {
    // TODO: 使用 loadData 函數並處理錯誤
    // 模擬失敗請求
    setTimeout(() => {
      setError('模擬錯誤：無法載入資料');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="practice-section">
      <h2>🛡️ 錯誤處理技巧練習</h2>

      <div className="practice-note">
        <h3>💡 重點提示</h3>
        <ul>
          <li>✅ 一定要檢查 <code>response.ok</code></li>
          <li>✅ 使用 <code>try-catch</code> 處理錯誤</li>
          <li>✅ 回傳預設值而非 <code>null</code></li>
          <li>✅ 使用 <code>Promise.all</code> 進行平行請求</li>
          <li>✅ 管理 <code>loading</code> 和 <code>error</code> state</li>
        </ul>
      </div>

      <div className="practice-area">
        <h3>練習區 1: 安全的 Fetch 函數</h3>
        <p className="placeholder">在這裡實作 safelyFetch 函數</p>
        {/* TODO: 實作 safelyFetch 函數 */}
      </div>

      <div className="practice-area">
        <h3>練習區 2: 載入資料（含錯誤處理）</h3>
        <div className="button-group">
          <button onClick={testSuccess}>測試成功請求</button>
          <button onClick={testError}>測試錯誤請求</button>
        </div>
        {/* TODO: 實作 loadData 函數並顯示結果 */}
        {loading && <p>載入中...</p>}
        {error && <p className="error">錯誤: {error}</p>}
        {data && !loading && (
          <pre className="data-display">{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>

      <div className="practice-area">
        <h3>練習區 3: 平行請求</h3>
        <p className="placeholder">在這裡實作 loadMultipleData 函數（使用 Promise.all）</p>
        {/* TODO: 實作平行請求功能 */}
      </div>

      <div className="code-example">
        <h3>📚 參考程式碼</h3>
        <pre>{`// 安全的 fetch 函數
async function safelyFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(\`\${res.status}: \${res.statusText}\`);
    }
    return await res.json();
  } catch (err) {
    console.error('請求失敗:', err.message);
    return { error: true, message: err.message };
  }
}

// React 中使用（含 loading 和 error state）
function DataLoader() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('載入失敗');
      
      setData(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <div>載入中...</div>;
  if (error) return <div>錯誤: {error}</div>;
  return <div>{data?.name}</div>;
}

// 平行請求（快）
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts()
]);

// 依序請求（慢）
const user = await fetchUser();
const posts = await fetchPosts();`}</pre>
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

        .placeholder {
          color: #adb5bd;
          font-style: italic;
          padding: 20px;
          text-align: center;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .button-group {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .button-group button {
          padding: 10px 20px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .button-group button:hover {
          background: #5568d3;
        }

        .error {
          color: #dc3545;
          font-weight: 600;
          padding: 10px;
          background: #f8d7da;
          border-radius: 6px;
        }

        .data-display {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 6px;
          overflow-x: auto;
          font-size: 14px;
          margin-top: 15px;
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


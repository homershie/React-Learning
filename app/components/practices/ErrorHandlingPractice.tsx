"use client";

import { useState } from "react";

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
  async function safelyFetch(url: string) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      return await res.json();
    } catch (err) {
      // ✅ React/TypeScript 注意事項：錯誤類型是 unknown
      const message = err instanceof Error ? err.message : "未知錯誤";
      console.error("請求失敗:", message);
      // 回傳預設值而非 null
      return { error: true, message };
    }
  }

  // TODO: 練習 2 - 實作載入資料的函數（包含 loading 和 error state）
  const loadData = async (url: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();
      setData(json);
    } catch (err) {
      const message = err instanceof Error ? err.message : "載入失敗";
      setError(message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // TODO: 練習 3 - 實作平行請求（使用 Promise.all）
  const loadMultipleData = async () => {
    try {
      setLoading(true);
      setError(null);

      // ✅ 平行執行（快）
      const [user, posts] = await Promise.all([
        fetch("/api/user").then((res) => res.json()),
        fetch("/api/posts").then((res) => res.json()),
      ]);

      setData({ user, posts });
    } catch (err) {
      const message = err instanceof Error ? err.message : "載入失敗";
      setError(message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // 測試用的模擬 API
  const testSuccess = async () => {
    // TODO: 使用 loadData 函數
    // 模擬成功請求
    setTimeout(() => {
      setData({
        message: "成功載入資料！",
        timestamp: new Date().toISOString(),
      });
      setLoading(false);
    }, 1000);
  };

  const testError = async () => {
    // TODO: 使用 loadData 函數並處理錯誤
    // 模擬失敗請求
    setTimeout(() => {
      setError("模擬錯誤：無法載入資料");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl mb-5 text-gray-800">🛡️ 錯誤處理技巧練習</h2>

      <div className="bg-gray-50 p-5 rounded-lg mb-8 border-l-4 border-indigo-500">
        <h3 className="mb-4 text-gray-700">💡 重點提示</h3>
        <ul className="list-none p-0">
          <li className="mb-2.5 pl-5 text-gray-800">
            ✅ 一定要檢查{" "}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm text-gray-800">
              response.ok
            </code>
          </li>
          <li className="mb-2.5 pl-5 text-gray-800">
            ✅ 使用{" "}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm text-gray-800">
              try-catch
            </code>{" "}
            處理錯誤
          </li>
          <li className="mb-2.5 pl-5 text-gray-800">
            ✅ 回傳預設值而非{" "}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm text-gray-800">
              null
            </code>
          </li>
          <li className="mb-2.5 pl-5 text-gray-800">
            ✅ 使用{" "}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm text-gray-800">
              Promise.all
            </code>{" "}
            進行平行請求
          </li>
          <li className="mb-2.5 pl-5 text-gray-800">
            ✅ 管理{" "}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm text-gray-800">
              loading
            </code>{" "}
            和{" "}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm text-gray-800">
              error
            </code>{" "}
            state
          </li>
        </ul>
      </div>

      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-5 mb-8">
        <h3 className="mb-4 text-gray-700">練習區 1: 安全的 Fetch 函數</h3>
        <p className="text-gray-400 italic py-5 text-center bg-gray-50 rounded-lg">
          在這裡實作 safelyFetch 函數
        </p>
        {/* TODO: 實作 safelyFetch 函數 */}
      </div>

      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-5 mb-8">
        <h3 className="mb-4 text-gray-700">練習區 2: 載入資料（含錯誤處理）</h3>
        <div className="flex gap-2.5 mb-5">
          <button
            onClick={testSuccess}
            className="px-5 py-2.5 bg-indigo-500 text-white border-none rounded cursor-pointer text-sm hover:bg-indigo-600 transition-colors"
          >
            測試成功請求
          </button>
          <button
            onClick={testError}
            className="px-5 py-2.5 bg-indigo-500 text-white border-none rounded cursor-pointer text-sm hover:bg-indigo-600 transition-colors"
          >
            測試錯誤請求
          </button>
        </div>
        {/* TODO: 實作 loadData 函數並顯示結果 */}
        {loading && <p className="text-gray-800">載入中...</p>}
        {error && (
          <p className="text-red-600 font-semibold py-2.5 px-2.5 bg-red-100 rounded">
            錯誤: {error}
          </p>
        )}
        {data && !loading && (
          <pre className="bg-gray-50 py-4 px-4 rounded overflow-x-auto text-sm mt-4">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>

      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-5 mb-8">
        <h3 className="mb-4 text-gray-700">練習區 3: 平行請求</h3>
        <p className="text-gray-400 italic py-5 text-center bg-gray-50 rounded-lg">
          在這裡實作 loadMultipleData 函數（使用 Promise.all）
        </p>
        {/* TODO: 實作平行請求功能 */}
      </div>

      <div className="bg-gray-800 text-gray-300 p-5 rounded-lg overflow-x-auto">
        <h3 className="text-blue-400 mb-4">📚 參考程式碼</h3>
        <pre className="m-0 font-mono text-sm leading-relaxed">{`// 安全的 fetch 函數
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
    </div>
  );
}

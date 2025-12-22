'use client';

import { useState } from 'react';

/**
 * 🎯 練習 1: useState 更新物件
 * 
 * 任務：
 * 1. 實作更新 user 物件的功能（使用展開運算子）
 * 2. 實作更新 todos 陣列的功能
 * 3. 理解為什麼不能直接修改 state
 */

interface User {
  name: string;
  age: number;
  email: string;
}

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function UseStatePractice() {
  // TODO: 初始化 user state
  // const [user, setUser] = useState<User>({ name: '', age: 0, email: '' });

  // TODO: 初始化 todos state
  // const [todos, setTodos] = useState<Todo[]>([]);

  // TODO: 實作更新 user 的函數（使用展開運算子）
  // const updateUserName = (name: string) => {
  //   // ❌ 錯誤: user.name = name;
  //   // ✅ 正確: setUser({ ...user, name });
  // };

  // TODO: 實作新增 todo 的函數
  // const addTodo = (text: string) => {
  //   // 使用展開運算子新增項目到陣列
  // };

  // TODO: 實作切換 todo 完成狀態的函數
  // const toggleTodo = (id: number) => {
  //   // 使用 map 更新陣列中的特定項目
  // };

  // TODO: 實作刪除 todo 的函數
  // const deleteTodo = (id: number) => {
  //   // 使用 filter 移除項目
  // };

  return (
    <div className="practice-section">
      <h2>📝 useState 更新物件練習</h2>
      
      <div className="practice-note">
        <h3>💡 重點提示</h3>
        <ul>
          <li>❌ <strong>錯誤</strong>: 直接修改 state 物件 <code>{`user.name = '小明'`}</code></li>
          <li>✅ <strong>正確</strong>: 創建新物件 <code>{`setUser({ ...user, name: '小明' })`}</code></li>
          <li>✅ 更新陣列時也要創建新陣列，使用 <code>map</code>、<code>filter</code>、<code>{`[...array, newItem]`}</code></li>
        </ul>
      </div>

      <div className="practice-area">
        <h3>練習區 1: 更新 User 物件</h3>
        <div className="input-group">
          {/* TODO: 實作輸入框和按鈕來更新 user */}
          <p className="placeholder">在這裡實作更新 user 的功能</p>
        </div>
        {/* TODO: 顯示當前 user 的資訊 */}
      </div>

      <div className="practice-area">
        <h3>練習區 2: Todo List</h3>
        <div className="input-group">
          {/* TODO: 實作新增 todo 的輸入框和按鈕 */}
          <p className="placeholder">在這裡實作新增 todo 的功能</p>
        </div>
        {/* TODO: 顯示 todos 列表，包含切換完成狀態和刪除功能 */}
      </div>

      <div className="code-example">
        <h3>📚 參考程式碼</h3>
        <pre>{`// 更新物件
const [user, setUser] = useState({ name: '', age: 0 });

// ❌ 錯誤: 直接修改
user.name = '小明';  

// ✅ 正確: 創建新物件
setUser({ ...user, name: '小明' });

// 更新陣列
const [todos, setTodos] = useState([]);

// ✅ 新增項目
setTodos([...todos, newTodo]);

// ✅ 更新項目
setTodos(todos.map(todo => 
  todo.id === id ? { ...todo, done: !todo.done } : todo
));

// ✅ 刪除項目
setTodos(todos.filter(todo => todo.id !== id));`}</pre>
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

        .input-group {
          margin-bottom: 15px;
        }

        .placeholder {
          color: #adb5bd;
          font-style: italic;
          padding: 20px;
          text-align: center;
          background: #f8f9fa;
          border-radius: 8px;
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


"use client";

import { useState } from "react";

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
  // TODO: 初始化 user states
  const [user, setUser] = useState<User>({ name: "", age: 0, email: "" });

  // TODO: 初始化 todos state
  const [todos, setTodos] = useState<Todo[]>([]);

  // TODO: 實作更新 user 的函數（使用展開運算子）
  // 即時更新 user 的資訊
  const updateUserName = (name: string) => {
    // ❌ 錯誤: user.name = name;
    // ✅ 正確: setUser({ ...user, name });
    setUser({ ...user, name: name });
    console.log("user", user);
  };

  // 使用 formData 來更新 user 的資訊
  // 提交按鈕後更新 user 的資訊
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setUser({
      name: (formData.get("name") as string) || "",
      age: Number(formData.get("age")) || 0,
      email: (formData.get("email") as string) || "",
    });
    console.log("user", user);
  };

  // TODO: 實作新增 todo 的函數
  const addTodo = (text: string) => {
    // 使用展開運算子新增項目到陣列
    setTodos([...todos, { id: todos.length + 1, text: text, done: false }]);
    console.log("todos", todos);
  };

  // 使用 formData 來新增 todo
  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = (formData.get("todo") as string) || "";
    if (!text.trim()) return; // 如果是空字串就不新增
    setTodos((prevTodos) => {
      const newTodos = [
        ...prevTodos,
        { id: Date.now(), text: text, done: false },
      ];
      console.log("newTodos", newTodos);
      return newTodos;
    });
    // 重置表單
    e.currentTarget.reset();
  };

  // TODO: 實作切換 todo 完成狀態的函數
  const toggleTodo = (id: number) => {
    // 使用 map 更新陣列中的特定項目
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
    console.log("todos", todos);
  };

  // TODO: 實作刪除 todo 的函數
  const deleteTodo = (id: number) => {
    // 使用 filter 移除項目
    setTodos(todos.filter((todo) => todo.id !== id));
    console.log("todos", todos);
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl mb-5 text-gray-800">📝 useState 更新物件練習</h2>

      <div className="bg-gray-50 p-5 rounded-lg mb-8 border-l-4 border-indigo-500">
        <h3 className="mb-4 text-gray-700">💡 重點提示</h3>
        <ul className="list-none p-0">
          <li className="mb-2.5 pl-5 text-gray-800">
            ❌ <strong>錯誤</strong>: 直接修改 state 物件{" "}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm text-gray-800">{`user.name = '小明'`}</code>
          </li>
          <li className="mb-2.5 pl-5 text-gray-800">
            ✅ <strong>正確</strong>: 創建新物件{" "}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm text-gray-800">{`setUser({ ...user, name: '小明' })`}</code>
          </li>
          <li className="mb-2.5 pl-5 text-gray-800">
            ✅ 更新陣列時也要創建新陣列，使用{" "}
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm text-gray-800">
              map
            </code>
            、
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm text-gray-800">
              filter
            </code>
            、
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm text-gray-800">{`[...array, newItem]`}</code>
          </li>
        </ul>
      </div>

      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-5 mb-8">
        <h3 className="mb-4 text-gray-700">練習區 1: 更新 User 物件</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <label>
              名字：
              <input
                type="text"
                name="name"
                defaultValue={user.name}
                placeholder="輸入名字"
                className="text-gray-800 bg-white border border-gray-300 rounded px-3 py-2 mr-2"
                suppressHydrationWarning
              />
            </label>
            <label>
              年齡：
              <input
                type="number"
                name="age"
                defaultValue={user.age}
                placeholder="輸入年齡"
                className="text-gray-800 bg-white border border-gray-300 rounded px-3 py-2 mr-2"
                suppressHydrationWarning
              />
            </label>
            <label>
              Email：
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                placeholder="輸入 Email"
                className="text-gray-800 bg-white border border-gray-300 rounded px-3 py-2 mr-2"
                suppressHydrationWarning
              />
            </label>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          >
            更新 User
          </button>
        </form>

        {/* TODO: 顯示當前 user 的資訊 */}
      </div>

      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-5 mb-8">
        <h3 className="mb-4 text-gray-700">練習區 2: Todo List</h3>
        <div className="mb-4">
          {/* TODO: 實作新增 todo 的輸入框和按鈕 */}
          <form onSubmit={handleAddTodo}>
            <input
              type="text"
              name="todo"
              placeholder="輸入 todo"
              className="text-gray-800 bg-white border border-gray-300 rounded px-3 py-2 mr-2"
              suppressHydrationWarning
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
            >
              新增 Todo
            </button>
          </form>
        </div>
        {/* TODO: 顯示 todos 列表，包含切換完成狀態和刪除功能 */}
      </div>

      <div className="bg-gray-800 text-gray-300 p-5 rounded-lg overflow-x-auto">
        <h3 className="text-blue-400 mb-4">📚 參考程式碼</h3>
        <pre className="m-0 font-mono text-sm leading-relaxed">{`// 更新物件
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
    </div>
  );
}

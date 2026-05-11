"use client";

import { useState } from "react";
import TodoList from "./_components/TodoList";

// const initialTodos = [
//   {
//     id: 1,
//     title: "할 일 1",
//     completed: false,
//   },
//   {
//     id: 2,
//     title: "할 일 2",
//     completed: true,
//   },
//   {
//     id: 3,
//     title: "할 일 3",
//     completed: false,
//   },
// ];

export default function Home() {
  const [todos, setTodos] = useState(initialTodos);

  const loadTodos = async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message || "할 일 목록을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">로딩중...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">투두리스트</h1>
      <div className="max-w-md mx-auto mt-8">
        {/* <TodoForm loadTodos={loadTodos} /> */}
        <h2 className="text-2xl font-bold mb-4">할 일 목록</h2>
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

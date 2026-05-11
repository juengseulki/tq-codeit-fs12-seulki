"use client";

import { useQuery } from "@tanstack/react-query";
import TodoList from "./_components/TodoList";
import { fetchTodos } from "@/api/todos";

export default function Home() {
  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">로딩중...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">투두리스트</h1>

      <div className="max-w-md mx-auto mt-8">
        {/* <TodoForm /> */}

        <h2 className="text-2xl font-bold mb-4">할 일 목록</h2>

        <TodoList todos={todos} />
      </div>
    </div>
  );
}

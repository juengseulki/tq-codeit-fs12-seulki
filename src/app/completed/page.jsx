"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/api/todos";
import TodoItem from "@/app/_components/TodoItem";

export default function CompletedPage() {
  const {
    data: completedTodos = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    select: (todos) => todos.filter((todo) => todo.completed),
  });

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">로딩 중...</div>
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
      <h1 className="text-3xl font-bold text-center mb-8">완료 목록</h1>

      <div className="max-w-md mx-auto mt-8 border">
        {completedTodos.length === 0 ? (
          <div className="p-4 text-center">완료된 할 일이 없습니다.</div>
        ) : (
          completedTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  );
}

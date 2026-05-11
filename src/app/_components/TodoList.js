"use client";

import { useQuery } from "@tanstack/react-query";
import TodoItem from "@/app/_components/TodoItem";
import { fetchTodos } from "@/api/todos";

export default function TodoList() {
  const {
    data: todos = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
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
    <div className="border">
      {todos.length === 0 ? (
        <div className="p-4 text-center">할 일이 없습니다.</div>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
}

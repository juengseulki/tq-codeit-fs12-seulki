"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TodoItem from "@/app/_components/TodoItem";
import { fetchTodos, toggleTodoLike } from "@/api/todos";

export default function TodoList() {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const {
    data: todosData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["todos", currentPage],
    queryFn: () => fetchTodos({ page: currentPage }),
  });

  const todos = todosData?.todos || [];
  const totalPages = todosData?.totalPages || 1;

  const toggleLikeMutation = useMutation({
    mutationFn: toggleTodoLike,

    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos", currentPage] });

      const previousTodosData = queryClient.getQueryData([
        "todos",
        currentPage,
      ]);

      queryClient.setQueryData(["todos", currentPage], (old) => {
        if (!old) return old;

        return {
          ...old,
          todos: old.todos.map((todo) =>
            todo.id === newTodo.id ? { ...todo, liked: !todo.liked } : todo,
          ),
        };
      });

      return { previousTodosData };
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData(
        ["todos", currentPage],
        context.previousTodosData,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos", currentPage],
      });
    },
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
    <>
      <div className="border">
        {todos.length === 0 ? (
          <div className="p-4 text-center">할 일이 없습니다.</div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleLike={() => toggleLikeMutation.mutate(todo)}
            />
          ))
        )}
      </div>

      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          이전
        </button>

        <span>
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </>
  );
}

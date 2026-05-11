"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TodoItem from "@/app/_components/TodoItem";
import { fetchTodos, toggleTodoLike } from "@/api/todos";

export default function TodoList() {
  const queryClient = useQueryClient();

  const {
    data: todos = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const toggleLikeMutation = useMutation({
    mutationFn: toggleTodoLike,

    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old = []) =>
        old.map((todo) =>
          todo.id === newTodo.id ? { ...todo, liked: !todo.liked } : todo,
        ),
      );

      return { previousTodos };
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
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
  );
}

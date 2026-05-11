"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "@/api/todos";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const { mutate: mutateAddTodo, isPending: isAdding } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });

      setTitle("");
    },
    onError: () => {
      alert("할 일을 추가하는데 실패했습니다.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    mutateAddTodo(title);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="flex-grow p-2 border"
        />

        <button
          type="submit"
          disabled={isAdding}
          className="px-4 py-2 bg-blue-500 text-white disabled:opacity-50"
        >
          {isAdding ? "추가중..." : "추가"}
        </button>
      </div>
    </form>
  );
}

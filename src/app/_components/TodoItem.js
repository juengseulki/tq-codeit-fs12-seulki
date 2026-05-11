"use client";

import { useRouter } from "next/navigation";

export default function TodoItem({ todo, onToggleLike }) {
  const router = useRouter();

  const handleViewDetail = () => {
    router.push(`/${todo.id}`);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <button onClick={onToggleLike} className="text-2xl cursor-pointer">
          {todo.liked ? "❤️" : "🤍"}
        </button>

        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.title}
        </span>
      </div>

      <button
        onClick={handleViewDetail}
        className="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer"
      >
        상세보기
      </button>
    </div>
  );
}

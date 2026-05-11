"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/api/todos";

export default function EnabledTestPage() {
  const [isEnabled, setIsEnabled] = useState(false);

  const {
    data: todos = [],
    isPending,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["todos", "enabled-test"],
    queryFn: fetchTodos,
    enabled: isEnabled,
  });

  const handleToggleEnabled = () => {
    setIsEnabled((prev) => !prev);
  };

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-8">Enabled Test</h1>

      <button
        type="button"
        onClick={handleToggleEnabled}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isEnabled ? "비활성화" : "활성화"}
      </button>

      <div className="mb-4">
        현재 상태: {isEnabled ? "활성화됨" : "비활성화됨"}
      </div>

      {isPending && isEnabled && <div>로딩 중...</div>}

      {isFetching && <div>데이터 요청 중...</div>}

      {error && <div className="text-red-500">{error.message}</div>}

      {isEnabled && (
        <div className="mt-6">
          {todos.length === 0 ? (
            <div>할 일이 없습니다.</div>
          ) : (
            todos.map((todo) => <div key={todo.id}>{todo.title}</div>)
          )}
        </div>
      )}
    </div>
  );
}

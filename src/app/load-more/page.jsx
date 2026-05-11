"use client";

import TodoItem from "@/app/_components/TodoItem";
import TodoForm from "@/app/_components/TodoForm";
import { useInfiniteTodos } from "@/hooks/useInfiniteTodos";

export default function LoadMorePage() {
  const {
    data: allTodos = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteTodos();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">더보기</h1>

      <div className="max-w-md mx-auto mt-8">
        <TodoForm />

        <h2 className="text-2xl font-bold mb-4">할 일 목록</h2>

        {status === "pending" && (
          <div className="text-center p-4">로딩 중...</div>
        )}

        {status === "error" && (
          <div className="text-center p-4 text-red-500">
            에러 발생: {error.message}
          </div>
        )}

        <div className="border">
          {allTodos.length === 0 ? (
            <div className="p-4 text-center">할 일이 없습니다.</div>
          ) : (
            allTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          )}
        </div>

        {hasNextPage && (
          <div className="text-center mt-4">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isFetchingNextPage ? "로딩 중..." : "더 보기"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

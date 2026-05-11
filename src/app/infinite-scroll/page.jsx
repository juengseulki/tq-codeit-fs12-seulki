"use client";

import { fetchInfiniteTodos } from "@/api/todos";
import { useInfiniteQuery } from "@tanstack/react-query";
import TodoItem from "@/app/_components/TodoItem";
import TodoForm from "@/app/_components/TodoForm";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function InfiniteScrollPage() {
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["todos", "infinite-scroll"],
    queryFn: fetchInfiniteTodos,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  // 모든 페이지의 todos를 하나의 배열로 flat하게 만듦
  const allTodos = data
    ? data.pages.reduce((acc, page) => [...acc, ...page.todos], [])
    : [];

  // inView 상태가 변경될 때마다 실행
  useEffect(() => {
    // inView 이면서 다음페이지가 있으면서, 다음페이지를 fetching 하는 중이 아닐 때
    // 위 3가지 조건을 모두 만족할 때 다음 페이지 불러오기
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">무한 스크롤</h1>
      <div className="max-w-md mx-auto mt-8">
        <TodoForm />
        <h2 className="text-2xl font-bold mb-4">할 일 목록</h2>

        {status === "pending" && !isFetchingNextPage && (
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

          {/* react-intersection-observer를 위한 관찰 대상 */}
          {hasNextPage && (
            <div ref={loadMoreRef} className="p-4 text-center">
              {isFetchingNextPage ? "로딩 중..." : "스크롤하여 더 불러오기"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

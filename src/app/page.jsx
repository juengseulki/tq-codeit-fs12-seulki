"use client";

import TodoForm from "./_components/TodoForm";
import TodoList from "./_components/TodoList";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">투두리스트</h1>

      <div className="max-w-md mx-auto mt-8">
        <TodoForm />

        <h2 className="text-2xl font-bold mb-4">할 일 목록</h2>
        <TodoList />
      </div>
    </div>
  );
}

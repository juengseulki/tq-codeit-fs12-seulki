"use client";

export default function Error({ error, reset }) {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold mb-4 text-red-500">
        상세페이지 에러 발생
      </h2>

      <p className="mb-4">{error.message}</p>

      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        다시 시도
      </button>
    </div>
  );
}

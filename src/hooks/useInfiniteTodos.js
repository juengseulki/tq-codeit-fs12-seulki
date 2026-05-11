import { fetchInfiniteTodos } from "@/api/todos";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useInfiniteTodos() {
  return useInfiniteQuery({
    queryKey: ["todos", "infinite"],
    queryFn: fetchInfiniteTodos,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    select: (data) => data.pages.flatMap((page) => page.todos),
  });
}

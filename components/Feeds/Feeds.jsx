"use client";

import FeedCard from "../FeedCard/FeedCard";
import SkeletonCard from "@/components/SkeletonCard/SkeletonCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Feeds = () => {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { ref, inView } = useInView();

  const fetchPosts = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `/api/posts?page=${pageParam}&search=${search}&category=${category}`
    );
    return res.json();
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["posts", search, category],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
  });

  // Trigger fetch on scroll
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <section className="mt-8 flex flex-col items-start w-100vw large:px-8 gap-5 pb-8 dark:bg-crossBlue pt-3 small:px-2 h-auto">

      <h1 className='font-bold text-crossBlue dark:text-white large:text-25px font-heading small:text-25px after:contents-"" after:h-4px after:bg-homeGold after:absolute relative after:w-80 after:-bottom-1 after:left-1'>
        Latest News
      </h1>

      <div className="flex flex-col gap-2 large:w-50 small:w-100">
        <input
          type="text"
          placeholder="Search..."
          className="w-100 px-2 h-40px border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex large:gap-4 large:mb-4 flex-wrap small:gap-2">
          {["All", "design", "development", "marketing"].map((cat) => (
            <button
              key={cat}
              className={`large:px-2 h-40px rounded border small:px-2 ${
                cat === category ? "bg-crossBlue text-white dark:bg-gray-200 dark:text-crossBlue" : "bg-gray-200 dark:bg-transparent dark:text-white small:text-13px"
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat[0].toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-row flex-wrap large:gap-5 justify-center small:gap-3">
        {isLoading
          ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
          : data.pages.map((page) =>
              page.posts.map((post) => <FeedCard key={post._id} feed={post} />)
            )}
      </div>

      <div ref={ref} className="h-10 w-100 justify-center flex">
        {isFetchingNextPage && !isLoading && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-t-transparent border-gray-400 rounded-full animate-spin" />
            <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold italic">
              Loading content...
            </p>
          </div>
        )}
      </div>

      {isError && (
        <p className="text-red-500 text-center">Something went wrong.</p>
      )}


      {!isLoading && data?.pages?.[0]?.posts?.length === 0 &&
        <h3 className="text-black text-center w-100 -mt-15">No Result for <span className="font-bold">"{search}"</span></h3>
      }
    </section>
  );
};

export default Feeds;

"use client";

import FeedCard from "../FeedCard/FeedCard";
import SkeletonCard from "@/components/SkeletonCard/SkeletonCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import FeedFilter from "../FeedFilter/FeedFilter";



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
    <section className="flex flex-col items-start h-auto gap-5 pt-3 pb-8 mt-8 w-100vw large:px-8 dark:bg-crossBlue small:px-2">

      <h1 className='font-bold text-crossBlue dark:text-white large:text-25px font-heading small:text-25px after:contents-"" after:h-4px after:bg-homeGold after:absolute relative after:w-80 after:-bottom-1 after:left-1'>
        Latest News
      </h1>

      <FeedFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />


      <div className="flex flex-row flex-wrap justify-center large:gap-5 small:gap-3">
        {isLoading
          ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
          : data.pages.map((page) =>
              page.posts.map((post) => <FeedCard key={post._id} feed={post} />)
            )}
      </div>

      <div ref={ref} className="flex justify-center h-10 w-100">
        {isFetchingNextPage && !isLoading && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-400 rounded-full border-t-transparent animate-spin" />
            <p className="text-sm italic font-semibold text-gray-600 dark:text-gray-400">
              Loading content...
            </p>
          </div>
        )}
      </div>

      {isError && (
        <p className="text-center text-red-500">Something went wrong.</p>
      )}


      {!isLoading && data?.pages?.[0]?.posts?.length === 0 &&
        <h3 className="text-center text-black w-100 -mt-15 dark:text-white">No Result for <span className="font-bold">"{search}"</span></h3>
      }
    </section>
  );
};

export default Feeds;

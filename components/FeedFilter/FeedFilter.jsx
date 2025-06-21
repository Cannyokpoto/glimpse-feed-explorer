"use client";

const FeedFilter = ({ search, setSearch, category, setCategory }) => {
  return (
    <div className="flex flex-col gap-2 large:w-50 small:w-100">
      <input
        type="text"
        placeholder="Search..."
        className="px-2 border rounded w-100 h-40px"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-wrap large:gap-4 large:mb-4 small:gap-2">
        {["All", "design", "development", "marketing"].map((cat) => (
          <button
            key={cat}
            className={`large:px-2 h-40px rounded border small:px-2 ${
              cat === category
                ? "bg-crossBlue text-white dark:bg-gray-200 dark:text-crossBlue"
                : "bg-gray-200 dark:bg-transparent dark:text-white small:text-13px"
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat[0].toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeedFilter;

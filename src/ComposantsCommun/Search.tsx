

const Search = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-md"
        style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
      />
      <svg
        className="absolute w-6 h-6 text-gray-400 top-3 left-3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M21 21l-6.5-6.5"></path>
        <circle cx="10" cy="10" r="7"></circle>
      </svg>
    </div>
  );
};

export default Search;

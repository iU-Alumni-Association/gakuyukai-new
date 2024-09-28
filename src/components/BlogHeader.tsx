import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCategories } from "@/lib/microcms";
import type { Category } from "@/lib/types";

const BlogHeader = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      const data: Category[] = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  // Handle the search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog/search?query=${searchQuery}`);
    }
  };

  return (
    <header className="bg-Background fixed w-full z-50 shadow-md top-0">
      <div className="container mx-auto flex justify-between items-center p-3">
        {/* Logo and search form (hidden on mobile) */}
        <div className="flex items-center flex-grow">
          <Link href="/" legacyBehavior>
            <img
              src="/logo.png"
              alt="gakuyukai Logo"
              className="max-h-xs max-h-9 cursor-pointer"
            />
          </Link>
          {/* Search input form */}
          <form
            onSubmit={handleSearch}
            className="ml-4 hidden md:flex items-center"
          >
            <input
              type="text"
              placeholder="検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-Background bg-LightThema"
            />
            <button type="submit" className="p-2 bg-LightThema text-black ml-2">
              検索
            </button>
          </form>
        </div>

        {/* Navigation menu (hidden on mobile) */}
        <div className="hidden md:flex flex-grow justify-end">
          <nav className="flex flex-col items-start md:items-center">
            <ul className="flex flex-col md:flex-row md:items-center">
              {categories.map((category) => {
                const isCurrentPage =
                  router.asPath === `/blog/category/${category.id}`;
                return (
                  <li
                    key={category.id}
                    className={`md:ml-7 my-2 md:my-0 relative group p-2 ${
                      isCurrentPage ? "bg-Thema rounded-lg" : ""
                    }`}
                  >
                    <Link
                      href={`/blog/category/${category.id}`}
                      legacyBehavior
                      className="text-black cursor-pointer"
                    >
                      {category.name}
                    </Link>
                    {/* Hover underline animation */}
                    <div
                      className="absolute bottom-0 left-0 w-full h-[0.125rem] 
                    origin-left duration-300 mt-[0.25rem] 
                    bg-transparent group-hover:bg-Thema 
                    transition-all transform scale-x-0 group-hover:scale-x-100"
                    ></div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Mobile menu button */}
        <button
          className="hamburger md:hidden text-3xl text-black"
          onClick={toggleMenu}
        >
          &#9776;
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-Background backdrop-blur bg-opacity-80 z-50 flex justify-start items-start" // モーダル背景
          onClick={toggleMenu}
        >
          <div
            className="w-full h-auto p-5 pt-16 relative flex flex-col items-start bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button for mobile menu (right aligned) */}
            <button
              className="absolute top-5 right-5 text-black text-3xl"
              onClick={toggleMenu}
            >
              &times;
            </button>

            {/* Search form in mobile menu */}
            <form
              onSubmit={handleSearch}
              className="flex items-center space-x-2 w-full mt-5"
            >
              <input
                type="text"
                placeholder="検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border border-none bg-LightThema flex-grow text-gray-800"
              />
              <button type="submit" className="p-2 bg-LightThema text-black">
                検索
              </button>
            </form>

            {/* Mobile category links */}
            <ul className="flex flex-col items-start mt-8 space-y-4">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/blog/category/${category.id}`}
                    legacyBehavior
                    onClick={toggleMenu}
                  >
                    <a
                      className="text-black cursor-pointer text-xl"
                      onClick={toggleMenu}
                    >
                      {category.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default BlogHeader;

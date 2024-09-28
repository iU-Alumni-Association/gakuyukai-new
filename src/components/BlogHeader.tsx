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

  useEffect(() => {
    const fetchCategories = async () => {
      const data: Category[] = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog/search?query=${searchQuery}`);
    }
  };

  return (
    <header className="bg-background fixed w-full z-50 shadow-md top-0">
      <div className="container mx-auto flex justify-between items-center p-3">
        {/* Logo */}
        <Link href="/" legacyBehavior>
          <img
            src="/logo.png"
            alt="gakuyukai Logo"
            className="max-h-xs max-h-9 cursor-pointer"
          />
        </Link>

        {/* Search input form for PC */}
        <form
          onSubmit={handleSearch}
          className="ml-4 hidden md:flex items-center"
        >
          <input
            type="text"
            placeholder="検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-background bg-secondary"
          />
          <button type="submit" className="p-2 bg-secondary text-black ml-2">
            検索
          </button>
        </form>

        {/* Hamburger menu button */}
        <button className="hamburger text-3xl text-black" onClick={toggleMenu}>
          &#9776;
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-background backdrop-blur bg-opacity-80 z-50 flex justify-start items-start"
          onClick={toggleMenu}
        >
          <div
            className="w-full h-auto p-5 pt-16 relative flex flex-col items-start bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button for mobile menu */}
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
                className="p-2 border border-none bg-secondary flex-grow text-gray-800"
              />
              <button type="submit" className="p-2 bg-secondary text-black">
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

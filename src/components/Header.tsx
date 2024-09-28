import { useState, useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Header component with responsive navigation and menu toggle functionality.
 */
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  /**
   * Toggle the mobile menu visibility.
   */
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  /**
   * Handle window resize to close the menu when the viewport width exceeds 768px.
   */
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setMenuOpen(false);
    }
  };

  // Set up event listener for window resize.
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /**
   * Handle navigation to a specific route. If already on the route, do nothing.
   * Otherwise, navigate to the new route and close the menu.
   *
   * @param {string} href - The target URL for navigation.
   */
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault(); // Prevent default link behavior
    if (router.asPath !== href) {
      router.push(href);
    }
    setMenuOpen(false);
  };

  return (
    <header className="bg-background fixed w-full z-50 shadow-md top-0">
      <div className="container mx-auto flex justify-between items-center p-3">
        {/* Logo Section */}
        <div className="flex items-center flex-grow">
          <a href="/">
            <img
              src="/logo.png"
              alt="gakuyukai Logo"
              className="max-h-xs max-h-9 cursor-pointer"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-grow justify-end">
          <nav className="flex flex-col md:flex-row items-center">
            <ul className="flex flex-col md:flex-row">
              {["/services", "/about", "/news", "/contact", "/blog"].map(
                (href, index) => {
                  const isCurrentPage = router.asPath === href;
                  return (
                    <li
                      key={index}
                      className="md:ml-1 my-2 md:my-0 relative group py-2"
                    >
                      <a
                        href={href}
                        className={`border-radius rounded-md cursor-pointer py-2 px-4 ${
                          isCurrentPage ? "bg-highlight" : ""
                        } transition-all duration-300`}
                        onClick={(e) => handleNavigation(e, href)}
                      >
                        {
                          [
                            "サービス",
                            "組織情報",
                            "ニュース",
                            "お問い合わせ",
                            "ブログ",
                          ][index]
                        }
                      </a>
                      <div
                        className={`absolute bottom-0 left-0 w-full h-[0.125rem] origin-left duration-300 mt-[0.25rem] ${
                          isCurrentPage
                            ? "bg-highlight"
                            : "bg-transparent group-hover:bg-highlight"
                        } transition-all transform scale-x-0 group-hover:scale-x-100`}
                      ></div>
                    </li>
                  );
                }
              )}
            </ul>
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="hamburger md:hidden text-3xl text-black"
          onClick={toggleMenu}
        >
          &#9776;
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className={`fixed inset-0 bg-background bg-opacity-75 backdrop-blur-sm flex justify-start items-start z-50 transition-opacity duration-300 ${
            menuOpen
              ? "opacity-100 animate-fadeIn"
              : "opacity-0 pointer-events-none animate-fadeOut"
          }`}
          onClick={toggleMenu}
        >
          <nav
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

            {/* Mobile category links */}
            <ul className="flex flex-col items-start mt-8 space-y-4">
              {["/services", "/about", "/news", "/contact", "/blog"].map(
                (href, index) => {
                  const isCurrentPage = router.asPath === href;
                  return (
                    <li key={index}>
                      <a
                        href={href}
                        className={`border-radius rounded-md cursor-pointer text-xl py-2 px-4 ${
                          isCurrentPage ? "bg-highlight" : ""
                        } transition-all duration-300`}
                        onClick={(e) => handleNavigation(e, href)}
                      >
                        {
                          [
                            "サービス",
                            "組織情報",
                            "ニュース",
                            "お問い合わせ",
                            "ブログ",
                          ][index]
                        }
                      </a>
                    </li>
                  );
                }
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

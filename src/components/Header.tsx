import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Header component with responsive navigation and
 * menu toggle functionality.
 */
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  /** Toggle the mobile menu visibility. */
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  /**
   * Handle window resize to close the menu when
   * the viewport width exceeds 768px.
   */
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setMenuOpen(false);
    }
  };

  // Set up event listener for window resize.
  useEffect(() => {
    window.addEventListener(
      'resize',
      handleResize,
    );
    return () => {
      window.removeEventListener(
        'resize',
        handleResize,
      );
    };
  }, []);

  /**
   * Handle navigation to a specific route. If
   * already on the route, do nothing. Otherwise,
   * navigate to the new route and close the
   * menu.
   *
   * @param {string} href - The target URL for
   *   navigation.
   */
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault(); // Prevent default link behavior
    if (router.asPath !== href) {
      router.push(href);
    }
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-background shadow-md">
      <div className="container mx-auto flex items-center justify-between p-3">
        {/* Logo Section */}
        <div className="flex flex-grow items-center">
          <a href="/">
            <img
              src="/logo.png"
              alt="gakuyukai Logo"
              className="max-h-xs max-h-9 cursor-pointer"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden flex-grow justify-end md:flex">
          <nav className="flex flex-col items-center md:flex-row">
            <ul className="flex flex-col md:flex-row">
              {[
                '/services',
                '/about',
                '/news',
                '/contact',
                '/blog',
              ].map((href, index) => {
                const isCurrentPage =
                  router.asPath === href;
                return (
                  <li
                    key={index}
                    className="group relative my-2 py-2 md:my-0 md:ml-1"
                  >
                    <a
                      href={href}
                      className={`border-radius cursor-pointer rounded-md px-4 py-2 ${
                        isCurrentPage ?
                          'bg-highlight'
                        : ''
                      } transition-all duration-300`}
                      onClick={(e) =>
                        handleNavigation(e, href)
                      }
                    >
                      {
                        [
                          'サービス',
                          '組織情報',
                          'ニュース',
                          'お問い合わせ',
                          'ブログ',
                        ][index]
                      }
                    </a>
                    <div
                      className={`absolute bottom-0 left-0 mt-[0.25rem] h-[0.125rem] w-full origin-left duration-300 ${
                        isCurrentPage ?
                          'bg-highlight'
                        : 'bg-transparent group-hover:bg-highlight'
                      } scale-x-0 transform transition-all group-hover:scale-x-100`}
                    ></div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="hamburger text-3xl text-black md:hidden"
          onClick={toggleMenu}
        >
          &#9776;
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-start justify-start bg-background bg-opacity-75 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ?
              'animate-fadeIn opacity-100'
            : 'pointer-events-none animate-fadeOut opacity-0'
          }`}
          onClick={toggleMenu}
        >
          <nav
            className="relative flex h-auto w-full flex-col items-start bg-transparent p-5 pt-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button for mobile menu (right aligned) */}
            <button
              className="absolute right-5 top-5 text-3xl text-black"
              onClick={toggleMenu}
            >
              &times;
            </button>

            {/* Mobile category links */}
            <ul className="mt-8 flex flex-col items-start space-y-4">
              {[
                '/services',
                '/about',
                '/news',
                '/contact',
                '/blog',
              ].map((href, index) => {
                const isCurrentPage =
                  router.asPath === href;
                return (
                  <li key={index}>
                    <a
                      href={href}
                      className={`border-radius cursor-pointer rounded-md px-4 py-2 text-xl ${
                        isCurrentPage ?
                          'bg-highlight'
                        : ''
                      } transition-all duration-300`}
                      onClick={(e) =>
                        handleNavigation(e, href)
                      }
                    >
                      {
                        [
                          'サービス',
                          '組織情報',
                          'ニュース',
                          'お問い合わせ',
                          'ブログ',
                        ][index]
                      }
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

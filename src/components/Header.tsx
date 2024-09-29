import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * レスポンシブなヘッダーコンポーネント.
 *
 * このコンポーネントは、ナビゲーション機能やメニューのトグル機能を提供します。ビューポートのサイズ変更に応じて、モバイルメニューが自動的に閉じられます。
 *
 * @remarks
 *   このコンポーネントでは、以下の状態と関数が含まれています:
 *
 *   - `menuOpen`: モバイルメニューの開閉状態を保持する状態。
 *   - `toggleMenu`: メニューの開閉を切り替える関数。
 *   - `handleResize`: ウィンドウサイズ変更時にメニューを自動的に閉じる関数。
 *   - `handleNavigation`: ページ遷移とメニューの自動閉鎖を行う関数。
 *
 * @example
 *   ```tsx
 *   <Header />
 *   ```;
 *
 * @returns {JSX.Element} ヘッダーコンポーネントのJSX要素.
 * @source
 */
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  /** モバイルメニューの表示/非表示を切り替える関数. */
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  /**
   * ウィンドウサイズ変更時に、ビューポート幅が768pxを超えたら
   * メニューを自動的に閉じるハンドラ関数.
   */
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setMenuOpen(false);
    }
  };

  /** ウィンドウリサイズイベントにリスナーを設定し、クリーンアップ時にリスナーを解除します。 */
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
   * ナビゲーション処理.
   *
   * 指定されたURLに遷移し、現在のページと異なる場合はルートを変更し、メニューを閉じます。
   *
   * @param {React.MouseEvent<HTMLAnchorElement>} e
   *   - クリックイベント.
   *
   * @param {string} href - ナビゲーション先のURL.
   */
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault(); // デフォルトのリンク動作を無効化
    if (router.asPath !== href) {
      router.push(href);
    }
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-background shadow-md">
      <div className="container mx-auto flex items-center justify-between p-3">
        {/* ロゴセクション */}
        <div className="flex flex-grow items-center">
          <a href="/">
            <img
              src="/logo.png"
              alt="gakuyukai ロゴ"
              className="max-h-xs max-h-9 cursor-pointer"
            />
          </a>
        </div>

        {/* デスクトップナビゲーション */}
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

        {/* モバイルメニューボタン */}
        <button
          className="hamburger text-3xl text-black md:hidden"
          onClick={toggleMenu}
        >
          &#9776;
        </button>
      </div>

      {/* モバイルメニューオーバーレイ */}
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
            {/* モバイルメニューの閉じるボタン */}
            <button
              className="absolute right-5 top-5 text-3xl text-black"
              onClick={toggleMenu}
            >
              &times;
            </button>

            {/* モバイルカテゴリーリンク */}
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

/**
 * @file
 * このファイルは、ブログヘッダーコンポーネントの実装を提供します。
 * 主に、ナビゲーションメニューや検索機能を含むユーザーインターフェースを構成します。
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getCategories } from '@/lib/microcms';
import type { Category } from '@/lib/types';

/**
 * ブログヘッダーコンポーネント
 * @description
 * カテゴリー表示、検索機能、モバイルメニューのトグルなどを提供するブログのヘッダー部分を担当します。
 */
const BlogHeader = () => {
  /**
   * @description
   * ブログカテゴリーのデータを保持する状態管理フック
   * @type {Category[]}
   */
  const [categories, setCategories] = useState<
    Category[]
  >([]);

  /**
   * @description
   * モバイルメニューの開閉状態を管理する状態フック
   * @type {boolean}
   */
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * @description
   * 検索クエリを保持する状態フック
   * @type {string}
   */
  const [searchQuery, setSearchQuery] =
    useState('');

  const router = useRouter();

  /**
   * @description
   * カテゴリー情報を取得して状態を更新する非同期関数
   * @returns {Promise<void>}
   */
  useEffect(() => {
    const fetchCategories = async () => {
      const data: Category[] =
        await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  /**
   * @description
   * モバイルメニューの表示状態をトグルする関数
   */
  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  /**
   * @description
   * 検索フォームの送信処理を行う関数
   * @param {React.FormEvent} e - フォーム送信イベント
   * @returns {void}
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/blog/search?query=${searchQuery}`,
      );
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-background shadow-md">
      <div className="container mx-auto flex items-center justify-between p-3">
        {/* ロゴ */}
        <Link href="/" legacyBehavior>
          <img
            src="/logo.png"
            alt="gakuyukai Logo"
            className="max-h-xs max-h-9 cursor-pointer"
          />
        </Link>

        {/* PC用検索フォーム */}
        <form
          onSubmit={handleSearch}
          className="ml-4 hidden items-center md:flex"
        >
          <input
            type="text"
            placeholder="検索..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="border border-background bg-secondary p-2"
          />
          <button
            type="submit"
            className="ml-2 bg-secondary p-2 text-black"
          >
            検索
          </button>
        </form>

        {/* ハンバーガーメニュー */}
        <button
          className="hamburger text-3xl text-black"
          onClick={toggleMenu}
        >
          &#9776;
        </button>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-start bg-background bg-opacity-80 backdrop-blur"
          onClick={toggleMenu}
        >
          <div
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

            {/* モバイルメニュー内検索フォーム */}
            <form
              onSubmit={handleSearch}
              className="mt-5 flex w-full items-center space-x-2"
            >
              <input
                type="text"
                placeholder="検索..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                className="flex-grow border border-none bg-secondary p-2 text-gray-800"
              />
              <button
                type="submit"
                className="bg-secondary p-2 text-black"
              >
                検索
              </button>
            </form>

            {/* モバイルメニュー内のカテゴリーリンク */}
            <ul className="mt-8 flex flex-col items-start space-y-4">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/blog/category/${category.id}`}
                    legacyBehavior
                    onClick={toggleMenu}
                  >
                    <a
                      className="cursor-pointer text-xl text-black"
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

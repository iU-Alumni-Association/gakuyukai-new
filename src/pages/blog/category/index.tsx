/**
 * @file
 * このファイルは、MicroCMS APIから取得したブログカテゴリー一覧を表示するコンポーネントの実装を提供します。
 * 主に、カテゴリーを取得し、一覧表示、ローディング、エラーハンドリングを行います。
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '@/lib/microcms';
import BlogHeader from '@/components/BlogHeader';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import LoadingBar from '@/components/LoadingBar';
import type { Category } from '@/lib/types';

/**
 * @description
 * CategoriesIndexコンポーネントは、MicroCMS APIから取得した
 * ブログカテゴリーを一覧表示するコンポーネントです。
 * データ取得中はローディングバーを表示し、エラーやデータがない場合の
 * 処理も行います。
 */
const CategoriesIndex = () => {
  const [categories, setCategories] = useState<
    Category[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * @description
     * カテゴリーをMicroCMS APIから非同期に取得し、ステートを更新します。
     * ローディング状態とエラーハンドリングも行います。
     *
     * @returns {Promise<void>} 非同期処理なのでPromiseを返しますが、返り値は使用しません。
     */
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(
          'カテゴリー取得時にエラーが発生しました:',
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {/* @description カテゴリーを取得中はローディングバーを表示します */}
      <LoadingBar loading={loading} />

      {/* @description ブログのメタデータとヘッダーを表示します */}
      <Meta
        title="i-u.io | ブログカテゴリー一覧"
        description="i-u.ioのブログカテゴリー一覧ページです。"
        url="https://i-u.io/blog/category"
      />
      <BlogHeader />
      <Breadcrumbs />

      {/* @description カテゴリー一覧のメインコンテナ */}
      <div className="container mx-auto min-h-svh pb-12">
        <h1 className="mb-8 px-4 text-h1 font-bold text-gray-800 sm:text-h1Sm">
          カテゴリー一覧
        </h1>

        {/* @description ローディング中、空の状態、カテゴリー表示を切り替えます */}
        {loading ?
          <div className="flex min-h-[50vh] items-center justify-center">
            <p className="text-center text-p text-gray-600 sm:text-pSm">
              読み込み中...
            </p>
          </div>
        : categories.length === 0 ?
          <p className="text-center text-p sm:text-pSm">
            カテゴリーが見つかりません
          </p>
        : <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {categories.map((category) => (
              <li
                key={category.id}
                className="px-4 transition hover:bg-secondary"
              >
                <Link
                  href={`/blog/category/${category.id}`}
                  passHref
                  legacyBehavior
                >
                  <span
                    role="button"
                    className="block cursor-pointer text-h3 font-semibold text-highlight hover:underline sm:text-h3Sm"
                  >
                    {category.name}
                  </span>
                </Link>
                {/* @description カテゴリーに説明がある場合、表示します */}
                {category.explanation && (
                  <p className="mt-2 text-p text-paragraph sm:text-pSm">
                    {category.explanation}
                  </p>
                )}
              </li>
            ))}
          </ul>
        }
      </div>

      {/* @description フッターを表示します */}
      <Footer />
    </>
  );
};

export default CategoriesIndex;

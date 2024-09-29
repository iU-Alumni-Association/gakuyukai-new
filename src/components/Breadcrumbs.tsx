/**
 * @file
 * このファイルは、現在のページのパスを表示するパンくずリストコンポーネントを提供します。
 * ページヘッダーの下に表示され、背景色はグレーに設定されています。
 */

import { useRouter } from 'next/router';
import Link from 'next/link';

/**
 * パンくずリストを表示するコンポーネント
 * @description
 * 現在のURLパスを分割してパンくずリストを生成します。
 * 各パスセグメントをリンクとして表示し、最後のセグメントはアクティブなページとして表示します。
 * @returns {JSX.Element} パンくずリストを表すJSX要素
 */
const Breadcrumbs = (): JSX.Element => {
  const router = useRouter();

  // 現在のパスを分割し、パンくずリスト用のセグメントを生成する
  const pathSegments = router.asPath
    .split('/')
    .filter((segment) => segment);

  return (
    <div className="border-radius mx-10 mt-24 rounded-full bg-gray-200 py-2 sm:mx-4">
      <div className="container mx-auto px-4">
        <nav aria-label="breadcrumb">
          <ol className="flex flex-wrap space-x-2 text-sm text-gray-600">
            <li>
              <Link
                href="/"
                className="hover:underline"
              >
                home
              </Link>
            </li>
            {pathSegments.map(
              (segment, index) => {
                const href =
                  '/' +
                  pathSegments
                    .slice(0, index + 1)
                    .join('/');
                const isLast =
                  index ===
                  pathSegments.length - 1;

                return (
                  <li
                    key={href}
                    className="flex items-center"
                  >
                    <span className="mx-2">
                      {' '}
                      &gt;{' '}
                    </span>
                    {isLast ?
                      <span>{segment}</span>
                    : <Link
                        href={href}
                        className="hover:underline"
                      >
                        {segment}
                      </Link>
                    }
                  </li>
                );
              },
            )}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;

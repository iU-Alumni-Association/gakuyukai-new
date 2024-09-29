import Link from 'next/link';
import React from 'react';

/**
 * フッターコンポーネント.
 *
 * このコンポーネントは、ナビゲーションリンクと連絡先情報を含むフッター部分を表示します。
 * Tailwind CSSを使用して、スタイルが適用されています。
 *
 * @remarks
 *   - ナビゲーションリンクはリスト形式で表示され、ホバー時に拡大するアニメーション効果が追加されています。
 *   - フッターの背景は、上から下にかけて`highlight`色から透明になるグラデーションです。
 *   - フッター下部には、著作権情報と連絡先のメールアドレスが含まれています。
 *
 * @example
 *   ```tsx
 *   <Footer />
 *   ```;
 *
 * @returns {JSX.Element} フッター部分のReactコンポーネント.
 * @source
 */
const Footer: React.FC = (): JSX.Element => {
  // ナビゲーションリンクの配列
  const navigationLinks = [
    { href: '/', label: 'ホーム' },
    { href: '/services', label: 'サービス' },
    { href: '/about', label: '組織情報' },
    { href: '/news', label: 'ニュース' },
    { href: '/contact', label: 'お問い合わせ' },
    { href: '/blog', label: 'ブログ' },
  ];

  return (
    <footer className="bg-gradient-to-t from-highlight to-transparent py-10 text-headline shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-5">
            {/* ナビゲーションリンクのリスト */}
            <ul className="flex flex-wrap justify-center gap-4">
              {navigationLinks.map(
                (
                  link, // リンクごとにリストアイテムを作成
                  index,
                ) => (
                  <li
                    key={index}
                    className="transform transition-transform hover:scale-105"
                  >
                    {/* リンク先と表示ラベル */}
                    <Link
                      href={link.href}
                      passHref
                    >
                      <span className="cursor-pointer text-lg font-medium hover:text-yellow-700">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
          {/* フッター下部の著作権情報とメールアドレス */}
          <div className="w-full border-t border-headline pt-4 text-center">
            <p>
              © 2023-2024 iU 学友会. All rights
              reserved.
            </p>
            <p className="mt-1">
              メール: gakuyukai_jichi@i-u.ac.jp
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  const navigationLinks = [
    { href: '/', label: 'ホーム' },
    { href: '/services', label: 'サービス' },
    { href: '/about', label: '組織情報' },
    { href: '/news', label: 'ニュース' },
    {
      href: '/contact',
      label: 'お問い合わせ',
    },
    { href: '/blog', label: 'ブログ' },
  ];

  return (
    <footer className="bg-gradient-to-t from-highlight to-transparent py-10 text-headline shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-5">
            <ul className="flex flex-wrap justify-center gap-4">
              {navigationLinks.map(
                (link, index) => (
                  <li
                    key={index}
                    className="transform transition-transform hover:scale-105"
                  >
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
          <div className="w-full border-t border-headline pt-4 text-center">
            <p>
              © 2023-2024 iU gakuyukai. All
              rights reserved.
            </p>
            <p className="mt-1">
              Email: gakuyukai_jichi@i-u.ac.jp
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

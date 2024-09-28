import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  const navigationLinks = [
    { href: '/', label: 'ホーム' },
    { href: '/services', label: 'サービス' },
    { href: '/about', label: '会社情報' },
    { href: '/news', label: 'ニュース' },
    { href: '/contact', label: 'お問い合わせ' },
    { href: '/blog', label: 'ブログ' },
  ];

  return (
    <footer className="bg-gray-800 text-white py-5">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <div className="mb-3">
            <ul className="flex flex-wrap justify-center">
              {navigationLinks.map((link, index) => (
                <li key={index} className="mx-3 my-1">
                  <Link href={link.href} passHref className="cursor-pointer">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-gray-600 pt-2 text-center w-full">
            <p>© 2023-2024 Kalytero LLC. All rights reserved.</p>
            <p>Email: contact@kalytero.ne.jp</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

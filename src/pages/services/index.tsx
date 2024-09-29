/**
 * @file
 * このファイルは、iU 学友会のサービスページの実装を提供します。
 * ページには、倉庫貸出サービス、その他の申請サービス、よくある質問（FAQ）セクションが含まれています。
 */

import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import Link from 'next/link';

/**
 * サービスページのコンポーネント
 * @returns {JSX.Element} サービスページのJSX要素を返します
 */
const ServicePage = (): JSX.Element => {
  return (
    <>
      {/* ページのメタ情報を設定 */}
      <Meta title="iU 学友会 | サービス" />
      {/* ヘッダーを表示 */}
      <Header />
      {/* パンくずリストを表示 */}
      <Breadcrumbs />
      {/* メインコンテンツ */}
      <main className="bg-background py-16">
        <div className="container mx-auto px-4">
          {/* ページタイトル */}
          <h1 className="mb-12 text-center text-h2 font-bold sm:text-h1Sm">
            申請関係
          </h1>

          {/* 倉庫貸出サービスセクション */}
          <section className="mb-12">
            <h2 className="mb-6 text-h2 font-semibold sm:text-h2Sm">
              倉庫貸出サービス
            </h2>
            <p className="mb-4 text-p leading-relaxed text-gray-700 sm:text-pSm">
              学友会の倉庫を利用したい方は、以下のリンクから申請フォームにアクセスできます。
              倉庫の利用には事前の申し込みが必要ですので、詳細をご確認の上、申請をお願いします。
            </p>
            {/* 外部リンク：倉庫貸出申請フォーム */}
            <Link href="https://rental.i-u.io/">
              <span className="text-blue-500 hover:underline">
                倉庫貸出申請フォームへ
              </span>
            </Link>
          </section>

          {/* その他の申請サービスセクション */}
          <section className="mb-12">
            <h2 className="mb-6 text-h2 font-semibold sm:text-h2Sm">
              その他の申請・サービス
            </h2>
            <ul className="list-disc pl-5 text-lg text-gray-700">
              <li className="mb-2">
                {/* リンク：イベント開催申請 */}
                <Link
                  href="/services"
                  className="text-blue-500 hover:underline"
                >
                  イベント開催申請
                </Link>
              </li>
              <li className="mb-2">
                {/* リンク：予算申請 */}
                <Link
                  href="/services"
                  className="text-blue-500 hover:underline"
                >
                  予算申請
                </Link>
              </li>
              <li className="mb-2">
                {/* リンク：学生支援サービス */}
                <Link
                  href="/services"
                  className="text-blue-500 hover:underline"
                >
                  学生支援サービス
                </Link>
              </li>
            </ul>
          </section>

          {/* FAQセクション */}
          <section>
            <h2 className="mb-6 text-h2 font-semibold sm:text-h2Sm">
              よくある質問（FAQ）
            </h2>
            <p className="text-p leading-relaxed text-gray-700 sm:text-pSm">
              サービスに関してご不明点がある場合は、FAQをご確認ください。
              それでも解決しない場合は、
              <Link href="/contact">
                <span className="text-blue-500 hover:underline">
                  お問い合わせページ
                </span>
              </Link>
              からご連絡ください。
            </p>
          </section>
        </div>
      </main>
      {/* フッターを表示 */}
      <Footer />
    </>
  );
};

export default ServicePage;

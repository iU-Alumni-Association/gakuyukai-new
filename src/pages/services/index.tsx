import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import Link from 'next/link';

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
          {/* 稟議書提出セクション */}
          <section className="mb-12">
            <h2 className="mb-6 text-h2 font-semibold sm:text-h2Sm">
              稟議書の提出
            </h2>
            {/* 稟議書の提出についての説明 */}
            <p className="mb-4 text-p leading-relaxed text-gray-700 sm:text-pSm">
              学友会の活動に関する経費を支出する際には、企画書を提出する必要があります。
              <br />
              もし企画書を作る必要がないような場合や企画書が難しい場合は、稟議書を提出することで経費を支出することができます。
              <br />
              また企画については会計報告を行っていください。下記のテンプレートを参考にしても可能です。
            </p>
            <ul className="list-disc pl-5 text-lg text-gray-700">
              <li className="mb-2">
                {/* リンク：会計報告 */}
                <Link
                  href="https://docs.google.com/spreadsheets/d/1x4Fn1Df85Lc7d06ajZAT8pFH75185if5o8tOnn8L8d8/edit?usp=sharing"
                  className="text-blue-500 hover:underline"
                >
                  会計報告のテンプレート
                </Link>
              </li>
              <li className="mb-2">
                {/* リンク：稟議書 */}
                <Link
                  href="https://docs.google.com/document/d/10ySEfpbsVUqxzvTOzvlUcFHDR-HfC95VK7NmNeSDFcE/edit?usp=sharing"
                  className="text-blue-500 hover:underline"
                >
                  稟議書の書き方
                </Link>
              </li>
            </ul>
          </section>

          {/* その他の申請サービスセクション */}
          <section className="mb-12">
            <h2 className="mb-6 text-h2 font-semibold sm:text-h2Sm">
              その他の申請・サービス 準備中
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

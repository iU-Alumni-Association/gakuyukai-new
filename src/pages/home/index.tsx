import { useState, useEffect } from 'react';
import { getNews } from '@/lib/microcms';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingBar from '@/components/LoadingBar';
import Meta from '@/components/Meta';
import Button from '@/components/Button';
import CardBorder from '@/components/CardBorder';
import type { Blog } from '@/lib/types';
import Link from 'next/link';

const HomePage = (): JSX.Element => {
  /**
   * 最新ニュースを保持する状態.
   *
   * @type {Blog[]}
   */
  const [latestNews, setLatestNews] = useState<
    Blog[]
  >([]);

  /**
   * 読み込み状態を保持する状態.
   *
   * @type {boolean}
   */
  const [loading, setLoading] = useState(false);

  /**
   * エラーメッセージを保持する状態.
   *
   * @type {string}
   */
  const [errorMessage, setErrorMessage] =
    useState('');

  /**
   * 最新ニュースを取得するための非同期関数.
   *
   * @remarks
   *   初回レンダリング時に実行され、最大3件のニュースを取得します。
   * @async
   * @returns {Promise<void>} ニュースを取得し、状態を更新.
   */
  useEffect(() => {
    const fetchLatestNews = async () => {
      setLoading(true);
      try {
        const { contents } = await getNews(1, 3);
        setLatestNews(contents);
      } catch (error) {
        console.error(
          'Error fetching latest news:',
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  return (
    <>
      {/* メタ情報を設定 */}
      <Meta title="iU 学友会 | ホーム" />

      {/* 読み込み中のローディングバー */}
      <LoadingBar loading={loading} />

      {/* ヘッダーコンポーネント */}
      <Header />

      {/* メインコンテンツ */}
      <main className="opacity-100 transition-opacity duration-500">
        {/* 最新ニュースセクション */}
        <section className="pb-17 bg-white pt-28">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              {/* 最新ニュースのタイトル */}
              <h2 className="text-h2 font-semibold sm:text-h2Sm">
                最新ニュース
              </h2>

              {/* ニュース一覧ページへのリンクボタン */}
              <Link href="/news">
                <Button
                  label="全部見る"
                  size="medium"
                  variant="secondary"
                />
              </Link>
            </div>

            {/* ニュースを読み込み中の表示 */}
            {loading ?
              <p className="text-center text-gray-600">
                最新ニュースを読み込み中...
              </p>
            : latestNews.length > 0 ?
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* ニュース一覧を表示 */}
                {latestNews.map((news) => (
                  <CardBorder
                    key={news.id}
                    title={news.title}
                    description={
                      news.content
                        .replace(
                          /(<([^>]+)>)/gi,
                          '',
                        )
                        .slice(0, 40) + '...'
                    }
                    date={news.date}
                    id={news.id}
                  />
                ))}
              </div>
            : <p className="text-center text-gray-600">
                最新ニュースはありません。
              </p>
            }
          </div>
        </section>

        {/* 倉庫貸出情報セクション */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-left text-h2 font-semibold sm:text-h2Sm">
              倉庫貸出について
            </h2>
            <p className="mx-auto mb-6 text-left leading-relaxed text-paragraph sm:text-pSm">
              倉庫の貸し出しをご希望の方は、下記のリンクから詳細をご確認いただけます。
            </p>
            <div className="text-left">
              <Link href="/services">
                <Button
                  label="倉庫貸出詳細"
                  size="large"
                  variant="primary"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* フッターコンポーネント */}
      <Footer />
    </>
  );
};

export default HomePage;

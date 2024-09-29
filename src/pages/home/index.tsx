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

const HomePage = () => {
  const [latestNews, setLatestNews] = useState<
    Blog[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [errorMessage, setErrorMessage] =
    useState('');

  const handleStudentIdChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setStudentId(value);
    if (!/im|IM/.test(value)) {
      setErrorMessage(
        "学籍番号は 'im' または 'IM' を含んでいる必要があります。",
      );
    } else {
      setErrorMessage('');
    }
  };

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
      <Meta title="iU 学友会 | ホーム" />
      <LoadingBar loading={loading} />
      <Header />
      <main className="opacity-100 transition-opacity duration-500">
        <section className="pb-17 bg-white pt-28">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              {/* 左側の最新ニュースタイトル */}
              <h2 className="text-h2 font-semibold sm:text-h2Sm">
                最新ニュース
              </h2>

              {/* 右側の全部見るボタン */}
              <Link href="/news">
                <Button
                  label="全部見る"
                  size="medium"
                  variant="secondary"
                />
              </Link>
            </div>

            {loading ?
              <p className="text-center text-gray-600">
                最新ニュースを読み込み中...
              </p>
            : latestNews.length > 0 ?
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                    } // コンテンツを40文字で切り取る
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

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-left text-h2 font-semibold sm:text-h2Sm">
              倉庫貸出について
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-left leading-relaxed text-paragraph sm:text-pSm">
              倉庫の貸し出しをご希望の方は、下記のリンクから詳細をご確認いただけます。
            </p>
            <div className="text-left">
              <Link href="/service">
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
      <Footer />
    </>
  );
};

export default HomePage;

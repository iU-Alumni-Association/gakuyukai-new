import { useState, useEffect } from "react";
import { getNews } from "@/lib/microcms";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import LoadingBar from "@/components/LoadingBar";
import Meta from "@/components/Meta";
import type { Blog } from "@/lib/types";

/**
 * HomePage component that renders the main content of the homepage.
 * Includes a header, hero section, about section, and latest news.
 */
const HomePage = () => {
  // State variables for fetching the latest news
  const [latestNews, setLatestNews] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch the latest news article on component mount
  useEffect(() => {
    const fetchLatestNews = async () => {
      setLoading(true);
      try {
        const { contents } = await getNews(1, 1); // Fetch only the latest news
        setLatestNews(contents[0]); // Set the first (and only) news item as latest news
      } catch (error) {
        console.error("Error fetching latest news:", error);
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
      <main className="transition-opacity duration-500 opacity-100">
        {/* Hero Section */}
        <section className="bg-blue-300 text-white pt-28 pb-20 text-center">
          <h1 className="text-h1 sm:text-h1Sm font-bold mb-4">
            iU 学友会へようこそ
          </h1>
          <p className="text-p sm:text-pSm mb-6">
            私たちは学生のために様々なサービスを提供しています。
          </p>
          <Link href="/contact">
            <span className="bg-button text-black px-6 py-3 rounded-full hover:bg-buttonHover transition">
              お問い合わせはこちら
            </span>
          </Link>
        </section>

        {/* About Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-h2 sm:text-h2Sm font-semibold text-center mb-8">
              学友会について
            </h2>
            <p className="text-center text-paragraph sm:text-pSm leading-relaxed max-w-2xl mx-auto">
              学友会は、学生のための活動を支援し、コミュニティを強化することを目指しています。
              イベントの企画、倉庫の貸し出し、その他さまざまなサービスを提供しています。
            </p>
          </div>
        </section>

        {/* Latest News Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-h2 sm:text-h2Sm font-semibold text-center mb-8">
              最新ニュース
            </h2>
            {loading ? (
              <p className="text-center text-gray-600">
                最新ニュースを読み込み中...
              </p>
            ) : latestNews ? (
              <div className="bg-secondary p-6 rounded-lg shadow-lg">
                <h3 className="text-h3 sm:text-h3Sm font-bold mb-4 text-headline">
                  {latestNews.title}
                </h3>
                <p className="text-gray-600">
                  {new Date(latestNews.date).toLocaleDateString()}
                </p>
                <p className="text-gray-800 mt-4 line-clamp-3">
                  {latestNews.content.replace(/(<([^>]+)>)/gi, "")}
                </p>
                <Link href={`/news/${latestNews.id}`}>
                  <span className="block mt-4 text-highlight hover:underline">
                    続きを読む
                  </span>
                </Link>
              </div>
            ) : (
              <p className="text-center text-gray-600">
                最新ニュースはありません。
              </p>
            )}
          </div>
        </section>

        {/* Warehouse Rental Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-h2 sm:text-h2Sm font-semibold text-center mb-8">
              倉庫貸出について
            </h2>
            <p className="text-center text-paragraph sm:text-pSm leading-relaxed max-w-2xl mx-auto mb-6">
              倉庫の貸し出しをご希望の方は、下記のリンクから詳細をご確認いただけます。
            </p>
            <div className="text-center">
              <Link href="/service">
                <span className="bg-button text-black px-6 py-3 rounded-full hover:bg-buttonHover transition">
                  倉庫貸出詳細
                </span>
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

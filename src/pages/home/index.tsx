import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import ListItem from '@/components/ListItem';
import HeaderBackground from '@/components/HeaderBackground';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * HomePage component that renders the main content of the homepage.
 * Includes a header, hero section, about section, and various informational sections.
 */
const HomePage = () => {
  // State to control visibility for animation effects
  const [isVisible, setIsVisible] = useState(false);

  // Show content with a slight delay to create a fade-in effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Meta title="Kalytero | ホーム" />
      <Header />
      {/* Hero section with background image and animated text */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <HeaderBackground
          colors={['#00A9FF', '#89CFF3', '#A0E9FF', '#CDF5FD', '#B6FFFA']}
          numPoints={100}
        />
        <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
        <div className="absolute top-1/4 left-8 right-8 md:left-8 md:right-auto text-white z-10">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-white transition-opacity duration-1000 ease-out transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0.1s' }}
          >
            {Array.from('全ての人がテクノロジーに').map((char, i) => (
              <span
                key={i}
                className="inline-block transition-transform duration-500 ease-out"
                style={{
                  transitionDelay: `${i * 50}ms`,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible ? 1 : 0,
                }}
              >
                {char}
              </span>
            ))}
            <br className="hidden md:block" />
            {Array.from('アクセスできる社会を作る').map((char, i) => (
              <span
                key={i}
                className="inline-block transition-transform duration-500 ease-out"
                style={{
                  transitionDelay: `${(i + 12) * 50}ms`,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible ? 1 : 0,
                }}
              >
                {char}
              </span>
            ))}
          </h1>

          <h2
            className={`text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 md:mb-8 transition-opacity duration-1000 ease-out transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '1s' }}
          >
            マルチクラウドデータとAIの活用によって
            <br className="hidden md:block" />
            複雑に多様化するテクノロジー課題を解決し
            <br className="hidden md:block" />
            ビジネスにおける様々なチャレンジを実現します
          </h2>
          <button
            className={`bg-white hover:bg-gray-200 hover:text-customLightBlue text-customBlue font-bold py-2 sm:py-3 px-4 sm:px-6 transition-opacity duration-700 ease-out ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '1.5s' }}
          >
            <Link href="/contact">お問い合わせ</Link>
          </button>
        </div>
      </div>
      {/* About section with company information */}
      <section className="h-auto bg-gray-100 flex items-center justify-center">
        <div className="container mx-auto flex flex-wrap px-5 py-24">
          <div className="w-full md:w-1/2 flex flex-col items-start text-left order-2 mt-5 md:order-1">
            <Image src="/kalytero-logo.svg" alt="Logo" width={300} height={300} className="mb-8" />
            <p className="text-lg text-gray-700 mb-8">
              Kalyteroは様々なバックグラウンドを持つエンジニアリングに特化した学生が集まって設立した会社です。
              ギリシャ語で「より良い」という意味を持つKalyteroは、社会で当たり前により良いサービスや技術を選択できるようにするというビジョンを表しています。
            </p>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-left order-1 md:order-2 md:pl-10">
            <Image
              src="/team.webp"
              alt="Team Image"
              width={500}
              height={300}
              className="mb-8 shadow-lg"
            />
            <div className="w-full flex flex-col md:flex-row items-center md:items-start">
              <a
                href="/about"
                className="flex items-center text-customBlue hover:text-customLightBlue font-semibold mb-4 md:mb-0 md:mr-4 w-full md:w-auto justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
                企業情報
              </a>
              <a
                href="/about/#members"
                className="flex items-center text-customBlue hover:text-customLightBlue font-semibold mb-4 md:mb-0 md:mr-4 w-full md:w-auto justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
                役員情報
              </a>
              <a
                href="/services"
                className="flex items-center text-customBlue hover:text-customLightBlue font-semibold w-full md:w-auto justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
                サービス情報
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Case studies section */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">実際の事例</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ListItem
              title="チケットサービスのインフラ構築"
              description="サービスの拡大や展開のために、スケーラビリティを意識したインフラ構築を行なってきました。"
              imageSrc="/back2.webp"
              imageAlt="Project 1"
            />
            <ListItem
              title="WEBアプリ開発"
              description="Discord Botなどのバックエンド部分から、管理を容易にしユーザビリティを高めるフロントエンド部分など幅広い領域を開発してきました。"
              imageSrc="/back1.webp"
              imageAlt="Project 2"
            />
            <ListItem
              title="AI エッジ開発"
              description="エッジ領域での対話型AIの実装を行ってきました。オンプレミスでの稼働やファインチューニングなど様々な課題にアプローチしていきます。"
              imageSrc="/back3.webp"
              imageAlt="Project 3"
            />
          </div>
        </div>
      </section>

      {/* Section displaying strengths */}
      <section className="py-24 bg-gray-200">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">私たちの強み</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ListItem
              title="フルスタック"
              description="WEBフロントエンド・バックエンド・ネットワークなどフルスタックメンバーが開発に携わるため、最短のコストで最高の品質を提供します。"
            />
            <ListItem
              title="クラウドソリューション"
              description="クラウド・オンプレミス 両方に知見がありクラウドへの移行やエッジでの開発でも対応可能です。"
            />
            <ListItem
              title="横断分野での開発"
              description="WEBやネットワークなど様々な分野を得意とする技術力の高いメンバーがだけが集まっており、横断的なプロジェクトでも対応可能です。"
            />
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-24 bg-customBlue text-white">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold mb-8">お問い合わせ</h2>
          <p className="text-lg mb-12">
            私たちのサービスについてもっと知りたい方は、ぜひお問い合わせください。
          </p>
          <Link href="/contact">
            <div className="bg-white text-customBlue font-bold py-3 px-6 hover:bg-gray-200 transition-colors duration-300">
              お問い合わせページへ
            </div>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;

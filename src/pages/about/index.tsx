import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import Breadcrumbs from '@/components/Breadcrumbs';
import Image from 'next/image';
import Link from 'next/link';

/**
 * About page component that showcases company information,
 * team members, and services offerings.
 */
const About = () => {
  return (
    <>
      {/* Meta section */}
      <Meta
        title="Kalytero | 会社情報"
        description="会社情報ページでは、私たちの会社の概要を紹介します。"
        url="https://kalytero.ne.jp/about"
      />

      {/* Header section */}
      <Header />
      <Breadcrumbs />

      {/* Vision & Mission Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">ビジョン</h2>
          <div className="bg-gray-100 shadow-lg p-8 max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed font-bold">
              全ての人がテクノロジーにアクセスできる社会を作る。
            </p>
          </div>
          <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-800">ミッション</h2>
          <div className="bg-gray-100 shadow-lg p-8 max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed font-bold">
              技術やサービスの選択肢の格差をなくし、全ての企業や人々がテクノロジーを活用できるようにする。
            </p>
          </div>
        </div>
      </section>

      {/* Company Information Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-5">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">企業情報</h2>
          <div className="bg-white shadow-lg p-8 max-w-3xl mx-auto">
            <ul className="list-none text-lg text-gray-700 leading-relaxed space-y-4">
              <li className="md:flex md:justify-between flex-wrap">
                <span className="font-semibold">社名：</span>
                <span>合同会社Kalytero</span>
              </li>
              <li className="md:flex md:justify-between flex-wrap">
                <span className="font-semibold">英名：</span>
                <span>Kalytero LLC</span>
              </li>
            </ul>
            <hr className="my-4 border-gray-300" />
            <ul className="list-none text-lg text-gray-700 leading-relaxed space-y-4">
              <li className="md:flex md:justify-between flex-wrap">
                <span className="font-semibold">所在地：</span>
                <span>東京都墨田区文花１丁目１８−１３</span>
              </li>
            </ul>
            <hr className="my-4 border-gray-300" />
            <ul className="list-none text-lg text-gray-700 leading-relaxed space-y-4">
              <li className="md:flex md:justify-between flex-wrap">
                <span className="font-semibold">代表電話：</span>
                <span>080-9015-7789</span>
              </li>
            </ul>
            <hr className="my-4 border-gray-300" />
            <ul className="list-none text-lg text-gray-700 leading-relaxed space-y-4">
              <li className="md:flex md:justify-between flex-wrap">
                <span className="font-semibold">設立年月日：</span>
                <span>2023年 11月14日</span>
              </li>
            </ul>
            <hr className="my-4 border-gray-300" />
            <ul className="list-none text-lg text-gray-700 leading-relaxed space-y-4">
              <li className="md:flex md:justify-between flex-wrap">
                <span className="font-semibold">代表者：</span>
                <span>佐藤 優真、吉田 珀仁</span>
              </li>
            </ul>
            <hr className="my-4 border-gray-300" />
            <ul className="list-none text-lg text-gray-700 leading-relaxed space-y-4">
              <li className="md:flex md:justify-between flex-wrap">
                <span className="font-semibold">役員数：</span>
                <span>3名</span>
              </li>
            </ul>
            <hr className="my-4 border-gray-300" />
            <ul className="list-none text-lg text-gray-700 leading-relaxed space-y-4">
              <li className="md:flex md:justify-between flex-wrap">
                <span className="font-semibold">インボイス：</span>
                <span>T9010603010477</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team Member Information Section */}
      <section id="members" className="py-24 bg-white">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">役員情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="p-8 bg-gray-100 shadow-lg">
              <Image
                src="/img/yukun.webp"
                alt="CEO"
                width={200}
                height={200}
                className="rounded-full mx-auto"
              />
              <h3 className="text-xl font-semibold mt-4 text-black">佐藤 優真</h3>
              <p className="text-gray-700 mt-2">CEO</p>
              <p className="text-gray-700 mt-4 leading-relaxed">
                42 Tokyoとさくらインターネットに在籍。代表。 システム開発・運営とサーバー保守。
                業務でシステム開発・WEB開発・AWSデプロイ。
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="p-8 bg-gray-100 shadow-lg">
              <Image
                src="/img/yoshida.webp"
                alt="CTO"
                width={200}
                height={200}
                className="rounded-full mx-auto"
              />
              <h3 className="text-xl font-semibold mt-4 text-black">吉田 珀仁</h3>
              <p className="text-gray-700 mt-2">CTO</p>
              <p className="text-gray-700 mt-4 leading-relaxed">
                フリーランスとして活動、 インフラからアプリまでフルスタック。
                レンタルサーバーなどの複数のサービスを運営、利用者数8万人以上。
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="p-8 bg-gray-100 shadow-lg">
              <Image
                src="/img/wakamiya.webp"
                alt="COO"
                width={200}
                height={200}
                className="rounded-full mx-auto"
              />
              <h3 className="text-xl font-semibold mt-4 text-black">若宮 佑真</h3>
              <p className="text-gray-700 mt-2">COO</p>
              <p className="text-gray-700 mt-4 leading-relaxed">
                42
                Tokyo在籍。BizDev。コンテンツ設計やマーケティングなどに携わる他、WEBの開発などのエンジニアリングも行う。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Information Section */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">サービス情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* In-house Development */}
            <div className="p-8 bg-white shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">自社開発</h3>
              <p className="text-gray-700 leading-relaxed">
                様々な知見やノウハウを活かし、自社開発を行っています。Discord音声AIなどのサービスなどをリリース予定です。
              </p>
            </div>

            {/* Contract Development */}
            <div className="p-8 bg-white shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">委託開発</h3>
              <p className="text-gray-700 leading-relaxed">
                クライアントの要件に基づいたカスタムソリューションを提供する委託開発を行っています。柔軟な開発体制で、どのようなプロジェクトにも対応可能です。
              </p>
            </div>
          </div>

          {/* Link to Service Page */}
          <Link href="/services">
            <button className="mt-8 bg-customBlue text-white font-bold py-3 px-6 hover:bg-customLightBlue transition-colors duration-300">
              サービスの詳細を見る
            </button>
          </Link>
        </div>
      </section>

      {/* Footer section */}
      <Footer />
    </>
  );
};

export default About;

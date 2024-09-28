import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';

const Service = () => {
  return (
    <>
      {/* Meta section */}
      <Meta
        title="Kalytero | サービス"
        description="Kalyteroのサービスページでは、私たちのサービスについて紹介します。"
        url="https://kalytero.ne.jp/services"
      />

      {/* Header section */}
      <Header />

      {/* Main content for the services page */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">私たちのサービス</h2>

          {/* In-house Development Section */}
          <div className="mb-16 p-8 bg-white shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">アウトソーシング</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              幅広い分野のプロジェクトの受注が可能です
            </p>
            <ul className="text-left mt-6 list-disc list-inside">
              <li>Android / iOSアプリ</li>
              <li>WEBアプリ (React / Next.js)</li>
              <li>AWS / クラウド</li>
              <li>生成AI活用</li>
            </ul>
          </div>

          {/* Outsourced Development Section */}
          <div className="p-8 bg-white shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">自社開発</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              培ったノウハウを活用したサービス設計をしています
            </p>
            <ul className="text-left mt-6 list-disc list-inside">
              <li>Discord 音声AI（開発中）</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Service;

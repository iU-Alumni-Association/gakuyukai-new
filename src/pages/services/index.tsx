import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import Link from "next/link";

const ServicePage = () => {
  return (
    <>
      <Meta title="iU 学友会 | サービス" />
      <Header />
      <Breadcrumbs />
      <main className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="text-h2 sm:text-h1Sm font-bold text-center mb-12">
            申請関係
          </h1>

          {/* Warehouse Rental Service Section */}
          <section className="mb-12">
            <h2 className="text-h2 sm:text-h2Sm font-semibold mb-6">
              倉庫貸出サービス
            </h2>
            <p className="text-p sm:text-pSm text-gray-700 leading-relaxed mb-4">
              学友会の倉庫を利用したい方は、以下のリンクから申請フォームにアクセスできます。
              倉庫の利用には事前の申し込みが必要ですので、詳細をご確認の上、申請をお願いします。
            </p>
            <Link href="https://rental.i-u.io/">
              <span className="text-blue-500 hover:underline">
                倉庫貸出申請フォームへ
              </span>
            </Link>
          </section>

          {/* Other Services Section */}
          <section className="mb-12">
            <h2 className="text-h2 sm:text-h2Sm font-semibold mb-6">
              その他の申請・サービス
            </h2>
            <ul className="list-disc pl-5 text-lg text-gray-700">
              <li className="mb-2">
                <Link
                  href="/services"
                  className="text-blue-500 hover:underline"
                >
                  イベント開催申請
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/services"
                  className="text-blue-500 hover:underline"
                >
                  予算申請
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/services"
                  className="text-blue-500 hover:underline"
                >
                  学生支援サービス
                </Link>
              </li>
            </ul>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-h2 sm:text-h2Sm font-semibold mb-6">
              よくある質問（FAQ）
            </h2>
            <p className="text-p sm:text-pSm text-gray-700 leading-relaxed">
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
      <Footer />
    </>
  );
};

export default ServicePage;

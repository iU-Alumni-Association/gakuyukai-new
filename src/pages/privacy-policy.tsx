import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-5">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">プライバシーポリシー</h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            合同会社Kalytero（以下「当社」）は、お客様のプライバシーを尊重し、個人情報の保護に努めています。当プライバシーポリシーでは、当社がどのようにお客様の個人情報を収集、使用、共有するかについて説明します。
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. 収集する情報</h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            当社は、お客様から次のような個人情報を収集することがあります：
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-8 leading-relaxed">
            <li>お名前、メールアドレス、電話番号などの連絡先情報</li>
            <li>お客様のご利用状況やアクセスに関する情報</li>
            <li>その他、お問い合わせやサービス利用に関連する情報</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. 情報の利用目的</h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            当社は、以下の目的でお客様の個人情報を利用します：
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-8 leading-relaxed">
            <li>サービス提供およびサポートのため</li>
            <li>お客様からのお問い合わせに対応するため</li>
            <li>サービス向上や新サービスの開発のため</li>
            <li>法令の遵守のため</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. 個人情報の共有</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            当社は、お客様の同意がある場合、または法令に基づき必要とされる場合を除き、個人情報を第三者と共有することはありません。
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. セキュリティ</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            当社は、お客様の個人情報を保護するため、適切な技術的および組織的な対策を講じています。個人情報の不正アクセス、紛失、改ざん、漏洩を防止するためのセキュリティ対策を強化しています。
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. クッキーの使用</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            当社のウェブサイトでは、ユーザーの利便性向上のためにクッキーを使用しています。クッキーを無効にすることもできますが、その場合、当ウェブサイトの一部機能が正しく動作しないことがあります。
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. お問い合わせ</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            当社のプライバシーポリシーに関してご質問がある場合は、以下の連絡先までお問い合わせください：
          </p>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            メールアドレス: contact@kalytero.co.jp
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. 改定</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            当社は、本プライバシーポリシーを必要に応じて改定することがあります。改定後のポリシーは、当ウェブサイトに掲載した時点で効力を生じます。
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;

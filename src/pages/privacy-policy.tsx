

import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * プライバシーポリシーページのコンポーネント
 * @returns {JSX.Element} プライバシーポリシーページのJSX要素を返します
 * @remarks
 * このコンポーネントでは、Tailwind CSSのユーティリティクラスを使用してレイアウトを定義しています。
 * 背景色は `bg-background` で指定され、フォントサイズやマージンなども調整されています。
 * @example
 * ```
 * <PrivacyPolicy />
 * ```
 */
const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <section className="bg-background py-24">
        <div className="container mx-auto px-5">
          <h1 className="mb-8 text-h2 font-bold text-headline sm:text-h1Sm">
            プライバシーポリシー
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-headline">
            iU学友会（以下「当組織」）は、個人情報の重要性を認識し、その保護に努めています。本プライバシーポリシーでは、当組織が提供するサービスにおいて収集する情報の種類、利用目的、取り扱い方法について説明します。
          </p>

          <h2 className="mb-4 mt-8 text-h2 font-semibold text-headline sm:text-h2Sm">
            1. 基本的考え方
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-headline">
            当組織は、ウェブサイトを通じて提供するサービスを円滑に運営するため、必要な範囲で利用者の情報を収集します。収集した情報は、利用目的の範囲内で適切に取り扱います。
          </p>

          <h2 className="mb-4 mt-8 text-h2 font-semibold text-headline sm:text-h2Sm">
            2. 収集する情報の範囲
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-headline">
            当組織は、以下の情報を収集する場合があります:
          </p>
          <ul className="mb-8 list-inside list-disc text-lg leading-relaxed text-headline">
            <li>
              お名前、メールアドレスなどの連絡先情報
            </li>
            <li>
              お問い合わせ時に提供された情報
            </li>
            <li>
              アクセス履歴やサイト利用状況などの技術情報
            </li>
          </ul>

          <h2 className="mb-4 mt-8 text-h2 font-semibold text-headline sm:text-h2Sm">
            3. 利用目的
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-headline">
            当組織は、以下の目的で収集した情報を利用します:
          </p>
          <ul className="mb-8 list-inside list-disc text-lg leading-relaxed text-headline">
            <li>サービスの提供および改善</li>
            <li>お問い合わせへの対応</li>
            <li>
              ウェブサイトの運営およびセキュリティ対策
            </li>
          </ul>

          <h2 className="mb-4 mt-8 text-h2 font-semibold text-headline sm:text-h2Sm">
            4. 個人情報の共有
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-headline">
            当組織は、法令に基づく場合や利用者の同意がある場合を除き、収集した個人情報を第三者に提供することはありません。ただし、匿名化されたデータは統計情報として公開される場合があります。
          </p>

          <h2 className="mb-4 mt-8 text-h2 font-semibold text-headline sm:text-h2Sm">
            5. 安全確保の措置
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-headline">
            当組織は、個人情報の漏えい、滅失、改ざんを防止するために適切なセキュリティ対策を実施しています。また、外部委託業者に対しても同様の措置を講じます。
          </p>

          <h2 className="mb-4 mt-8 text-h2 font-semibold text-headline sm:text-h2Sm">
            6. 改定
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-headline">
            本プライバシーポリシーは、必要に応じて改定されることがあります。改定後のポリシーは、ウェブサイト上で告知された時点で効力を持ちます。
          </p>

          <h2 className="mb-4 mt-8 text-h2 font-semibold text-headline sm:text-h2Sm">
            7. お問い合わせ
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-headline">
            プライバシーポリシーに関するお問い合わせは、以下の連絡先までお願いします。
            <br />
            メールアドレス:
            gakuyukai_jichi@i-u.ac.jp
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;

/**
 * @file
 * このファイルは、問い合わせページのコンポーネントを提供します。
 * メタ情報、ヘッダー、パンくずリスト、問い合わせフォーム、フッターを表示します。
 */

import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import ContactForm from '@/components/ContactForm';

/**
 * 問い合わせページのコンポーネント
 * @returns {JSX.Element} 問い合わせページを表示するReactコンポーネント
 * @example
 * <Contact />
 */
const Contact = (): JSX.Element => {
  return (
    <>
      {/* Meta section */}
      <Meta
        title="iU 学友会 | お問い合わせ"
        description="ご質問などのお問い合わせを受け付けています。"
        url="https://i-u.io/contact"
      />
      {/* ヘッダー部分 */}
      <Header />

      {/* パンくずリスト */}
      <Breadcrumbs />

      {/* 問い合わせフォームセクション */}
      <div className="min-h-svh">
        <ContactForm />
      </div>

      {/* フッター部分 */}
      <Footer />
    </>
  );
};

export default Contact;

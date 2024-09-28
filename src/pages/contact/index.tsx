import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  return (
    <>
      {/* Meta section */}
      <Meta
        title="Kalytero | お問い合わせ"
        description="依頼やご質問などのお問い合わせを受け付けています。"
        url="https://kalytero.ne.jp/contact"
      />
      <Header />
      <div className="min-h-svh">
        <ContactForm />
      </div>
      <Footer />
    </>
  );
};

export default Contact;

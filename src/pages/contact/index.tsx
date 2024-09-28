import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <>
      {/* Meta section */}
      <Meta
        title="iU 学友会 | お問い合わせ"
        description="ご質問などのお問い合わせを受け付けています。"
        url="https://i-u.io/contact"
      />
      <Header />
      <Breadcrumbs />
      <div className="min-h-svh">
        <ContactForm />
      </div>
      <Footer />
    </>
  );
};

export default Contact;

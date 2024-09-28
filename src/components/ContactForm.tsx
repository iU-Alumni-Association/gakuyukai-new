import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

const ContactForm = () => {
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [apiError, setApiError] = useState(""); // To handle API error messages
  const router = useRouter();

  // Log the API endpoint (for debugging purposes)
  useEffect(() => {
    console.log("API Endpoint:", process.env.NEXT_PUBLIC_API_ENDPOINT);
  }, []);

  /**
   * Handles form submission to send data to the API.
   *
   * @param {FormEvent<HTMLFormElement>} event - Form submit event
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload
    setLoading(true); // Set loading to true while processing
    setApiError(""); // Clear any previous error messages

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()); // Convert form data to object

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    if (!apiEndpoint) {
      setApiError(
        "送信に失敗しました。お手数ですが、メールにてご連絡ください。"
      );
      setLoading(false);
      return;
    }

    try {
      // Send form data to the API
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        form.reset(); // Clear form fields on success
        router.push("/success"); // Redirect to success page
      } else {
        const result = await response.json();
        setApiError(
          result.message ||
            "送信に失敗しました。お手数ですが、メールにてご連絡ください。"
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setApiError(
        "送信に失敗しました。お手数ですが、メールにてご連絡ください。"
      );
    } finally {
      setLoading(false); // Stop loading state after processing
    }
  };

  return (
    <div className="bg-Background py-10">
      <Head>
        <title>iU 学友会 - お問い合わせ</title>
        <meta name="description" content="会社へのお問い合わせページ" />
      </Head>
      <div className="container mx-auto px-4">
        <div className="bg-yellow-50 p-8">
          <h1 className="text-4xl font-bold text-Thema mb-6">お問い合わせ</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  お名前
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 focus:border-Thema focus:ring-Thema"
                  required
                />
              </div>
              {/* Company Name Input (Optional) */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700"
                >
                  学籍番号（学生）
                </label>
                <input
                  name="companyName"
                  id="companyName"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 focus:border-Thema focus:ring-Thema"
                />
              </div>
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  メールアドレス
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  className="mt-1 block w-full border border-gray-300 focus:border-Thema focus:ring-Thema"
                  required
                  pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
                  title="有効なメールアドレスを入力してください。"
                />
              </div>
              {/* Phone Number Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  電話番号
                </label>
                <input
                  name="phone"
                  id="phone"
                  type="tel"
                  className="mt-1 block w-full border border-gray-300 focus:border-Thema focus:ring-Thema"
                  required
                  pattern="^[0-9]+$"
                  title="有効な電話番号を入力してください。"
                />
              </div>
            </div>
            {/* Subject Input */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                件名
              </label>
              <input
                name="subject"
                id="subject"
                type="text"
                className="mt-1 block w-full border border-gray-300 focus:border-Thema focus:ring-Thema"
                required
              />
            </div>
            {/* Message Input */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                メッセージ
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                className="mt-1 block w-full border border-gray-300 focus:border-Thema focus:ring-Thema"
                required
              ></textarea>
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full inline-flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-Background bg-Thema hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-Thema"
                disabled={loading}
              >
                送信
              </button>
            </div>
          </form>
          {/* Display API Error */}
          {apiError && (
            <div className="mt-6">
              <p className="text-sm text-red-600">{apiError}</p>
            </div>
          )}
          {/* Privacy Policy Notice */}
          <div className="mt-8 text-sm text-gray-600">
            <p>
              お問い合わせ内容を送信することにより、
              <Link
                href="/privacy-policy"
                className="text-Thema hover:underline inline"
              >
                プライバシーポリシー
              </Link>
              に同意したものとみなされます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

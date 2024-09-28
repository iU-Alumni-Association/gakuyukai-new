import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    console.log("API Endpoint:", process.env.NEXT_PUBLIC_API_ENDPOINT);
  }, []);

  const validate = (data: Record<string, string>) => {
    const newErrors: Record<string, string> = {};
    if (!data.name) newErrors.name = "お名前は必須です。";
    if (!data.email) newErrors.email = "メールアドレスは必須です。";
    else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data.email)
    )
      newErrors.email = "有効なメールアドレスを入力してください。";
    if (!data.phone) newErrors.phone = "電話番号は必須です。";
    else if (!/^[0-9]+$/.test(data.phone))
      newErrors.phone = "有効な電話番号をハイフンなしで入力してください。";
    if (!data.subject) newErrors.subject = "件名は必須です。";
    if (!data.message) newErrors.message = "メッセージは必須です。";
    if (data.studentId && !/im|IM/.test(data.studentId)) {
      newErrors.studentId = "学籍番号には'IM'が含まれている必要があります。";
    }

    return newErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setApiError("");
    setErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    if (!apiEndpoint) {
      setApiError(
        "送信に失敗しました。お手数ですが、メールにてご連絡ください。"
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        form.reset();
        router.push("/success");
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
      setLoading(false);
    }
  };

  return (
    <div className="bg-background py-10">
      <Head>
        <title>iU 学友会 - お問い合わせ</title>
        <meta name="description" content="会社へのお問い合わせページ" />
      </Head>
      <div className="container mx-auto px-4">
        <div className="bg-yellow-50 p-8 rounded-lg shadow-lg">
          <h1 className="text-h2 sm:text-h1Sm font-bold text-highlight mb-6">
            お問い合わせ
          </h1>
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
                  className={`mt-1 block w-full rounded-md border ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-highlight focus:ring-highlight"
                  } shadow-sm`}
                  required
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>
              {/* Student ID Input */}
              <div>
                <label
                  htmlFor="studentId"
                  className="block text-sm font-medium text-gray-700"
                >
                  学籍番号 <span className="text-gray-500">(例: IM123456)</span>
                </label>
                <input
                  name="studentId"
                  id="studentId"
                  type="text"
                  className={`mt-1 block w-full rounded-md border ${
                    errors.studentId
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-highlight focus:ring-highlight"
                  } shadow-sm`}
                  required
                />
                {errors.studentId && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.studentId}
                  </p>
                )}
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
                  className={`mt-1 block w-full rounded-md border ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-highlight focus:ring-highlight"
                  } shadow-sm`}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
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
                  className={`mt-1 block w-full rounded-md border ${
                    errors.phone
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-highlight focus:ring-highlight"
                  } shadow-sm`}
                  required
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                )}
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
                className={`mt-1 block w-full rounded-md border ${
                  errors.subject
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-highlight focus:ring-highlight"
                } shadow-sm`}
                required
              />
              {errors.subject && (
                <p className="text-sm text-red-500 mt-1">{errors.subject}</p>
              )}
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
                className={`mt-1 block w-full rounded-md border ${
                  errors.message
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-highlight focus:ring-highlight"
                } shadow-sm`}
                required
              ></textarea>
              {errors.message && (
                <p className="text-sm text-red-500 mt-1">{errors.message}</p>
              )}
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full inline-flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-background bg-button hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-buttonHover"
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
                className="text-highlight hover:underline inline"
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

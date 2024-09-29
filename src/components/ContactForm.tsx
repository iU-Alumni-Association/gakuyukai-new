import {
  useState,
  useEffect,
  FormEvent,
} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

/**
 * 問い合わせフォームを提供するコンポーネント.
 *
 * @returns {JSX.Element} フォームUI.
 */
const ContactForm = (): JSX.Element => {
  // ローディング状態、APIエラー、およびフォームエラーメッセージを管理
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errors, setErrors] = useState<
    Record<string, string>
  >({});
  const router = useRouter();

  /**
   * 問い合わせフォームを提供するコンポーネント.
   *
   * このコンポーネントは、問い合わせフォームのUIを提供し、入力されたデータを検証してAPIに送信します。
   * フォームには名前、学籍番号、メールアドレス、電話番号、件名、メッセージフィールドが含まれます。
   *
   * @remarks
   *   - `loading`: APIリクエスト中に表示されるローディング状態.
   *   - `apiError`: APIからのエラー応答を保持するフック.
   *   - `errors`: フォームフィールドのバリデーションエラーを保持するオブジェクト.
   *   - `validate`: フォームデータを検証し、エラーメッセージを返す関数.
   *   - `handleSubmit`:
   *       フォームが送信された際に呼び出され、APIへのリクエストを処理する非同期関数.
   *
   * @example
   *   ```tsx
   *   <ContactForm />
   *   ```;
   *
   * @returns {JSX.Element} フォームUI.
   * @source
   */
  useEffect(() => {
    console.log(
      'API Endpoint:',
      process.env.NEXT_PUBLIC_API_ENDPOINT,
    );
  }, []);

  /**
   * フォームの入力データを検証する関数.
   *
   * @param {Record<string, string>} data -
   *   ユーザーが入力したフォームデータ.
   * @returns {Record<string, string>}
   *   エラーメッセージを持つオブジェクト.
   */
  const validate = (
    data: Record<string, string>,
  ): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    if (!data.name)
      newErrors.name = 'お名前は必須です。';
    if (!data.email)
      newErrors.email =
        'メールアドレスは必須です。';
    else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
        data.email,
      )
    )
      newErrors.email =
        '有効なメールアドレスを入力してください。';
    if (!data.phone)
      newErrors.phone = '電話番号は必須です。';
    else if (!/^[0-9]+$/.test(data.phone))
      newErrors.phone =
        '有効な電話番号をハイフンなしで入力してください。';
    if (!data.subject)
      newErrors.subject = '件名は必須です。';
    if (!data.message)
      newErrors.message =
        'メッセージは必須です。';
    if (
      data.studentId &&
      !/im|IM/.test(data.studentId)
    ) {
      newErrors.studentId =
        "学籍番号には'IM'が含まれている必要があります。";
    }

    return newErrors;
  };

  /**
   * フォームが送信された際に呼び出される関数.
   *
   * @param {FormEvent<HTMLFormElement>} event -
   *   フォーム送信イベント.
   * @returns {Promise<void>} 非同期処理の完了.
   */
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    setApiError('');
    setErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(
      formData.entries(),
    ) as Record<string, string>;

    const validationErrors = validate(data);
    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const apiEndpoint =
      process.env.NEXT_PUBLIC_API_ENDPOINT;
    if (!apiEndpoint) {
      setApiError(
        '送信に失敗しました。お手数ですが、メールにてご連絡ください。',
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        form.reset();
        router.push('/success');
      } else {
        const result = await response.json();
        setApiError(
          result.message ||
            '送信に失敗しました。お手数ですが、メールにてご連絡ください。',
        );
      }
    } catch (error) {
      console.error(
        'Error sending message:',
        error,
      );
      setApiError(
        '送信に失敗しました。お手数ですが、メールにてご連絡ください。',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background py-10">
      <Head>
        <title>iU 学友会 - お問い合わせ</title>
        <meta
          name="description"
          content="会社へのお問い合わせページ"
        />
      </Head>
      <div className="container mx-auto px-4">
        <div className="rounded-lg bg-yellow-50 p-8 shadow-lg">
          <h1 className="mb-6 text-h2 font-bold text-highlight sm:text-h1Sm">
            お問い合わせ
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* 名前入力フィールド */}
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
                    errors.name ?
                      'border-red-500 focus:border-red-500'
                    : 'border-paragraph focus:border-highlight focus:ring-highlight'
                  } shadow-sm`}
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>
              {/* 学籍番号入力フィールド */}
              <div>
                <label
                  htmlFor="studentId"
                  className="block text-sm font-medium text-gray-700"
                >
                  学籍番号{' '}
                  <span className="text-gray-500">
                    (例: 20IM2020)
                  </span>
                </label>
                <input
                  name="studentId"
                  id="studentId"
                  type="text"
                  className={`mt-1 block w-full rounded-md border ${
                    errors.studentId ?
                      'border-red-500 focus:border-red-500'
                    : 'border-paragraph focus:border-highlight focus:ring-highlight'
                  } shadow-sm`}
                  required
                />
                {errors.studentId && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.studentId}
                  </p>
                )}
              </div>
              {/* メールアドレス入力フィールド */}
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
                    errors.email ?
                      'border-red-500 focus:border-red-500'
                    : 'border-paragraph focus:border-highlight focus:ring-highlight'
                  } shadow-sm`}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>
              {/* 電話番号入力フィールド */}
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
                    errors.phone ?
                      'border-red-500 focus:border-red-500'
                    : 'border-paragraph focus:border-highlight focus:ring-highlight'
                  } shadow-sm`}
                  required
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
            {/* 件名入力フィールド */}
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
                  errors.subject ?
                    'border-red-500 focus:border-red-500'
                  : 'border-paragraph focus:border-highlight focus:ring-highlight'
                } shadow-sm`}
                required
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.subject}
                </p>
              )}
            </div>
            {/* メッセージ入力フィールド */}
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
                  errors.message ?
                    'border-red-500 focus:border-red-500'
                  : 'border-paragraph focus:border-highlight focus:ring-highlight'
                } shadow-sm`}
                required
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.message}
                </p>
              )}
            </div>
            {/* 送信ボタン */}
            <div>
              <button
                type="submit"
                className="inline-flex w-full justify-center border border-transparent bg-button px-4 py-3 text-sm font-medium text-background hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-buttonHover focus:ring-offset-2"
                disabled={loading}
              >
                送信
              </button>
            </div>
          </form>
          {/* APIエラーメッセージ表示 */}
          {apiError && (
            <div className="mt-6">
              <p className="text-sm text-red-600">
                {apiError}
              </p>
            </div>
          )}
          {/* プライバシーポリシー通知 */}
          <div className="mt-8 text-sm text-gray-600">
            <p>
              お問い合わせ内容を送信することにより、
              <Link
                href="/privacy-policy"
                className="inline text-highlight hover:underline"
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

/**
 * @file
 * このファイルは、再利用可能なButtonコンポーネントを提供します。
 * Tailwind CSSのデザインシステムに基づいており、プロジェクト内でのカスタマイズや統合が容易です。
 * ボタンのサイズやスタイル（バリアント）を柔軟に変更できるオプションをサポートします。
 */

import React from 'react';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'large' | 'medium';
};

/**
 * Buttonコンポーネント
 *
 * 複数のバリアントとサイズをサポートする再利用可能なボタンコンポーネントです。
 * Tailwind CSSデザインシステムに基づき、簡単にプロジェクトに統合・カスタマイズが可能です。
 *
 * @param {string} label - ボタンに表示されるテキスト
 * @param {() => void} [onClick] - ボタンがクリックされた際に実行されるオプションのコールバック関数
 * @param {boolean} [disabled=false] - ボタンが無効化されているかを指定。`true`の場合、ボタンは無効化され、適切にスタイリングされます。デフォルトは`false`
 * @param {'primary' | 'secondary' | 'tertiary'} [variant='primary'] - ボタンのスタイルバリアントを指定します。デフォルトは`"primary"`
 * @param {'large' | 'medium'} [size='medium'] - ボタンのサイズを指定します。デフォルトは`"medium"`
 * @returns {JSX.Element} スタイリングされたボタン要素を返します。
 *
 * @example
 * ```typescript
 * // プライマリボタン (通常のアクションボタンに使用)
 * <Button label="送信" variant="primary" size="large" />
 *
 * // セカンダリボタン (キャンセルや補助的なアクションに使用)
 * <Button label="キャンセル" variant="secondary" size="medium" />
 *
 * // ターシャリボタン (軽いアクションやリンク表示に使用)
 * <Button label="もっと読む" variant="tertiary" size="medium" />
 * ```
 *
 * @remarks
 * ### バリアントの使い分け方:
 * - **primary**: 主要なアクションに使います。例えば、フォームの送信や重要な操作を行うボタンに適しています。
 * - **secondary**: 補助的なアクションや、キャンセルボタンなど、主要な操作と対になる操作に使用します。
 * - **tertiary**: リンクに近い用途や、画面内で重要度が低いが、アクションを促すボタンに使います。下線付きのスタイルが特徴です。
 */
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'medium',
}) => {
  // 全てのボタンに共通する基本スタイル
  const baseStyles =
    'flex items-center justify-center font-bold rounded-lg text-center focus:outline-none';

  // サイズに基づくパディングとテキストサイズの調整
  const sizeStyles =
    size === 'large' ?
      'py-4 px-8 text-lg'
    : 'py-2 px-4 text-sm';

  // バリアント（primary, secondary, tertiary）に応じたスタイルと無効状態の処理
  const variantStyles = {
    primary: `bg-button text-buttonText hover:bg-buttonHover focus-visible:ring-2 focus-visible:ring-highlight ${
      disabled ? 'bg-gray-400' : ''
    }`,
    secondary: `bg-white border border-buttonText text-buttonText hover:bg-secondary focus-visible:ring-2 focus-visible:ring-highlight ${
      disabled ?
        'border-gray-400 text-gray-400'
      : ''
    }`,
    tertiary: `text-buttonText underline hover:text-headlineHover ${
      disabled ? 'text-gray-400' : ''
    }`,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles} ${variantStyles[variant]}`}
    >
      {label}
    </button>
  );
};

export default Button;

[**学友会ポータルサイト v0.1.0**](../../../README.md) • **Docs**

***

[学友会ポータルサイト v0.1.0](../../../modules.md) / [components/Button](../README.md) / default

# Function: default()

> **default**(`props`, `deprecatedLegacyContext`?): `ReactNode`

Buttonコンポーネント

複数のバリアントとサイズをサポートする再利用可能なボタンコンポーネントです。
Tailwind CSSデザインシステムに基づき、簡単にプロジェクトに統合・カスタマイズが可能です。

## Parameters

• **props**: `ButtonProps`

• **deprecatedLegacyContext?**: `any`

**Deprecated**

**See**

[React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods)

## Returns

`ReactNode`

スタイリングされたボタン要素を返します。

## Example

```typescript
// プライマリボタン (通常のアクションボタンに使用)
<Button label="送信" variant="primary" size="large" />

// セカンダリボタン (キャンセルや補助的なアクションに使用)
<Button label="キャンセル" variant="secondary" size="medium" />

// ターシャリボタン (軽いアクションやリンク表示に使用)
<Button label="もっと読む" variant="tertiary" size="medium" />
```

## Remarks

### バリアントの使い分け方:
- **primary**: 主要なアクションに使います。例えば、フォームの送信や重要な操作を行うボタンに適しています。
- **secondary**: 補助的なアクションや、キャンセルボタンなど、主要な操作と対になる操作に使用します。
- **tertiary**: リンクに近い用途や、画面内で重要度が低いが、アクションを促すボタンに使います。下線付きのスタイルが特徴です。

## Defined in

[src/components/Button.tsx:49](https://github.com/iU-Alumni-Association/gakuyukai-new/blob/9032bc93fe144cf1419e63a5b72095e28cfeb84b/src/components/Button.tsx#L49)

[**学友会ポータルサイト v0.1.0**](../../../README.md) • **Docs**

***

[学友会ポータルサイト v0.1.0](../../../modules.md) / [components/CardNews](../README.md) / default

# Function: default()

> **default**(`props`, `deprecatedLegacyContext`?): `ReactNode`

ニュースを表示するためのCardNewsコンポーネント
タイトル、説明、日付をボーダー付きのカードで表示し、詳細ページへのリンクを提供します。

## Parameters

• **props**: `CardNewsProps`

CardNewsコンポーネントに渡されるプロパティ

• **deprecatedLegacyContext?**: `any`

**Deprecated**

**See**

[React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods)

## Returns

`ReactNode`

表示するカードのJSX要素

## Example

```jsx
<CardNews
  title="最新ニュース"
  description="これは最新ニュースの概要です。"
  date="2024-09-29"
  id="news-001"
  category="テクノロジー"
/>
```

## Defined in

[src/components/CardNews.tsx:45](https://github.com/iU-Alumni-Association/gakuyukai-new/blob/9032bc93fe144cf1419e63a5b72095e28cfeb84b/src/components/CardNews.tsx#L45)

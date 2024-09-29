[**学友会ポータルサイト v0.1.0**](../../../README.md) • **Docs**

***

[学友会ポータルサイト v0.1.0](../../../modules.md) / [components/CardBorder](../README.md) / default

# Function: default()

> **default**(`props`, `deprecatedLegacyContext`?): `ReactNode`

## Parameters

• **props**: `CardBorderProps`

CardBorderコンポーネントのプロパティ。

• **deprecatedLegacyContext?**: `any`

**Deprecated**

**See**

[React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods)

## Returns

`ReactNode`

レンダリングされたカードコンポーネント。

## Description

CardBorderコンポーネントは、タイトル、説明、および日付を含むボーダー付きカードを表示します。
提供されたIDを使用して、ニュース詳細ページにリンクします。

## Example

```ts
<CardBorder
  title="ニュースのタイトル"
  description="ニュースの概要説明"
  date="2024-09-29"
  id="12345"
/>
```

## Defined in

[src/components/CardBorder.tsx:40](https://github.com/iU-Alumni-Association/gakuyukai-new/blob/9032bc93fe144cf1419e63a5b72095e28cfeb84b/src/components/CardBorder.tsx#L40)

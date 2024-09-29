[**学友会ポータルサイト v0.1.0**](../../../README.md) • **Docs**

***

[学友会ポータルサイト v0.1.0](../../../modules.md) / [components/BlogItem](../README.md) / default

# Function: default()

> **default**(`props`, `deprecatedLegacyContext`?): `ReactNode`

`BlogItem` コンポーネントは、ブログポストを一覧として表示します。
ブログのタイトル、画像、説明を表示し、リンクから該当ブログに移動できます。

## Parameters

• **props**: `BlogItemProps`

• **deprecatedLegacyContext?**: `any`

**Deprecated**

**See**

[React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods)

## Returns

`ReactNode`

スタイリングされたブログリストのアイテムを返します。

## Example

```tsx
const blog = {
  id: '1',
  title: '新しいNext.jsの機能',
  description: 'Next.jsの最新バージョンの新機能について...',
  eyecatch: { url: '/images/blog1.jpg' }
};
<BlogItem blog={blog} />
```

## Defined in

[src/components/BlogItem.tsx:37](https://github.com/iU-Alumni-Association/gakuyukai-new/blob/9032bc93fe144cf1419e63a5b72095e28cfeb84b/src/components/BlogItem.tsx#L37)

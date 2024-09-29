[**学友会ポータルサイト v0.1.0**](../../../README.md) • **Docs**

***

[学友会ポータルサイト v0.1.0](../../../modules.md) / [lib/microcms](../README.md) / getBlogDetail

# Function: getBlogDetail()

> **getBlogDetail**(`contentId`): `Promise`\<`null` \| [`Blog`](../../types/type-aliases/Blog.md)\>

指定されたブログ記事の詳細情報を取得します。

## Parameters

• **contentId**: `string`

ブログ記事のユニークなID

## Returns

`Promise`\<`null` \| [`Blog`](../../types/type-aliases/Blog.md)\>

- ブログ記事の詳細情報、エラー時はnullを返します

## Example

```
const blogDetail = await getBlogDetail('blog-id-123');
if (blogDetail) {
  console.log('タイトル:', blogDetail.title);
} else {
  console.error('ブログ記事が見つかりません');
}
```

## Defined in

[src/lib/microcms.ts:81](https://github.com/iU-Alumni-Association/gakuyukai-new/blob/9032bc93fe144cf1419e63a5b72095e28cfeb84b/src/lib/microcms.ts#L81)

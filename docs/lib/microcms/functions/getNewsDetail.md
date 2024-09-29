[**学友会ポータルサイト v0.1.0**](../../../README.md) • **Docs**

***

[学友会ポータルサイト v0.1.0](../../../modules.md) / [lib/microcms](../README.md) / getNewsDetail

# Function: getNewsDetail()

> **getNewsDetail**(`contentId`): `Promise`\<`null` \| [`Blog`](../../types/type-aliases/Blog.md)\>

指定されたニュース記事の詳細情報を取得します。

## Parameters

• **contentId**: `string`

ニュース記事のユニークなID

## Returns

`Promise`\<`null` \| [`Blog`](../../types/type-aliases/Blog.md)\>

- ニュース記事の詳細情報、エラー時はnullを返します

## Example

```
const newsDetail = await getNewsDetail('news-id-123');
if (newsDetail) {
  console.log('ニュースタイトル:', newsDetail.title);
} else {
  console.error('ニュース記事が見つかりません');
}
```

## Defined in

[src/lib/microcms.ts:334](https://github.com/iU-Alumni-Association/gakuyukai-new/blob/9032bc93fe144cf1419e63a5b72095e28cfeb84b/src/lib/microcms.ts#L334)

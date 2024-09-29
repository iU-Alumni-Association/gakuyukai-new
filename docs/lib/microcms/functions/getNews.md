[**学友会ポータルサイト v0.1.0**](../../../README.md) • **Docs**

***

[学友会ポータルサイト v0.1.0](../../../modules.md) / [lib/microcms](../README.md) / getNews

# Function: getNews()

> **getNews**(`page`, `limit`, `categoryId`?): `Promise`\<`object`\>

ニュース記事のリストを取得します。

## Parameters

• **page**: `number` = `1`

ページネーション用の現在のページ番号

• **limit**: `number` = `10`

1ページあたりのニュース記事数

• **categoryId?**: `string`

（オプション）カテゴリIDでフィルタリングする

## Returns

`Promise`\<`object`\>

- ニュース記事リストと合計記事数

### contents

> **contents**: [`Blog`](../../types/type-aliases/Blog.md)[]

### totalCount

> **totalCount**: `number`

## Example

```
const { contents, totalCount } = await getNews(1, 10);
console.log('ニュース記事数:', totalCount);
contents.forEach(news => {
  console.log(news.title);
});
```

## Defined in

[src/lib/microcms.ts:289](https://github.com/iU-Alumni-Association/gakuyukai-new/blob/9032bc93fe144cf1419e63a5b72095e28cfeb84b/src/lib/microcms.ts#L289)

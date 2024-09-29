[**学友会ポータルサイト v0.1.0**](../../../README.md) • **Docs**

***

[学友会ポータルサイト v0.1.0](../../../modules.md) / [lib/microcms](../README.md) / getBlogsByQuery

# Function: getBlogsByQuery()

> **getBlogsByQuery**(`query`, `page`, `limit`): `Promise`\<`object`\>

クエリ文字列を使ってブログ記事を検索します。

## Parameters

• **query**: `string`

フィルタリングするための検索文字列

• **page**: `number` = `1`

ページネーション用の現在のページ番号

• **limit**: `number` = `10`

1ページあたりのブログ記事数

## Returns

`Promise`\<`object`\>

- 検索クエリに一致するブログリストと合計記事数

### contents

> **contents**: [`Blog`](../../types/type-aliases/Blog.md)[]

### totalCount

> **totalCount**: `number`

## Example

```
const { contents, totalCount } = await getBlogsByQuery('JavaScript', 1, 10);
console.log('検索結果:', totalCount);
contents.forEach(blog => {
  console.log(blog.title);
});
```

## Defined in

[src/lib/microcms.ts:242](https://github.com/iU-Alumni-Association/gakuyukai-new/blob/9032bc93fe144cf1419e63a5b72095e28cfeb84b/src/lib/microcms.ts#L242)

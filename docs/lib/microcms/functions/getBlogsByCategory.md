[**学友会ポータルサイト v0.1.0**](../../../README.md) • **Docs**

***

[学友会ポータルサイト v0.1.0](../../../modules.md) / [lib/microcms](../README.md) / getBlogsByCategory

# Function: getBlogsByCategory()

> **getBlogsByCategory**(`categoryId`, `page`, `limit`): `Promise`\<`object`\>

指定されたカテゴリでブログ記事を取得します。

## Parameters

• **categoryId**: `string`

カテゴリのユニークなID

• **page**: `number` = `1`

ページネーション用の現在のページ番号

• **limit**: `number` = `10`

1ページあたりのブログ記事数

## Returns

`Promise`\<`object`\>

- 指定カテゴリのブログリストと合計記事数

### contents

> **contents**: [`Blog`](../../types/type-aliases/Blog.md)[]

### totalCount

> **totalCount**: `number`

## Example

```
const { contents, totalCount } = await getBlogsByCategory('category-id-123', 1, 10);
console.log('カテゴリ内ブログ数:', totalCount);
contents.forEach(blog => {
  console.log(blog.title);
});
```

## Defined in

[src/lib/microcms.ts:154](https://github.com/iU-Alumni-Association/gakuyukai-new/blob/9032bc93fe144cf1419e63a5b72095e28cfeb84b/src/lib/microcms.ts#L154)

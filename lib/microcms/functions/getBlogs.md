[**学友会ポータルサイト v0.1.0**](../../../README.md) • **Docs**

***

[学友会ポータルサイト v0.1.0](../../../modules.md) / [lib/microcms](../README.md) / getBlogs

# Function: getBlogs()

> **getBlogs**(`page`, `limit`): `Promise`\<`object`\>

MicroCMSからブログ記事のリストを取得します。

## Parameters

• **page**: `number` = `1`

ページネーション用の現在のページ番号

• **limit**: `number` = `10`

1ページあたりのブログ記事数

## Returns

`Promise`\<`object`\>

- ブログリストと合計記事数を含むオブジェクト

### contents

> **contents**: [`Blog`](../../types/type-aliases/Blog.md)[]

### totalCount

> **totalCount**: `number`

## Example

```
const { contents, totalCount } = await getBlogs(1, 10);
console.log('ブログの合計数:', totalCount);
contents.forEach(blog => {
  console.log(blog.title);
});
```

## Defined in

[src/lib/microcms.ts:41](https://github.com/iU-Alumni-Association/gakuyukai-new/blob/9032bc93fe144cf1419e63a5b72095e28cfeb84b/src/lib/microcms.ts#L41)

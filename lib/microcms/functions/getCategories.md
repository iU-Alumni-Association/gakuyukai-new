[**学友会ポータルサイト v0.1.0**](../../../README.md) • **Docs**

***

[学友会ポータルサイト v0.1.0](../../../modules.md) / [lib/microcms](../README.md) / getCategories

# Function: getCategories()

> **getCategories**(): `Promise`\<[`Category`](../../types/type-aliases/Category.md)[]\>

MicroCMSからすべてのカテゴリのリストを取得します。

## Returns

`Promise`\<[`Category`](../../types/type-aliases/Category.md)[]\>

- カテゴリリスト

## Example

```
const categories = await getCategories();
console.log('取得したカテゴリ数:', categories.length);
categories.forEach(category => {
  console.log(category.name);
});
```

## Defined in

[src/lib/microcms.ts:117](https://github.com/iU-Alumni-Association/gakuyukai-new/blob/9032bc93fe144cf1419e63a5b72095e28cfeb84b/src/lib/microcms.ts#L117)

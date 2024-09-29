[**学友会ポータルサイト v0.1.0**](../../../README.md) • **Docs**

***

[学友会ポータルサイト v0.1.0](../../../modules.md) / [lib/microcms](../README.md) / getCategory

# Function: getCategory()

> **getCategory**(`categoryId`): `Promise`\<`null` \| [`Category`](../../types/type-aliases/Category.md)\>

指定されたカテゴリの詳細情報を取得します。

## Parameters

• **categoryId**: `string`

カテゴリのユニークなID

## Returns

`Promise`\<`null` \| [`Category`](../../types/type-aliases/Category.md)\>

- カテゴリの詳細情報、エラー時はnullを返します

## Example

```
const categoryDetail = await getCategory('category-id-123');
if (categoryDetail) {
  console.log('カテゴリ名:', categoryDetail.name);
} else {
  console.error('カテゴリが見つかりません');
}
```

## Defined in

[src/lib/microcms.ts:199](https://github.com/iU-Alumni-Association/gakuyukai-new/blob/9032bc93fe144cf1419e63a5b72095e28cfeb84b/src/lib/microcms.ts#L199)

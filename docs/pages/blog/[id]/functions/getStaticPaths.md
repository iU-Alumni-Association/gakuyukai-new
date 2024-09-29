[**学友会ポータルサイト v0.1.0**](../../../../README.md) • **Docs**

***

[学友会ポータルサイト v0.1.0](../../../../modules.md) / [pages/blog/\[id\]](../README.md) / getStaticPaths

# Function: getStaticPaths()

> **getStaticPaths**(`context`): `GetStaticPathsResult`\<`ParsedUrlQuery`\> \| `Promise`\<`GetStaticPathsResult`\<`ParsedUrlQuery`\>\>

GetStaticPaths - ブログページ用の動的パスを生成します。
ブログIDのリストを取得してパスを作成します。

## Parameters

• **context**: `GetStaticPathsContext`

## Returns

`GetStaticPathsResult`\<`ParsedUrlQuery`\> \| `Promise`\<`GetStaticPathsResult`\<`ParsedUrlQuery`\>\>

- 動的パスとFallback設定を返す

## Defined in

[src/pages/blog/\[id\].tsx:131](https://github.com/iU-Alumni-Association/gakuyukai-new/blob/9032bc93fe144cf1419e63a5b72095e28cfeb84b/src/pages/blog/[id].tsx#L131)

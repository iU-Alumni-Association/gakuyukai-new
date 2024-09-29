[**学友会ポータルサイト v0.1.0**](../../../../README.md) • **Docs**

***

[学友会ポータルサイト v0.1.0](../../../../modules.md) / [pages/news/\[id\]](../README.md) / getStaticPaths

# Function: getStaticPaths()

> **getStaticPaths**(`context`): `GetStaticPathsResult`\<`ParsedUrlQuery`\> \| `Promise`\<`GetStaticPathsResult`\<`ParsedUrlQuery`\>\>

静的生成用のパスを生成します。

## Parameters

• **context**: `GetStaticPathsContext`

## Returns

`GetStaticPathsResult`\<`ParsedUrlQuery`\> \| `Promise`\<`GetStaticPathsResult`\<`ParsedUrlQuery`\>\>

- 記事のパスリストおよびフォールバックの有効化設定

## Remarks

まだ事前生成されていないパスも動的に生成できるよう、`fallback: true` に設定しています。

## Defined in

[src/pages/news/\[id\].tsx:90](https://github.com/iU-Alumni-Association/gakuyukai-new/blob/9032bc93fe144cf1419e63a5b72095e28cfeb84b/src/pages/news/[id].tsx#L90)

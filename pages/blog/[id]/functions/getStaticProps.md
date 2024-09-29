[**学友会ポータルサイト v0.1.0**](../../../../README.md) • **Docs**

***

[学友会ポータルサイト v0.1.0](../../../../modules.md) / [pages/blog/\[id\]](../README.md) / getStaticProps

# Function: getStaticProps()

> **getStaticProps**(`context`): `GetStaticPropsResult`\<`object`\> \| `Promise`\<`GetStaticPropsResult`\<`object`\>\>

GetStaticProps - 指定されたIDに基づいてブログデータを取得します。

## Parameters

• **context**: `GetStaticPropsContext`\<`ParsedUrlQuery`, `PreviewData`\>

Next.jsのコンテキストオブジェクト、ルートパラメータを含む

## Returns

`GetStaticPropsResult`\<`object`\> \| `Promise`\<`GetStaticPropsResult`\<`object`\>\>

- ブログデータ、またはデータが見つからない場合は404を返す

## Defined in

[src/pages/blog/\[id\].tsx:151](https://github.com/iU-Alumni-Association/gakuyukai-new/blob/9032bc93fe144cf1419e63a5b72095e28cfeb84b/src/pages/blog/[id].tsx#L151)

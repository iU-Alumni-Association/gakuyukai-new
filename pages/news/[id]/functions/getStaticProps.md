[**学友会ポータルサイト v0.1.0**](../../../../README.md) • **Docs**

***

[学友会ポータルサイト v0.1.0](../../../../modules.md) / [pages/news/\[id\]](../README.md) / getStaticProps

# Function: getStaticProps()

> **getStaticProps**(`context`): `GetStaticPropsResult`\<`object`\> \| `Promise`\<`GetStaticPropsResult`\<`object`\>\>

ニュース詳細ページのデータをビルド時に取得します。

## Parameters

• **context**: `GetStaticPropsContext`\<`ParsedUrlQuery`, `PreviewData`\>

静的プロップスのコンテキスト

## Returns

`GetStaticPropsResult`\<`object`\> \| `Promise`\<`GetStaticPropsResult`\<`object`\>\>

- ページのプロパティ、またはニュースが見つからない場合は `notFound` フラグ

## Remarks

Incremental Static Regeneration (ISR) を利用して、ニュースが定期的に最新のものに更新されます。

## Defined in

[src/pages/news/\[id\].tsx:116](https://github.com/iU-Alumni-Association/gakuyukai-new/blob/9032bc93fe144cf1419e63a5b72095e28cfeb84b/src/pages/news/[id].tsx#L116)

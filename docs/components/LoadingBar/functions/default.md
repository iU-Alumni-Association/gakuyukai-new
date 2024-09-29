[**学友会ポータルサイト v0.1.0**](../../../README.md) • **Docs**

***

[学友会ポータルサイト v0.1.0](../../../modules.md) / [components/LoadingBar](../README.md) / default

# Function: default()

> **default**(`props`, `deprecatedLegacyContext`?): `ReactNode`

LoadingBar コンポーネント

## Parameters

• **props**: `LoadingBarProps`

• **deprecatedLegacyContext?**: `any`

**Deprecated**

**See**

[React Docs](https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-lifecycle-methods)

## Returns

`ReactNode`

## Description

ローディング中の状態を視覚化するためのプログレスバーを表示します。ローディング中は進行状況が90%まで進み、完了後に非表示になります。

## Example

```tsx
<LoadingBar loading={true} />
```

## Remarks

`loading` が `true` の場合、バーが90%まで増加し、`loading` が `false` に変わったタイミングで100%まで進行してからフェードアウトします。

## Defined in

[src/components/LoadingBar.tsx:36](https://github.com/iU-Alumni-Association/gakuyukai-new/blob/9032bc93fe144cf1419e63a5b72095e28cfeb84b/src/components/LoadingBar.tsx#L36)

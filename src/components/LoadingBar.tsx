import React, {
  useState,
  useEffect,
} from 'react';

interface LoadingBarProps {
  loading: boolean;
}

/**
 * LoadingBar コンポーネント.
 *
 * ローディング中の状態を視覚化するためのプログレスバーを表示します。ローディング中は進行状況が90%まで進み、完了後に非表示になります。
 *
 * @remarks
 *   `loading` が `true` の場合、バーが90%まで増加し、`loading` が
 *   `false` に変わったタイミングで100%まで進行してからフェードアウトします。
 * @example
 *   ```tsx
 *   <LoadingBar loading={true} />
 *   ```;
 *
 * @param {object} props - コンポーネントのプロパティ.
 * @source
 */
const LoadingBar: React.FC<LoadingBarProps> = ({
  loading,
}) => {
  const [progress, setProgress] = useState(0); // プログレスバーの進行状況
  const [visible, setVisible] = useState(false); // プログレスバーの表示制御

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (loading) {
      // ローディング中の進行状況をリセットし、バーを表示
      setVisible(true);
      setProgress(0);

      // プログレスバーを90%まで定期的に増加
      interval = setInterval(() => {
        setProgress((prev) =>
          prev < 90 ? prev + 10 : prev,
        );
      }, 300);
    } else {
      // ローディング完了時に100%に設定し、バーをフェードアウト
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
      }, 500);
    }

    // コンポーネントがアンマウントされるか、`loading` 状態が変わったときにクリーンアップ
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div
      className={`fixed left-0 top-0 z-[1000] h-1 w-full transition-opacity duration-300 ease-linear ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="h-full bg-yellow-200 transition-all duration-300 ease-linear"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default LoadingBar;

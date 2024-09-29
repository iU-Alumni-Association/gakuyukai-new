import React, {
  useState,
  useEffect,
} from 'react';

interface LoadingBarProps {
  loading: boolean;
}

/**
 * LoadingBar Component.
 *
 * Displays a progress bar at the top of the
 * screen when a loading state is active.
 *
 * @param {boolean} loading - Determines whether
 *   the loading bar is visible and active.
 */
const LoadingBar: React.FC<LoadingBarProps> = ({
  loading,
}) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (loading) {
      // Start showing the loading bar
      setVisible(true);
      setProgress(0);

      // Increment progress until 90%
      interval = setInterval(() => {
        setProgress((prev) =>
          prev < 90 ? prev + 10 : prev,
        );
      }, 300);
    } else {
      // Complete progress and hide the loading bar
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
      }, 500);
    }

    return () => clearInterval(interval); // Clean up interval on component unmount or when loading changes
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

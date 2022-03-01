import React from 'react';

export const useMyHook = () => {
  React.useEffect(() => {
    console.log('useMyHook :: useEffect being called.');

    return () => {
      console.log('useMyHook :: useEffect return function being called.');
    };
  }, []);
};

/**
 * This function was taken directly from react-use:
 * https://github.com/streamich/react-use/blob/7c0597ca8f6cd84fbf9ce24f2c0de83824d4b46f/docs/useMountedState.md
 *
 * Usage:
 * const Demo = () => {
 * const isMounted = useMountedState();
 * React.useEffect(() => {
 *     setTimeout(() => {
 *       if (isMounted()) {
 *         // ...
 *       } else {
 *         // ...
 *       }
 *     }, 1000);
 *   });
 * };
 */
export function useMountedState(): () => boolean {
  const mountedRef = React.useRef<boolean>(false);
  const get = React.useCallback(() => mountedRef.current, []);

  React.useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return get;
}

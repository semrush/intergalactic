import React from 'react';

let uniqueId = 0;
export const usePromise = <T>(
  promise: () => Promise<T>,
): { data: T; error: Error; loading: boolean } => {
  const loadingIdRef = React.useRef(-1);

  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const loadingId = uniqueId++;
    let canceled = false;
    loadingIdRef.current = loadingId;
    promise()
      .then((data) => {
        if (loadingId !== loadingIdRef.current || canceled) return;
        setData(data as T);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        setError(error);
        setLoading(false);
      });
    return () => {
      canceled = true;
    };
  }, [promise]);

  return { data, loading, error };
};

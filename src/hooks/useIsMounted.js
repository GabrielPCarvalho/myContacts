import { useEffect, useRef, useCallback } from 'react';

export default function useIsMounted() {
  const isMOunted = useRef(false);

  useEffect(() => {
    isMOunted.current = true;

    return () => {
      isMOunted.current = false;
    }
  },[]);

  const getIsMounted = useCallback(() => {
    return isMOunted.current;
  }, []);

  return getIsMounted;
}

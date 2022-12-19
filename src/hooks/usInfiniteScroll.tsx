import React, { useEffect, useRef, useState } from 'react';

const usInfiniteScroll = (
  callback: () => void,
): [
  React.MutableRefObject<any>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const reference = useRef(null);
  const [isIntersected, setIsIntersected] = useState<boolean>(false);

  const infiniteScroll = (entries) => {
    const [entry] = entries;
    const intersected = entry.isIntersecting;
    if (intersected) {
      setIsIntersected(true);
      callback();
    }
  };

  const options = {
    threshold: 1.0,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(infiniteScroll, options);

    if (isIntersected) {
      observer.unobserve(reference.current);
    }

    if (reference.current && !isIntersected) {
      observer.observe(reference.current);
    }

    return () => {
      if (reference.current) {
        observer.unobserve(reference.current);
      }
    };
  }, [options, isIntersected]);

  return [reference, isIntersected, setIsIntersected];
};

export default usInfiniteScroll;

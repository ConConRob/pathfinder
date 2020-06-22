import { useState, useEffect } from 'react';

export function useIsMouseDown() {
  const [isMouseDown, setIsMouseDown] = useState(false);
  useEffect(() => {
    function setMouseDown() {
      setIsMouseDown(true);
    }
    function setMouseUp() {
      setIsMouseDown(false);
    }
    window.addEventListener('mousedown', setMouseDown);
    window.addEventListener('mouseup', setMouseUp);
    return () => {
      window.removeEventListener('mousedown', setMouseDown);
      window.removeEventListener('mousedown', setMouseUp);
    };
  }, []);

  console.log({ isMouseDown });
  return isMouseDown;
}

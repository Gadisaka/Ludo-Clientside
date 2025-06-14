import { useEffect, useState } from "react";

const getPositionStyle = (id) => {
  const el = document.getElementById(id);
  if (!el) return { top: 0, left: 0, id };
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left,
    id,
  };
};

const useTokenAnimation = ({ position, path, color, index, moved }) => {
  const [animatedPosition, setAnimatedPosition] = useState(
    getPositionStyle(position)
  );
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (
      !path ||
      path.length === 0 ||
      moved?.color !== color ||
      moved?.index !== index
    )
      return;

    let currentIndex = 0;
    setIsAnimating(true);

    const interval = setInterval(() => {
      const nextId = path[currentIndex];
      const nextStyle = getPositionStyle(nextId);

      setAnimatedPosition({ ...nextStyle });
      currentIndex++;

      if (currentIndex >= path.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [path, moved, color, index]);

  useEffect(() => {
    if (!isAnimating && (!path || path.length === 0)) {
      setAnimatedPosition(getPositionStyle(position));
    }
  }, [position]);

  return { animatedPosition, isAnimating };
};

export default useTokenAnimation;

import { useCallback, useLayoutEffect, useState } from "react";

const getDimensions = (element: any) => element.getBoundingClientRect();

export function useDimensions(responsive: boolean = true) {
  const [dimensions, setDimensions] = useState<any>(null);
  const [element, setElement] = useState<any>(null);

  const hook = useCallback((e: any) => setElement(e), []);

  useLayoutEffect(() => {
    if (element) {
      const updateDimensions = () => {
        window.requestAnimationFrame(() => {
          setDimensions(getDimensions(element));
        });
      };

      updateDimensions();
      if (responsive) {
        window.addEventListener("resize", updateDimensions);

        return () => {
          window.removeEventListener("resize", updateDimensions);
        };
      }
    }
  }, [element, hook, responsive]);

  return [hook, dimensions, element];
}

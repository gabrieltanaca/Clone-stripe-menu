import React, { useRef, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useDimensions } from "./dimensions";
import { Context } from "./Provider";

interface DropdownOptionProps {
  name: string;
  content: Function;
  backgroundHeight: any;
}

let lastOptionId = 0;

export function DropdownOption({
  name,
  content: Content,
  backgroundHeight,
}: DropdownOptionProps) {
  const idRef = useRef(++lastOptionId);
  const id = idRef.current;

  const [optionHook, optionDimensions] = useDimensions();
  const [registered, setRegistered] = useState<boolean>(false);

  const {
    registerOption,
    updateOptionProps,
    deleteOptionById,
    setTargetId,
    targetId,
  } = useContext(Context);

  useEffect(() => {
    if (!registered && optionDimensions) {
      const WrappedContent = () => {
        const contentRef = useRef() as React.MutableRefObject<HTMLDivElement>;

        useEffect(() => {
          const contentDimensions = contentRef.current.getBoundingClientRect();
          updateOptionProps(id, { contentDimensions });
        }, []);

        return (
          <div ref={contentRef}>
            <Content />
          </div>
        );
      };

      registerOption({
        id,
        optionDimensions,
        optionCenterX: optionDimensions.x + optionDimensions.Width / 2,
        WrappedContent,
        backgroundHeight,
      });

      setRegistered(true);
    } else if (registered && optionDimensions) {
      updateOptionProps(id, {
        optionDimensions,
        optionCenterX: optionDimensions.x + optionDimensions.Width / 2,
      });
    }
  }, [
    registerOption,
    id,
    registered,
    optionDimensions,
    updateOptionProps,
    deleteOptionById,
    backgroundHeight,
  ]);

  return (
    <motion.button className="dropdown-option" ref={optionHook}>
      {name}
    </motion.button>
  );
}

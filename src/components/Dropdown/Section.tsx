import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";

import { Context } from "./Provider";

interface SectionProps {
  option: any;
}

export function DropdownSection({ option }: SectionProps) {
  useEffect(() => {
    console.log(option);
  }, []);

  const { updateOptionsProps, cachedId } = useContext(Context);

  const { id, optionDimensions, optionCenterX, contentDimensions } = option;

  const isActive = cachedId === id;

  return (
    <motion.div className="dropdown-section" animate={{ x: optionCenterX }}>
      <option.WrappedContent />
    </motion.div>
  );
}

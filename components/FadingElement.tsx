import React, { useMemo, useState } from "react";
import {
  circInOut,
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

type FadingElementProps = {
  children: React.ReactNode;
  parentRef: React.RefObject<HTMLElement>;
  xOffset?: number;
  yOffset?: number;
  className?: string;
};

function FadingElement({
  children,
  parentRef,
  className = "",
  xOffset = 0,
  yOffset = 0,
}: FadingElementProps) {
  const { scrollYProgress } = useScroll({
    target: parentRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  const opacity = useTransform(
    scrollYProgress,
    [0.25, 0.3, 0.7, 0.75],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0.25, 0.75],
    [100 + yOffset, -100 + yOffset],
    {
      ease: circInOut,
    }
  );

  const [variant, setVariant] = useState<"hidden" | "visible">("hidden");

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value === 0 || value === 1) {
      setVariant("hidden");
      return;
    }

    setVariant("visible");
  });

  const variants = useMemo(
    () => ({
      visible: { display: "block" },
      hidden: {
        transitionEnd: {
          display: "none",
        },
      },
    }),
    []
  );

  return (
    <motion.div
      className={`fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center backdrop-blur-sm ${className}`}
      style={{ x: xOffset, y, opacity }}
      variants={variants}
      animate={variant}
    >
      {children}
    </motion.div>
  );
}

export default React.memo(FadingElement);

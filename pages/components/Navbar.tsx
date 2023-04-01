import Image from "next/image";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";
import { useState } from "react";

function Navbar() {
  const { scrollYProgress } = useScroll();
  const [scrolledUp, setScrolledUp] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrolledUp(latest <= scrollYProgress.getPrevious());
  });

  return (
    <motion.div
      animate={{
        opacity: scrolledUp ? 1 : 0,
      }}
      className="fixed top-0 left-0 z-50 w-full border-b border-stone-500 bg-stone-950/30 backdrop-blur-md"
    >
      <div className="m-auto py-8 h-full max-w-8xl flex justify-start">
        <Image src="/img/logo-white.svg" alt="Logo" width={150} height={150} />
      </div>
    </motion.div>
  );
}

export default Navbar;

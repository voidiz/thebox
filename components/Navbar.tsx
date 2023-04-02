import Image from "next/image";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";
import { useCallback, useState } from "react";
import React from "react";

type NavbarProps = {
  heroRef: React.RefObject<HTMLDivElement>;
  introRef: React.RefObject<HTMLDivElement>;
  specsRef: React.RefObject<HTMLDivElement>;
  footerRef: React.RefObject<HTMLDivElement>;
};

function Button({
  text,
  linkRef,
}: {
  text: string;
  linkRef?: React.RefObject<HTMLDivElement>;
}) {
  const handleClick = useCallback(() => {
    linkRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [linkRef]);

  return (
    <button
      onClick={handleClick}
      className="focus:outline-none font-medium text-xl transition text-slate-200 hover:text-slate-400"
    >
      {text}
    </button>
  );
}

function Navbar({ heroRef, introRef, specsRef, footerRef }: NavbarProps) {
  const { scrollYProgress } = useScroll();
  const [scrolledUp, setScrolledUp] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrolledUp(latest <= scrollYProgress.getPrevious());
  });

  const handleLogoClick = () => {
    heroRef?.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.div
      animate={{
        opacity: scrolledUp ? 1 : 0,
        display: scrolledUp ? "block" : undefined,
        transitionEnd: {
          display: scrolledUp ? "block" : "none",
        },
      }}
      className="fixed top-8 w-full z-50"
    >
      <div className="flex justify-between h-full mx-auto p-8 8xl:rounded-lg bg-slate-800/40 backdrop-blur-sm max-w-8xl">
        <Image src="/img/logo-3-white.svg" alt="Logo" width={96} height={28} onClick={handleLogoClick} />
        <div className="border-l-2 border-slate-600 pl-8 flex gap-8">
          <Button text="info" linkRef={introRef} />
          <Button text="specs" linkRef={specsRef} />
          <Button text="contact" linkRef={footerRef} />
        </div>
      </div>
    </motion.div>
  );
}

export default React.memo(Navbar);

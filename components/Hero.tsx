import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import ImageSequence from "@/components/ImageSequence";
import { useRef, useState } from "react";

function Hero() {
  const [hideText, setHideText] = useState(false);
  const heroTextRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroTextRef,
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setHideText(latest < 0.4);
    console.log(latest)
  });


  return (
    <div className="relative w-full">
      <motion.div
        className="absolute top-[25vh] left-2/4 -translate-x-1/2"
        initial={{
          x: "-50%",
          y: -40,
          opacity: 0
        }}
        animate={{
          x: "-50%",
          y: 0,
          opacity: hideText ? 0 : 1,
        }}
        transition={{
          ease: "easeInOut"
        }}
      >
        <Image src="/img/thebox-pro-white.svg" width={1500} height={160} alt="Hero image" />
      </motion.div>
      <ImageSequence
        className="h-[600vh] bg-[url('/assets/effect.webp')] bg-no-repeat bg-right-top"
        assetKey="/assets/heroAnim/<id>.webp"
      />
      <motion.div
        className="overflow-hidden absolute top-[65vh] left-1/2 place-self-center -translate-x-1/2"
      >
        <motion.h2
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: hideText ? 0 : 1,
          }}
          transition={{
            delay: 0.3,
            ease: "easeInOut"
          }}
          className="text-5xl text-white text-center font-bold lowercase" ref={heroTextRef}>
          revolutionizing boxes since tomorrow.
        </motion.h2>
      </motion.div>
    </div>
  );
}
export default Hero;

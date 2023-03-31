import Image from "next/image";
import { motion } from "framer-motion";

function Hero() {
  return (
    <div className="relative w-full">
      <div className="w-screen h-screen">
        <Image className="aspect-square object-contain" src="/img/box.png" alt="Box" fill />
      </div>
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,

        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          type: "spring",
          duration: .6
        }}
        className="overflow-hidden absolute text-7xl text-white text-center font-bold lowercase top-1/3 left-1/2 place-self-center -translate-x-1/2">
        the box, revolutionizing boxes
        since tomorrow.
      </motion.div>
    </div >
  );
}
export default Hero;

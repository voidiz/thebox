import { motion } from "framer-motion";
import ImageSequence from "@/components/ImageSequence";

function Hero() {
  return (
    <div className="relative w-full">
      <ImageSequence
        className="h-[600vh] bg-slate-950 bg-[url('/assets/effect.webp')] bg-no-repeat bg-right-top"
        frames={57}
        format={"/assets/box/<id>.webp"}
      />
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
          duration: 0.6,
        }}
        className="overflow-hidden absolute top-[55vh] left-1/2 place-self-center -translate-x-1/2"
      >
        <h2 className="text-7xl text-white text-center font-bold lowercase">
          the box, revolutionizing boxes since tomorrow.
        </h2>
      </motion.div>
    </div>
  );
}
export default Hero;

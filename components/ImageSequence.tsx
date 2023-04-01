import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
  useInView,
} from "framer-motion";
import React, { useCallback, useEffect, useRef } from "react";

type ImageSequenceProps = {
  frames: number;

  // Image path where the file id sequence is replaced with `<id>`
  // e.g., `/assets/box/<id>.webp`
  format: string;

  className?: string;
};

function ImageSequence({ frames, format, className = "" }: ImageSequenceProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const isInView = useInView(parentRef, { margin: "-400px 0px" });

  const { scrollYProgress } = useScroll({
    target: parentRef,
    layoutEffect: false,
  });

  const imageIndex = useTransform(scrollYProgress, (value) => {
    return Math.floor(value * (frames - 1));
  });

  const getImage = useCallback(
    (idx: number) => format.replace("<id>", idx.toString().padStart(4, "0")),
    [format]
  );

  const preloadImage = useCallback(
    (idx: number) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.src = getImage(idx);
        image.onload = () => {
          resolve(image);
        };
        image.onerror = image.onabort = () => {
          reject(image);
        };
      });
    },
    [getImage]
  );

  // Preload images
  useEffect(() => {
    (async function() {
      const images = await Promise.all(
        [...Array(frames).fill(0)].map((_, i) => preloadImage(i + 1))
      );

      imagesRef.current = images;
    })();
  }, [frames, preloadImage]);

  useMotionValueEvent(imageIndex, "change", (value) => {
    if (!canvasRef.current || imagesRef.current.length === 0) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) {
      console.error("Canvas not supported");
      return;
    }

    requestAnimationFrame(() => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(imagesRef.current[value], 0, 0);
    });
  });

  return (
    <div ref={parentRef} className={className}>
      <div className="fixed top-1/2 -translate-y-1/2 w-screen flex items-center justify-center">
        <motion.canvas
          animate={{
            opacity: isInView ? 1 : 0,
          }}
          className="h-screen"
          ref={canvasRef}
          width={2000}
          height={2000}
        />
      </div>
    </div>
  );
}

export default React.memo(ImageSequence);

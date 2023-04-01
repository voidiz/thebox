import { ASSET_KEY, PreloadedAssetsContext } from "@/contexts/PreloadedAssets";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
  useInView,
} from "framer-motion";
import React, { useCallback, useContext, useEffect, useRef } from "react";

type ImageSequenceProps = {
  assetKey: ASSET_KEY;
  className?: string;
};

function ImageSequence({ assetKey, className = "" }: ImageSequenceProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { assets, loaded } = useContext(PreloadedAssetsContext);

  const isInView = useInView(parentRef, { margin: "-400px 0px" });

  const { scrollYProgress } = useScroll({
    target: parentRef,
    layoutEffect: false,
  });

  const imageIndex = useTransform(scrollYProgress, (value) => {
    if (!loaded) {
      return 0;
    }

    return Math.floor(value * (assets[assetKey].frames - 1));
  });

  const drawImage = useCallback(
    (idx: number) => {
      if (!canvasRef.current || !loaded) {
        return;
      }

      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) {
        console.error("Canvas not supported");
        return;
      }

      requestAnimationFrame(() => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(assets[assetKey].elements[idx], 0, 0);
      });
    },
    [assetKey, assets, loaded]
  );

  useMotionValueEvent(imageIndex, "change", (idx) => {
    drawImage(idx);
  });

  useEffect(() => {
    drawImage(0);
  }, [drawImage]);

  return (
    <div ref={parentRef} className={className}>
      <div className="fixed top-1/2 -translate-y-1/2 w-screen flex items-center justify-center">
        <motion.canvas
          initial={{ opacity: 0 }}
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

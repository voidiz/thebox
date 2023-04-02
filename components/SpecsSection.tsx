import React from "react";
import { useRef } from "react";

import FadingElement from "./FadingElement";
import ImageSequence from "./ImageSequence";
import useMediaQuery from "@/hooks/useMediaQuery";

function IntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const box3 = useRef<HTMLDivElement>(null);
  const box4 = useRef<HTMLDivElement>(null);
  const large = useMediaQuery("(min-width: 768px)");

  return (
    <div className="relative" ref={ref}>
      <ImageSequence
        className="-ml-4 h-[3200px] absolute top-0"
        assetKey="/assets/boxfalling/<id>.webp"
      />
      <div ref={box1} className="h-[800px] w-full">
        <FadingElement className="max-w-md" parentRef={box1} xOffset={large ? 100 : -150}>
          <p className="font-medium text-2xl text-neutral-300">
            the box features{" "}
            <span className="text-white text-3xl">
              transcendental materials
            </span>{" "}
            creating an experience unlike any other
          </p>
        </FadingElement>
      </div>

      <div ref={box2} className="h-[800px] w-full">
        <FadingElement className="max-w-md" parentRef={box2} xOffset={large ? -400 : -50}>
          <p className="font-medium text-2xl text-neutral-300">
            <span className="text-white text-3xl">30x30x30 dimensions</span>{" "}
            make your spatial problems non-existent
          </p>
        </FadingElement>
      </div>

      <div ref={box3} className="h-[800px] w-full">
        <FadingElement className="max-w-md" parentRef={box3} xOffset={large ? 200 : -150}>
          <p className="font-medium text-2xl text-neutral-300">
            utilizing{" "}
            <span className="text-white text-3xl">
              reflective alloys and hydrophobic coating
            </span>{" "}
            preventing damage from natural sources and guaranteeing longetivity
          </p>
        </FadingElement>
      </div>

      <div ref={box4} className="h-[800px] flex justify-center items-center">
        <h1 className="font-medium text-center text-4xl md:text-6xl text-slate-600 mb-16">
          pre-orders available <span className="font-bold">soon</span>.
        </h1>
      </div>
    </div>
  );
}

export default React.memo(IntroSection);

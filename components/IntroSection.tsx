import { useRef } from "react";
import FadingElement from "./FadingElement";
import InfoOverlay from "./InfoOverlay";
import React from "react";
import BoxGrid from "./BoxGrid";
import useMediaQuery from "@/hooks/useMediaQuery";

function IntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);
  const box3 = useRef<HTMLDivElement>(null);
  const large = useMediaQuery("(min-width: 768px)");

  return (
    <div ref={ref}>
      <BoxGrid parentRef={ref} />
      <div ref={box1} className="h-[800px] w-full">
        <FadingElement parentRef={box1} xOffset={large ? 100 : -100}>
          <InfoOverlay>
            <h2 className="text-2xl font-bold md:text-8xl">
              introducing <i>the box</i>.
            </h2>
            <p className="text-md font-medium md:text-4xl text-neutral-300">
              something about many years of research
            </p>
          </InfoOverlay>
        </FadingElement>
      </div>

      <div ref={box2} className="h-[800px] w-full">
        <FadingElement parentRef={box2} xOffset={large ? -500 : -150}>
          <InfoOverlay>
            <h2 className="text-xl font-bold md:text-6xl">
              the best invention since 2024
            </h2>
            <p className="text-md font-medium md:text-4xl text-neutral-300">
              a very good product we think
            </p>
          </InfoOverlay>
        </FadingElement>
      </div>

      <div ref={box3} className="h-[800px] w-full">
        <FadingElement parentRef={box3} xOffset={large ? 100 : 0}>
          <InfoOverlay>
            <h2 className="text-xl font-bold md:text-6xl">but wait</h2>
            <p className="text-md font-medium md:text-4xl text-neutral-300">
              there is more
            </p>
          </InfoOverlay>
        </FadingElement>
      </div>
    </div>
  );
}

export default React.memo(IntroSection);

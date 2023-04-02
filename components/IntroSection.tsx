import { useRef } from "react";
import Image from "next/image";
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
      <div className="relative z-10">
        <div ref={box1} className="h-[800px] w-full">
          <FadingElement parentRef={box1} xOffset={large ? 100 : -100}>
            <InfoOverlay>
              <h2 className="text-2xl font-bold md:text-8xl mb-4">
                introducing
                <span>
                  <Image
                    src="/img/thebox-pro-white.svg"
                    width={600}
                    height={80}
                    alt="Hero image"
                  />
                </span>
              </h2>
              <p className="text-md font-medium md:text-4xl text-neutral-300">
                the result of ten years of architectural and structural
                development
              </p>
            </InfoOverlay>
          </FadingElement>
        </div>

        <div ref={box2} className="h-[800px] w-full">
          <FadingElement parentRef={box2} xOffset={large ? -500 : -150}>
            <InfoOverlay>
              <h2 className="text-xl font-bold md:text-6xl mb-4">
                &ldquo;the best invention since the plane&rdquo;
              </h2>
              <p className="text-md font-medium md:text-4xl text-neutral-300">
                praised by numerous critics
              </p>
            </InfoOverlay>
          </FadingElement>
        </div>

        <div ref={box3} className="h-[800px] w-full">
          <FadingElement parentRef={box3} xOffset={large ? 100 : 0}>
            <InfoOverlay>
              <h2 className="text-xl font-bold md:text-6xl mb-4">but wait</h2>
              <p className="text-md font-medium md:text-4xl text-neutral-300">
                there is more
              </p>
            </InfoOverlay>
          </FadingElement>
        </div>
      </div>
    </div>
  );
}

export default React.memo(IntroSection);

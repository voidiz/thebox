import React, { useMemo, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  motion as motion2d,
  useMotionValueEvent,
} from "framer-motion";
import {
  LayoutOrthographicCamera,
  MotionCanvas,
  motion,
} from "framer-motion-3d";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type MeshData = {
  node: THREE.Mesh;
  rX: number;
  rZ: number;
};

type BoxGridProps = {
  parentRef: React.RefObject<HTMLDivElement>;
};

const SIDE = 8;
const WIDTH = 100;
const BOX_GEOMETRY = new THREE.BoxGeometry(WIDTH, WIDTH, WIDTH);
const MATERIAL = new THREE.MeshStandardMaterial({
  color: "#475569",
});

function Lights() {
  return (
    <>
      <ambientLight />
      <directionalLight color="#0f172a" intensity={1} rotation={[1.8, 0, 0]} />
      <directionalLight
        intensity={1}
        color="red"
        position={[0, 0, 5]}
        rotation={[0, 0, 0]}
      />
    </>
  );
}

function Geometry({
  parentRef,
}: {
  parentRef: React.RefObject<HTMLDivElement>;
}) {
  // https://react.dev/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback
  const groupRef = useRef<Map<number, MeshData>>(new Map());

  const { scrollYProgress } = useScroll({
    target: parentRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  const rotationX = useTransform(
    scrollYProgress,
    [0, 1],
    [Math.PI / 16, -Math.PI / 8]
  );

  const rotationY = useTransform(
    scrollYProgress,
    [0, 1],
    [Math.PI / 16, Math.PI / 8]
  );

  useFrame((state) => {
    groupRef.current.forEach(({ node, rX, rZ }) => {
      const elapsed = state.clock.elapsedTime;
      node.rotation.set(rX + elapsed / 10, 0, rZ + elapsed / 10);
    });
  });

  const boxes = useMemo(
    () =>
      [...Array(SIDE * SIDE).fill(0)].map((_, i) => {
        const x = (i % SIDE) * WIDTH * 2;
        const y = Math.floor(i / SIDE) * WIDTH * 2;
        const rX = Math.random() * Math.PI;
        const rZ = Math.random() * Math.PI;

        return (
          <mesh
            key={i}
            ref={(node) => {
              if (node) {
                groupRef.current.set(i, { node, rX, rZ });
              } else {
                groupRef.current.delete(i);
              }
            }}
            position={[x, y, 0]}
            rotation={[rX, 0, rZ]}
            geometry={BOX_GEOMETRY}
            material={MATERIAL}
          />
        );
      }),
    []
  );

  return (
    <motion.group
      rotation={[rotationX, rotationY, 0]}
      position={[-4 * 200, -4 * 200, 0]}
    >
      {boxes}
    </motion.group>
  );
}

function BoxGrid({ parentRef }: BoxGridProps) {
  const [variant, setVariant] = useState<"hidden" | "visible">("hidden");

  const variants = useMemo(
    () => ({
      visible: { opacity: 1 },
      hidden: {
        opacity: 0,
      },
    }),
    []
  );

  const { scrollYProgress } = useScroll({
    target: parentRef,
    layoutEffect: false,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value === 0 || value === 1) {
      setVariant("hidden");
      return;
    }

    setVariant("visible");
  });

  return (
    <motion2d.div
      initial="hidden"
      variants={variants}
      animate={variant}
      className="fixed top-1/2 -translate-y-1/2 w-screen h-screen"
    >
      <MotionCanvas>
        <Lights />
        <LayoutOrthographicCamera
          makeDefault
          position={[-200, -200, 800]}
          near={0}
          zoom={1.4}
          far={2000}
        />
        <Geometry parentRef={parentRef} />
      </MotionCanvas>
    </motion2d.div>
  );
}

export default React.memo(BoxGrid);

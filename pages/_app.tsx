import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { extend } from "@react-three/fiber";
import {
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  Group,
  DirectionalLight,
  AmbientLight,
} from "three";

// Necessary for framer-motion-3d?
extend({
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  Group,
  DirectionalLight,
  AmbientLight,
});

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

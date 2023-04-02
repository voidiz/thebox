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
  RectAreaLight,
  PointLight,
  SpotLight,
  CubeCamera,
} from "three";
import { PreloadedAssetsContextProvider } from "@/contexts/PreloadedAssets";

// Necessary for framer-motion-3d?
extend({
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  Group,
  DirectionalLight,
  AmbientLight,
  RectAreaLight,
  PointLight,
  SpotLight,
  CubeCamera,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PreloadedAssetsContextProvider>
      <Component {...pageProps} />
    </PreloadedAssetsContextProvider>
  );
}

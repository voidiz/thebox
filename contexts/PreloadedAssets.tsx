import { createContext, useContext, useEffect, useState } from "react";

export type ASSET_KEY =
  | "/assets/box/<id>.webp"
  | "/assets/boxfalling/<id>.webp"
  | "/assets/heroAnim/<id>.webp"
  | "/assets/anim2/<id>.webp";

// Key, number of frames
const ASSETS: Record<ASSET_KEY, number> = {
  "/assets/boxfalling/<id>.webp": 120,
  "/assets/box/<id>.webp": 57,
  "/assets/heroAnim/<id>.webp": 120,
  "/assets/anim2/<id>.webp": 120,
};

type PreloadedAsset = {
  elements: HTMLImageElement[];
  frames: number;
};

type PreloadedAssetsValue =
  | {
    loaded: false;
    assets: {};
  }
  | {
    loaded: true;
    assets: Record<ASSET_KEY, PreloadedAsset>;
  };

const initialValue = {
  loaded: false as false,
  assets: {},
};

export const PreloadedAssetsContext =
  createContext<PreloadedAssetsValue>(initialValue);

function preloadImage(
  assetKey: string,
  idx: number
): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.src = assetKey.replace("<id>", idx.toString().padStart(4, "0"));
    image.onload = () => {
      resolve(image);
    };
    image.onerror = image.onabort = () => {
      reject(image);
    };
  });
}

// Should be called on initial page load
async function loadPreloadedAssets(): Promise<PreloadedAssetsValue> {
  const assets = new Map<string, PreloadedAsset>();
  for (const [assetKey, frames] of Object.entries(ASSETS)) {
    const elements = await Promise.all(
      [...Array(frames).fill(0)].map((_, i) => preloadImage(assetKey, i + 1))
    );

    assets.set(assetKey, { elements, frames });
  }

  return {
    assets: Object.fromEntries(assets) as Record<ASSET_KEY, PreloadedAsset>,
    loaded: true,
  };
}

export function PreloadedAssetsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preloadedAssetsValue, setPreloadedAssetsValue] =
    useState<PreloadedAssetsValue>(initialValue);

  useEffect(() => {
    (async function() {
      const assets = await loadPreloadedAssets();
      setPreloadedAssetsValue(assets);
    })();
  }, []);

  return (
    <PreloadedAssetsContext.Provider value={preloadedAssetsValue}>
      {children}
    </PreloadedAssetsContext.Provider>
  );
}

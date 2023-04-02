import React from "react";
import Image from "next/image";

function Link({ url, text }: { url: string; text: string }) {
  return (
    <a
      className="text-lg font-bold text-neutral-300 transition hover:text-slate-400"
      href={url}
    >
      {text}
    </a>
  );
}

function Footer() {
  return (
    <div className="relative z-10 flex flex-col items-end justify-center mx-auto max-w-8xl h-[200px] 8xl:rounded-lg p-8">
      <Image className="p-4" src="/img/logo-3-white.svg" alt="Logo" width={96 * 3} height={28 * 3} />
      <p className="mt-4 text-neutral-400 text-md font-medium">
        made without{" "}
        <Image
          className="inline"
          src="/assets/sleep.svg"
          width={24}
          height={24}
          alt="Sleep"
        />{" "}
        by <Link url="https://github.com/voidiz" text="@voidiz" /> and{" "}
        <Link url="https://github.com/yamanadamnor" text="@yamanadamnor" />
      </p>
    </div>
  );
}

export default React.memo(Footer);

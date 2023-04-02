import React from "react";

type InfoOverlayProps = {
  children: React.ReactNode;
};

function InfoOverlay({ children }: InfoOverlayProps) {
  return (
    <div className="shadow-lg shadow-slate-600/20 p-6 rounded bg-slate-800/40 text-slate-200 max-w-xl">
      {children}
    </div>
  );
}

export default React.memo(InfoOverlay);

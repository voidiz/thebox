import React from "react";

type InfoOverlayProps = {
  children: React.ReactNode;
};

function InfoOverlay({ children }: InfoOverlayProps) {
  return (
    <div className="shadow-lg shadow-slate-600/20 p-6 rounded-xl bg-slate-800/20 backdrop-blur-sm text-slate-200 max-w-xl">
      {children}
    </div>
  );
}

export default React.memo(InfoOverlay);

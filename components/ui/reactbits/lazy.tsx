"use client";

import dynamic from "next/dynamic";

/**
 * Code-split, client-only versions of the WebGL components. Their code is only
 * downloaded when one of them is actually rendered (i.e. when a WebGL slot is free).
 */
export const LaserFlowLazy = dynamic(() => import("./LaserFlow"), {
  ssr: false,
});
export const DotGridLazy = dynamic(() => import("./DotGrid"), { ssr: false });
export const LiquidEtherLazy = dynamic(() => import("../../LiquidEther"), {
  ssr: false,
});
export const MagnetLinesLazy = dynamic(() => import("./MagnetLines"), {
  ssr: false,
});
export const ReflectiveCardLazy = dynamic(() => import("./ReflectiveCard"), {
  ssr: false,
});
export const SpecularButtonLazy = dynamic(() => import("./SpecularButton"), {
  ssr: false,
});

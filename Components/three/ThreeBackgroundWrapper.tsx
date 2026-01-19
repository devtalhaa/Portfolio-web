"use client";

import dynamic from "next/dynamic";

// Dynamic import Three.js background to avoid SSR issues
const ThreeBackground = dynamic(
    () => import("@/Components/three/ThreeBackground"),
    { ssr: false }
);

export default function ThreeBackgroundWrapper() {
    return <ThreeBackground />;
}

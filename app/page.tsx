"use client";

import dynamic from "next/dynamic";

// Import CSS globally
import "leaflet/dist/leaflet.css";

// Simple dynamic import with no SSR
const Map = dynamic(() => import("./components/SimpleMap"), {
  ssr: false,
  loading: () => <div className="h-screen bg-gray-200 animate-pulse rounded flex items-center justify-center">Loading map...</div>
});

export default function Home() {
  return (
    <div className="container mx-auto p-4 h-screen">
      <Map />
    </div>
  );
}

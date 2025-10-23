"use client";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";
import MarkerClusterGroup from "react-leaflet-cluster";
import { generateDrugLabData, DrugLab } from "../../utils/generateData";
import VideoModal from "./VideoModal";

// Fix Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom red marker
const redIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12" fill="rgba(239, 68, 68, 0.4)" stroke="#DC2626" stroke-width="2"/>
    </svg>
  `),
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
});

// Click handler component
function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            onMapClick(lat, lng);
        },
    });
    return null;
}

export default function SimpleMap() {
    const center: [number, number] = [4.66, -74.10];
    const [drugLabs] = useState(() => generateDrugLabData(150, center, 20));
    const [selectedVideo, setSelectedVideo] = useState<{ url: string; labName: string } | null>(null);

    const handleVideoClick = (videoUrl: string, labName: string) => {
        console.log('Video clicked:', videoUrl, labName);
        setSelectedVideo({ url: videoUrl, labName });
    };

    const closeVideoModal = () => {
        setSelectedVideo(null);
    };

    return (
        <>
            <MapContainer
                center={[4.66, -74.10]}
                zoom={13}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MarkerClusterGroup chunkedLoading>
                    {drugLabs.map((lab) => (
                        <Marker key={lab.id} position={lab.position}>
                            <Popup className="w-80 max-h-48">
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="font-bold text-lg">{lab.name}</h3>
                                        <p className="text-sm text-gray-600 mb-1">{lab.type}</p>
                                        <p className="text-xs text-gray-700 mb-2">{lab.description}</p>
                                        <div className="text-xs space-y-1">
                                            <div><span className="font-semibold">Tamaño:</span> {lab.size}</div>
                                            <div><span className="font-semibold">Estado:</span> {lab.status}</div>
                                            <div><span className="font-semibold">Lat:</span> {lab.position[0].toFixed(4)}</div>
                                            <div><span className="font-semibold">Lng:</span> {lab.position[1].toFixed(4)}</div>
                                        </div>
                                    </div>
                                    <button 
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors cursor-pointer"
                                        onClick={() => handleVideoClick(lab.videoUrl, lab.name)}
                                    >
                                        Ver vídeo
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
            
            {/* Video Modal - Outside map container */}
            {selectedVideo && (
                <VideoModal
                    isOpen={!!selectedVideo}
                    onClose={closeVideoModal}
                    videoUrl={selectedVideo.url}
                    labName={selectedVideo.labName}
                />
            )}
        </>
    );
}

import { useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";
import { useMap } from "react-leaflet";

export default function HeatmapLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const heat = L.heatLayer(points, {
      radius: 28,
      blur: 18,
      maxZoom: 17,
    });

    heat.addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
}

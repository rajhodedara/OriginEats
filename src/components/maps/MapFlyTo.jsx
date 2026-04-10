import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapFlyTo = ({ center, zoom = 13 }) => {
  const map = useMap();

  useEffect(() => {
    if (!center) return;
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);

  return null;
};

export default MapFlyTo;
    
import React, { useMemo } from "react";
import { CircleMarker, Popup } from "react-leaflet";

/**
 * areas format:
 * [
 *  {
 *    area_name,
 *    opportunity_score,
 *    restaurants,
 *    total_demand_score,
 *    lat,
 *    lng
 *  }
 * ]
 */

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const OpportunityLayer = ({ areas = [], onSelectArea }) => {
  // Normalize radii based on opportunity score range
  const { minScore, maxScore } = useMemo(() => {
    if (!areas.length) return { minScore: 0, maxScore: 1 };

    let min = Infinity;
    let max = -Infinity;

    for (const a of areas) {
      const v = Number(a.opportunity_score || 0);
      if (v < min) min = v;
      if (v > max) max = v;
    }

    if (!isFinite(min) || !isFinite(max) || min === max) {
      return { minScore: 0, maxScore: 1 };
    }

    return { minScore: min, maxScore: max };
  }, [areas]);

  const getRadius = (score) => {
    const v = Number(score || 0);
    const t = (v - minScore) / (maxScore - minScore || 1); // 0..1
    const r = 6 + t * 18; // 6..24
    return clamp(r, 6, 24);
  };

  return (
    <>
      {areas
        .filter((a) => typeof a.lat === "number" && typeof a.lng === "number")
        .map((a) => (
          <CircleMarker
            key={a.area_name}
            center={[a.lat, a.lng]}
            radius={getRadius(a.opportunity_score)}
            pathOptions={{
              color: "#22c55e", // green border
              weight: 2,
              fillColor: "#22c55e",
              fillOpacity: 0.35,
            }}
            eventHandlers={{
              click: () => {
                if (onSelectArea) onSelectArea(a.area_name);
              },
            }}
          >
            <Popup>
              <div className="text-sm">
                <div className="font-semibold">{a.area_name}</div>

                <div className="text-xs mt-1">
                  Opportunity:{" "}
                  <span className="font-semibold">
                    {Number(a.opportunity_score || 0).toFixed(2)}
                  </span>
                </div>

                <div className="text-xs">
                  Restaurants: {a.restaurants || 0}
                </div>

                <div className="text-xs">
                  Demand Score: {Number(a.total_demand_score || 0).toFixed(0)}
                </div>

                <div className="text-[11px] opacity-70 mt-1">
                  Click circle to filter this area
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
    </>
  );
};

export default OpportunityLayer;

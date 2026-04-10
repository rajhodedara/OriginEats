import React, { useEffect, useMemo, useRef, useState } from "react";
import Icon from "../../../components/AppIcon";

/**
 * Leaflet imports
 */
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

/**
 * Heat layer
 * ✅ you must have leaflet.heat installed
 */
import "leaflet.heat";

/**
 * Make sure these are installed:
 * npm i react-leaflet leaflet leaflet.heat
 *
 * And in main css (index.css):
 * import "leaflet/dist/leaflet.css";
 */

/* ------------------------------
   Fix Leaflet marker icons (Vite)
-------------------------------- */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ------------------------------
   Heatmap Layer Component
-------------------------------- */
const HeatmapLayer = ({ points }) => {
  const map = useMap();
  const layerRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    // remove old layer
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
      layerRef.current = null;
    }

    if (!points?.length) return;

    // Leaflet heat layer
    const heat = L.heatLayer(points, {
      radius: 25,
      blur: 18,
      maxZoom: 16,
      minOpacity: 0.35,
    });

    heat.addTo(map);
    layerRef.current = heat;

    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
  }, [map, points]);

  return null;
};

/* ------------------------------
   Map Fly-to helper component
-------------------------------- */
const FlyToLocation = ({ center, zoom = 13 }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !center) return;
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [map, center, zoom]);

  return null;
};

/* ------------------------------
   Main Component
-------------------------------- */
const InteractiveMapSection = ({
  location,
  demographics,

  // ✅ data
  restaurants = [],
  competitors = [],
  loading = false,

  // ✅ shared filters
  selectedArea,
  setSelectedArea,
  selectedCuisine,
  setSelectedCuisine,

  // ✅ NEW: layer lock (controlled by parent)
  activeLayer,
  setActiveLayer,
}) => {
  /* ------------------------------
     Layers
  -------------------------------- */
  const layers = [
    { id: "heatmap", label: "Demand Heatmap", icon: "Users" },
    { id: "competitors", label: "Competitors", icon: "MapPin" },
    { id: "opportunity", label: "Opportunity", icon: "TrendingUp" },
  ];

  /* ------------------------------
     Helpers
  -------------------------------- */
  const normalize = (s) =>
    String(s || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  /* ------------------------------
     Area options
  -------------------------------- */
  const areaOptions = useMemo(() => {
    if (!restaurants.length) return ["ALL"];

    const areas = Array.from(
      new Set(restaurants.map((r) => r.area_name).filter(Boolean))
    );

    areas.sort();

    const filtered = areas.filter((a) => a !== "Other");
    if (areas.includes("Other")) filtered.push("Other");

    return ["ALL", ...filtered];
  }, [restaurants]);

  /* ------------------------------
     Cuisine options
  -------------------------------- */
  const cuisineOptions = useMemo(() => {
    if (!restaurants.length) return ["ALL"];

    const cats = Array.from(
      new Set(
        restaurants
          .map((r) => r.primary_category)
          .filter(Boolean)
          .map((x) => String(x).trim())
          .filter(Boolean)
      )
    );

    cats.sort();
    return ["ALL", ...cats];
  }, [restaurants]);

  /* ------------------------------
     Filtered restaurants
  -------------------------------- */
  const filteredRestaurants = useMemo(() => {
    if (!restaurants.length) return [];

    return restaurants.filter((r) => {
      const areaOk =
        selectedArea === "ALL" ||
        normalize(r.area_name) === normalize(selectedArea);

      const cuisineOk =
        selectedCuisine === "ALL" || r.primary_category === selectedCuisine;

      return areaOk && cuisineOk;
    });
  }, [restaurants, selectedArea, selectedCuisine]);

  /* ------------------------------
     Top Restaurants list
  -------------------------------- */
  const topRestaurants = useMemo(() => {
    return [...filteredRestaurants]
      .sort((a, b) => (b.demand_score || 0) - (a.demand_score || 0))
      .slice(0, 10);
  }, [filteredRestaurants]);

  /* ------------------------------
     Area summary (real)
  -------------------------------- */
  const areaSummary = useMemo(() => {
    const map = new Map();

    for (const r of restaurants) {
      const area = r.area_name || "Other";

      if (!map.has(area)) {
        map.set(area, {
          area_name: area,
          restaurants: 0,
          total_demand_score: 0,
          total_reviews: 0,
          rating_sum: 0,
          rating_count: 0,
        });
      }

      const obj = map.get(area);
      obj.restaurants += 1;
      obj.total_demand_score += r.demand_score || 0;
      obj.total_reviews += r.user_ratings_total || 0;

      if (typeof r.rating === "number") {
        obj.rating_sum += r.rating;
        obj.rating_count += 1;
      }
    }

    const arr = Array.from(map.values()).map((a) => ({
      ...a,
      avg_rating: a.rating_count ? a.rating_sum / a.rating_count : null,
      opportunity_score: a.total_demand_score / (a.restaurants + 1),
    }));

    return arr;
  }, [restaurants]);

  const highestDemandArea = useMemo(() => {
    const valid = areaSummary.filter((x) => x.area_name !== "Other");
    valid.sort((a, b) => b.total_demand_score - a.total_demand_score);
    return valid[0] || null;
  }, [areaSummary]);

  const topOpportunityAreas = useMemo(() => {
    const valid = areaSummary.filter((x) => x.area_name !== "Other");
    valid.sort((a, b) => b.opportunity_score - a.opportunity_score);
    return valid.slice(0, 8);
  }, [areaSummary]);

  /* ------------------------------
     Heatmap points
     Leaflet heat expects:
     [lat, lng, intensity]
  -------------------------------- */
  const heatPoints = useMemo(() => {
    if (!filteredRestaurants.length) return [];

    return filteredRestaurants
      .filter((r) => typeof r.lat === "number" && typeof r.lng === "number")
      .map((r) => [
        r.lat,
        r.lng,
        Math.min(1, (r.demand_score || 0) / 60), // normalize intensity
      ]);
  }, [filteredRestaurants]);

  /* ------------------------------
     Area -> center location for flyTo
     based on restaurant avg coords
  -------------------------------- */
  const selectedAreaCenter = useMemo(() => {
    if (selectedArea === "ALL") {
      return [location?.lat || 19.076, location?.lng || 72.8777];
    }

    const inArea = restaurants.filter(
      (r) =>
        normalize(r.area_name) === normalize(selectedArea) &&
        typeof r.lat === "number" &&
        typeof r.lng === "number"
    );

    if (!inArea.length) return [location?.lat || 19.076, location?.lng || 72.8777];

    const avgLat = inArea.reduce((sum, r) => sum + r.lat, 0) / inArea.length;
    const avgLng = inArea.reduce((sum, r) => sum + r.lng, 0) / inArea.length;

    return [avgLat, avgLng];
  }, [restaurants, selectedArea, location]);

  /* ------------------------------
     Marker selection (info popup)
  -------------------------------- */
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  /* ------------------------------
     UI Render
  -------------------------------- */
  return (
    <div className="bg-card rounded-lg p-6 md:p-8 shadow-warm font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-foreground">
            Area Intelligence
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Mumbai area-wise insights from restaurant demand signals
          </p>
        </div>

        {/* Layer Switch */}
        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          {layers.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-250 ${
                activeLayer === layer.id
                  ? "bg-primary text-primary-foreground shadow-warm-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name={layer.icon} size={16} />
              <span className="hidden sm:inline">{layer.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        <div className="bg-muted rounded-lg p-3">
          <label className="text-xs text-muted-foreground">Area</label>
          <select
            className="w-full mt-1 bg-transparent outline-none text-sm"
            value={selectedArea}
            onChange={(e) => {
              setSelectedArea(e.target.value);
              setSelectedRestaurant(null);
            }}
          >
            {areaOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-muted rounded-lg p-3">
          <label className="text-xs text-muted-foreground">Cuisine Type</label>
          <select
            className="w-full mt-1 bg-transparent outline-none text-sm"
            value={selectedCuisine}
            onChange={(e) => {
              setSelectedCuisine(e.target.value);
              setSelectedRestaurant(null);
            }}
          >
            {cuisineOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-muted rounded-lg p-3">
          <label className="text-xs text-muted-foreground">Dataset</label>
          <div className="text-sm mt-1">
            {loading ? "Loading..." : `${restaurants.length} restaurants loaded`}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden bg-muted">
        <MapContainer
          center={[location?.lat || 19.076, location?.lng || 72.8777]}
          zoom={12}
          scrollWheelZoom
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* ✅ Auto fly when area changes */}
          <FlyToLocation center={selectedAreaCenter} zoom={selectedArea === "ALL" ? 12 : 14} />

          {/* ✅ Heatmap */}
          {activeLayer === "heatmap" && <HeatmapLayer points={heatPoints} />}

          {/* ✅ Competitor markers */}
          {activeLayer === "competitors" &&
            competitors
              ?.filter((c) => typeof c.lat === "number" && typeof c.lng === "number")
              .map((c) => (
                <Marker
                  key={c.place_id || `${c.name}-${c.lat}-${c.lng}`}
                  position={[c.lat, c.lng]}
                  eventHandlers={{
                    click: () => setSelectedRestaurant(c),
                  }}
                >
                  <Popup>
                    <div className="space-y-1">
                      <div className="font-semibold">{c.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {c.address || "—"}
                      </div>
                      <div className="text-xs">
                        Cuisine: {c.primary_category || "Restaurant (General)"}
                      </div>
                      <div className="text-xs">
                        ⭐ {c.rating || "—"} ({c.user_ratings_total || 0})
                      </div>
                      <div className="text-xs font-semibold">
                        Distance: {c.distance ?? "—"} km
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

          {/* ✅ Opportunity view: show top restaurants markers */}
          {activeLayer === "opportunity" &&
            topRestaurants
              ?.filter((r) => typeof r.lat === "number" && typeof r.lng === "number")
              .map((r) => (
                <Marker
                  key={r.place_id || `${r.name}-${r.lat}-${r.lng}`}
                  position={[r.lat, r.lng]}
                  eventHandlers={{
                    click: () => setSelectedRestaurant(r),
                  }}
                >
                  <Popup>
                    <div className="space-y-1">
                      <div className="font-semibold">{r.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {r.address || "—"}
                      </div>
                      <div className="text-xs">
                        Cuisine: {r.primary_category || "Restaurant (General)"}
                      </div>
                      <div className="text-xs">
                        ⭐ {r.rating || "—"} ({r.user_ratings_total || 0})
                      </div>
                      <div className="text-xs font-semibold">
                        Demand: {(r.demand_score || 0).toFixed(1)}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
        </MapContainer>
      </div>

      {/* Summary + Opportunity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Users" size={20} className="text-primary" />
            <h4 className="text-sm font-semibold text-foreground">
              Highest Demand Area
            </h4>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {highestDemandArea?.area_name || "—"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Demand Score:{" "}
            {highestDemandArea?.total_demand_score?.toFixed?.(0) || "—"}
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4 lg:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="TrendingUp" size={18} className="text-primary" />
            <h4 className="text-sm font-semibold text-foreground">
              Best Areas to Expand (Opportunity)
            </h4>
          </div>

          {loading ? (
            <p className="text-sm text-muted-foreground">Loading areas…</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {topOpportunityAreas.map((a) => (
                <button
                  key={a.area_name}
                  onClick={() => {
                    setSelectedArea(a.area_name);

                    // Optional: reset cuisine when clicking opportunity
                    setSelectedCuisine("ALL");

                    // ✅ IMPORTANT: DO NOT change layer here (layer lock)
                  }}
                  className="flex items-center justify-between bg-card rounded-md p-3 hover:shadow-warm-sm transition"
                >
                  <div className="text-left">
                    <div className="text-sm font-semibold">{a.area_name}</div>
                    <div className="text-xs text-muted-foreground">
                      Restaurants: {a.restaurants}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">
                      {Number(a.opportunity_score).toFixed(2)}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      Opportunity
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top restaurants */}
      <div className="mt-6 bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={18} className="text-primary" />
            <h4 className="text-sm font-semibold text-foreground">
              Top Restaurants ({selectedArea === "ALL" ? "Mumbai" : selectedArea})
            </h4>
          </div>
          <div className="text-xs text-muted-foreground">
            Filter: {selectedCuisine === "ALL" ? "All cuisines" : selectedCuisine}
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading restaurants…</p>
        ) : topRestaurants.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No restaurants found for this filter.
          </p>
        ) : (
          <div className="space-y-2">
            {topRestaurants.map((r) => (
              <button
                key={r.place_id || `${r.name}-${r.lat}-${r.lng}`}
                onClick={() => setSelectedRestaurant(r)}
                className="w-full text-left flex items-center justify-between bg-card rounded-md p-3 hover:shadow-warm-sm transition"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{r.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {r.address}
                  </p>
                  <div className="mt-1 text-[11px] text-muted-foreground truncate">
                    Cuisine: {r.primary_category || "Restaurant (General)"}
                  </div>
                </div>

                <div className="text-right ml-4 shrink-0">
                  <p className="text-sm font-bold">
                    ⭐ {r.rating || "—"}{" "}
                    <span className="text-xs text-muted-foreground">
                      ({r.user_ratings_total || 0})
                    </span>
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Demand: {(r.demand_score || 0).toFixed(1)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMapSection;
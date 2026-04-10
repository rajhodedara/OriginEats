import Papa from "papaparse";

// ---------- helpers ----------
async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return await res.text();
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return await res.json();
}

function parseCsv(text) {
  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  });

  if (parsed.errors?.length) {
    console.warn("CSV parse warnings:", parsed.errors);
  }

  return parsed.data;
}

// ---------- loaders ----------
export async function loadRestaurants() {
  const csvText = await fetchText("/data/restaurants.csv");
  const rows = parseCsv(csvText);

  return rows.map((r) => ({
    ...r,
    lat: r.lat ? Number(r.lat) : null,
    lng: r.lng ? Number(r.lng) : null,
    rating: r.rating ? Number(r.rating) : null,
    user_ratings_total: r.user_ratings_total ? Number(r.user_ratings_total) : 0,
    demand_score: r.demand_score ? Number(r.demand_score) : 0,
  }));
}

export async function loadWardSummary() {
  const csvText = await fetchText("/data/ward_summary.csv");
  const rows = parseCsv(csvText);

  return rows.map((w) => ({
    ...w,
    restaurants: w.restaurants ? Number(w.restaurants) : 0,
    avg_rating: w.avg_rating ? Number(w.avg_rating) : null,
    total_reviews: w.total_reviews ? Number(w.total_reviews) : 0,
    total_demand_score: w.total_demand_score ? Number(w.total_demand_score) : 0,
  }));
}

export async function loadWardOpportunity() {
  const csvText = await fetchText("/data/ward_opportunity.csv");
  const rows = parseCsv(csvText);

  return rows.map((w) => ({
    ...w,
    restaurants: w.restaurants ? Number(w.restaurants) : 0,
    total_demand_score: w.total_demand_score ? Number(w.total_demand_score) : 0,
    opportunity_score: w.opportunity_score ? Number(w.opportunity_score) : 0,
  }));
}

export async function loadBmcWardsGeojson() {
  return await fetchJson("/data/bmc_wards.geojson");
}

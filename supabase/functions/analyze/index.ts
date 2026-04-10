import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function normalize(value: number, min: number, max: number) {
  if (max === min) return 50;
  const x = (value - min) / (max - min);
  return clamp(Math.round(x * 100), 0, 100);
}

function budgetFitScore(primaryCategory: string, budgetLakhs: number) {
  const low = new Set([
    "Fast Food", "Burger", "Sandwich", "Cafe", "Juice",
    "Breakfast / Brunch", "Dessert", "Bakery", "Pizza"
  ]);
  const mid = new Set([
    "Indian", "Chinese", "Lebanese", "Mexican", "Mediterranean",
    "Middle Eastern", "Thai", "Seafood"
  ]);
  const high = new Set(["Japanese", "Korean", "Italian"]);

  if (budgetLakhs < 10) return low.has(primaryCategory) ? 85 : 45;
  if (budgetLakhs < 35) return (mid.has(primaryCategory) || low.has(primaryCategory)) ? 80 : 60;
  return (high.has(primaryCategory) || mid.has(primaryCategory)) ? 85 : 70;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const locality = body.locality;
    const cuisine = body.cuisine;
    const budgetLakhs = Number(body.budgetLakhs ?? 25);
    const nearMetro = Boolean(body.nearMetro ?? false);
    const openingTimeline = String(body.openingTimeline ?? "");

    if (!locality || !cuisine) {
      return new Response(
        JSON.stringify({ error: "locality and cuisine required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 1) Locality KPIs
    const { data: loc, error: locErr } = await supabase
      .from("localities")
      .select("*")
      .eq("locality", locality)
      .maybeSingle();

    if (locErr) throw locErr;
    if (!loc) {
      return new Response(
        JSON.stringify({ error: "Locality not found in dataset" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2) Cuisine stats per locality
    const { data: cls, error: clsErr } = await supabase
      .from("cuisine_locality_stats")
      .select("*")
      .eq("locality", locality)
      .eq("category", cuisine)
      .maybeSingle();

    if (clsErr) throw clsErr;

    const cuisineCount = Number(cls?.restaurant_count ?? 0);
    const cuisineAvgRating = Number(cls?.avg_rating ?? 0);
    const cuisineTotalReviews = Number(cls?.total_reviews ?? 0);

    // 3) Compute scores
    const demandScore = normalize(Number(loc.total_demand_score ?? 0), 0, 1000);
    const opportunityScore = normalize(Number(loc.opportunity_score ?? 0), 0, 100);
    const competitionScore = 100 - normalize(cuisineCount, 0, 50);

    const ratingWeighted =
      (Number(loc.avg_rating ?? 0) * 20) +
      Math.log10(Math.max(1, Number(loc.total_reviews ?? 0))) * 20;

    const ratingScore = normalize(ratingWeighted, 0, 120);
    const bScore = budgetFitScore(cuisine, budgetLakhs);

    const metroBoost = nearMetro ? 5 : 0;
    const timelinePenalty =
      openingTimeline === "Within 1 month" ? -6 :
      openingTimeline === "1-3 months" ? -2 : 0;

    let successRate =
      0.30 * demandScore +
      0.25 * competitionScore +
      0.20 * opportunityScore +
      0.15 * ratingScore +
      0.10 * bScore +
      metroBoost +
      timelinePenalty;

    successRate = clamp(Math.round(successRate), 5, 95);

    const riskLevel =
      successRate >= 75 ? "Low" :
      successRate >= 50 ? "Medium" : "High";

    return new Response(
      JSON.stringify({
        locality,
        cuisine,
        successRate,
        riskLevel,
        metrics: {
          demandScore,
          opportunityScore,
          competitionScore,
          ratingScore,
          budgetFitScore: bScore,
          cuisineCount,
          cuisineAvgRating,
          cuisineTotalReviews,
          nearMetro,
          openingTimeline,
        },
        keyFactors: [
          { title: "Demand Strength", desc: `Demand Score ${demandScore}/100 (dataset-based)` },
          { title: "Cuisine Competition", desc: `${cuisineCount} ${cuisine} outlets in this locality` },
          { title: "Locality Opportunity", desc: `Opportunity Score ${opportunityScore}/100` },
          { title: "Customer Trust", desc: `${loc.total_reviews ?? 0} total reviews, avg rating ${loc.avg_rating ?? 0}` },
          { title: "Budget Fit", desc: `Budget Fit Score ${bScore}/100` },
        ],
        sources: [
          "area_summary.csv (locality KPIs)",
          "restaurants_min.csv (restaurant-level dataset)",
          "computed cuisine_locality_stats",
        ],
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

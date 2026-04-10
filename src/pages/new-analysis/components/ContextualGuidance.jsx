import React, { useMemo } from "react";
import Icon from "../../../components/AppIcon";

const scoreLabel = (score = 0) => {
  if (score >= 75) return { label: "Strong", color: "text-success" };
  if (score >= 50) return { label: "Moderate", color: "text-warning" };
  return { label: "Weak", color: "text-destructive" };
};

const formatNumber = (n) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return "0";
  return num.toLocaleString("en-IN");
};

const ContextualGuidance = ({ location, cuisine, budget, analysisResult }) => {
  const metrics = analysisResult?.metrics || null;

  const dynamicTips = useMemo(() => {
    if (!metrics) return null;

    const tips = [];

    // Demand
    if (metrics.demandScore >= 70) {
      tips.push(
        `Strong demand in this locality (Demand Score ${metrics.demandScore}/100).`
      );
    } else if (metrics.demandScore >= 50) {
      tips.push(
        `Moderate demand present (Demand Score ${metrics.demandScore}/100).`
      );
    } else {
      tips.push(
        `Low demand warning (Demand Score ${metrics.demandScore}/100) — strong USP + marketing needed.`
      );
    }

    // Competition
    tips.push(
      `Competition: ${metrics.cuisineCount} ${analysisResult?.cuisine || cuisine} outlets in this locality.`
    );

    if (metrics.competitionScore >= 70) {
      tips.push(
        "Competition looks favorable — good chance to stand out with branding + execution."
      );
    } else if (metrics.competitionScore >= 40) {
      tips.push(
        "Medium competition — you must differentiate via menu, ambience, pricing and delivery strategy."
      );
    } else {
      tips.push(
        "High competition zone — consider niche positioning or evaluate alternate locality."
      );
    }

    // Opportunity
    if (metrics.opportunityScore >= 70) {
      tips.push(`High opportunity market (Opportunity ${metrics.opportunityScore}/100).`);
    } else if (metrics.opportunityScore >= 50) {
      tips.push(`Decent opportunity market (Opportunity ${metrics.opportunityScore}/100).`);
    } else {
      tips.push(
        `Opportunity score is low (${metrics.opportunityScore}/100) — execution quality matters a lot.`
      );
    }

    // Reviews (category activity)
    if (metrics.cuisineTotalReviews >= 10000) {
      tips.push(
        `Very strong customer activity: ${formatNumber(metrics.cuisineTotalReviews)} reviews for this cuisine category.`
      );
    } else if (metrics.cuisineTotalReviews >= 3000) {
      tips.push(
        `Healthy customer activity: ${formatNumber(metrics.cuisineTotalReviews)} reviews for this cuisine category.`
      );
    } else {
      tips.push(
        `Lower review volume (${formatNumber(metrics.cuisineTotalReviews)}) — demand may be limited or emerging.`
      );
    }

    // Ratings
    if (metrics.cuisineAvgRating >= 4.2) {
      tips.push(
        `Customers rate this cuisine highly here (${metrics.cuisineAvgRating} avg rating).`
      );
    } else if (metrics.cuisineAvgRating >= 3.8) {
      tips.push(
        `Average rating trend (${metrics.cuisineAvgRating}). Opportunity to win by improving quality + hygiene.`
      );
    } else {
      tips.push(
        `Low rating trend (${metrics.cuisineAvgRating}) — focus on food consistency, cleanliness, and service speed.`
      );
    }

    return tips;
  }, [metrics, analysisResult, cuisine]);

  const budgetData = useMemo(() => {
    if (budget < 1000000) {
      return {
        category: "Compact Setup",
        advice:
          "Focus on cloud kitchen or small counter service. Minimize dine-in space to reduce costs.",
        allocation: "Setup: 40% | Equipment: 30% | Working Capital: 30%",
      };
    } else if (budget < 3000000) {
      return {
        category: "Small Restaurant",
        advice:
          "Suitable for 20-30 seater casual dining. Prioritize kitchen equipment quality.",
        allocation: "Setup: 35% | Equipment: 35% | Working Capital: 30%",
      };
    } else if (budget < 6000000) {
      return {
        category: "Mid-Size Establishment",
        advice:
          "Can support 40-60 seater with good ambiance. Invest in customer experience.",
        allocation: "Setup: 40% | Equipment: 30% | Working Capital: 30%",
      };
    } else {
      return {
        category: "Premium Restaurant",
        advice:
          "Enables fine dining setup with premium interiors. Focus on brand positioning.",
        allocation: "Setup: 45% | Equipment: 25% | Working Capital: 30%",
      };
    }
  }, [budget]);

  const demandTag = metrics ? scoreLabel(metrics.demandScore) : null;
  const compTag = metrics ? scoreLabel(metrics.competitionScore) : null;
  const oppTag = metrics ? scoreLabel(metrics.opportunityScore) : null;

  return (
    <div className="space-y-6">
      {/* ✅ Real dataset based insights */}
      <div className="bg-card border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Lightbulb" size={20} className="text-accent" />
          <h3 className="text-base md:text-lg font-semibold text-foreground">
            Contextual Guidance (Dataset-Based)
          </h3>
        </div>

        {location ? (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">
              Locality: {location}
            </h4>

            {metrics ? (
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Demand Score:</span>
                  <span className={`font-semibold ${demandTag.color}`}>
                    {metrics.demandScore}/100 ({demandTag.label})
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Competition Score:</span>
                  <span className={`font-semibold ${compTag.color}`}>
                    {metrics.competitionScore}/100 ({compTag.label})
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Opportunity Score:</span>
                  <span className={`font-semibold ${oppTag.color}`}>
                    {metrics.opportunityScore}/100 ({oppTag.label})
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select a location + cuisine and run analysis to see dataset-backed insights.
              </p>
            )}

            <div className="space-y-2 mt-4">
              <p className="text-xs font-medium text-foreground">Key Tips:</p>
              <ul className="space-y-2">
                {(dynamicTips || [
                  "Pick a locality and cuisine to unlock real insights.",
                  "Run analysis to see demand, competition, and opportunity scores.",
                ]).map((tip, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <Icon
                      name="CheckCircle2"
                      size={14}
                      className="text-success mt-0.5 flex-shrink-0"
                    />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Select a location to see insights and recommendations.
          </p>
        )}
      </div>

      {/* Budget allocation */}
      {budget > 0 && (
        <div className="bg-card border border-border rounded-lg p-4 md:p-6">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="IndianRupee" size={20} className="text-accent" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">
              Budget Allocation
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm font-medium text-foreground">
                {budgetData.category}
              </span>
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                ₹{(budget / 100000).toFixed(1)} Lakhs
              </span>
            </div>

            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              {budgetData.advice}
            </p>

            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs font-medium text-foreground mb-2">
                Recommended Split:
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                {budgetData.allocation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pro tip */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Icon
            name="Info"
            size={18}
            className="text-accent mt-0.5 flex-shrink-0"
          />
          <div className="space-y-1">
            <p className="text-xs font-medium text-foreground">Pro Tip</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This guidance is generated from real dataset metrics such as demand,
              competition, opportunity and review signals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextualGuidance;

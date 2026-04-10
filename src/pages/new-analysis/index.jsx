import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import AuthenticatedSidebar from "../../components/ui/AuthenticatedSidebar";
import NavigationBreadcrumbs from "../../components/ui/NavigationBreadcrumbs";
import UserContextMenu from "../../components/ui/UserContextMenu";

import AnalysisForm from "./components/AnalysisForm";
import ContextualGuidance from "./components/ContextualGuidance";
import Icon from "../../components/AppIcon";

const NewAnalysis = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    location: "",
    cuisine: "",
    budget: 2500000, // ₹25 Lakhs
    metroAccess: false,
    timeline: "",
  });

  const [errors, setErrors] = useState({
    location: "",
    cuisine: "",
    budget: "",
  });

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors?.[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.location) newErrors.location = "Please select a location";
    if (!formData?.cuisine) newErrors.cuisine = "Please select a cuisine type";
    if (formData?.budget < 500000) newErrors.budget = "Minimum budget should be ₹5 Lakhs";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw new Error("Supabase env missing: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
      }

      const endpoint = `${SUPABASE_URL}/functions/v1/analyze`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          locality: formData.location,
          cuisine: formData.cuisine,

          // convert ₹ to Lakhs (₹25,00,000 => 25)
          budgetLakhs: formData.budget / 100000,

          nearMetro: formData.metroAccess,
          openingTimeline: formData.timeline,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Edge function failed:", data);
        throw new Error(data?.error || "Edge function returned error");
      }

      navigate("/analysis-results", {
        state: {
          analysisInput: formData,
          analysisResult: data,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      console.error("Analysis error:", err);
      alert(err?.message || "Analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedSidebar />

      <div className="lg:ml-[280px] min-h-screen">
        <header className="sticky top-0 z-40 bg-card border-b border-border shadow-warm-sm">
          <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <NavigationBreadcrumbs />
              </div>
              <div className="lg:hidden">
                <h1 className="text-lg font-semibold text-foreground">New Analysis</h1>
              </div>
            </div>
            <UserContextMenu />
          </div>
        </header>

        <main className="px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 md:mb-8 lg:hidden">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                New Restaurant Analysis
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Get AI-powered insights for your Mumbai restaurant venture
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2">
                <AnalysisForm
                  formData={formData}
                  errors={errors}
                  onFieldChange={handleFieldChange}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>

              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <div className="mb-4 hidden lg:block">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Info" size={20} className="text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">Contextual Guidance</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Real-time insights based on your selections
                    </p>
                  </div>

                  <ContextualGuidance
                    location={formData?.location}
                    cuisine={formData?.cuisine}
                    budget={formData?.budget}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 md:mt-12 bg-card border border-border rounded-lg p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex-shrink-0">
                  <Icon name="Shield" size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
                    Your Data is Secure
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    All analysis parameters are encrypted and stored securely. We never share your
                    business plans or financial information with third parties.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default NewAnalysis;

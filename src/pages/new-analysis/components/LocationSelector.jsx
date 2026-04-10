import React, { useEffect, useMemo, useState } from "react";
import Select from "../../../components/ui/Select";
import Icon from "../../../components/AppIcon";
import { supabase } from "../../../lib/supabase";

const LocationSelector = ({ value, onChange, error }) => {
  const [loading, setLoading] = useState(false);
  const [localityOptions, setLocalityOptions] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchLocalities = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("localities")
          .select("locality")
          .order("locality", { ascending: true });

        if (error) throw error;

        const options =
          (data || [])
            .map((x) => String(x.locality || "").trim())
            .filter(Boolean)
            .map((loc) => ({
              value: loc,   // ✅ IMPORTANT: value = exact DB locality
              label: loc,
              description: "Dataset-backed Mumbai locality",
            })) || [];

        if (!mounted) return;
        setLocalityOptions(options);
      } catch (err) {
        console.error("Failed to load localities:", err);
        if (mounted) setLocalityOptions([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchLocalities();

    return () => {
      mounted = false;
    };
  }, []);

  const placeholderText = useMemo(() => {
    if (loading) return "Loading Mumbai localities...";
    return "Choose your target location";
  }, [loading]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon name="MapPin" size={20} className="text-primary" />
        <label className="text-sm font-medium text-foreground">
          Select Mumbai Location <span className="text-destructive">*</span>
        </label>
      </div>

      <Select
        options={localityOptions}
        value={value}
        onChange={onChange}
        placeholder={placeholderText}
        description="Select the Mumbai locality where you plan to open your restaurant (dataset-powered)"
        error={error}
        required
        searchable
        className="w-full"
      />

      {loading && (
        <p className="text-xs text-muted-foreground">
          Fetching localities from dataset...
        </p>
      )}
    </div>
  );
};

export default LocationSelector;

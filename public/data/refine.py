import pandas as pd
import csv
import sys
from pathlib import Path

def make_restaurants_min(input_csv: str, output_csv: str):
    input_path = Path(input_csv)
    output_path = Path(output_csv)

    if not input_path.exists():
        print(f"[ERROR] Input file not found: {input_path}")
        sys.exit(1)

    print(f"[INFO] Reading: {input_path}")
    df = pd.read_csv(input_path)

    required_cols = [
        "place_id",
        "name",
        "locality",
        "rating",
        "user_ratings_total",
        "cuisines",
        "primary_category"
    ]

    missing = [c for c in required_cols if c not in df.columns]
    if missing:
        print("[ERROR] Missing required columns:", missing)
        print("[INFO] Available columns:", list(df.columns))
        sys.exit(1)

    df_min = df[required_cols].copy()

    # Optional cleanup
    df_min["locality"] = df_min["locality"].astype(str).str.strip()
    df_min["name"] = df_min["name"].astype(str).str.strip()
    df_min["cuisines"] = df_min["cuisines"].astype(str).str.strip()
    df_min["primary_category"] = df_min["primary_category"].astype(str).str.strip()

    print(f"[INFO] Rows: {len(df_min)}")
    print(f"[INFO] Saving: {output_path}")

    df_min.to_csv(
        output_path,
        index=False,
        quoting=csv.QUOTE_MINIMAL
    )

    print("[DONE] Created:", output_path)

if __name__ == "__main__":
    # Default filenames (same folder)
    input_csv = "restaurants.csv"
    output_csv = "restaurants_min.csv"

    # Allow custom CLI usage:
    # python make_restaurants_min.py input.csv output.csv
    if len(sys.argv) >= 2:
        input_csv = sys.argv[1]
    if len(sys.argv) >= 3:
        output_csv = sys.argv[2]

    make_restaurants_min(input_csv, output_csv)

import React, { useState } from "react";
import { Upload, FileText, Loader2, X, Gift } from "lucide-react";

export default function DealBox() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [extractedData, setExtractedData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coupon, setCoupon] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setExtractedData("");
    setCoupon("");
    setError("");

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const generateCouponCode = () =>
    "DEAL" + Date.now().toString().slice(-6);

  const generateCoupon = () => {
    const coupons = [
      "🎉 10% OFF on your next order",
      "🍔 Flat ₹100 OFF on bills above ₹499",
      "🚚 Free Delivery on your next order",
      "🥗 15% OFF on healthy meals",
      "🔥 Buy 1 Get 1 Free (Limited)",
      "🎁 20% OFF – Today Only",
      "💳 Extra 5% Cashback",
    ];

    const selected = coupons[Math.floor(Math.random() * coupons.length)];
    setCoupon(`${selected}\nCoupon Code: ${generateCouponCode()}`);
  };

  const extractData = async () => {
    console.log("✅ Extract clicked");

    if (!image) {
      setError("Please upload an image first");
      return;
    }

    const apiKey = import.meta.env.VITE_COHERE_API_KEY;

    console.log("🔑 Cohere key loaded?", !!apiKey);

    if (!apiKey) {
      setError(
        "API key missing! Add VITE_COHERE_API_KEY in .env and restart npm run dev."
      );
      return;
    }

    setLoading(true);
    setError("");
    setExtractedData("");
    setCoupon("");

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        console.log("✅ Image converted to base64");

        const payload = {
          model: "c4ai-aya-vision-32b",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text:
                    "Extract ONLY the exact visible text from this image. Preserve line breaks. Do not add, guess, or summarize anything.",
                },
                {
                  type: "image_url",
                  image_url: { url: reader.result },
                },
              ],
            },
          ],
        };

        console.log("📤 Sending request to Cohere...");

        const response = await fetch("https://api.cohere.com/v2/chat", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        console.log("✅ Response status:", response.status);

        // Read raw response for debugging
        const raw = await response.text();
        console.log("📦 RAW response:", raw);

        // Handle API errors
        if (!response.ok) {
          setError(`Cohere API Error: ${response.status}\n\n${raw}`);
          return;
        }

        // Parse JSON
        const data = JSON.parse(raw);
        console.log("✅ Parsed JSON:", data);

        // Extract text from returned response
        const extractedText =
          data?.message?.content?.[0]?.text ||
          data?.text ||
          data?.output_text ||
          "No text extracted";

        setExtractedData(extractedText);

        // Reward coupon
        generateCoupon();
      } catch (err) {
        console.error("❌ Error:", err);

        // CORS detection
        if (String(err).toLowerCase().includes("cors")) {
          setError(
            "CORS error: Cohere API cannot be called directly from frontend.\nUse backend proxy."
          );
        } else {
          setError("Failed to extract text. Check Console + Network tab.");
        }
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(image);
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
    setExtractedData("");
    setCoupon("");
    setError("");
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#f0ead6" }}>
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "#701c1c" }}>
            DEAL BOX
          </h1>
          <p className="text-gray-700">
            Upload an image, extract data & get rewarded with instant coupons
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* UPLOAD SECTION */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Upload />
              Upload Image
            </h2>

            {!imagePreview ? (
              <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg cursor-pointer hover:border-[#701c1c] transition">
                <Upload className="w-12 h-12 text-gray-400 mb-3" />
                <p className="text-gray-500">Click or drag & drop an image</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-contain rounded-lg border"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <button
              onClick={extractData}
              disabled={!image || loading}
              style={{ backgroundColor: "#701c1c" }}
              className="w-full mt-4 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <FileText />}
              {loading ? "Extracting..." : "Extract Data"}
            </button>

            {error && (
              <div className="mt-4 text-red-700 bg-red-50 border border-red-200 p-3 rounded-lg whitespace-pre-line">
                {error}
              </div>
            )}
          </div>

          {/* RESULT SECTION */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText />
              Extracted Data
            </h2>

            {extractedData ? (
              <pre className="bg-gray-50 p-4 rounded-lg h-56 overflow-y-auto text-sm font-mono whitespace-pre-wrap">
                {extractedData}
              </pre>
            ) : (
              <div className="h-56 border-2 border-dashed flex items-center justify-center rounded-lg text-gray-400">
                Data will appear here
              </div>
            )}

            {coupon && (
              <div
                className="mt-4 p-4 border rounded-lg text-center font-semibold"
                style={{
                  backgroundColor: "#f0ead6",
                  borderColor: "#701c1c",
                  color: "#701c1c",
                }}
              >
                <Gift className="mx-auto mb-2" />
                <p className="whitespace-pre-line text-lg">{coupon}</p>
              </div>
            )}

            {extractedData && (
              <button
                onClick={() => navigator.clipboard.writeText(extractedData)}
                className="w-full mt-4 bg-gray-200 py-2 rounded-lg"
              >
                Copy Extracted Text
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

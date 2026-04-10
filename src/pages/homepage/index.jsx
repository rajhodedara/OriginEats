import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";
import Image from "../../components/AppImage";

const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "/subscription-tiers" },
  { label: "About", href: "#testimonials" },
];

const FEATURE_CARDS = [
  ["MapPinned", "Hyper-Local Mumbai Insights", "Pin-code level demand, demographics, and competitor mapping."],
  ["TrendingUp", "AI Revenue Prediction", "Forecast 12-month revenue, break-even, and ROI timelines."],
  ["Radar", "Competitor Intelligence Radar", "Benchmark pricing, reviews, and market positioning nearby."],
];

const WORKFLOW_STEPS = [
  ["01", "Select Location", "Choose area, cuisine, budget, and concept."],
  ["02", "AI Analysis", "We process demographics, density, traffic, and demand signals."],
  ["03", "Get ROI Insights", "Receive forecasts, risks, and actions you can use immediately."],
];

const LOCATION_OPTIONS = [
  { value: "bandra-west", label: "Bandra West" },
  { value: "juhu", label: "Juhu" },
  { value: "colaba", label: "Colaba" },
  { value: "dadar", label: "Dadar" },
  { value: "powai", label: "Powai" },
  { value: "lower-parel", label: "Lower Parel" },
];

const CUISINE_OPTIONS = [
  { value: "north-indian", label: "North Indian" },
  { value: "fast-food", label: "Fast Food" },
  { value: "cafe", label: "Cafe" },
  { value: "maharashtrian", label: "Maharashtrian" },
  { value: "south-indian", label: "South Indian" },
  { value: "chinese", label: "Chinese" },
];

const SCORES = {
  "bandra-west": { "north-indian": 85, "fast-food": 78, cafe: 92, maharashtrian: 72, "south-indian": 80, chinese: 75 },
  juhu: { "north-indian": 88, "fast-food": 82, cafe: 90, maharashtrian: 70, "south-indian": 85, chinese: 78 },
  colaba: { "north-indian": 82, "fast-food": 75, cafe: 95, maharashtrian: 68, "south-indian": 77, chinese: 80 },
  dadar: { "north-indian": 90, "fast-food": 85, cafe: 75, maharashtrian: 95, "south-indian": 88, chinese: 82 },
  powai: { "north-indian": 87, "fast-food": 90, cafe: 85, maharashtrian: 65, "south-indian": 83, chinese: 88 },
  "lower-parel": { "north-indian": 84, "fast-food": 80, cafe: 88, maharashtrian: 70, "south-indian": 79, chinese: 85 },
};

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Owner, Spice Junction - Bandra",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    alt: "Warm restaurant dining room in Bandra",
    content: "OriginEats helped us choose the right location in Bandra West and beat our revenue target in six months.",
    metrics: ["Rs65L", "180%", "6 months"],
  },
  {
    name: "Rajesh Patel",
    role: "Founder, Chai & Conversations - Powai",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern cafe interior suited to Powai",
    content: "The market gap it surfaced for Powai cafes was something traditional consulting completely missed.",
    metrics: ["Rs42L", "165%", "8 months"],
  },
  {
    name: "Meera Desai",
    role: "Co-owner, Mumbai Bites - Colaba",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
    alt: "Upscale restaurant interior for a Colaba dining space",
    content: "Competitor and pricing insights helped us improve margins almost immediately after launch.",
    metrics: ["Rs58L", "195%", "5 months"],
  },
];

const FAQS = [
  ["How accurate are the predictions?", "The app highlights a 92% accuracy claim based on Mumbai-specific market signals and ongoing data refreshes."],
  ["Which areas are covered?", "Major Mumbai neighborhoods including Bandra, Juhu, Colaba, Dadar, Powai, Lower Parel, and many more."],
  ["How does competitor analysis work?", "It compares nearby restaurants on pricing, ratings, cuisine, and positioning within a local radius."],
  ["Can I compare multiple locations?", "Yes. The product messaging supports trying multiple neighborhoods and cuisine combinations before deciding."],
];

const FOOTER_COLUMNS = {
  Product: [
    ["Features", "#features"],
    ["Pricing", "/subscription-tiers"],
    ["How It Works", "#workflow"],
    ["Success Stories", "#testimonials"],
  ],
  Company: [
    ["About Us", "#about"],
    ["Contact", "#contact"],
    ["Blog", "#blog"],
    ["Careers", "#careers"],
  ],
  Legal: [
    ["Privacy Policy", "#privacy"],
    ["Terms of Service", "#terms"],
    ["Cookie Policy", "#cookies"],
    ["Refund Policy", "#refund"],
  ],
};

const editorialButton =
  "rounded-none border px-6 py-3 text-[11px] font-bold uppercase tracking-[0.28em] transition-colors";
const headlineStyle = { fontFamily: "'Crimson Text', serif" };
const monoStyle = { fontFamily: "'JetBrains Mono', monospace" };
const bodyStyle = { fontFamily: "'Source Sans 3', sans-serif" };

const heroImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuDaOLQqNbveQAU9yk7Q2FZCdGZeBv4I3mDiqv2q8wj1UiDgzwDiaZyHFHGPiHL50ioCfmFP0tAvp_qCtQ8VqXAo2ZI9qmSyxsrJgAMIB6vAZy_zK6Syif67SHtwr-du5xQEgS8z1Ulu8YnYbm2c2MHfR4p60tHe5QLtUPTVqLDQNxHKd_4REB6UKU3p2PsFsQZkElPSER2PF5SFPLrvUb6OM8WVgdzJSbjvfJdJYuVQ3RSSOXVlHtxrVnQRRr6JVSDpp7dYzPmgb9Q";
const mapImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuAYLwoOAiT4UfCeqWJEAPIbsjq39FGyQlf3RSB4NPbX-EpZrJz5bxzlPE41ZN9B9MZpnGFsPGsRoWuTIwOfOj9y4Jm_Xca5HEVP4tsB98f10514zyC7N2_Sf0ow8GAezHRlgdy1TRy2oEhVvbXNmp8I8XdAGjaO9ELZE9rcQBk1k3-TxjXU9UxAjvAcj7PHw---GooQuIzO5YJ8VOCyFXUbgT0JZW2r3ADK22z_IOcbZuh7tVbYWirl1p5_mSuA1ej7fKVjljCrByM";
const scorerImage = "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1400&q=80";

const SectionTitle = ({ eyebrow, title, description, align = "left" }) => (
  <div className={align === "center" ? "mx-auto mb-16 max-w-3xl text-center" : "mb-16"}>
    {eyebrow && (
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.35em] text-[#8B1A1A]/60" style={bodyStyle}>
        {eyebrow}
      </p>
    )}
    <h2 className="mb-4 text-4xl text-[#8B1A1A] md:text-5xl" style={headlineStyle}>{title}</h2>
    <div className={align === "center" ? "mx-auto h-1 w-20 bg-[#8B1A1A]" : "h-1 w-20 bg-[#8B1A1A]"}></div>
    {description && (
      <p className={`mt-6 text-lg leading-relaxed text-[#8B1A1A]/70 ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`} style={bodyStyle}>
        {description}
      </p>
    )}
  </div>
);

const HomepageHeader = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#8B1A1A]/5 bg-[#FAF7F2]/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="text-2xl font-bold tracking-tight text-[#8B1A1A]" style={headlineStyle}>
          OriginEats
        </Link>
        <div className="hidden items-center gap-10 text-sm font-semibold uppercase tracking-[0.18em] text-[#8B1A1A]/70 md:flex" style={bodyStyle}>
          {NAV_ITEMS.map((item) => item.href.startsWith("#") ? (
            <a key={item.label} href={item.href} className="transition-colors hover:text-[#8B1A1A]">{item.label}</a>
          ) : (
            <Link key={item.label} to={item.href} className="transition-colors hover:text-[#8B1A1A]">{item.label}</Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate("/coupons")}
            className={`${editorialButton} hidden border-[#8B1A1A]/15 bg-transparent text-[#8B1A1A] hover:bg-[#8B1A1A]/5 md:inline-flex`}
            style={bodyStyle}
          >
            Deal Box
          </Button>
          <Button
            onClick={() => navigate("/new-analysis")}
            className={`${editorialButton} border-[#8B1A1A] bg-[#8B1A1A] text-[#FAF7F2] hover:bg-black`}
            style={bodyStyle}
          >
            Start Free Analysis
          </Button>
          <button
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center border border-[#8B1A1A]/15 text-[#8B1A1A] md:hidden"
            aria-label="Toggle menu"
          >
            <Icon name={open ? "X" : "Menu"} size={18} />
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-[#8B1A1A]/10 bg-[#FAF7F2] md:hidden">
          <nav className="flex flex-col px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#8B1A1A]/80" style={bodyStyle}>
            {NAV_ITEMS.map((item) => item.href.startsWith("#") ? (
              <a key={item.label} href={item.href} className="py-3" onClick={() => setOpen(false)}>{item.label}</a>
            ) : (
              <Link key={item.label} to={item.href} className="py-3" onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
            <button onClick={() => { setOpen(false); navigate("/login"); }} className="py-3 text-left">Sign In</button>
          </nav>
        </div>
      )}
    </header>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#FAF7F2] pb-16 pt-28 lg:pb-20 lg:pt-32">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-4 lg:px-10 xl:px-14">
        <div className="z-10 lg:col-span-6 lg:max-w-[700px] lg:pr-6 xl:pr-10">
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.35em] text-[#8B1A1A]/60" style={bodyStyle}>
            Mumbai&apos;s First AI-Powered Restaurant Analytics
          </p>
          <h1 className="mb-8 text-[2.7rem] leading-[1.04] text-[#8B1A1A] sm:text-[3.2rem] lg:text-[3.9rem] xl:text-[4.35rem]" style={headlineStyle}>
            Turn Mumbai&apos;s Food Market Data Into Your <span className="italic font-normal">Competitive Advantage</span>
          </h1>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-[#8B1A1A]/70 lg:text-[1.3rem]" style={bodyStyle}>
            Get localized insights, revenue predictions, and competitor analysis before you invest your first rupee.
          </p>
          <div className="mb-16 flex flex-wrap gap-5">
            <Button
              onClick={() => navigate("/new-analysis")}
              className={`${editorialButton} border-[#8B1A1A] bg-[#8B1A1A] px-10 py-5 text-[#FAF7F2] hover:bg-black`}
              style={bodyStyle}
            >
              Start Free Analysis
              <Icon name="ArrowRight" size={16} className="ml-3" />
            </Button>
            <Button
              onClick={() => document.getElementById("workflow")?.scrollIntoView({ behavior: "smooth" })}
              className={`${editorialButton} border-[#8B1A1A]/20 bg-transparent px-10 py-5 text-[#8B1A1A] hover:bg-[#8B1A1A]/5`}
              style={bodyStyle}
            >
              See How It Works
            </Button>
          </div>
          <div className="flex flex-wrap gap-8 border-t border-[#8B1A1A]/10 py-8 md:flex-nowrap md:gap-10">
            {[
              ["500+", "Mumbai Locations Analyzed"],
              ["Rs2.5Cr+", "Revenue Predicted"],
              ["92%", "Prediction Accuracy"],
            ].map(([value, label], index) => (
              <React.Fragment key={label}>
                <div>
                  <div className="text-4xl text-[#8B1A1A]" style={headlineStyle}>{value}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B1A1A]/50" style={bodyStyle}>{label}</div>
                </div>
                {index < 2 && <div className="hidden h-12 w-px bg-[#8B1A1A]/10 md:block"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="relative min-h-[42vh] lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-[55%] xl:w-[53%]">
          <div className="h-full w-full overflow-hidden lg:[mask-image:linear-gradient(to_left,black_78%,transparent_100%)] lg:[-webkit-mask-image:linear-gradient(to_left,black_78%,transparent_100%)]">
            <Image src={heroImage} alt="Mumbai restaurant dining" className="h-full w-full object-cover object-[64%_center]" />
          </div>
          <div className="absolute inset-0 hidden bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/6 to-transparent lg:block"></div>
        </div>
      </div>
    </section>
  );
};

const FeatureShowcase = () => (
  <section id="features" className="bg-[#FAF7F2] py-24">
    <div className="mx-auto max-w-7xl px-6">
      <SectionTitle
        title="Mumbai-Specific Intelligence for Restaurant Success"
        description="Powered by AI trained on local food-service market dynamics."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="hover-lift relative overflow-hidden rounded-xl bg-white p-10 shadow-warm-xl md:col-span-2 md:flex md:gap-8">
          <div className="relative z-10 flex-1">
            <Icon name={FEATURE_CARDS[0][0]} size={42} className="mb-6 text-[#8B1A1A]" />
            <h3 className="mb-4 text-3xl text-[#8B1A1A]" style={headlineStyle}>{FEATURE_CARDS[0][1]}</h3>
            <p className="mb-6 leading-relaxed text-[#8B1A1A]/70" style={bodyStyle}>{FEATURE_CARDS[0][2]}</p>
          </div>
          <div className="relative min-h-[250px] flex-1">
            <Image src={mapImage} alt="Mumbai map" className="absolute inset-0 h-full w-full object-cover opacity-80 grayscale [mix-blend-mode:multiply]" />
          </div>
        </div>
        <div className="hover-lift rounded-xl border-t-4 border-[#8B1A1A] bg-white p-10 shadow-warm-xl">
          <Icon name={FEATURE_CARDS[1][0]} size={42} className="mb-6 text-[#8B1A1A]" />
          <h3 className="mb-4 text-2xl text-[#8B1A1A]" style={headlineStyle}>{FEATURE_CARDS[1][1]}</h3>
          <p className="mb-8 text-sm leading-relaxed text-[#8B1A1A]/70" style={bodyStyle}>{FEATURE_CARDS[1][2]}</p>
          <div className="mt-auto">
            <div className="text-4xl text-[#8B1A1A]" style={headlineStyle}>98.4%</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B1A1A]/40" style={bodyStyle}>Confidence Rating</div>
          </div>
        </div>
        <div className="hover-lift rounded-xl bg-white p-10 shadow-warm-xl md:col-span-3 md:flex md:items-center md:gap-10">
          <div className="flex-shrink-0">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#8B1A1A]/5">
              <Icon name={FEATURE_CARDS[2][0]} size={40} className="text-[#8B1A1A]" />
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-2xl text-[#8B1A1A]" style={headlineStyle}>{FEATURE_CARDS[2][1]}</h3>
            <p className="leading-relaxed text-[#8B1A1A]/70" style={bodyStyle}>{FEATURE_CARDS[2][2]}</p>
          </div>
          <div className="md:ml-auto">
            <a href="#testimonials" className="inline-flex items-center gap-2 border-b-2 border-[#8B1A1A]/20 pb-1 text-xs font-bold uppercase tracking-[0.2em] text-[#8B1A1A] transition-all hover:border-[#8B1A1A]" style={bodyStyle}>
              Explore Results
              <Icon name="ArrowUpRight" size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const WorkflowVisualization = () => (
  <section id="workflow" className="border-y border-[#8B1A1A]/5 bg-[#FAF7F2] py-24">
    <div className="mx-auto max-w-7xl px-6">
      <SectionTitle
        title="From Idea to Insights in 3 Simple Steps"
        description="Get comprehensive restaurant analytics in minutes, not months."
      />
      <div className="relative">
        <div className="absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 border-t-2 border-dashed border-[#8B1A1A]/20 md:block"></div>
        <div className="relative z-10 grid grid-cols-1 gap-16 md:grid-cols-3">
          {WORKFLOW_STEPS.map(([number, title, description]) => (
            <div key={number} className="flex flex-col items-center text-center">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B1A1A] text-lg font-bold text-[#FAF7F2] shadow-xl" style={bodyStyle}>
                {number}
              </div>
              <h4 className="mb-4 text-2xl italic text-[#8B1A1A]" style={headlineStyle}>{title}</h4>
              <p className="px-4 text-sm leading-relaxed text-[#8B1A1A]/70" style={bodyStyle}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);


const InteractiveSimulation = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [showScore, setShowScore] = useState(false);
    const [logs, setLogs] = useState([]);

    
  const runSimulation = () => {
    setLogs([]);
    setShowScore(false);

    setTimeout(() => {
      setLogs((prev) => [...prev, "[RUNNING] Syncing micro-markets..."]);
    }, 500);

    setTimeout(() => {
      setLogs((prev) => [...prev, "[RUNNING] Processing trends..."]);
    }, 1200);

    setTimeout(() => {
      setLogs((prev) => [...prev, "[SUCCESS] Model ready"]);
      setShowScore(true);
    }, 2000);
  };    

  const score = SCORES[location]?.[cuisine] || 0;

  const locationLabel =
    LOCATION_OPTIONS.find((item) => item.value === location)?.label ||
    "Choose area";

  const cuisineLabel =
    CUISINE_OPTIONS.find((item) => item.value === cuisine)?.label ||
    "Choose cuisine";

  const rating =
    score >= 85
      ? "Excellent Potential"
      : score >= 75
      ? "Good Potential"
      : "Moderate Potential";
   


  return (
    <section className="bg-[#FAF7F2] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionTitle
          eyebrow="Real-time risk assessment engine"
          title="Try Our AI-Powered Location Scorer"
          description="Get an instant potential score for your restaurant concept in Mumbai."
        />

        {/* MAIN CONTAINER */}
        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">

          {/* BACKGROUND IMAGE */}
          <Image
            src={scorerImage}
            alt="Restaurant workspace"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* GRADIENT OVERLAY (FIXED) */}
         <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>

          {/* CONTENT GRID */}
          <div className="relative grid min-h-[680px] grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">

            {/* LEFT TEXT */}
            <div className="flex flex-col justify-end p-10 text-white">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <Icon name="Radar" size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
                  Scoring Engine
                </span>
              </div>

              <h3 className="mb-4 max-w-lg text-5xl leading-tight font-semibold">
                Calculate potential score before you commit to the location.
              </h3>

              <p className="max-w-lg text-lg text-white/80">
                Test a neighborhood and cuisine combination instantly, then move
                into a deeper OriginEats analysis with stronger confidence.
              </p>
            </div>

            {/* RIGHT GLASS CARD */}
            <div className="flex items-center justify-center p-6">

              <div className="relative w-full max-w-xl">

                {/* GLOW EFFECT */}
                <div className="absolute inset-0 rounded-2xl bg-white/5 blur-2xl"></div>

                {/* GLASS CARD */}
                <div
                  className="relative rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/30 
                 shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-8 text-white
                  transform hover:scale-[1.02] transition duration-300"
                >

                  {/* HEADER */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500/70"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500/70"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500/70"></div>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                      OriginEats Core
                    </div>
                  </div>

                  {/* FORM */}
                  <div className="grid gap-5 md:grid-cols-2 mb-6">
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-md text-white"
                    >
                      <option value="" className="text-black">
                        Choose area
                      </option>
                      {LOCATION_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value} className="text-black">
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    <select
                      value={cuisine}
                      onChange={(e) => setCuisine(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-md text-white"
                    >
                      <option value="" className="text-black">
                        Choose cuisine
                      </option>
                      {CUISINE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value} className="text-black">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* TERMINAL TEXT */}

{/* LOGS */}
<div className="mb-6 text-green-400 text-sm space-y-1 min-h-[60px]">
  {logs.length === 0 && (
    <p className="text-white/40">Waiting for input...</p>
  )}

  {logs.map((log, index) => (
    <p key={index}>{log}</p>
  ))}
</div>




                  {/* BUTTON (FIXED BIG CTA) */}
                  <button
                    onClick={runSimulation}
                    disabled={!location || !cuisine}
                    className="w-full mb-6 rounded-lg 
                    bg-gradient-to-r from-[#8B1A1A] to-red-600 
                    hover:from-red-700 hover:to-red-500
                    shadow-lg shadow-red-900/40
                    px-6 py-3 font-bold tracking-wider disabled:opacity-50"
                  >
                    Show Potential Score
                  </button>

                  {/* RESULT */}
                  {showScore && (
                    <>
                      <div className="mb-6 p-6 rounded-lg bg-white/10 border border-white/20">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm text-white/60">Score</p>
                            <p className="text-3xl font-bold text-green-400">
                              {score}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-white/60">Rating</p>
                            <p className="text-xl font-semibold">{rating}</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate("/new-analysis")}
                        className="w-full border border-white/30 py-3 rounded-lg hover:bg-white/10"
                      >
                        Get Full Analysis →
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);
  const active = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="bg-[#FAF7F2] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Success Stories from Mumbai Restaurateurs"
          description="Real results from founders who trusted the platform's insights."
        />
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-warm-xl md:flex md:min-h-[500px]">
          <div className="relative min-h-[320px] md:w-1/2">
            <Image src={active.image} alt={active.alt} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[#8B1A1A]/10 mix-blend-overlay"></div>
          </div>
          <div className="flex flex-col justify-center bg-white p-12 md:w-1/2 md:p-20">
            <Icon name="Quote" size={56} className="mb-8 text-[#8B1A1A]" />
            <blockquote className="mb-10 text-3xl italic leading-tight text-[#8B1A1A] md:text-4xl" style={headlineStyle}>
              &quot;{active.content}&quot;
            </blockquote>
            <div className="mb-10 flex items-center gap-5">
              <div className="h-12 w-px bg-[#8B1A1A]/20"></div>
              <div>
                <div className="text-sm font-bold uppercase tracking-[0.2em] text-[#8B1A1A]" style={bodyStyle}>{active.name}</div>
                <div className="text-xs italic text-[#8B1A1A]/50" style={bodyStyle}>{active.role}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-[#8B1A1A]/10 pt-10">
              {['Revenue', 'ROI', 'Timeline'].map((label, metricIndex) => (
                <div key={label}>
                  <div className="text-3xl text-[#8B1A1A]" style={headlineStyle}>{active.metrics[metricIndex]}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B1A1A]/40" style={bodyStyle}>{label}</div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex items-center gap-4">
              <button
                onClick={() => setIndex((value) => (value === 0 ? TESTIMONIALS.length - 1 : value - 1))}
                className="flex h-11 w-11 items-center justify-center border border-[#8B1A1A]/15 text-[#8B1A1A] transition hover:bg-[#8B1A1A]/5"
                aria-label="Previous testimonial"
              >
                <Icon name="ChevronLeft" size={18} />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((item, itemIndex) => (
                  <button
                    key={item.name}
                    onClick={() => setIndex(itemIndex)}
                    className={`h-2 rounded-full transition-all ${itemIndex === index ? 'w-8 bg-[#8B1A1A]' : 'w-2 bg-[#8B1A1A]/20'}`}
                    aria-label={`Go to testimonial ${itemIndex + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setIndex((value) => (value === TESTIMONIALS.length - 1 ? 0 : value + 1))}
                className="flex h-11 w-11 items-center justify-center border border-[#8B1A1A]/15 text-[#8B1A1A] transition hover:bg-[#8B1A1A]/5"
                aria-label="Next testimonial"
              >
                <Icon name="ChevronRight" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-[#FAF7F2] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionTitle
          eyebrow="Need-to-know"
          title="Frequently Asked Questions"
          description="Everything you need to know about the OriginEats homepage offering."
        />
        <div className="space-y-4">
          {FAQS.map(([question, answer], itemIndex) => (
            <div key={question} className="overflow-hidden rounded-xl border border-[#8B1A1A]/10 bg-white shadow-warm">
              <button
                onClick={() => setOpenIndex(openIndex === itemIndex ? null : itemIndex)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                aria-expanded={openIndex === itemIndex}
              >
                <span className="pr-4 text-lg text-[#8B1A1A]" style={headlineStyle}>{question}</span>
                <Icon name={openIndex === itemIndex ? "Minus" : "Plus"} size={18} className="flex-shrink-0 text-[#8B1A1A]" />
              </button>
              <div className={`${openIndex === itemIndex ? 'max-h-60' : 'max-h-0'} overflow-hidden transition-all duration-300`}>
                <div className="px-6 pb-6 text-[#8B1A1A]/70" style={bodyStyle}>{answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FAF7F2] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[2rem] bg-[#8B1A1A] px-8 py-16 text-center text-[#FAF7F2] shadow-warm-2xl md:px-16">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.35em] text-[#FFD700]" style={bodyStyle}>
            Join 500+ Mumbai Restaurateurs
          </p>
          <h2 className="mb-6 text-4xl md:text-5xl" style={headlineStyle}>Ready to Make Data-Driven Restaurant Decisions?</h2>
          <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-[#FAF7F2]/80" style={bodyStyle}>
            Start your free analysis and explore location intelligence, forecasts, and pricing confidence.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={() => navigate("/new-analysis")}
              className={`${editorialButton} border-[#FAF7F2] bg-[#FAF7F2] text-[#8B1A1A] hover:bg-[#FAF7F2]/90`}
              style={bodyStyle}
            >
              Start Free Analysis
            </Button>
            <Button
              onClick={() => navigate("/subscription-tiers")}
              className={`${editorialButton} border-[#FAF7F2]/30 bg-transparent text-[#FAF7F2] hover:bg-white/10`}
              style={bodyStyle}
            >
              View Pricing Plans
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomepageFooter = () => (
  <footer className="bg-[#8B1A1A] py-20 text-[#FAF7F2]">
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="mb-6 text-3xl italic" style={headlineStyle}>OriginEats</div>
        <p className="mb-8 max-w-sm text-[#FAF7F2]/60" style={bodyStyle}>
          Mumbai&apos;s AI-powered restaurant analytics platform for faster location and concept decisions.
        </p>
        <div className="flex gap-4">
          <a href="#features" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FAF7F2]/20 transition-all hover:bg-white hover:text-[#8B1A1A]">
            <Icon name="BarChart3" size={16} />
          </a>
          <a href="#testimonials" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FAF7F2]/20 transition-all hover:bg-white hover:text-[#8B1A1A]">
            <Icon name="MessagesSquare" size={16} />
          </a>
        </div>
      </div>
      {Object.entries(FOOTER_COLUMNS).map(([title, links]) => (
        <div key={title}>
          <h5 className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFD700]" style={bodyStyle}>{title}</h5>
          <ul className="space-y-4 text-sm text-[#FAF7F2]/70" style={bodyStyle}>
            {links.map(([label, href]) => (
              <li key={label}>
                {href.startsWith("/") ? (
                  <Link to={href} className="hover:text-[#FAF7F2]">{label}</Link>
                ) : (
                  <a href={href} className="hover:text-[#FAF7F2]">{label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="mx-auto mt-20 max-w-7xl border-t border-[#FAF7F2]/10 px-6 pt-10 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-[#FAF7F2]/30" style={bodyStyle}>
      Copyright {new Date().getFullYear()} OriginEats. All rights reserved.
    </div>
  </footer>
);

const Homepage = () => (
  <div className="min-h-screen bg-[#FAF7F2]">
    <HomepageHeader />
    <main>
      <HeroSection />
      <FeatureShowcase />
      <WorkflowVisualization />
      <InteractiveSimulation />
      <TestimonialCarousel />
      <FAQAccordion />
      <CTASection />
    </main>
    <HomepageFooter />
  </div>
);

export default Homepage;
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";

// Components
import ErrorBoundary from "./components/ErrorBoundary";
import AuthPage from "./components/AuthPage"; 
import Coupons from "./components/coupons"; 

// Pages
import Homepage from "./pages/homepage";
import UserDashboard from "./pages/user-dashboard";
import NewAnalysis from "./pages/new-analysis";
import AnalysisResults from "./pages/analysis-results";
import NotFound from "./pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <RouterRoutes>

          {/* 1. PUBLIC LANDING & AUTH */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<AuthPage />} />

          {/* 2. CORE PLATFORM FLOW (PHASE 4 MVP) */}
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/new-analysis" element={<NewAnalysis />} />
          <Route path="/analysis-results" element={<AnalysisResults />} />
          
          {/* 3. TOKEN MANAGEMENT (The "Hackathon Translated" Coupon Route) */}
          <Route path="/redeem-tokens" element={<Coupons />} />

          {/* 4. REDIRECTS & FALLBACKS */}
          <Route path="/homepage" element={<Navigate to="/user-dashboard" replace />} />
          <Route path="*" element={<NotFound />} />

        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthPage from "./components/AuthPage"; 

// --- COMMENTED OUT FOR PHASE 2 ---
// import ScrollToTop from "components/ScrollToTop";
// import Coupons from "./components/coupons";
// import NotFound from "pages/NotFound";
// import Homepage from './pages/homepage';
// import UserDashboard from './pages/user-dashboard';
// import SubscriptionTiers from './pages/subscription-tiers';
// import NewAnalysis from './pages/new-analysis';
// import PaymentProcessing from './pages/payment-processing';
// import AnalysisResults from './pages/analysis-results';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        {/* <ScrollToTop /> */}
        <RouterRoutes>

          {/* ACTIVE PHASE 2 ROUTES */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<AuthPage />} />

          {/* --- COMMENTED OUT FOR PHASE 2 --- */}
          
          {/* 1. PUBLIC ROUTES */}
          {/* <Route path="/" element={<Homepage />} /> */}
          {/* <Route path="/coupons" element={<Coupons />} /> */}

          {/* 2. PROTECTED/INTERNAL ROUTES */}
          {/* <Route path="/user-dashboard" element={<UserDashboard />} /> */}
          {/* <Route path="/subscription-tiers" element={<SubscriptionTiers />} /> */}
          {/* <Route path="/new-analysis" element={<NewAnalysis />} /> */}
          {/* <Route path="/payment-processing" element={<PaymentProcessing />} /> */}
          {/* <Route path="/analysis-results" element={<AnalysisResults />} /> */}

          {/* 3. REDIRECTS & ERROR HANDLING */}
          {/* <Route path="/homepage" element={<Navigate to="/user-dashboard" replace />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}

        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ContentPage from "./pages/ContentPage";
import ProductsList from "./pages/ProductsList";
import MarketingList from "./pages/MarketingList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminDashboard />} />
          
          {/* Specific page routes */}
          <Route path="/pages/products-list" element={<ProductsList />} />
          <Route path="/pages/marketing-list" element={<MarketingList />} />
          
          {/* Generic content page for other pages */}
          <Route path="/pages/order-list" element={<ContentPage />} />
          <Route path="/pages/media-plans" element={<ContentPage />} />
          <Route path="/pages/offer-pricing-skus" element={<ContentPage />} />
          <Route path="/pages/clients" element={<ContentPage />} />
          <Route path="/pages/suppliers" element={<ContentPage />} />
          <Route path="/pages/customer-support" element={<ContentPage />} />
          <Route path="/pages/sales-reports" element={<ContentPage />} />
          <Route path="/pages/finance-and-accounting" element={<ContentPage />} />
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

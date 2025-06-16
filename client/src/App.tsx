import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/home";
import ProfileDetails from "./pages/profile-details";
import Signup from "./pages/signup";
import NotFound from "./pages/not-found";
import AgeVerification from "./components/age-verification";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

export default function App() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setIsAgeVerified(true);
    }
  }, []);

  const handleAgeVerification = (verified: boolean) => {
    setIsAgeVerified(verified);
    localStorage.setItem('ageVerified', verified.toString());
  };

  if (!isAgeVerified) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AgeVerification onVerify={handleAgeVerification} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<ProfileDetails />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
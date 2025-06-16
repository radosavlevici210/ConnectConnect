
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Calendar, AlertTriangle } from "lucide-react";

interface AgeVerificationProps {
  onVerify: (verified: boolean) => void;
}

export default function AgeVerification({ onVerify }: AgeVerificationProps) {
  const [birthDate, setBirthDate] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleVerification = () => {
    setError("");
    
    if (!birthDate) {
      setError("Please enter your date of birth");
      return;
    }
    
    if (!agreed) {
      setError("You must agree to the terms to continue");
      return;
    }
    
    const age = calculateAge(birthDate);
    
    if (age < 18) {
      setError("You must be 18 or older to access this platform");
      return;
    }
    
    onVerify(true);
  };

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Age Verification Required</CardTitle>
          <p className="text-gray-600 mt-2">
            This platform is intended for adults only. You must be 18 or older to continue.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Adult Content Warning</p>
              <p>This platform contains content and services intended for mature audiences only.</p>
            </div>
          </div>

          <div>
            <Label htmlFor="birthDate" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Date of Birth</span>
            </Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="mt-2"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm leading-5">
                I confirm that I am 18 years of age or older and agree to the{" "}
                <span className="text-primary font-medium">Terms of Service</span> and{" "}
                <span className="text-primary font-medium">Privacy Policy</span>. I understand 
                this platform contains adult content and services.
              </Label>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <Button 
              onClick={handleVerification} 
              className="w-full"
              size="lg"
            >
              Verify and Continue
            </Button>
            
            <Button 
              onClick={handleExit} 
              variant="outline" 
              className="w-full"
              size="lg"
            >
              I am under 18 - Exit
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            Your date of birth is used only for age verification and is not stored permanently.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

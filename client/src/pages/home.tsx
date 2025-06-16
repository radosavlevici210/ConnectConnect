import { useState, useEffect } from "react";
import Header from "@/components/header";
import StoriesCarousel from "@/components/stories-carousel";
import FilterBar from "@/components/filter-bar";
import ProfileGrid from "@/components/profile-grid";
import BottomNavigation from "@/components/bottom-navigation";
import ChatModal from "@/components/chat-modal";
import VideoCallModal from "@/components/video-call-modal";
import { Button } from "@/components/ui/button";
import { MessageCircle, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Shield, AlertTriangle } from "lucide-react";

export default function Home() {
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  const [showAgeGate, setShowAgeGate] = useState(true);

  useEffect(() => {
    const verified = localStorage.getItem('age-verified');
    if (verified === 'true') {
      setAgeVerified(true);
      setShowAgeGate(false);
    }
  }, []);

  const handleAgeVerification = () => {
    if (ageVerified) {
      localStorage.setItem('age-verified', 'true');
      setShowAgeGate(false);
    }
  };

  const handleChatOpen = (profile: any) => {
    setSelectedProfile(profile);
    setIsChatOpen(true);
  };

  const handleVideoCallOpen = (profile: any) => {
    setSelectedProfile(profile);
    setIsVideoCallOpen(true);
  };

  if (showAgeGate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Age Verification Required
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-center text-gray-600">
              <p className="mb-4">
                This platform contains content and services intended for adults only.
              </p>
              <p className="text-sm">
                You must be 18 years or older to access this professional networking platform.
              </p>
            </div>

            <div className="flex items-start space-x-2 p-4 bg-gray-50 rounded">
              <Checkbox
                id="age-check"
                checked={ageVerified}
                onCheckedChange={(checked) => setAgeVerified(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="age-check" className="text-sm font-medium leading-relaxed">
                I confirm that I am 18 years of age or older and wish to access this professional platform.
              </Label>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleAgeVerification}
                disabled={!ageVerified}
                className="w-full"
              >
                <Shield className="w-4 h-4 mr-2" />
                Enter Platform
              </Button>

              <Button
                variant="outline"
                onClick={() => window.close()}
                className="w-full"
              >
                Exit
              </Button>
            </div>

            <div className="text-xs text-gray-500 text-center">
              By entering, you agree to our Terms of Service and confirm you meet the age requirements for your jurisdiction.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="bg-white px-4 py-3">
        <StoriesCarousel />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-6">
        <FilterBar />
        <ProfileGrid 
          onChatOpen={handleChatOpen}
          onVideoCallOpen={handleVideoCallOpen}
        />
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
        <Button
          size="lg"
          className="rounded-full w-12 h-12 bg-accent hover:bg-accent/90 text-white shadow-lg"
        >
          <Plus className="h-5 w-5" />
        </Button>
        <Button
          size="lg"
          className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90 text-white shadow-lg"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      </div>

      <BottomNavigation />

      {selectedProfile && (
        <>
          <ChatModal
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
            profile={selectedProfile}
          />
          <VideoCallModal
            isOpen={isVideoCallOpen}
            onClose={() => setIsVideoCallOpen(false)}
            profile={selectedProfile}
          />
        </>
      )}
    </div>
  );
}
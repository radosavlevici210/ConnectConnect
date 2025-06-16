import { useState } from "react";
import Header from "@/components/header";
import StoriesCarousel from "@/components/stories-carousel";
import FilterBar from "@/components/filter-bar";
import ProfileGrid from "@/components/profile-grid";
import BottomNavigation from "@/components/bottom-navigation";
import ChatModal from "@/components/chat-modal";
import VideoCallModal from "@/components/video-call-modal";
import { Button } from "@/components/ui/button";
import { MessageCircle, Plus } from "lucide-react";

export default function Home() {
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);

  const handleChatOpen = (profile: any) => {
    setSelectedProfile(profile);
    setIsChatOpen(true);
  };

  const handleVideoCallOpen = (profile: any) => {
    setSelectedProfile(profile);
    setIsVideoCallOpen(true);
  };

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

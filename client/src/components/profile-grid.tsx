import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ProfileCard from "./profile-card";
import type { Profile } from "@shared/schema";

interface ProfileGridProps {
  onChatOpen: (profile: Profile) => void;
  onVideoCallOpen: (profile: Profile) => void;
}

export default function ProfileGrid({ onChatOpen, onVideoCallOpen }: ProfileGridProps) {
  const { data: profiles = [], isLoading } = useQuery<Profile[]>({
    queryKey: ['/api/profiles'],
    refetchInterval: 30000, // Refresh every 30 seconds to update online status
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
            <div className="w-full h-64 bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              <div className="flex space-x-2">
                <div className="h-8 bg-gray-200 rounded flex-1"></div>
                <div className="h-8 bg-gray-200 rounded flex-1"></div>
                <div className="h-8 w-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Stats and See More */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {profiles.length} London Professionals
        </h2>
        <Button variant="link" className="text-primary hover:text-primary/80 font-medium">
          See More
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onChatOpen={() => onChatOpen(profile)}
            onVideoCallOpen={() => onVideoCallOpen(profile)}
          />
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
          Load More Profiles
        </Button>
      </div>
    </>
  );
}

import { Button } from "@/components/ui/button";
import { Heart, Star, MapPin, MessageCircle, Video, Mail, Shield, User, Phone } from "lucide-react";
import type { Profile } from "@shared/schema";

interface ProfileCardProps {
  profile: Profile;
  onChatOpen: () => void;
  onVideoCallOpen: () => void;
}

export default function ProfileCard({ profile, onChatOpen, onVideoCallOpen }: ProfileCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-accent';
      case 'busy':
        return 'bg-yellow-400';
      case 'away':
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'busy':
        return 'Busy';
      case 'away':
        return 'Away';
      default:
        return 'Offline';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <img 
          src={profile.image} 
          alt={profile.name}
          className="w-full h-64 object-cover"
        />

        {/* Online Status */}
        <div className="absolute top-3 left-3 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <div className={`w-2 h-2 ${getStatusColor(profile.status)} rounded-full mr-2`}></div>
          <span className="text-xs font-medium text-gray-700">{getStatusText(profile.status)}</span>
        </div>

        {/* Heart Icon */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
          <Heart className="h-4 w-4 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
        </div>

        {/* Verified Badge */}
        {profile.isVerified && (
          <div className="absolute bottom-3 left-3 bg-accent text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Shield className="h-3 w-3 mr-1" />
            Verified
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900">{profile.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium text-gray-700">
              {(profile.rating / 10).toFixed(1)}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3">{profile.title}</p>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{profile.location}</span>
        </div>

        {profile.phoneNumber && (
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Phone className="h-4 w-4 mr-1" />
            <span>{profile.phoneNumber}</span>
          </div>
        )}

        <div className="space-y-2">
          <Button 
            size="sm" 
            className="w-full bg-primary hover:bg-primary/90 text-white"
            onClick={() => window.location.href = `/profile/${profile.id}`}
          >
            View Profile
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="w-full"
            onClick={onChatOpen}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="w-full"
            onClick={onVideoCallOpen}
          >
            <Video className="h-4 w-4 mr-2" />
            Video Call
          </Button>
          
          
          
        </div>
      </div>
    </div>
  );
}
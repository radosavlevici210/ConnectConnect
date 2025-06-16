import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PhoneOff, Mic, Video, X, User } from "lucide-react";
import { useWebSocket } from "@/hooks/use-websocket";
import type { Profile } from "@shared/schema";

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export default function VideoCallModal({ isOpen, onClose, profile }: VideoCallModalProps) {
  const [isConnecting, setIsConnecting] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const { sendMessage, lastMessage } = useWebSocket();

  useEffect(() => {
    if (isOpen) {
      setIsConnecting(true);

      // Send video call request
      sendMessage({
        type: 'start_video_call',
        callerProfileId: 1, // Mock current user ID
        targetProfileId: profile.id,
        callerName: 'You'
      });

      // Simulate connection after 3 seconds
      const timer = setTimeout(() => {
        setIsConnecting(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, profile.id, sendMessage]);

  useEffect(() => {
    if (lastMessage && lastMessage.type === 'video_call_response') {
      if (lastMessage.accepted) {
        setIsConnecting(false);
      } else {
        onClose();
      }
    }
  }, [lastMessage, onClose]);

  const handleEndCall = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl h-96 p-0 bg-gray-900 border-0" aria-describedby="video-call-description">
        <DialogTitle className="sr-only">Video call with {profile.name}</DialogTitle>
        <DialogDescription id="video-call-description" className="sr-only">
          Video call interface with {profile.name}
        </DialogDescription>
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                {profile.image ? (
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={profile.image} alt={profile.name} />
                    <AvatarFallback className="text-4xl bg-gray-600 text-gray-300">
                      {profile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <User className="h-16 w-16 text-gray-400" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {isConnecting ? `Connecting to ${profile.name}...` : `Connected with ${profile.name}`}
              </h3>
              <p className="text-gray-300">
                {isConnecting ? 'Initializing video call' : 'Video call in progress'}
              </p>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <Button
              onClick={handleEndCall}
              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full"
            >
              <PhoneOff className="h-5 w-5" />
            </Button>

            <Button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full ${
                isMuted 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-gray-700 hover:bg-gray-600'
              } text-white`}
            >
              <Mic className="h-5 w-5" />
            </Button>

            <Button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-full ${
                !isVideoOn 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-gray-700 hover:bg-gray-600'
              } text-white`}
            >
              <Video className="h-5 w-5" />
            </Button>

            <Button
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
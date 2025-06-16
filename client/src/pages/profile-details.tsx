
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin, Phone, Star, Shield, MessageCircle, Video, Heart, 
  User, Clock, Award, CheckCircle 
} from "lucide-react";
import type { Profile } from "@shared/schema";

export default function ProfileDetails() {
  const { id } = useParams();
  
  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: [`/api/profiles/${id}`],
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h1>
          <p className="text-gray-600">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'away': return 'bg-orange-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online Now';
      case 'busy': return 'Busy';
      case 'away': return 'Away';
      default: return 'Offline';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="mb-4"
          >
            ← Back to Profiles
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Image and Basic Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="w-48 h-48 mx-auto">
                      <AvatarImage src={profile.image} alt={profile.name} />
                      <AvatarFallback><User className="w-24 h-24" /></AvatarFallback>
                    </Avatar>
                    
                    {/* Status Indicator */}
                    <div className="absolute bottom-4 right-4 flex items-center bg-white rounded-full px-3 py-1 shadow-lg">
                      <div className={`w-3 h-3 ${getStatusColor(profile.status)} rounded-full mr-2`}></div>
                      <span className="text-sm font-medium">{getStatusText(profile.status)}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-center mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                      {profile.isVerified && (
                        <Shield className="w-6 h-6 text-accent ml-2" />
                      )}
                    </div>
                    
                    <p className="text-xl text-gray-600 mb-2">{profile.title}</p>
                    
                    <div className="flex items-center justify-center text-gray-500 mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{profile.location}</span>
                    </div>

                    <div className="flex items-center justify-center mb-6">
                      <Star className="w-5 h-5 text-yellow-400 mr-1" />
                      <span className="font-semibold">{profile.rating}</span>
                      <span className="text-gray-500 ml-1">rating</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                      
                      <Button variant="outline" className="w-full">
                        <Video className="w-4 h-4 mr-2" />
                        Video Call
                      </Button>
                      
                      <Button variant="outline" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                      
                      <Button variant="ghost" className="w-full">
                        <Heart className="w-4 h-4 mr-2" />
                        Add to Favorites
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            {profile.bio && (
              <Card>
                <CardHeader>
                  <CardTitle>About {profile.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                </CardContent>
              </Card>
            )}

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.services?.map((service, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Professional Details */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="font-medium">Experience</span>
                  </div>
                  <span className="text-gray-600">{profile.experience}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="font-medium">Featured Area</span>
                  </div>
                  <span className="text-gray-600">{profile.featuredArea}</span>
                </div>
                
                {profile.isVerified && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="font-medium">Verification Status</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.phoneNumber && (
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="font-medium">Phone:</span>
                      <span className="ml-2 text-gray-600">{profile.phoneNumber}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="font-medium">Location:</span>
                    <span className="ml-2 text-gray-600">{profile.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

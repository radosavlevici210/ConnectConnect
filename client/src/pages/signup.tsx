
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, User, MapPin, Phone, Star } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    location: "",
    phoneNumber: "",
    experience: "",
    featuredArea: "",
    services: [] as string[],
    bio: "",
    image: ""
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const serviceOptions = [
    "GFE", "Dinner Companion", "Overnight", "Travel", "Massage", 
    "Social Companion", "Dinner Dates", "Private Time", "Party Companion",
    "Business Events", "Travel Companion", "Weekend Getaway"
  ];

  const experienceOptions = [
    "New", "6+ Months", "1+ Year", "2+ Years", "3+ Years", "5+ Years"
  ];

  const featuredAreaOptions = [
    "Independent", "Elite Agency", "VIP Service", "Luxury Companion", "Premium Service"
  ];

  const locationOptions = [
    "London, UK", "Manchester, UK", "Birmingham, UK", "Leeds, UK", "Glasgow, UK",
    "Liverpool, UK", "Newcastle, UK", "Sheffield, UK", "Bristol, UK", "Cardiff, UK"
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const signupMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Signup failed');
      return response.json();
    },
    onSuccess: () => {
      alert('Profile created successfully! Welcome to Elite Dating UK!');
      // Reset form
      setFormData({
        name: "", title: "", location: "", phoneNumber: "", experience: "",
        featuredArea: "", services: [], bio: "", image: ""
      });
      setImagePreview("");
      setImageFile(null);
    },
    onError: () => {
      alert('Signup failed. Please try again.');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.title || !formData.location || !formData.phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }
    signupMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">
              Join Elite Dating UK
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Create your professional profile and start connecting with clients
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="title">Professional Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Elite Companion, VIP Escort"
                    required
                  />
                </div>
              </div>

              {/* Location and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    placeholder="+44 20 1234 5678"
                    required
                  />
                </div>
              </div>

              {/* Experience and Featured Area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceOptions.map(exp => (
                        <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="featuredArea">Featured Area</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, featuredArea: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select featured area" />
                    </SelectTrigger>
                    <SelectContent>
                      {featuredAreaOptions.map(area => (
                        <SelectItem key={area} value={area}>{area}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <Label htmlFor="photo">Profile Photo</Label>
                <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary transition-colors">
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-full"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => document.getElementById('photo-upload')?.click()}
                      >
                        Change Photo
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('photo-upload')?.click()}
                        >
                          Upload Photo
                        </Button>
                        <p className="mt-2 text-sm text-gray-500">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  )}
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Services */}
              <div>
                <Label>Services Offered</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {serviceOptions.map(service => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={formData.services.includes(service)}
                        onCheckedChange={() => handleServiceToggle(service)}
                      />
                      <Label htmlFor={service} className="text-sm">{service}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div>
                <Label htmlFor="bio">About You</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell potential clients about yourself, your interests, and what makes you unique..."
                  className="min-h-[120px]"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto px-12"
                  disabled={signupMutation.isPending}
                >
                  {signupMutation.isPending ? 'Creating Profile...' : 'Create My Profile'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

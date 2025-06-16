import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, UserCheck, Video, MessageCircle } from "lucide-react";

export default function FilterBar() {
  const [location, setLocation] = useState("");
  const [featuredArea, setFeaturedArea] = useState("");
  const [services, setServices] = useState("");
  const [experience, setExperience] = useState("");

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-3 mb-4">
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="london">London</SelectItem>
            <SelectItem value="manchester">Manchester</SelectItem>
            <SelectItem value="birmingham">Birmingham</SelectItem>
            <SelectItem value="edinburgh">Edinburgh</SelectItem>
            <SelectItem value="glasgow">Glasgow</SelectItem>
            <SelectItem value="bristol">Bristol</SelectItem>
            <SelectItem value="leeds">Leeds</SelectItem>
            <SelectItem value="liverpool">Liverpool</SelectItem>
            <SelectItem value="cardiff">Cardiff</SelectItem>
            <SelectItem value="newcastle">Newcastle</SelectItem>
          </SelectContent>
        </Select>

        <Select value={featuredArea} onValueChange={setFeaturedArea}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="independent">Independent</SelectItem>
            <SelectItem value="agency">Agency</SelectItem>
            <SelectItem value="elite">Elite</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
          </SelectContent>
        </Select>

        <Select value={services} onValueChange={setServices}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Services" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gfe">GFE</SelectItem>
            <SelectItem value="dinner-dates">Dinner Dates</SelectItem>
            <SelectItem value="social-events">Social Events</SelectItem>
            <SelectItem value="travel-companion">Travel Companion</SelectItem>
            <SelectItem value="overnight">Overnight</SelectItem>
            <SelectItem value="massage">Massage</SelectItem>
            <SelectItem value="business-events">Business Events</SelectItem>
            <SelectItem value="private-time">Private Time</SelectItem>
            <SelectItem value="social-companion">Social Companion</SelectItem>
          </SelectContent>
        </Select>

        <Select value={experience} onValueChange={setExperience}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New (1-2 Years)</SelectItem>
            <SelectItem value="experienced">Experienced (3-5 Years)</SelectItem>
            <SelectItem value="expert">Expert (5+ Years)</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>
      
      <div className="flex space-x-4">
        <Button className="bg-accent hover:bg-accent/90 text-white flex items-center gap-2">
          <UserCheck className="h-4 w-4" />
          Verified
        </Button>
        <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
          <Video className="h-4 w-4" />
          Video Calls
        </Button>
        <Button className="bg-secondary hover:bg-secondary/90 text-white flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          Live Chat
        </Button>
      </div>
    </div>
  );
}

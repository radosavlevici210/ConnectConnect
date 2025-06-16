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
            <SelectValue placeholder="Featured Areas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="consulting">Consulting</SelectItem>
            <SelectItem value="coaching">Coaching</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="legal">Legal</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="real-estate">Real Estate</SelectItem>
          </SelectContent>
        </Select>

        <Select value={services} onValueChange={setServices}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Services" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="business-consulting">Business Consulting</SelectItem>
            <SelectItem value="life-coaching">Life Coaching</SelectItem>
            <SelectItem value="ui-design">UI/UX Design</SelectItem>
            <SelectItem value="software-development">Software Development</SelectItem>
            <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
            <SelectItem value="financial-planning">Financial Planning</SelectItem>
            <SelectItem value="legal-consulting">Legal Consulting</SelectItem>
            <SelectItem value="healthcare-consulting">Healthcare Consulting</SelectItem>
            <SelectItem value="property-consulting">Property Consulting</SelectItem>
            <SelectItem value="strategy-planning">Strategy Planning</SelectItem>
            <SelectItem value="market-analysis">Market Analysis</SelectItem>
            <SelectItem value="wellness">Wellness & Mindfulness</SelectItem>
            <SelectItem value="leadership">Leadership Training</SelectItem>
            <SelectItem value="web-development">Web Development</SelectItem>
            <SelectItem value="seo">SEO & Content Strategy</SelectItem>
            <SelectItem value="investment">Investment Advisory</SelectItem>
            <SelectItem value="tax-advisory">Tax Advisory</SelectItem>
            <SelectItem value="contract-review">Contract Review</SelectItem>
            <SelectItem value="compliance">Compliance</SelectItem>
            <SelectItem value="medical-advisory">Medical Advisory</SelectItem>
            <SelectItem value="mental-health">Mental Health Support</SelectItem>
            <SelectItem value="real-estate">Real Estate</SelectItem>
            <SelectItem value="property-management">Property Management</SelectItem>
          </SelectContent>
        </Select>

        <Select value={experience} onValueChange={setExperience}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="entry">Entry Level</SelectItem>
            <SelectItem value="mid">Mid Level</SelectItem>
            <SelectItem value="senior">Senior Level</SelectItem>
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

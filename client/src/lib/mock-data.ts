import type { Profile } from "@shared/schema";

export const mockProfiles: Profile[] = [
  {
    id: 1,
    name: "Jessica Miller",
    title: "Business Strategy Consultant",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    rating: 49,
    isOnline: true,
    status: "online",
    isVerified: true,
    services: ["Business Consulting", "Strategy Planning"],
    experience: "Senior Level",
    featuredArea: "Consulting"
  },
  {
    id: 2,
    name: "David Park",
    title: "UX/UI Design Specialist",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    rating: 48,
    isOnline: false,
    status: "busy",
    isVerified: true,
    services: ["UI Design", "UX Research"],
    experience: "Mid Level",
    featuredArea: "Design"
  },
  {
    id: 3,
    name: "Maria Santos",
    title: "Life & Wellness Coach",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    rating: 50,
    isOnline: true,
    status: "online",
    isVerified: true,
    services: ["Life Coaching", "Wellness"],
    experience: "Senior Level",
    featuredArea: "Coaching"
  },
  {
    id: 4,
    name: "Alex Johnson",
    title: "Executive Business Coach",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    rating: 47,
    isOnline: true,
    status: "online",
    isVerified: true,
    services: ["Executive Coaching", "Leadership"],
    experience: "Senior Level",
    featuredArea: "Coaching"
  },
  {
    id: 5,
    name: "Lisa Chen",
    title: "Digital Marketing Expert",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    rating: 49,
    isOnline: false,
    status: "away",
    isVerified: true,
    services: ["Digital Marketing", "SEO"],
    experience: "Mid Level",
    featuredArea: "Marketing"
  },
  {
    id: 6,
    name: "Michael Thompson",
    title: "Financial Planning Advisor",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
    rating: 48,
    isOnline: true,
    status: "online",
    isVerified: true,
    services: ["Financial Planning", "Investment"],
    experience: "Senior Level",
    featuredArea: "Finance"
  }
];

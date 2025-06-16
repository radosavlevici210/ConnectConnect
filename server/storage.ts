import { users, profiles, messages, type User, type InsertUser, type Profile, type InsertProfile, type Message, type InsertMessage } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllProfiles(): Promise<Profile[]>;
  getProfile(id: number): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfileStatus(id: number, status: string, isOnline: boolean): Promise<Profile | undefined>;
  
  getMessages(senderId: number, receiverId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessagesAsRead(senderId: number, receiverId: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private profiles: Map<number, Profile>;
  private messages: Map<number, Message>;
  private currentUserId: number;
  private currentProfileId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.profiles = new Map();
    this.messages = new Map();
    this.currentUserId = 1;
    this.currentProfileId = 1;
    this.currentMessageId = 1;
    
    // Initialize with sample profiles
    this.initializeProfiles();
  }

  private async initializeProfiles() {
    const sampleProfiles: InsertProfile[] = [
      {
        name: "Jessica Miller",
        title: "Business Strategy Consultant",
        location: "London, UK",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        rating: 49,
        isOnline: true,
        status: "online",
        isVerified: true,
        services: ["Business Consulting", "Strategy Planning", "Market Analysis", "Process Optimization"],
        experience: "Senior Level",
        featuredArea: "Consulting",
        phoneNumber: "+44 20 7946 0958"
      },
      {
        name: "David Park",
        title: "UX/UI Design Specialist",
        location: "Manchester, UK",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        rating: 48,
        isOnline: false,
        status: "busy",
        isVerified: true,
        services: ["UI Design", "UX Research", "Prototyping", "User Testing", "Web Design"],
        experience: "Mid Level",
        featuredArea: "Design",
        phoneNumber: "+44 161 123 4567"
      },
      {
        name: "Maria Santos",
        title: "Life & Wellness Coach",
        location: "Birmingham, UK",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        rating: 50,
        isOnline: true,
        status: "online",
        isVerified: true,
        services: ["Life Coaching", "Wellness", "Mindfulness", "Stress Management", "Career Coaching"],
        experience: "Senior Level",
        featuredArea: "Coaching",
        phoneNumber: "+44 121 456 7890"
      },
      {
        name: "Alex Johnson",
        title: "Executive Business Coach",
        location: "Edinburgh, UK",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        rating: 47,
        isOnline: true,
        status: "online",
        isVerified: true,
        services: ["Executive Coaching", "Leadership", "Team Building", "Performance Management"],
        experience: "Senior Level",
        featuredArea: "Coaching",
        phoneNumber: "+44 131 234 5678"
      },
      {
        name: "Lisa Chen",
        title: "Digital Marketing Expert",
        location: "Glasgow, UK",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        rating: 49,
        isOnline: false,
        status: "away",
        isVerified: true,
        services: ["Digital Marketing", "SEO", "Social Media", "Content Strategy", "PPC Advertising"],
        experience: "Mid Level",
        featuredArea: "Marketing",
        phoneNumber: "+44 141 567 8901"
      },
      {
        name: "Michael Thompson",
        title: "Financial Planning Advisor",
        location: "Bristol, UK",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        rating: 48,
        isOnline: true,
        status: "online",
        isVerified: true,
        services: ["Financial Planning", "Investment", "Retirement Planning", "Tax Advisory", "Insurance"],
        experience: "Senior Level",
        featuredArea: "Finance",
        phoneNumber: "+44 117 890 1234"
      },
      {
        name: "Sarah Williams",
        title: "Software Development Consultant",
        location: "Leeds, UK",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        rating: 46,
        isOnline: true,
        status: "online",
        isVerified: true,
        services: ["Software Development", "Web Development", "Mobile Apps", "API Integration", "DevOps"],
        experience: "Senior Level",
        featuredArea: "Technology",
        phoneNumber: "+44 113 345 6789"
      },
      {
        name: "James Roberts",
        title: "Legal Advisor & Consultant",
        location: "Liverpool, UK",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        rating: 45,
        isOnline: false,
        status: "offline",
        isVerified: true,
        services: ["Legal Consulting", "Contract Review", "Business Law", "Compliance", "Intellectual Property"],
        experience: "Senior Level",
        featuredArea: "Legal",
        phoneNumber: "+44 151 678 9012"
      },
      {
        name: "Emma Davis",
        title: "Healthcare & Medical Consultant",
        location: "Cardiff, UK",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        rating: 49,
        isOnline: true,
        status: "online",
        isVerified: true,
        services: ["Healthcare Consulting", "Medical Advisory", "Health & Safety", "Wellness Programs", "Mental Health"],
        experience: "Senior Level",
        featuredArea: "Healthcare",
        phoneNumber: "+44 29 2012 3456"
      },
      {
        name: "Thomas Anderson",
        title: "Property & Real Estate Expert",
        location: "Newcastle, UK",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
        rating: 44,
        isOnline: true,
        status: "online",
        isVerified: true,
        services: ["Property Consulting", "Real Estate", "Investment Properties", "Property Management", "Market Analysis"],
        experience: "Mid Level",
        featuredArea: "Real Estate",
        phoneNumber: "+44 191 456 7890"
      }
    ];

    for (const profile of sampleProfiles) {
      await this.createProfile(profile);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProfiles(): Promise<Profile[]> {
    return Array.from(this.profiles.values());
  }

  async getProfile(id: number): Promise<Profile | undefined> {
    return this.profiles.get(id);
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const id = this.currentProfileId++;
    const profile: Profile = { ...insertProfile, id };
    this.profiles.set(id, profile);
    return profile;
  }

  async updateProfileStatus(id: number, status: string, isOnline: boolean): Promise<Profile | undefined> {
    const profile = this.profiles.get(id);
    if (profile) {
      profile.status = status;
      profile.isOnline = isOnline;
      this.profiles.set(id, profile);
      return profile;
    }
    return undefined;
  }

  async getMessages(senderId: number, receiverId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(msg => 
        (msg.senderId === senderId && msg.receiverId === receiverId) ||
        (msg.senderId === receiverId && msg.receiverId === senderId)
      )
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const message: Message = { 
      ...insertMessage, 
      id, 
      timestamp: new Date(),
      isRead: false 
    };
    this.messages.set(id, message);
    return message;
  }

  async markMessagesAsRead(senderId: number, receiverId: number): Promise<void> {
    for (const [id, message] of this.messages.entries()) {
      if (message.senderId === senderId && message.receiverId === receiverId && !message.isRead) {
        message.isRead = true;
        this.messages.set(id, message);
      }
    }
  }
}

export const storage = new MemStorage();

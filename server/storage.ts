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
        services: ["Business Consulting", "Strategy Planning"],
        experience: "Senior Level",
        featuredArea: "Consulting"
      },
      {
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

import { Button } from "@/components/ui/button";
import { Home, Search, Heart, MessageCircle, User } from "lucide-react";
import { useLocation } from "wouter";

export default function BottomNavigation() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/", active: location === "/" },
    { icon: Search, label: "Search", path: "/search", active: location === "/search" },
    { icon: Heart, label: "Favorites", path: "/favorites", active: location === "/favorites" },
    { icon: MessageCircle, label: "Messages", path: "/messages", active: location === "/messages" },
    { icon: User, label: "Profile", path: "/profile", active: location === "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden z-50">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            className={`flex flex-col items-center py-2 space-y-1 ${
              item.active ? 'text-primary' : 'text-gray-500'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Search, Bell, UserCircle } from "lucide-react";

export default function Header() {
  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Elite Escorts UK</h1>
            <span className="ml-2 px-2 py-1 bg-primary text-white text-xs rounded-full">
              {stats?.onlineCount || 0}k Online
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary">
              <UserCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

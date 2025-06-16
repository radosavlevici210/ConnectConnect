import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, X, Phone, Video } from "lucide-react";
import { useWebSocket } from "@/hooks/use-websocket";
import type { Profile, Message } from "@shared/schema";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export default function ChatModal({ isOpen, onClose, profile }: ChatModalProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage, lastMessage } = useWebSocket();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (lastMessage && lastMessage.type === 'new_message') {
      setMessages(prev => [...prev, lastMessage.message]);
    }
  }, [lastMessage]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      senderId: 1, // Mock current user ID
      receiverId: profile.id,
      content: message,
      timestamp: new Date(),
      isRead: false
    };

    setMessages(prev => [...prev, newMessage]);

    sendMessage({
      type: 'send_message',
      senderId: 1,
      receiverId: profile.id,
      content: message
    });

    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md h-96 flex flex-col p-0" aria-describedby="chat-description">
        <DialogTitle className="sr-only">Chat with {profile.name}</DialogTitle>
        <DialogDescription id="chat-description" className="sr-only">
          Send messages and chat with {profile.name}
        </DialogDescription>
        <div className="flex items-center justify-between p-4 border-b flex-row space-y-0">
          <div className="flex items-center">
            <Avatar className="w-10 h-10 mr-3">
              <AvatarImage src={profile.image} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{profile.name}</h3>
              <p className="text-sm text-accent">
                {profile.isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex">
            <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
              <p className="text-sm">Hi! I'd be happy to help with your needs. How can I assist you today?</p>
            </div>
          </div>

          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.senderId === 1 ? 'justify-end' : ''}`}
            >
              <div className={`rounded-lg p-3 max-w-xs ${
                msg.senderId === 1 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100'
              }`}>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
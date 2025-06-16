const stories = [
  {
    id: 1,
    name: "Sarah",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    gradient: "from-primary to-secondary"
  },
  {
    id: 2,
    name: "Marcus",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    gradient: "from-accent to-primary"
  },
  {
    id: 3,
    name: "Elena",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    gradient: "from-secondary to-accent"
  },
  {
    id: 4,
    name: "Ava",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    gradient: "from-primary to-secondary"
  }
];

export default function StoriesCarousel() {
  return (
    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
      {stories.map((story) => (
        <div key={story.id} className="flex-shrink-0 w-20 h-20 relative">
          <div className={`w-full h-full rounded-full bg-gradient-to-br ${story.gradient} p-0.5`}>
            <img 
              src={story.image} 
              alt={story.name}
              className="w-full h-full rounded-full object-cover bg-white p-0.5"
            />
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
            <span className="text-xs text-gray-700 font-medium bg-white px-2 py-0.5 rounded-full shadow-sm">
              {story.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

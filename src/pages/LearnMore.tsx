import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, BookOpen, Heart, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const videos = [
  {
    title: "Understanding Cancer: A Comprehensive Guide",
    thumbnail: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=225&fit=crop",
    duration: "12:45",
    source: "Medical Education"
  },
  {
    title: "Early Detection Saves Lives",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=225&fit=crop",
    duration: "8:30",
    source: "Health Awareness"
  },
  {
    title: "How AI is Revolutionizing Cancer Detection",
    thumbnail: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&h=225&fit=crop",
    duration: "15:20",
    source: "Tech Health"
  }
];

const awarenessResources = [
  {
    title: "Monthly Self-Examination Guide",
    description: "Learn how to perform regular self-examinations to detect early signs.",
    icon: Heart
  },
  {
    title: "Risk Factors & Prevention",
    description: "Understanding what increases risk and how to minimize it.",
    icon: BookOpen
  },
  {
    title: "When to See a Doctor",
    description: "Know the warning signs that require professional attention.",
    icon: Heart
  }
];

const blogs = [
  {
    title: "The Importance of Regular Screenings",
    excerpt: "Regular cancer screenings can detect cancer early when treatment is most effective...",
    date: "Dec 1, 2024",
    readTime: "5 min read"
  },
  {
    title: "Understanding Your Diagnosis",
    excerpt: "A cancer diagnosis can be overwhelming. Here's what you need to know...",
    date: "Nov 28, 2024",
    readTime: "7 min read"
  },
  {
    title: "Lifestyle Changes for Prevention",
    excerpt: "Simple lifestyle modifications that can significantly reduce your cancer risk...",
    date: "Nov 25, 2024",
    readTime: "6 min read"
  },
  {
    title: "Supporting a Loved One with Cancer",
    excerpt: "Practical advice on how to provide emotional and practical support...",
    date: "Nov 20, 2024",
    readTime: "8 min read"
  }
];

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">Learn</span> & Stay Informed
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore resources, videos, and articles to better understand cancer prevention and early detection.
          </p>
        </div>

        {/* Video Recommendations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Play className="w-6 h-6 text-primary" />
            Video Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-primary fill-primary" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">{video.source}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Awareness Resources */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            Awareness & Prevention
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {awarenessResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow hover:border-primary/50 cursor-pointer">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Blog Articles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow hover:border-primary/50 cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs text-muted-foreground">{blog.date}</span>
                  <span className="text-xs text-primary">{blog.readTime}</span>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{blog.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{blog.excerpt}</p>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-primary">
                  Read More <ExternalLink className="ml-1 w-3 h-3" />
                </Button>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LearnMore;

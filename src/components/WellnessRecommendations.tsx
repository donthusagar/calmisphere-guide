import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Music, Sunset, Coffee, Users, TreePine } from "lucide-react";

const recommendations = {
  happy: [
    { icon: Music, title: "Celebrate with music", description: "Listen to your favorite upbeat playlist", category: "Entertainment" },
    { icon: Users, title: "Share the joy", description: "Connect with friends or loved ones", category: "Social" },
    { icon: TreePine, title: "Nature walk", description: "Take a peaceful walk outdoors", category: "Physical" },
  ],
  calm: [
    { icon: BookOpen, title: "Mindful reading", description: "Read a chapter of your favorite book", category: "Mental" },
    { icon: Coffee, title: "Tea meditation", description: "Enjoy a warm cup of herbal tea mindfully", category: "Self-care" },
    { icon: Sunset, title: "Gratitude practice", description: "Write down 3 things you're grateful for", category: "Spiritual" },
  ],
  neutral: [
    { icon: Music, title: "Gentle movement", description: "Try some light stretching or yoga", category: "Physical" },
    { icon: BookOpen, title: "Learning something new", description: "Explore a topic that interests you", category: "Mental" },
    { icon: Coffee, title: "Self-care ritual", description: "Take a relaxing bath or do skincare", category: "Self-care" },
  ],
  sad: [
    { icon: Users, title: "Reach out", description: "Call a trusted friend or family member", category: "Social" },
    { icon: Music, title: "Soothing sounds", description: "Listen to calming or uplifting music", category: "Entertainment" },
    { icon: Sunset, title: "Breathing exercise", description: "Practice deep breathing for 5 minutes", category: "Mindfulness" },
  ],
  anxious: [
    { icon: Sunset, title: "Ground yourself", description: "Try the 5-4-3-2-1 grounding technique", category: "Mindfulness" },
    { icon: TreePine, title: "Fresh air", description: "Step outside for some fresh air", category: "Physical" },
    { icon: Coffee, title: "Comfort routine", description: "Do something that usually comforts you", category: "Self-care" },
  ],
};

export function WellnessRecommendations() {
  const currentRecommendations = useMemo(() => {
    const entries = JSON.parse(localStorage.getItem("moodEntries") || "[]");
    if (entries.length === 0) return recommendations.calm; // Default to calm suggestions
    
    const latestEntry = entries[entries.length - 1];
    return recommendations[latestEntry.mood as keyof typeof recommendations] || recommendations.calm;
  }, []);

  return (
    <Card className="glass-card border-0">
      <CardHeader>
        <CardTitle className="text-xl">Personalized Wellness</CardTitle>
        <p className="text-sm text-muted-foreground">
          Based on your current mood, here are some activities that might help
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentRecommendations.map((rec, index) => {
            const Icon = rec.icon;
            
            return (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground">{rec.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {rec.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {rec.description}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs hover:bg-primary hover:text-primary-foreground"
                  >
                    Try this
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
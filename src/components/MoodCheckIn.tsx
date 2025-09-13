import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Smile, Frown, Meh, Heart, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const moods = [
  { icon: Heart, label: "Happy", value: "happy", color: "wellness-happy" },
  { icon: Smile, label: "Calm", value: "calm", color: "wellness-calm" },
  { icon: Meh, label: "Neutral", value: "neutral", color: "muted" },
  { icon: Frown, label: "Sad", value: "sad", color: "wellness-sad" },
  { icon: Zap, label: "Anxious", value: "anxious", color: "wellness-anxious" },
];

export function MoodCheckIn() {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "We need to know how you're feeling today.",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage for demo purposes
    const entry = {
      mood: selectedMood,
      notes,
      timestamp: new Date().toISOString(),
    };

    const existingEntries = JSON.parse(localStorage.getItem("moodEntries") || "[]");
    existingEntries.push(entry);
    localStorage.setItem("moodEntries", JSON.stringify(existingEntries));

    toast({
      title: "Mood recorded!",
      description: "Thank you for checking in with yourself today.",
    });

    setSelectedMood("");
    setNotes("");
  };

  return (
    <Card className="glass-card border-0 shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold gradient-text">
          How are you feeling today?
        </CardTitle>
        <p className="text-muted-foreground">
          Take a moment to check in with yourself
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {moods.map((mood) => {
            const Icon = mood.icon;
            const isSelected = selectedMood === mood.value;
            
            return (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={cn(
                  "flex flex-col items-center space-y-2 p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-lg"
                    : "border-border hover:border-primary/50 hover:bg-accent/30"
                )}
              >
                <Icon 
                  className={cn(
                    "w-8 h-8 transition-colors",
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )} 
                />
                <span 
                  className={cn(
                    "text-sm font-medium",
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {mood.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="text-sm font-medium">
            Additional notes (optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="What's on your mind today? Any thoughts you'd like to share..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-20 resize-none border-0 bg-accent/30 focus:bg-background transition-colors"
          />
        </div>

        <Button 
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-300"
          size="lg"
        >
          Record My Mood
        </Button>
      </CardContent>
    </Card>
  );
}
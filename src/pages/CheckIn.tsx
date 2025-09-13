import { MoodCheckIn } from "@/components/MoodCheckIn";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar } from "lucide-react";

export default function CheckIn() {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold gradient-text">Daily Check-In</h1>
        <p className="text-muted-foreground">Take a moment to reflect on your current state</p>
      </div>

      {/* Date Info */}
      <Card className="glass-card border-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{dateString}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mood Check-in Component */}
      <MoodCheckIn />

      {/* Tips */}
      <Card className="glass-card border-0">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3">Daily Check-in Tips</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Be honest about how you're feeling - there are no wrong answers</p>
            <p>• Consider what might have influenced your mood today</p>
            <p>• Regular check-ins help you notice patterns over time</p>
            <p>• Use the notes section to capture any specific thoughts or events</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
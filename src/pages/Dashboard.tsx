import { useMemo } from "react";
import { MoodChart } from "@/components/MoodChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, Heart, Brain } from "lucide-react";

export default function Dashboard() {
  const stats = useMemo(() => {
    const entries = JSON.parse(localStorage.getItem("moodEntries") || "[]");
    
    if (entries.length === 0) {
      return {
        totalEntries: 0,
        currentStreak: 0,
        mostCommonMood: "N/A",
        thisWeekAverage: 0,
      };
    }

    // Calculate streak (consecutive days with entries)
    const sortedEntries = entries.sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.timestamp);
      entryDate.setHours(0, 0, 0, 0);
      
      if (entryDate.getTime() === currentDate.getTime()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (entryDate.getTime() < currentDate.getTime()) {
        break;
      }
    }

    // Most common mood
    const moodCounts = entries.reduce((acc: any, entry: any) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {});
    
    const mostCommonMood = Object.entries(moodCounts).reduce((a: any, b: any) => 
      moodCounts[a[0]] > moodCounts[b[0]] ? a : b
    )[0];

    // This week's average (simplified)
    const moodValues = { happy: 5, calm: 4, neutral: 3, sad: 2, anxious: 1 };
    const thisWeekEntries = entries.filter((entry: any) => {
      const entryDate = new Date(entry.timestamp);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    });
    
    const weekAverage = thisWeekEntries.length > 0 
      ? thisWeekEntries.reduce((sum: number, entry: any) => 
          sum + (moodValues[entry.mood as keyof typeof moodValues] || 3), 0
        ) / thisWeekEntries.length
      : 0;

    return {
      totalEntries: entries.length,
      currentStreak: streak,
      mostCommonMood: mostCommonMood.charAt(0).toUpperCase() + mostCommonMood.slice(1),
      thisWeekAverage: weekAverage.toFixed(1),
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold gradient-text">Your Wellness Dashboard</h1>
        <p className="text-muted-foreground">Track your progress and discover insights</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{stats.totalEntries}</div>
            <div className="text-xs text-muted-foreground">Total Check-ins</div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div className="text-2xl font-bold text-success">{stats.currentStreak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="w-5 h-5 text-wellness-happy" />
            </div>
            <div className="text-lg font-bold text-wellness-happy">{stats.mostCommonMood}</div>
            <div className="text-xs text-muted-foreground">Common Mood</div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{stats.thisWeekAverage}</div>
            <div className="text-xs text-muted-foreground">Week Average</div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <MoodChart />
        </div>
      </div>

      {/* Recent Entries */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-xl">Recent Check-ins</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentEntries />
        </CardContent>
      </Card>
    </div>
  );
}

function RecentEntries() {
  const recentEntries = useMemo(() => {
    const entries = JSON.parse(localStorage.getItem("moodEntries") || "[]");
    return entries
      .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
  }, []);

  const moodColors = {
    happy: "bg-wellness-happy text-white",
    calm: "bg-wellness-calm text-white", 
    neutral: "bg-muted text-muted-foreground",
    sad: "bg-wellness-sad text-white",
    anxious: "bg-wellness-anxious text-white",
  };

  if (recentEntries.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No check-ins yet. Start by recording your first mood!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recentEntries.map((entry: any, index: number) => (
        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
          <div className="flex items-center space-x-3">
            <Badge className={moodColors[entry.mood as keyof typeof moodColors]}>
              {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
            </Badge>
            <div>
              <div className="text-sm font-medium">
                {new Date(entry.timestamp).toLocaleDateString()}
              </div>
              {entry.notes && (
                <div className="text-xs text-muted-foreground truncate max-w-md">
                  {entry.notes}
                </div>
              )}
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {new Date(entry.timestamp).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
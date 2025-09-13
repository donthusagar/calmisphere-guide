import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const moodValues = {
  happy: 5,
  calm: 4,
  neutral: 3,
  sad: 2,
  anxious: 1,
};

const moodColors = {
  happy: "#fbbf24",
  calm: "#06b6d4",
  neutral: "#6b7280",
  sad: "#8b5cf6",
  anxious: "#f97316",
};

export function MoodChart() {
  const chartData = useMemo(() => {
    const entries = JSON.parse(localStorage.getItem("moodEntries") || "[]");
    
    // Group by date and get the latest mood for each day
    const groupedByDate = entries.reduce((acc: any, entry: any) => {
      const date = new Date(entry.timestamp).toLocaleDateString();
      if (!acc[date] || new Date(entry.timestamp) > new Date(acc[date].timestamp)) {
        acc[date] = entry;
      }
      return acc;
    }, {});

    // Convert to chart format and sort by date
    return Object.entries(groupedByDate)
      .map(([date, entry]: [string, any]) => ({
        date,
        mood: moodValues[entry.mood as keyof typeof moodValues],
        moodType: entry.mood,
        timestamp: new Date(entry.timestamp),
      }))
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      .slice(-7); // Show last 7 days
  }, []);

  if (chartData.length === 0) {
    return (
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-xl">Mood Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 text-muted-foreground">
            <p>Start tracking your mood to see trends here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card border-0">
      <CardHeader>
        <CardTitle className="text-xl">Your Mood Journey</CardTitle>
        <p className="text-sm text-muted-foreground">Last 7 days</p>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                tickFormatter={(value) => {
                  const labels = ['', 'Anxious', 'Sad', 'Neutral', 'Calm', 'Happy'];
                  return labels[value];
                }}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="glass-card p-3 shadow-lg border-0">
                        <p className="font-medium">{label}</p>
                        <p className="text-sm capitalize" style={{ color: moodColors[data.moodType as keyof typeof moodColors] }}>
                          Feeling: {data.moodType}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
import { WellnessRecommendations } from "@/components/WellnessRecommendations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Target, Sparkles } from "lucide-react";

export default function Wellness() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold gradient-text">Wellness Hub</h1>
        <p className="text-muted-foreground">
          Discover personalized recommendations and wellness resources
        </p>
      </div>

      {/* Quick Tips */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 text-center space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">Daily Mindfulness</h3>
            <p className="text-sm text-muted-foreground">
              Spend 5 minutes each day practicing mindfulness or meditation
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 text-center space-y-3">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <Target className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold">Set Intentions</h3>
            <p className="text-sm text-muted-foreground">
              Start each day by setting positive intentions for yourself
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 text-center space-y-3">
            <div className="w-12 h-12 bg-wellness-happy/20 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 text-wellness-happy" />
            </div>
            <h3 className="font-semibold">Practice Gratitude</h3>
            <p className="text-sm text-muted-foreground">
              Write down three things you're grateful for each day
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Personalized Recommendations */}
      <WellnessRecommendations />

      {/* Wellness Categories */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-xl">Wellness Categories</CardTitle>
          <p className="text-sm text-muted-foreground">
            Explore different aspects of mental wellness
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center space-x-2">
                <Badge variant="outline" className="bg-wellness-calm/10 text-wellness-calm border-wellness-calm">
                  Mindfulness
                </Badge>
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Deep breathing exercises</p>
                <p>• Body scan meditation</p>
                <p>• Mindful walking</p>
                <p>• Present moment awareness</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold flex items-center space-x-2">
                <Badge variant="outline" className="bg-wellness-energetic/10 text-wellness-energetic border-wellness-energetic">
                  Physical
                </Badge>
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Light exercise or stretching</p>
                <p>• Nature walks</p>
                <p>• Yoga practice</p>
                <p>• Dance or movement</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold flex items-center space-x-2">
                <Badge variant="outline" className="bg-wellness-happy/10 text-wellness-happy border-wellness-happy">
                  Social
                </Badge>
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Connect with loved ones</p>
                <p>• Join community activities</p>
                <p>• Practice active listening</p>
                <p>• Express gratitude to others</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold flex items-center space-x-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                  Mental
                </Badge>
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Journaling thoughts</p>
                <p>• Learning new skills</p>
                <p>• Creative expression</p>
                <p>• Reading and reflection</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Resources */}
      <Card className="glass-card border-0 border-l-4 border-l-warning">
        <CardHeader>
          <CardTitle className="text-lg text-warning">Need Immediate Support?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
            <p><strong>National Suicide Prevention Lifeline:</strong> 988</p>
            <p><strong>SAMHSA Helpline:</strong> 1-800-662-4357</p>
            <p className="text-muted-foreground mt-3">
              Remember: It's okay to ask for help. Professional support is available 24/7.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
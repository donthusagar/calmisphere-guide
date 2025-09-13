import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, BarChart3, Brain, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/wellness-hero.jpg";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 z-10" />
        <img 
          src={heroImage} 
          alt="Peaceful wellness meditation scene" 
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white space-y-6 max-w-2xl mx-auto px-6">
            <h1 className="text-5xl font-bold leading-tight">
              Your Journey to
              <span className="block gradient-text">Mental Wellness</span>
            </h1>
            <p className="text-xl opacity-90">
              Track your mood, discover patterns, and get personalized recommendations for better mental health
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                <Link to="/checkin">
                  Start Your Check-in
                  <Heart className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/dashboard">
                  View Dashboard
                  <BarChart3 className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="glass-card border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-wellness-happy to-wellness-energetic rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Daily Check-ins</h3>
            <p className="text-muted-foreground">
              Track your emotions and thoughts with simple, intuitive daily mood logging
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-wellness-calm to-primary rounded-full flex items-center justify-center mx-auto">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Trend Analysis</h3>
            <p className="text-muted-foreground">
              Visualize your emotional patterns and identify triggers over time
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-wellness-sad to-accent rounded-full flex items-center justify-center mx-auto">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Wellness Tips</h3>
            <p className="text-muted-foreground">
              Get personalized recommendations based on your current emotional state
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Stats Section */}
      <section className="glass-card border-0 rounded-2xl p-8">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold gradient-text">Why Mental Health Matters</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Regular mental health check-ins can improve your overall well-being and help you understand your emotional patterns better.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">85%</div>
              <div className="text-sm text-muted-foreground">Feel more aware</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">78%</div>
              <div className="text-sm text-muted-foreground">Reduced anxiety</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">92%</div>
              <div className="text-sm text-muted-foreground">Better sleep</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">76%</div>
              <div className="text-sm text-muted-foreground">Improved mood</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-12">
        <h2 className="text-3xl font-bold">Ready to Start Your Wellness Journey?</h2>
        <p className="text-xl text-muted-foreground">
          Take the first step towards better mental health today
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg">
          <Link to="/checkin">
            Begin Your First Check-in
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
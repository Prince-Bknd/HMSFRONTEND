import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { HealthcareIllustration } from "@/components/ui/HealthcareIllustration";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { 
  Stethoscope, 
  Users, 
  Calendar, 
  FileText, 
  Activity, 
  Shield,
  ArrowRight,
  Heart,
  Pill,
  ClipboardList,
  CheckCircle2,
  Clock,
  Award
} from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive patient records and history management with real-time updates",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      delay: "stagger-1",
    },
    {
      icon: Calendar,
      title: "Appointment Scheduling",
      description: "Efficient appointment booking and calendar management system",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      delay: "stagger-2",
    },
    {
      icon: FileText,
      title: "Medical Records",
      description: "Secure digital health records and documentation with encryption",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      delay: "stagger-3",
    },
    {
      icon: Activity,
      title: "Health Analytics",
      description: "Real-time health monitoring and analytics dashboard with insights",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      delay: "stagger-4",
    },
    {
      icon: Pill,
      title: "Pharmacy Management",
      description: "Medication tracking and prescription management system",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      delay: "stagger-5",
    },
    {
      icon: ClipboardList,
      title: "Reports & Insights",
      description: "Detailed reports and actionable healthcare insights and trends",
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      delay: "stagger-6",
    },
  ];

  const benefits = [
    { icon: CheckCircle2, text: "HIPAA Compliant" },
    { icon: Shield, text: "Bank-level Security" },
    { icon: Clock, text: "24/7 Support" },
    { icon: Award, text: "Industry Leading" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-cyan-50 dark:from-gray-900 dark:via-background dark:to-gray-800 relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between relative z-10 animate-fade-in">
        <div 
          className="flex items-center space-x-2 group cursor-pointer"
          onClick={() => navigate("/")}
          title="Go to Home"
        >
          <div className="bg-primary p-2 rounded-lg transition-transform group-hover:scale-110 group-hover:rotate-12">
            <Stethoscope className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            HMS
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            onClick={() => navigate("/login")}
            className="text-foreground hover:text-primary transition-all hover:scale-105"
          >
            Sign In
          </Button>
          <Button
            onClick={() => navigate("/register")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary dark:bg-primary/20 px-4 py-2 rounded-full text-sm font-medium animate-fade-in stagger-1">
              <Heart className="h-4 w-4 animate-pulse" />
              <span>Trusted Healthcare Management</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight animate-fade-in stagger-2">
              Comprehensive
              <span className="gradient-text block"> Healthcare </span>
              Management System
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in stagger-3">
              Streamline your healthcare operations with our modern, secure, and
              user-friendly platform. Manage patients, appointments, records, and
              more all in one place.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 animate-fade-in stagger-4">
              <div className="text-center p-4 rounded-lg bg-card border border-border hover-lift">
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Patients</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border hover-lift">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Doctors</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border hover-lift">
                <div className="text-3xl font-bold text-primary">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in stagger-5">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login")}
                className="text-lg px-8 py-6 h-auto border-2 hover:bg-accent transition-all hover:scale-105"
              >
                Sign In
              </Button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden lg:block animate-slide-in-right animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl animate-pulse-glow"></div>
              <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 shadow-2xl">
                <HealthcareIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 relative z-10">
        <div className="mt-20">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Powerful Features for
              <span className="gradient-text"> Modern Healthcare</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to manage your healthcare operations efficiently
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className={`border-2 hover:border-primary/50 transition-all duration-300 hover-lift group overflow-hidden relative ${feature.delay} animate-fade-in`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative z-10">
                    <div className={`${feature.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-7 w-7 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="bg-card border-t border-border py-20 relative z-10">
        <div className="container mx-auto px-4">
          <Card className="max-w-5xl mx-auto border-2 border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 hover-lift animate-scale-in">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-primary p-4 rounded-full animate-pulse-glow">
                  <Shield className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-4xl mb-4">Secure & Compliant</CardTitle>
              <CardDescription className="text-lg mb-8">
                Your data is protected with industry-leading security measures
                and HIPAA compliance standards.
              </CardDescription>
              
              {/* Benefits Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center p-4 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-all hover-lift"
                    >
                      <Icon className="h-6 w-6 text-primary mb-2" />
                      <span className="text-sm font-medium text-foreground text-center">
                        {benefit.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary via-blue-600 to-purple-600 text-primary-foreground border-0 animate-gradient hover-lift relative overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
          <CardHeader className="text-center relative z-10">
            <CardTitle className="text-4xl md:text-5xl mb-4 animate-fade-in">
              Ready to Get Started?
            </CardTitle>
            <CardDescription className="text-primary-foreground/90 text-lg mb-6 animate-fade-in stagger-1">
              Join thousands of healthcare providers using our platform
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center relative z-10">
            <Button
              size="lg"
              onClick={() => navigate("/register")}
              className="bg-background text-primary hover:bg-background/90 text-lg px-8 py-6 h-auto shadow-2xl hover:shadow-3xl transition-all hover:scale-105 group"
            >
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>14-day free trial</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4 animate-fade-in">
            <div className="bg-primary p-2 rounded-lg transition-transform hover:scale-110">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              HMS
            </span>
          </div>
          <p className="text-sm text-muted-foreground animate-fade-in stagger-1">
            © 2024 Healthcare Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}


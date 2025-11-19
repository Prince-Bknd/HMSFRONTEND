import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { DoctorPatientIllustration } from "@/components/ui/DoctorPatientIllustration";
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
  Award,
  Building2,
  GraduationCap,
  User,
  Sparkles,
  Info,
  X,
  Zap,
  Lock,
  Globe,
  TrendingUp
} from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const features = [
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive patient records and history management with real-time updates",
      emoji: "👥",
    },
    {
      icon: Calendar,
      title: "Appointment Scheduling",
      description: "Efficient appointment booking and calendar management system",
      emoji: "📅",
    },
    {
      icon: FileText,
      title: "Medical Records",
      description: "Secure digital health records and documentation with encryption",
      emoji: "📋",
    },
    {
      icon: Activity,
      title: "Health Analytics",
      description: "Real-time health monitoring and analytics dashboard with insights",
      emoji: "📊",
    },
    {
      icon: Pill,
      title: "Pharmacy Management",
      description: "Medication tracking and prescription management system",
      emoji: "💊",
    },
    {
      icon: ClipboardList,
      title: "Reports & Insights",
      description: "Detailed reports and actionable healthcare insights and trends",
      emoji: "📈",
    },
  ];

  const whyChooseUs = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience blazing-fast performance with our optimized platform",
      emoji: "⚡",
    },
    {
      icon: Lock,
      title: "100% Secure",
      description: "Bank-level encryption and HIPAA compliance for your peace of mind",
      emoji: "🔐",
    },
    {
      icon: Globe,
      title: "Cloud-Based",
      description: "Access your data from anywhere, anytime with cloud infrastructure",
      emoji: "☁️",
    },
    {
      icon: TrendingUp,
      title: "Scalable",
      description: "Grows with your practice, from small clinics to large hospitals",
      emoji: "📈",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
      
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0">
        <div 
          className="flex items-center space-x-2 group cursor-pointer"
          onClick={() => navigate("/")}
          title="Go to Home"
        >
          <div className="bg-primary p-2 rounded-lg transition-transform group-hover:scale-110">
            <Stethoscope className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            HMS
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            onClick={() => navigate("/login")}
            className="text-foreground hover:text-primary"
          >
            Sign In
          </Button>
          <Button
            onClick={() => navigate("/register")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
              <Heart className="h-4 w-4" />
              <span>Trusted Healthcare Management</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Comprehensive
              <span className="text-primary block"> Healthcare </span>
              Management System
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Streamline your healthcare operations with our modern, secure, and
              user-friendly platform. Manage patients, appointments, records, and
              more all in one place.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Patients</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Doctors</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-3xl font-bold text-primary">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => setShowDetails(!showDetails)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 h-auto group"
              >
                <Info className="mr-2 h-5 w-5" />
                {showDetails ? "Show Less" : "Know More About Us"}
                <ArrowRight className={`ml-2 h-5 w-5 transition-transform ${showDetails ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
              </Button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden lg:block">
            <div className="relative bg-card border-2 border-border rounded-2xl p-8 shadow-lg">
              <DoctorPatientIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Information Section - Shows when "Know More" is clicked */}
      {showDetails && (
        <section className="container mx-auto px-4 py-12 relative z-10 animate-in fade-in slide-in-from-top-4 duration-500">
          <Card className="border-2 border-primary/30 bg-card shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg">
                    <Info className="h-6 w-6 text-primary" />
                  </div>
                  About Our Healthcare Management System
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowDetails(false)}
                  className="hover:bg-destructive/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <CardDescription className="text-lg">
                Discover how our platform transforms healthcare management for doctors, patients, and pharmaceutical companies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* What We Offer */}
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  What We Offer
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-border">
                    <div className="text-2xl mb-2">🏥</div>
                    <h4 className="font-semibold text-foreground mb-2">Complete Healthcare Solution</h4>
                    <p className="text-sm text-muted-foreground">
                      An all-in-one platform that integrates patient management, appointment scheduling, medical records, and pharmacy operations seamlessly.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-border">
                    <div className="text-2xl mb-2">👨‍⚕️</div>
                    <h4 className="font-semibold text-foreground mb-2">Role-Based Dashboards</h4>
                    <p className="text-sm text-muted-foreground">
                      Customized dashboards for doctors, patients, and pharma companies with role-specific features and intuitive interfaces.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-border">
                    <div className="text-2xl mb-2">📱</div>
                    <h4 className="font-semibold text-foreground mb-2">Real-Time Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      Get instant notifications for appointments, prescriptions, and important updates to stay connected with your healthcare journey.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-border">
                    <div className="text-2xl mb-2">🔒</div>
                    <h4 className="font-semibold text-foreground mb-2">Enterprise Security</h4>
                    <p className="text-sm text-muted-foreground">
                      Your data is protected with end-to-end encryption, HIPAA compliance, and regular security audits.
                    </p>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  How It Works
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-border">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Sign Up & Create Profile</h4>
                      <p className="text-sm text-muted-foreground">
                        Register as a doctor, patient, or pharma company. Complete your profile with essential information to get started.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-border">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Explore Your Dashboard</h4>
                      <p className="text-sm text-muted-foreground">
                        Access your personalized dashboard with role-specific features, statistics, and quick actions tailored to your needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-border">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Start Managing</h4>
                      <p className="text-sm text-muted-foreground">
                        Book appointments, manage schedules, track medicines, or access medical records - all from one convenient platform.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA in Details */}
              <div className="pt-4 border-t border-border">
                <div className="text-center space-y-4">
                  <p className="text-lg font-semibold text-foreground">
                    Ready to transform your healthcare management experience?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      onClick={() => navigate("/register")}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 h-auto group"
                    >
                      Create Your Account
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigate("/login")}
                      className="text-lg px-8 py-6 h-auto"
                    >
                      Sign In to Existing Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="bg-card border-y border-border py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with our comprehensive healthcare management solution
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="border hover:border-primary/50 transition-all hover:shadow-lg text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="text-4xl mb-3 emoji-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                      {item.emoji}
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="text-sm mt-2">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doctor-Patient Interaction Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Built for Everyone in Healthcare
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform connects doctors, patients, and pharmaceutical companies seamlessly
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Doctor Card */}
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full border-2 border-blue-200 dark:border-blue-800">
                  <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="text-4xl mb-2 emoji-bounce">👩‍⚕️</div>
              <CardTitle>For Doctors</CardTitle>
              <CardDescription>
                Manage your schedule, appointments, and patient records efficiently
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Schedule Management
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Patient Records
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Appointment Tracking
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Patient Card */}
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-full border-2 border-emerald-200 dark:border-emerald-800">
                  <User className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <div className="text-4xl mb-2 emoji-bounce" style={{ animationDelay: "0.2s" }}>👨</div>
              <CardTitle>For Patients</CardTitle>
              <CardDescription>
                Book appointments, access medical records, and manage your health
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Easy Booking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Medical History
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Prescription Access
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Pharma Card */}
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full border-2 border-purple-200 dark:border-purple-800">
                  <Building2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="text-4xl mb-2 emoji-bounce" style={{ animationDelay: "0.4s" }}>🏢</div>
              <CardTitle>For Pharma Companies</CardTitle>
              <CardDescription>
                Manage inventory, track medicines, and streamline operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Inventory Management
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Medicine Tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Order Management
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Features - Streamlined */}
      <section className="bg-card border-y border-border py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features designed to simplify healthcare management
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-slate-100 dark:bg-slate-800 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform border border-border">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-3xl emoji-float" style={{ animationDelay: `${index * 0.1}s` }}>
                        {feature.emoji}
                      </div>
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

      {/* Security & Trust Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <Card className="max-w-4xl mx-auto border-2 border-primary/20 bg-card hover:shadow-lg transition-all">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary p-4 rounded-full border-2 border-primary/30">
                <Shield className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-3xl md:text-4xl mb-4">Secure & Trusted</CardTitle>
            <CardDescription className="text-lg mb-8">
              Your data is protected with industry-leading security measures and HIPAA compliance standards.
            </CardDescription>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="flex flex-col items-center p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-border hover:border-primary/50 transition-all">
                <div className="text-3xl mb-2 emoji-float">✅</div>
                <CheckCircle2 className="h-5 w-5 text-primary mb-2" />
                <span className="text-sm font-medium text-foreground text-center">
                  HIPAA Compliant
                </span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-border hover:border-primary/50 transition-all">
                <div className="text-3xl mb-2 emoji-float" style={{ animationDelay: "0.1s" }}>🔒</div>
                <Shield className="h-5 w-5 text-primary mb-2" />
                <span className="text-sm font-medium text-foreground text-center">
                  Bank-level Security
                </span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-border hover:border-primary/50 transition-all">
                <div className="text-3xl mb-2 emoji-float" style={{ animationDelay: "0.2s" }}>🕐</div>
                <Clock className="h-5 w-5 text-primary mb-2" />
                <span className="text-sm font-medium text-foreground text-center">
                  24/7 Support
                </span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-border hover:border-primary/50 transition-all">
                <div className="text-3xl mb-2 emoji-float" style={{ animationDelay: "0.3s" }}>🏆</div>
                <Award className="h-5 w-5 text-primary mb-2" />
                <span className="text-sm font-medium text-foreground text-center">
                  Industry Leading
                </span>
              </div>
            </div>
          </CardHeader>
        </Card>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <Card className="max-w-4xl mx-auto bg-primary text-primary-foreground border-0 hover:shadow-xl transition-all">
          <CardHeader className="text-center">
            <div className="text-5xl mb-4 emoji-bounce">🚀</div>
            <CardTitle className="text-3xl md:text-4xl mb-4">
              Ready to Transform Your Healthcare Management?
            </CardTitle>
            <CardDescription className="text-primary-foreground/90 text-lg mb-6">
              Join thousands of healthcare providers who trust our platform. Start your free trial today - no credit card required!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="bg-background text-primary hover:bg-background/90 text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
              >
                Create Your Account
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login")}
                className="bg-transparent border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 h-auto"
              >
                Sign In
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-primary-foreground/80 flex-wrap">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-primary p-2 rounded-lg">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              HMS
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 Healthcare Management System. All rights reserved.
          </p>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes emoji-bounce {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
          }
          50% { 
            transform: translateY(-10px) scale(1.1); 
          }
        }
        @keyframes emoji-float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-8px) rotate(5deg); 
          }
          75% { 
            transform: translateY(-4px) rotate(-5deg); 
          }
        }
        .emoji-bounce {
          animation: emoji-bounce 2s ease-in-out infinite;
          display: inline-block;
        }
        .emoji-float {
          animation: emoji-float 3s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { registerUser } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, UserPlus, Stethoscope, CheckCircle2, ArrowRight, Sparkles, User, Building2, GraduationCap, ChevronLeft } from "lucide-react";

type UserType = "patient" | "doctor" | "pharma";

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state) => state.auth);
  
  const [step, setStep] = useState<"select" | "form">("select");
  const [selectedUserType, setSelectedUserType] = useState<UserType>("patient");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const userTypes = [
    {
      type: "patient" as UserType,
      title: "Patient / User",
      description: "Register as a patient to manage your health records and appointments",
      icon: User,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      darkBgGradient: "from-blue-900/20 to-cyan-900/20",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      default: true,
    },
    {
      type: "doctor" as UserType,
      title: "Doctor",
      description: "Register as a healthcare professional to manage your practice",
      icon: GraduationCap,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      darkBgGradient: "from-emerald-900/20 to-teal-900/20",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      default: false,
    },
    {
      type: "pharma" as UserType,
      title: "Pharma Company",
      description: "Register your pharmaceutical company to manage medications and inventory",
      icon: Building2,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      darkBgGradient: "from-purple-900/20 to-pink-900/20",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      default: false,
    },
  ];

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (formData.phone && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation error for this field
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await dispatch(
      registerUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phone: formData.phone.trim() || undefined,
        userType: selectedUserType,
      })
    );
    
    if (registerUser.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Enhanced Animated Background with Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Soft gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-float dark:from-blue-900/20 dark:to-cyan-900/20"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-float dark:from-purple-900/20 dark:to-pink-900/20" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-200/30 to-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-float dark:from-indigo-900/15 dark:to-blue-900/15" style={{ animationDelay: "4s" }}></div>
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>
      
      <div className={`w-full max-w-4xl transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <Card className="border border-border/50 shadow-2xl bg-card/80 backdrop-blur-xl hover-lift transition-all duration-500 overflow-hidden relative">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-0"></div>
          
          <CardHeader className="space-y-1 text-center relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div 
                className="flex items-center space-x-2 group cursor-pointer"
                onClick={() => navigate("/")}
                title="Go to Home"
              >
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  HMS
                </span>
              </div>
            </div>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 px-4 py-2 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 mb-4 animate-fade-in">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>Join Thousands of Healthcare Professionals</span>
            </div>
            <CardTitle className="text-3xl font-bold mb-2">Create Your Account</CardTitle>
            <CardDescription className="text-base">
              {step === "select" 
                ? "Choose your registration type to get started"
                : `Registering as ${userTypes.find(t => t.type === selectedUserType)?.title} - Complete your profile below`
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            {error && (
              <Alert 
                variant="destructive" 
                className="mb-6 error-message border-red-200 bg-red-50/50 dark:bg-red-900/20"
              >
                <AlertDescription className="text-red-700 dark:text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {step === "select" && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid md:grid-cols-3 gap-4">
                  {userTypes.map((userType, index) => {
                    const Icon = userType.icon;
                    const isSelected = selectedUserType === userType.type;
                    return (
                      <div
                        key={userType.type}
                        onClick={() => setSelectedUserType(userType.type)}
                        className={`relative cursor-pointer group transition-all duration-500 ${
                          isSelected ? "scale-105 z-10" : "scale-100"
                        } ${index === 0 ? "stagger-1 animate-fade-in" : index === 1 ? "stagger-2 animate-fade-in" : "stagger-3 animate-fade-in"}`}
                      >
                        <div
                          className={`relative overflow-hidden rounded-xl border-2 p-6 h-full transition-all duration-500 ${
                            isSelected
                              ? `border-primary shadow-2xl bg-gradient-to-br ${userType.bgGradient} dark:bg-gradient-to-br ${userType.darkBgGradient} ring-2 ring-primary/20`
                              : "border-border hover:border-primary/50 bg-card hover:shadow-lg hover:scale-[1.02]"
                          }`}
                        >
                          {/* Animated background gradient */}
                          {isSelected && (
                            <div className={`absolute inset-0 bg-gradient-to-br ${userType.gradient} opacity-10 animate-pulse`}></div>
                          )}
                          
                          {/* Selection indicator with pulse */}
                          {isSelected && (
                            <div className="absolute top-3 right-3 animate-scale-in">
                              <div className="bg-primary rounded-full p-1.5 shadow-lg animate-pulse-glow">
                                <CheckCircle2 className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          )}

                          {/* Default badge for Patient */}
                          {userType.default && !isSelected && (
                            <div className="absolute top-3 right-3">
                              <div className="bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30 rounded-full px-2 py-1">
                                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Default</span>
                              </div>
                            </div>
                          )}

                          <div className="relative z-10">
                            <div className={`${userType.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                              isSelected ? "scale-110 shadow-lg" : "group-hover:scale-110"
                            }`}>
                              <Icon className={`h-8 w-8 ${userType.iconColor} transition-transform duration-300 ${
                                isSelected ? "scale-110" : ""
                              }`} />
                            </div>
                            <h3 className={`text-xl font-bold mb-2 transition-colors ${
                              isSelected ? "text-foreground" : "text-foreground"
                            }`}>
                              {userType.title}
                              {userType.default && (
                                <span className="ml-2 text-xs font-normal text-muted-foreground">(Recommended)</span>
                              )}
                            </h3>
                            <p className={`text-sm leading-relaxed ${
                              isSelected ? "text-foreground/90" : "text-muted-foreground"
                            }`}>
                              {userType.description}
                            </p>
                          </div>

                          {/* Hover effect overlay */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${userType.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`}></div>
                          
                          {/* Shimmer effect on selected */}
                          {isSelected && (
                            <div className="absolute inset-0 shimmer rounded-xl"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-center gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={() => navigate("/login")}
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back to Login
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep("form")}
                    className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 group"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            )}

            {/* Registration Form Step */}
            {step === "form" && (
              <div className="animate-fade-in">
                {/* Back button and user type indicator */}
                <div className="flex items-center justify-between mb-6">
                  <Button
                    type="button"
                    onClick={() => setStep("select")}
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Change Type
                  </Button>
                  <div className="flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full">
                    {(() => {
                      const selectedType = userTypes.find(t => t.type === selectedUserType);
                      const Icon = selectedType?.icon || User;
                      return (
                        <>
                          <Icon className={`h-4 w-4 ${selectedType?.iconColor}`} />
                          <span className="text-sm font-medium text-foreground">
                            {selectedType?.title}
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Full Name *
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={`h-12 form-field-glow transition-all duration-300 ${
                      validationErrors.name 
                        ? "border-red-500" 
                        : focusedField === "name" 
                        ? "border-primary shadow-lg shadow-primary/10" 
                        : ""
                    }`}
                  />
                  {focusedField === "name" && formData.name && !validationErrors.name && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 animate-scale-in" />
                    </div>
                  )}
                </div>
                {validationErrors.name && (
                  <p className="text-sm text-red-600 error-message">{validationErrors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address *
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`h-12 form-field-glow transition-all duration-300 ${
                      validationErrors.email 
                        ? "border-red-500" 
                        : focusedField === "email" 
                        ? "border-primary shadow-lg shadow-primary/10" 
                        : ""
                    }`}
                  />
                  {focusedField === "email" && formData.email && !validationErrors.email && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 animate-scale-in" />
                    </div>
                  )}
                </div>
                {validationErrors.email && (
                  <p className="text-sm text-red-600 error-message">{validationErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone Number (Optional)
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className={`h-12 form-field-glow transition-all duration-300 ${
                      validationErrors.phone 
                        ? "border-red-500" 
                        : focusedField === "phone" 
                        ? "border-primary shadow-lg shadow-primary/10" 
                        : ""
                    }`}
                  />
                  {focusedField === "phone" && formData.phone && !validationErrors.phone && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 animate-scale-in" />
                    </div>
                  )}
                </div>
                {validationErrors.phone && (
                  <p className="text-sm text-red-600 error-message">{validationErrors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password (min. 8 characters)"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className={`h-12 pr-10 form-field-glow transition-all duration-300 ${
                      validationErrors.password 
                        ? "border-red-500" 
                        : focusedField === "password" 
                        ? "border-primary shadow-lg shadow-primary/10" 
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-sm text-red-600 error-message">{validationErrors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                  Confirm Password *
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    className={`h-12 pr-10 form-field-glow transition-all duration-300 ${
                      validationErrors.confirmPassword 
                        ? "border-red-500" 
                        : focusedField === "confirmPassword" 
                        ? "border-primary shadow-lg shadow-primary/10" 
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                  {focusedField === "confirmPassword" && formData.confirmPassword && formData.password === formData.confirmPassword && !validationErrors.confirmPassword && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 animate-scale-in" />
                    </div>
                  )}
                </div>
                {validationErrors.confirmPassword && (
                  <p className="text-sm text-red-600 error-message">{validationErrors.confirmPassword}</p>
                )}
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-indigo-500/10 dark:from-primary/20 dark:to-indigo-500/20 border border-primary/20 rounded-lg p-4 animate-fade-in">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 animate-pulse" />
                  <div className="text-sm text-foreground">
                    <p className="font-medium mb-1">Password Requirements:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>At least 8 characters long</li>
                      <li>Mix of letters and numbers recommended</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ripple-effect group"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <UserPlus className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Create Account
                  </span>
                )}
              </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <Link
                    to="/login"
                    className="text-primary hover:text-primary/80 font-semibold hover:underline transition-all duration-200 inline-flex items-center gap-1 group"
                  >
                    Sign in
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


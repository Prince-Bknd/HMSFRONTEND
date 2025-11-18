import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/store/hooks";
import { logout } from "@/redux/slices/authSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  FileText,
  Pill,
  Activity,
  TrendingUp,
  Clock,
  LogOut,
  Building2,
  GraduationCap,
  User,
  Package,
  ShoppingCart,
  BarChart3,
  ClipboardList,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Plus,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Normalize role to handle different case variations
  const normalizedRole = user?.role?.toLowerCase() || "patient";
  const role = normalizedRole === "doctor" ? "DOCTOR" 
    : normalizedRole === "pharma" || normalizedRole === "pharma company" ? "PHARMA"
    : "PATIENT";
  const userName = user?.name || "User";

  // Role-based dashboard content
  const getRoleConfig = () => {
    switch (role) {
      case "DOCTOR":
        return {
          icon: GraduationCap,
          color: "text-emerald-600 dark:text-emerald-400",
          bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
          title: "Doctor Dashboard",
          subtitle: "Manage your practice and patient care",
          stats: [
            { label: "Today's Appointments", value: "12", icon: Calendar, color: "text-blue-600" },
            { label: "Active Patients", value: "156", icon: Users, color: "text-green-600" },
            { label: "Pending Reports", value: "8", icon: FileText, color: "text-orange-600" },
            { label: "Prescriptions", value: "24", icon: Pill, color: "text-purple-600" },
          ],
          quickActions: [
            { label: "Manage Schedule", icon: Calendar, color: "bg-blue-500", path: "/schedules" },
            { label: "View Appointments", icon: Users, color: "bg-green-500", path: "/appointments" },
            { label: "My Profile", icon: FileText, color: "bg-purple-500", path: "/profile" },
            { label: "Medical Records", icon: ClipboardList, color: "bg-indigo-500", path: "/dashboard" },
          ],
          recentActivity: [
            { type: "Appointment", description: "Patient John Doe - 10:00 AM", status: "upcoming" },
            { type: "Report", description: "Lab results reviewed", status: "completed" },
            { type: "Prescription", description: "Prescription #1234 issued", status: "completed" },
          ],
        };
      case "PHARMA":
        return {
          icon: Building2,
          color: "text-purple-600 dark:text-purple-400",
          bgColor: "bg-purple-50 dark:bg-purple-900/20",
          title: "Pharma Company Dashboard",
          subtitle: "Manage medications and inventory",
          stats: [
            { label: "Total Products", value: "1,234", icon: Package, color: "text-blue-600" },
            { label: "Low Stock Items", value: "23", icon: AlertCircle, color: "text-red-600" },
            { label: "Pending Orders", value: "45", icon: ShoppingCart, color: "text-orange-600" },
            { label: "Monthly Sales", value: "$45.2K", icon: TrendingUp, color: "text-green-600" },
          ],
          quickActions: [
            { label: "Manage Medicines", icon: Plus, color: "bg-blue-500", path: "/medicines" },
            { label: "My Profile", icon: Package, color: "bg-green-500", path: "/profile" },
            { label: "Orders", icon: ShoppingCart, color: "bg-orange-500", path: "/dashboard" },
            { label: "Analytics", icon: BarChart3, color: "bg-purple-500", path: "/dashboard" },
          ],
          recentActivity: [
            { type: "Order", description: "Order #5678 - Delivered", status: "completed" },
            { type: "Stock", description: "Medication X - Low stock alert", status: "warning" },
            { type: "Product", description: "New product added", status: "completed" },
          ],
        };
      default: // PATIENT
        return {
          icon: User,
          color: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
          title: "Patient Dashboard",
          subtitle: "Manage your health and appointments",
          stats: [
            { label: "Upcoming Appointments", value: "3", icon: Calendar, color: "text-blue-600" },
            { label: "Medical Records", value: "12", icon: FileText, color: "text-green-600" },
            { label: "Active Prescriptions", value: "5", icon: Pill, color: "text-purple-600" },
            { label: "Health Score", value: "92%", icon: Activity, color: "text-emerald-600" },
          ],
          quickActions: [
            { label: "Book Appointment", icon: Calendar, color: "bg-blue-500", path: "/appointments" },
            { label: "View Records", icon: FileText, color: "bg-green-500", path: "/dashboard" },
            { label: "My Prescriptions", icon: Pill, color: "bg-purple-500", path: "/dashboard" },
            { label: "My Profile", icon: Activity, color: "bg-indigo-500", path: "/profile" },
          ],
          recentActivity: [
            { type: "Appointment", description: "Dr. Smith - Tomorrow 2:00 PM", status: "upcoming" },
            { type: "Prescription", description: "Prescription #1234 - Active", status: "active" },
            { type: "Report", description: "Lab report available", status: "completed" },
          ],
        };
    }
  };

  const config = getRoleConfig();
  const RoleIcon = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-background to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`${config.bgColor} p-2 rounded-lg`}>
                <RoleIcon className={`h-6 w-6 ${config.color}`} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">HMS Dashboard</h1>
                <p className="text-sm text-muted-foreground">{config.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="hover:bg-destructive/10 hover:text-destructive"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {userName}! 👋
              </h2>
              <p className="text-muted-foreground">{config.subtitle}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-lg font-semibold text-foreground">
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {config.stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <StatIcon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {config.quickActions.map((action, index) => {
                  const ActionIcon = action.icon;
                  return (
                    <button
                      key={index}
                      className={`${action.color} hover:opacity-90 text-white p-6 rounded-xl transition-all hover:scale-105 flex flex-col items-center justify-center space-y-2 group`}
                      onClick={() => {
                        if (action.path) {
                          navigate(action.path);
                        } else {
                          import("sonner").then(({ toast }) => {
                            toast.info(`${action.label}`, {
                              description: "This feature will be available soon.",
                              duration: 3000,
                            });
                          });
                        }
                      }}
                    >
                      <ActionIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-center">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {config.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${
                      activity.status === "completed"
                        ? "bg-green-100 dark:bg-green-900/20"
                        : activity.status === "warning"
                        ? "bg-orange-100 dark:bg-orange-900/20"
                        : "bg-blue-100 dark:bg-blue-900/20"
                    }`}>
                      {activity.status === "completed" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : activity.status === "warning" ? (
                        <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      ) : (
                        <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.type}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Role-specific sections */}
        {role === "DOCTOR" && (
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => {
                        import("sonner").then(({ toast }) => {
                          toast.info("Appointment Details", {
                            description: "View appointment details feature coming soon.",
                          });
                        });
                      }}
                    >
                      <div>
                        <p className="font-medium text-foreground">Patient Appointment {i}</p>
                        <p className="text-sm text-muted-foreground">10:00 AM - 10:30 AM</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Pending Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => {
                        import("sonner").then(({ toast }) => {
                          toast.info("Medical Report", {
                            description: "Review report feature coming soon.",
                          });
                        });
                      }}
                    >
                      <div>
                        <p className="font-medium text-foreground">Lab Report #{1000 + i}</p>
                        <p className="text-sm text-muted-foreground">Pending review</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {role === "PHARMA" && (
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Low Stock Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Medication A", "Medication B", "Medication C"].map((med, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg border border-orange-200 dark:border-orange-900 bg-orange-50/50 dark:bg-orange-900/10"
                    >
                      <div>
                        <p className="font-medium text-foreground">{med}</p>
                        <p className="text-sm text-muted-foreground">Only 5 units left</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Restock
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => {
                        import("sonner").then(({ toast }) => {
                          toast.info("Order Details", {
                            description: "View order details feature coming soon.",
                          });
                        });
                      }}
                    >
                      <div>
                        <p className="font-medium text-foreground">Order #{5000 + i}</p>
                        <p className="text-sm text-muted-foreground">$1,234.56 - Processing</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {role === "PATIENT" && (
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { doctor: "Dr. Smith", time: "Tomorrow 2:00 PM", type: "General Checkup" },
                    { doctor: "Dr. Johnson", time: "Dec 25, 10:00 AM", type: "Follow-up" },
                  ].map((apt, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => {
                        import("sonner").then(({ toast }) => {
                          toast.info("Appointment Details", {
                            description: "View appointment details feature coming soon.",
                          });
                        });
                      }}
                    >
                      <p className="font-medium text-foreground">{apt.doctor}</p>
                      <p className="text-sm text-muted-foreground">{apt.type}</p>
                      <p className="text-xs text-muted-foreground mt-1">{apt.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  Active Prescriptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => {
                        import("sonner").then(({ toast }) => {
                          toast.info("Prescription Details", {
                            description: "View prescription details feature coming soon.",
                          });
                        });
                      }}
                    >
                      <div>
                        <p className="font-medium text-foreground">Prescription #{2000 + i}</p>
                        <p className="text-sm text-muted-foreground">Dr. Smith - Active</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}


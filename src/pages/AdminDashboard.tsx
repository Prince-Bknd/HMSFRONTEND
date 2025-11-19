import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/redux/store/hooks";
import { logout } from "@/redux/slices/authSlice";
import api from "@/utils/api";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Activity,
  Building2,
  GraduationCap,
  User,
  LogOut,
  Shield,
  CheckCircle2,
  XCircle,
  Eye,
  Ban,
  UserCheck,
  Stethoscope,
} from "lucide-react";

interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalPharma: number;
  activeUsers: number;
  totalUsers: number;
  inactiveUsers: number;
}

interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [patients, setPatients] = useState<UserData[]>([]);
  const [doctors, setDoctors] = useState<UserData[]>([]);
  const [pharma, setPharma] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"patients" | "doctors" | "pharma">("patients");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    loadData();
    return () => clearInterval(timer);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, patientsRes, doctorsRes, pharmaRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/patients"),
        api.get("/admin/doctors"),
        api.get("/admin/pharma"),
      ]);
      setStats(statsRes.data);
      setPatients(patientsRes.data);
      setDoctors(doctorsRes.data);
      setPharma(pharmaRes.data);
    } catch (error: any) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleToggleUserStatus = async (userId: number, isActive: boolean) => {
    try {
      if (isActive) {
        await api.put(`/admin/users/${userId}/deactivate`);
        toast.success("User deactivated successfully");
      } else {
        await api.put(`/admin/users/${userId}/activate`);
        toast.success("User activated successfully");
      }
      loadData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update user status");
    }
  };

  const handleViewProfile = async (userId: number) => {
    try {
      const response = await api.get(`/admin/users/${userId}/profile`);
      toast.info("Profile loaded", {
        description: `${response.data.role} profile information loaded.`,
      });
      // Could navigate to a profile view page here
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.info("Profile not found", {
          description: "This user hasn't completed their profile yet.",
        });
      } else {
        toast.error("Failed to load profile");
      }
    }
  };

  const activeData = activeTab === "patients" ? patients : activeTab === "doctors" ? doctors : pharma;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border p-4 flex items-center justify-between bg-card shadow-sm">
        <div className="flex items-center space-x-3">
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
            title="Go to Home"
          >
            <div className="bg-primary p-2 rounded-lg">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">HMS</span>
          </div>
          <div className="border-l border-border h-8 mx-2"></div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-muted-foreground text-sm hidden md:block">
            {currentTime.toLocaleString()}
          </span>
          <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
            <LogOut className="h-5 w-5 text-muted-foreground hover:text-red-500" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 container mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-foreground">
            Welcome, {user?.name || "Admin"}!
          </h2>
          <p className="text-muted-foreground">Manage all users and monitor system activity</p>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Patients
                </CardTitle>
                <User className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats.totalPatients}</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Doctors
                </CardTitle>
                <GraduationCap className="h-5 w-5 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats.totalDoctors}</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pharma Companies
                </CardTitle>
                <Building2 className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats.totalPharma}</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Users
                </CardTitle>
                <Activity className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats.activeUsers}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.inactiveUsers} inactive
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* User Management Tabs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage patients, doctors, and pharma companies</CardDescription>
              </div>
              <Button onClick={loadData} variant="outline" size="sm" disabled={loading}>
                {loading ? "Loading..." : "Refresh"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Tabs */}
            <div className="flex space-x-2 mb-6 border-b border-border">
              <button
                onClick={() => setActiveTab("patients")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "patients"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User className="h-4 w-4 inline mr-2" />
                Patients ({patients.length})
              </button>
              <button
                onClick={() => setActiveTab("doctors")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "doctors"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <GraduationCap className="h-4 w-4 inline mr-2" />
                Doctors ({doctors.length})
              </button>
              <button
                onClick={() => setActiveTab("pharma")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "pharma"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Building2 className="h-4 w-4 inline mr-2" />
                Pharma ({pharma.length})
              </button>
            </div>

            {/* User List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {loading ? (
                <p className="text-center text-muted-foreground py-8">Loading...</p>
              ) : activeData.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No users found</p>
              ) : (
                activeData.map((userData) => (
                  <div
                    key={userData.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div>
                        <p className="font-medium text-foreground">{userData.username}</p>
                        <p className="text-sm text-muted-foreground">{userData.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Registered: {new Date(userData.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {userData.isActive ? (
                          <span className="flex items-center text-sm text-green-600 dark:text-green-400">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Active
                          </span>
                        ) : (
                          <span className="flex items-center text-sm text-red-600 dark:text-red-400">
                            <XCircle className="h-4 w-4 mr-1" />
                            Inactive
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProfile(userData.id)}
                        title="View Profile"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Profile
                      </Button>
                      <Button
                        variant={userData.isActive ? "destructive" : "default"}
                        size="sm"
                        onClick={() => handleToggleUserStatus(userData.id, userData.isActive)}
                        title={userData.isActive ? "Deactivate" : "Activate"}
                      >
                        {userData.isActive ? (
                          <>
                            <Ban className="h-4 w-4 mr-1" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-4 w-4 mr-1" />
                            Activate
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}


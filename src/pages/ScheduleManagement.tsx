import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/store/hooks";
import api from "@/utils/api";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Plus, Trash2, Clock, X, AlertTriangle } from "lucide-react";

interface Schedule {
  id: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  consultationDuration: number;
  maxAppointmentsPerSlot: number;
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function ScheduleManagement() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState<number>(0);
  const [formData, setFormData] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    consultationDuration: "30",
    maxAppointmentsPerSlot: "1",
  });

  useEffect(() => {
    checkProfileCompletion();
    loadSchedules();
  }, []);

  const checkProfileCompletion = async () => {
    if (!user?.id) return;
    try {
      const response = await api.get(`/profiles/user/${user.id}/completion`);
      setProfileCompletion(response.data.completion || 0);
    } catch (error) {
      setProfileCompletion(0);
    }
  };

  const loadSchedules = async () => {
    if (!user?.id) return;
    try {
      const response = await api.get(`/schedules/doctor/${user.id}`);
      setSchedules(response.data);
    } catch (error: any) {
      toast.error("Failed to load schedules");
    }
  };

  const handleAddSchedule = async () => {
    if (profileCompletion < 70) {
      toast.error("Please complete your profile first (at least 70%)", {
        description: "You need to fill your profile information before adding appointment times.",
        duration: 5000,
      });
      navigate("/profile");
      return;
    }

    if (!formData.dayOfWeek || !formData.startTime || !formData.endTime) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await api.post("/schedules", {
        doctorUserId: user?.id,
        dayOfWeek: parseInt(formData.dayOfWeek),
        startTime: formData.startTime,
        endTime: formData.endTime,
        consultationDuration: parseInt(formData.consultationDuration),
        maxAppointmentsPerSlot: parseInt(formData.maxAppointmentsPerSlot),
        isAvailable: true,
      });
      toast.success("Schedule added successfully");
      setShowAddModal(false);
      setFormData({
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        consultationDuration: "30",
        maxAppointmentsPerSlot: "1",
      });
      loadSchedules();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add schedule");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSchedule = async (id: number) => {
    if (!confirm("Are you sure you want to delete this schedule?")) return;
    try {
      await api.delete(`/schedules/${id}`);
      toast.success("Schedule deleted successfully");
      loadSchedules();
    } catch (error: any) {
      toast.error("Failed to delete schedule");
    }
  };

  const handleToggleAvailability = async (schedule: Schedule) => {
    try {
      await api.put(`/schedules/${schedule.id}`, {
        ...schedule,
        isAvailable: !schedule.isAvailable,
      });
      toast.success("Schedule updated successfully");
      loadSchedules();
    } catch (error: any) {
      toast.error("Failed to update schedule");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {profileCompletion < 70 && (
        <Card className="mb-6 border-orange-200 dark:border-orange-900 bg-orange-50/50 dark:bg-orange-900/10">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-1">
                  Profile Incomplete
                </h3>
                <p className="text-sm text-orange-800 dark:text-orange-200 mb-3">
                  Your profile is only {profileCompletion}% complete. Please complete at least 70% of your profile to add appointment schedules.
                </p>
                <Button 
                  onClick={() => navigate("/profile")}
                  variant="outline"
                  size="sm"
                  className="border-orange-300 text-orange-700 hover:bg-orange-100 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-900/30"
                >
                  Complete Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schedule Management</h1>
          <p className="text-muted-foreground">Manage your availability for appointments</p>
        </div>
        <Button 
          onClick={() => {
            if (profileCompletion < 70) {
              toast.error("Please complete your profile first (at least 70%)", {
                description: "You need to fill your profile information before adding appointment times.",
                duration: 5000,
              });
              navigate("/profile");
            } else {
              setShowAddModal(true);
            }
          }}
          disabled={profileCompletion < 70}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Schedule
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DAYS.map((day, index) => {
          const daySchedules = schedules.filter((s) => s.dayOfWeek === index);
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {day}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {daySchedules.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No schedule
                  </p>
                ) : (
                  <div className="space-y-3">
                    {daySchedules.map((schedule) => (
                      <div
                        key={schedule.id}
                        className={`p-3 border rounded-lg ${
                          schedule.isAvailable ? "bg-green-50 dark:bg-green-900/20" : "bg-gray-50 dark:bg-gray-900/20"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">
                              {schedule.startTime} - {schedule.endTime}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteSchedule(schedule.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          Duration: {schedule.consultationDuration} min
                        </p>
                        <Button
                          size="sm"
                          variant={schedule.isAvailable ? "default" : "outline"}
                          onClick={() => handleToggleAvailability(schedule)}
                          className="w-full"
                        >
                          {schedule.isAvailable ? "Available" : "Unavailable"}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Add Schedule</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({
                      dayOfWeek: "",
                      startTime: "",
                      endTime: "",
                      consultationDuration: "30",
                      maxAppointmentsPerSlot: "1",
                    });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Day of Week *</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={formData.dayOfWeek}
                  onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
                >
                  <option value="">Select day</option>
                  {DAYS.map((day, index) => (
                    <option key={index} value={index}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Start Time *</Label>
                <Input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
              <div>
                <Label>End Time *</Label>
                <Input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
              <div>
                <Label>Consultation Duration (minutes)</Label>
                <Input
                  type="number"
                  value={formData.consultationDuration}
                  onChange={(e) => setFormData({ ...formData, consultationDuration: e.target.value })}
                  placeholder="30"
                />
              </div>
              <Button onClick={handleAddSchedule} disabled={loading} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                {loading ? "Adding..." : "Add Schedule"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}


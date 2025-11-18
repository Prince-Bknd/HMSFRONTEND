import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store/hooks";
import api from "@/utils/api";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, User, Search, CheckCircle2 } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Appointment {
  id: number;
  doctorUserId: number;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  appointmentType?: string;
  reason?: string;
}

export default function AppointmentBooking() {
  const { user } = useAppSelector((state) => state.auth);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    appointmentType: "General",
    reason: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDoctors();
    loadAppointments();
  }, []);

  useEffect(() => {
    if (selectedDoctor?.id) {
      loadAvailableDates(selectedDoctor.id);
    }
  }, [selectedDoctor]);

  useEffect(() => {
    if (selectedDoctor?.id && selectedDate) {
      loadAvailableSlots(selectedDoctor.id, selectedDate);
    }
  }, [selectedDoctor, selectedDate]);

  const loadDoctors = async () => {
    try {
      // In a real app, you'd have an endpoint to get all doctors
      // For now, we'll use a placeholder
      const response = await api.get("/users?role=DOCTOR");
      setDoctors(response.data || []);
    } catch (error: any) {
      // If endpoint doesn't exist, use empty array
      setDoctors([]);
    }
  };

  const loadAppointments = async () => {
    if (!user?.id) return;
    try {
      const response = await api.get(`/appointments/patient/${user.id}`);
      setAppointments(response.data);
    } catch (error: any) {
      toast.error("Failed to load appointments");
    }
  };

  const loadAvailableDates = async (doctorId: string) => {
    try {
      const response = await api.get(`/appointments/doctor/${doctorId}/available-dates`);
      setAvailableDates(response.data.map((d: string) => d.split("T")[0]));
    } catch (error: any) {
      toast.error("Failed to load available dates");
    }
  };

  const loadAvailableSlots = async (doctorId: string, date: string) => {
    try {
      const response = await api.get(`/appointments/doctor/${doctorId}/available-slots`, {
        params: { date },
      });
      setAvailableSlots(response.data);
    } catch (error: any) {
      toast.error("Failed to load available slots");
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast.error("Please select doctor, date, and time");
      return;
    }
    setLoading(true);
    try {
      await api.post("/appointments", {
        patientUserId: user?.id,
        doctorUserId: selectedDoctor.id,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        appointmentType: formData.appointmentType,
        reason: formData.reason,
        status: "PENDING",
      });
      toast.success("Appointment booked successfully");
      setSelectedDoctor(null);
      setSelectedDate("");
      setSelectedTime("");
      setFormData({ appointmentType: "General", reason: "" });
      loadAppointments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Book Appointment</h1>
        <p className="text-muted-foreground">Schedule an appointment with a doctor</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Appointment</CardTitle>
            <CardDescription>Select a doctor and time slot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Select Doctor</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedDoctor?.id || ""}
                onChange={(e) => {
                  const doctor = doctors.find((d) => d.id === e.target.value);
                  setSelectedDoctor(doctor || null);
                  setSelectedDate("");
                  setSelectedTime("");
                }}
              >
                <option value="">Choose a doctor...</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} ({doctor.email})
                  </option>
                ))}
              </select>
            </div>

            {selectedDoctor && (
              <>
                <div>
                  <Label>Select Date</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {availableDates.slice(0, 9).map((date) => (
                      <Button
                        key={date}
                        variant={selectedDate === date ? "default" : "outline"}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedTime("");
                        }}
                        className="text-xs"
                      >
                        {new Date(date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </Button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <Label>Select Time</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {availableSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant={selectedTime === slot ? "default" : "outline"}
                          onClick={() => setSelectedTime(slot)}
                          className="text-xs"
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTime && (
                  <>
                    <div>
                      <Label>Appointment Type</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={formData.appointmentType}
                        onChange={(e) =>
                          setFormData({ ...formData, appointmentType: e.target.value })
                        }
                      >
                        <option value="General">General</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Emergency">Emergency</option>
                        <option value="Consultation">Consultation</option>
                      </select>
                    </div>
                    <div>
                      <Label>Reason (Optional)</Label>
                      <Input
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        placeholder="Brief reason for appointment"
                      />
                    </div>
                    <Button onClick={handleBookAppointment} disabled={loading} className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      {loading ? "Booking..." : "Book Appointment"}
                    </Button>
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Appointments</CardTitle>
            <CardDescription>Your upcoming and past appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {appointments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No appointments yet. Book your first appointment!
                </p>
              ) : (
                appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{apt.doctorName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(apt.appointmentDate).toLocaleDateString()} at {apt.appointmentTime}
                        </p>
                        {apt.appointmentType && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Type: {apt.appointmentType}
                          </p>
                        )}
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          apt.status === "CONFIRMED"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : apt.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : apt.status === "CANCELLED"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                    {apt.reason && (
                      <p className="text-sm text-muted-foreground mt-2">{apt.reason}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


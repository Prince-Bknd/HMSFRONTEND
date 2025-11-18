import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store/hooks";
import api from "@/utils/api";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Save, Building2, GraduationCap, Heart } from "lucide-react";

interface ProfileData {
  userId: number;
  role: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  bio?: string;
  // Doctor fields
  specialization?: string;
  licenseNumber?: string;
  yearsOfExperience?: number;
  hospitalName?: string;
  consultationFee?: number;
  education?: string;
  certifications?: string;
  // Patient fields
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  bloodGroup?: string;
  allergies?: string;
  medicalHistory?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  // Pharma fields
  companyName?: string;
  companyRegistrationNumber?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  companyWebsite?: string;
  companyLicenseNumber?: string;
}

export default function Profile() {
  const { user } = useAppSelector((state) => state.auth);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    userId: parseInt(user?.id || "0"),
    role: user?.role || "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    if (!user?.id) return;
    try {
      const response = await api.get(`/profiles/user/${user.id}`);
      setProfile(response.data);
      setFormData(response.data);
    } catch (error: any) {
      // Profile doesn't exist yet, that's okay
      setProfile(null);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await api.post("/profiles", formData);
      setProfile(response.data);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const role = user?.role?.toUpperCase() || "";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
        <p className="text-muted-foreground">Update your profile information</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  value={formData.dateOfBirth || ""}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </div>
              <div>
                <Label>Gender</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={formData.gender || ""}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  value={formData.address || ""}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <Input
                    value={formData.city || ""}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    value={formData.state || ""}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Zip Code</Label>
                  <Input
                    value={formData.zipCode || ""}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input
                    value={formData.country || "USA"}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Bio</Label>
                <textarea
                  className="w-full p-2 border rounded-md min-h-[100px]"
                  value={formData.bio || ""}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                />
              </div>
            </CardContent>
          </Card>

          {role === "DOCTOR" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Doctor Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Specialization</Label>
                  <Input
                    value={formData.specialization || ""}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    placeholder="e.g., Cardiology, Pediatrics"
                  />
                </div>
                <div>
                  <Label>License Number</Label>
                  <Input
                    value={formData.licenseNumber || ""}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Years of Experience</Label>
                  <Input
                    type="number"
                    value={formData.yearsOfExperience || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div>
                  <Label>Hospital Name</Label>
                  <Input
                    value={formData.hospitalName || ""}
                    onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Consultation Fee ($)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.consultationFee || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, consultationFee: parseFloat(e.target.value) || 0 })
                    }
                  />
                </div>
                <div>
                  <Label>Education</Label>
                  <textarea
                    className="w-full p-2 border rounded-md min-h-[80px]"
                    value={formData.education || ""}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    placeholder="Educational background"
                  />
                </div>
                <div>
                  <Label>Certifications</Label>
                  <textarea
                    className="w-full p-2 border rounded-md min-h-[80px]"
                    value={formData.certifications || ""}
                    onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                    placeholder="Professional certifications"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {role === "PATIENT" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Medical Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Blood Group</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.bloodGroup || ""}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  >
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <Label>Allergies</Label>
                  <textarea
                    className="w-full p-2 border rounded-md min-h-[80px]"
                    value={formData.allergies || ""}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    placeholder="List any allergies"
                  />
                </div>
                <div>
                  <Label>Medical History</Label>
                  <textarea
                    className="w-full p-2 border rounded-md min-h-[80px]"
                    value={formData.medicalHistory || ""}
                    onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                    placeholder="Previous medical conditions, surgeries, etc."
                  />
                </div>
                <div>
                  <Label>Emergency Contact Name</Label>
                  <Input
                    value={formData.emergencyContactName || ""}
                    onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Emergency Contact Phone</Label>
                  <Input
                    value={formData.emergencyContactPhone || ""}
                    onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Insurance Provider</Label>
                  <Input
                    value={formData.insuranceProvider || ""}
                    onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Insurance Number</Label>
                  <Input
                    value={formData.insuranceNumber || ""}
                    onChange={(e) => setFormData({ ...formData, insuranceNumber: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {role === "PHARMA" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Company Name</Label>
                  <Input
                    value={formData.companyName || ""}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Registration Number</Label>
                  <Input
                    value={formData.companyRegistrationNumber || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, companyRegistrationNumber: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Company Address</Label>
                  <textarea
                    className="w-full p-2 border rounded-md min-h-[80px]"
                    value={formData.companyAddress || ""}
                    onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Company Phone</Label>
                  <Input
                    value={formData.companyPhone || ""}
                    onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Company Email</Label>
                  <Input
                    type="email"
                    value={formData.companyEmail || ""}
                    onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Company Website</Label>
                  <Input
                    value={formData.companyWebsite || ""}
                    onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label>License Number</Label>
                  <Input
                    value={formData.companyLicenseNumber || ""}
                    onChange={(e) => setFormData({ ...formData, companyLicenseNumber: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={loading} size="lg">
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}


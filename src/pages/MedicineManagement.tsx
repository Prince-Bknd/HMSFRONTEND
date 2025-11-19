import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/store/hooks";
import api from "@/utils/api";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Save,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";

interface Medicine {
  id: number;
  name: string;
  genericName?: string;
  description?: string;
  category?: string;
  price: number;
  stockQuantity: number;
  dosageForm?: string;
  strength?: string;
  prescriptionRequired: boolean;
}

interface MedicineMapping {
  id: number;
  medicineId: number;
  medicineName?: string;
  price: number;
  stockQuantity: number;
  isAvailable: boolean;
}

export default function MedicineManagement() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [mappings, setMappings] = useState<MedicineMapping[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState<number>(0);
  const [formData, setFormData] = useState({
    medicineId: "",
    price: "",
    stockQuantity: "",
  });

  useEffect(() => {
    checkProfileCompletion();
    loadMedicines();
    loadMappings();
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

  const loadMedicines = async () => {
    try {
      const response = await api.get("/medicines", {
        params: searchTerm ? { search: searchTerm } : {},
      });
      setMedicines(response.data);
    } catch (error: any) {
      toast.error("Failed to load medicines");
    }
  };

  const loadMappings = async () => {
    if (!user?.id) return;
    try {
      const response = await api.get(`/medicines/pharma/${user.id}`);
      setMappings(response.data);
    } catch (error: any) {
      toast.error("Failed to load your medicines");
    }
  };

  const handleMapMedicine = async () => {
    if (profileCompletion < 70) {
      toast.error("Please complete your profile first (at least 70%)", {
        description: "You need to fill your profile information before adding medicines.",
        duration: 5000,
      });
      navigate("/profile");
      return;
    }

    if (!formData.medicineId || !formData.price) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await api.post(
        `/medicines/${formData.medicineId}/pharma/${user?.id}`,
        {
          price: parseFloat(formData.price),
          stockQuantity: parseInt(formData.stockQuantity) || 0,
          isAvailable: true,
        }
      );
      toast.success("Medicine mapped successfully");
      setShowMapModal(false);
      setFormData({ medicineId: "", price: "", stockQuantity: "" });
      loadMappings();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to map medicine");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMapping = async (mappingId: number, updates: Partial<MedicineMapping>) => {
    try {
      await api.put(`/medicines/mapping/${mappingId}`, updates);
      toast.success("Medicine updated successfully");
      loadMappings();
    } catch (error: any) {
      toast.error("Failed to update medicine");
    }
  };

  const handleRemoveMapping = async (mappingId: number) => {
    if (!confirm("Are you sure you want to remove this medicine?")) return;
    try {
      await api.delete(`/medicines/mapping/${mappingId}`);
      toast.success("Medicine removed successfully");
      loadMappings();
    } catch (error: any) {
      toast.error("Failed to remove medicine");
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
                  Your profile is only {profileCompletion}% complete. Please complete at least 70% of your profile to add medicines.
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
          <h1 className="text-3xl font-bold text-foreground">Medicine Management</h1>
          <p className="text-muted-foreground">Manage your pharmaceutical inventory</p>
        </div>
        <Button 
          onClick={() => {
            if (profileCompletion < 70) {
              toast.error("Please complete your profile first (at least 70%)", {
                description: "You need to fill your profile information before adding medicines.",
                duration: 5000,
              });
              navigate("/profile");
            } else {
              setShowMapModal(true);
            }
          }}
          disabled={profileCompletion < 70}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Medicine
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              loadMedicines();
            }}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Available Medicines</CardTitle>
            <CardDescription>Search and add medicines to your inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {medicines.map((medicine) => (
                <div
                  key={medicine.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{medicine.name}</h3>
                    {medicine.genericName && (
                      <p className="text-sm text-muted-foreground">{medicine.genericName}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {medicine.category} • ${medicine.price}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedMedicine(medicine);
                      setFormData({
                        medicineId: medicine.id.toString(),
                        price: medicine.price.toString(),
                        stockQuantity: "0",
                      });
                      setShowMapModal(true);
                    }}
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Medicines</CardTitle>
            <CardDescription>Medicines in your inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {mappings.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No medicines added yet. Add medicines from the left panel.
                </p>
              ) : (
                mappings.map((mapping) => (
                  <div
                    key={mapping.id}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold">{mapping.medicineName || "Medicine"}</h3>
                        <p className="text-sm text-muted-foreground">
                          Price: ${mapping.price} • Stock: {mapping.stockQuantity}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            const newStock = prompt("Enter new stock quantity:", mapping.stockQuantity.toString());
                            if (newStock) {
                              handleUpdateMapping(mapping.id, {
                                stockQuantity: parseInt(newStock),
                              });
                            }
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveMapping(mapping.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {!mapping.isAvailable && (
                      <div className="flex items-center gap-2 text-sm text-orange-600">
                        <AlertCircle className="h-4 w-4" />
                        Not available
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {showMapModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Add Medicine to Inventory</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowMapModal(false);
                    setSelectedMedicine(null);
                    setFormData({ medicineId: "", price: "", stockQuantity: "" });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
                    <div>
                      <Label>Medicine</Label>
                      <Select
                        value={formData.medicineId}
                        onChange={(e) => {
                          const med = medicines.find((m) => m.id.toString() === e.target.value);
                          setSelectedMedicine(med || null);
                          setFormData({
                            ...formData,
                            medicineId: e.target.value,
                            price: med?.price.toString() || "",
                          });
                        }}
                      >
                        <option value="">Select a medicine</option>
                        {medicines.map((med) => (
                          <option key={med.id} value={med.id}>
                            {med.name} - ${med.price}
                          </option>
                        ))}
                      </Select>
                    </div>
              <div>
                <Label>Price *</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Enter price"
                />
              </div>
              <div>
                <Label>Stock Quantity</Label>
                <Input
                  type="number"
                  value={formData.stockQuantity}
                  onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                  placeholder="Enter stock quantity"
                />
              </div>
              <Button onClick={handleMapMedicine} disabled={loading} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Adding..." : "Add Medicine"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}


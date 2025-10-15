import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Hospital,
  Search,
  Filter,
  Sparkles,
  Navigation,
  Loader2,
} from "lucide-react";
import {
  hospitals,
  getStates,
  getCities,
  getEstimatedCost,
  getEstimatedRating,
  getEstimatedWaitTime,
} from "@/lib/hospital-data";
import {
  getUserLocation,
  calculateDistance,
  type Coordinates,
} from "@/lib/geolocation";
import { toast } from "sonner";
import { HospitalCard } from "@/components/HospitalCard";

const PROCEDURES = [
  "All Procedures",
  "Knee Replacement",
  "Hip Replacement",
  "Cardiac Surgery",
  "Cataract Surgery",
  "LASIK",
  "Neurosurgery",
  "Cosmetic Surgery",
  "Dental Implants",
  "Spine Surgery",
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedProcedure, setSelectedProcedure] = useState("All Procedures");
  const [maxBudget, setMaxBudget] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const states = ["All States", ...getStates()];
  const cities = ["All Cities", ...getCities()];

  const handleGetLocation = async () => {
    setIsLoadingLocation(true);
    const result = await getUserLocation();
    
    if (result.error) {
      toast.error("Location Error", {
        description: result.error,
      });
    } else {
      setUserLocation(result.coords);
      setSortBy("distance");
      toast.success("Location Found", {
        description: "Now showing hospitals near you",
      });
    }
    
    setIsLoadingLocation(false);
  };

  const hospitalsWithDistance = hospitals.map((hospital) => ({
    ...hospital,
    distance: userLocation
      ? calculateDistance(userLocation, {
          latitude: hospital.latitude,
          longitude: hospital.longitude,
        })
      : null,
  }));

  const filteredHospitals = hospitalsWithDistance
    .filter((hospital) => {
      const matchesSearch =
        searchQuery === "" ||
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.state.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesState =
        selectedState === "All States" || hospital.state === selectedState;

      const matchesCity =
        selectedCity === "All Cities" || hospital.city === selectedCity;

      const estimatedCost = getEstimatedCost(hospital, selectedProcedure);
      const matchesBudget =
        maxBudget === "" || estimatedCost <= Number.parseInt(maxBudget);

      return matchesSearch && matchesState && matchesCity && matchesBudget;
    })
    .sort((a, b) => {
      if (sortBy === "rating")
        return getEstimatedRating(b) - getEstimatedRating(a);
      if (sortBy === "cost")
        return (
          getEstimatedCost(a, selectedProcedure) -
          getEstimatedCost(b, selectedProcedure)
        );
      if (sortBy === "beds") {
        const bedsA = a.beds === "NA" ? 0 : Number.parseInt(a.beds);
        const bedsB = b.beds === "NA" ? 0 : Number.parseInt(b.beds);
        return bedsB - bedsA;
      }
      if (sortBy === "distance" && a.distance !== null && b.distance !== null) {
        return a.distance - b.distance;
      }
      return 0;
    })
    .slice(0, 50);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Header */}
      <header className="border-b border-border/30 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-colors" />
              <Hospital className="relative h-8 w-8 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">MediPlan</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link to="/search">
              <Button variant="secondary">Search</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 animate-fade-in relative">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-4 -right-4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Healthcare Search</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Discover Healthcare Excellence in{" "}
              <span className="text-primary">Myanmar</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Explore {hospitals.length}+ verified medical facilities with intelligent 
              filtering, location-based search, and comprehensive hospital profiles
            </p>
          </div>
        </div>

        {/* Search Filters */}
        <Card
          className="mb-8 animate-fade-in shadow-2xl border-border/30 overflow-hidden relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
          
          <CardHeader className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Filter className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Advanced Search</CardTitle>
                  <CardDescription className="text-base">
                    Customize your search criteria for precise results
                  </CardDescription>
                </div>
              </div>

              {/* Location Button */}
              <Button
                onClick={handleGetLocation}
                disabled={isLoadingLocation}
                variant={userLocation ? "default" : "outline"}
                size="lg"
                className={`gap-2 ${userLocation ? "" : "bg-white/50 backdrop-blur-sm border-primary/30"}`}
              >
                {isLoadingLocation ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Finding Location...
                  </>
                ) : userLocation ? (
                  <>
                    <Navigation className="h-4 w-4" />
                    Location Active
                  </>
                ) : (
                  <>
                    <Navigation className="h-4 w-4" />
                    Find Near Me
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="search" className="text-sm font-semibold">
                  Hospital or Location
                </Label>
                <div className="relative group">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="search"
                    placeholder="Search hospitals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-semibold">
                  State/Region
                </Label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger id="state">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-semibold">
                  City
                </Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger id="city">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sort" className="text-sm font-semibold">
                  Sort By
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">⭐ Highest Rated</SelectItem>
                    <SelectItem value="cost">💰 Lowest Cost</SelectItem>
                    <SelectItem value="beds">🏥 Most Beds</SelectItem>
                    {userLocation && (
                      <SelectItem value="distance">📍 Nearest to Me</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {userLocation && (
              <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Navigation className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Location-based search active
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {userLocation.latitude.toFixed(4)}°N, {userLocation.longitude.toFixed(4)}°E
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div>
            <p className="text-sm text-muted-foreground">
              Found{" "}
              <span className="text-xl font-bold text-foreground">
                {filteredHospitals.length}
              </span>{" "}
              {filteredHospitals.length === 1 ? "hospital" : "hospitals"}
            </p>
            {filteredHospitals.length === 50 && (
              <p className="text-xs text-muted-foreground mt-1">
                Showing top 50 results
              </p>
            )}
          </div>
          
          {userLocation && sortBy === "distance" && (
            <Badge variant="outline" className="border-primary/30 text-primary">
              Sorted by distance
            </Badge>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredHospitals.map((hospital, index) => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
              rating={getEstimatedRating(hospital)}
              estimatedCost={getEstimatedCost(hospital, selectedProcedure)}
              waitTime={getEstimatedWaitTime(hospital)}
              index={index}
            />
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <Card className="py-16 shadow-xl border-dashed border-2 animate-fade-in">
            <CardContent className="text-center">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-muted/30 blur-2xl rounded-full" />
                <Hospital className="relative mx-auto h-16 w-16 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                No hospitals found
              </h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any hospitals matching your criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedState("All States");
                  setSelectedCity("All Cities");
                  setMaxBudget("");
                }}
              >
                Clear all filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

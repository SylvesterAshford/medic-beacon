import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hospital, Search, MapPin, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-md shadow-sm">
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
              <Button variant="secondary">Home</Button>
            </Link>
            <Link to="/search">
              <Button variant="ghost">Search</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
        <div className="text-center max-w-4xl animate-fade-in-up">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Hospital className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Healthcare in Myanmar</span>
          </div>
          
          <h1 className="mb-6 text-5xl md:text-7xl font-bold text-foreground">
            Find the Best
            <br />
            <span className="text-primary">Healthcare Near You</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Search and compare verified hospitals across Myanmar with location-based filtering,
            ratings, and cost estimates
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/search">
              <Button size="lg" className="text-lg px-8 py-6 gap-2">
                <Search className="h-5 w-5" />
                Search Hospitals
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Location-Based</h3>
              <p className="text-sm text-muted-foreground">
                Find hospitals near you with distance calculation and directions
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Ratings</h3>
              <p className="text-sm text-muted-foreground">
                Compare hospitals based on ratings, reviews, and quality metrics
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Hospital className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Comprehensive Info</h3>
              <p className="text-sm text-muted-foreground">
                Access details on beds, wait times, costs, and specialties
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

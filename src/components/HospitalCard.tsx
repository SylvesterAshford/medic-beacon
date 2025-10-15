import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Bed,
  Star,
  Clock,
  DollarSign,
  Building2,
  Navigation,
} from "lucide-react";
import type { Hospital } from "@/lib/hospital-data";
import { getHospitalImage } from "@/lib/hospital-images";

interface HospitalCardProps {
  hospital: Hospital & { distance: number | null };
  rating: number;
  estimatedCost: number;
  waitTime: string;
  index: number;
}

export const HospitalCard = ({
  hospital,
  rating,
  estimatedCost,
  waitTime,
  index,
}: HospitalCardProps) => {
  return (
    <Card
      className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-border/50 hover:border-primary/30 animate-fade-in-up"
      style={{ animationDelay: `${0.1 * (index % 6)}s` }}
    >
      {/* Hospital Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={getHospitalImage(hospital.id)}
          alt={hospital.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        
        {/* Ownership Badge */}
        <Badge
          className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm border-border/50"
          variant="outline"
        >
          <Building2 className="h-3 w-3 mr-1" />
          {hospital.ownership}
        </Badge>
        
        {/* Distance Badge */}
        {hospital.distance !== null && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            <Navigation className="h-3 w-3 mr-1" />
            {hospital.distance} km
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {hospital.name}
            </h3>
            <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="line-clamp-1">
                {hospital.city}, {hospital.state}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 flex-shrink-0">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-bold text-primary">{rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-4">
        {/* Hospital Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bed className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Beds</p>
              <p className="text-sm font-semibold text-foreground">{hospital.beds}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Wait</p>
              <p className="text-sm font-semibold text-foreground">{waitTime}</p>
            </div>
          </div>
        </div>

        {/* Cost Estimate */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Estimated Cost</p>
              <p className="text-sm font-bold text-primary">
                ${estimatedCost.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Type Badge */}
        <div className="flex items-center justify-center">
          <Badge variant="secondary" className="text-xs">
            {hospital.type}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Link to={`/hospital/${hospital.id}`} className="w-full">
          <Button className="w-full group/btn">
            View Details
            <span className="ml-2 transition-transform group-hover/btn:translate-x-1">
              →
            </span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

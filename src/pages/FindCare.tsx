import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HospitalMap from '@/components/HospitalMap';
import DoctorDirectory from '@/components/DoctorDirectory';

const FindCare = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-xl font-bold text-primary">ONCOVISION</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find <span className="text-primary">Cancer Care</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with top oncologists and find the nearest cancer treatment centers in your area.
          </p>
        </div>

        <Tabs defaultValue="doctors" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="doctors" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Find Doctors
            </TabsTrigger>
            <TabsTrigger value="hospitals" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Nearby Hospitals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="doctors" className="animate-fade-in">
            <DoctorDirectory />
          </TabsContent>

          <TabsContent value="hospitals" className="animate-fade-in">
            <HospitalMap />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border bg-muted/30 mt-12">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-sm text-muted-foreground">
            Contact information is for reference only. Always verify details before scheduling appointments.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FindCare;

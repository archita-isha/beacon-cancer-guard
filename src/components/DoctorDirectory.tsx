import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, Star, Search, Filter } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  location: string;
  phone: string;
  email: string;
  rating: number;
  experience: number;
  image: string;
  availability: string;
}

const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Surgical Oncology',
    hospital: 'City Cancer Center',
    location: 'New York, NY',
    phone: '+1-555-0201',
    email: 'sarah.johnson@hospital.com',
    rating: 4.9,
    experience: 15,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    availability: 'Mon-Fri',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Medical Oncology',
    hospital: 'Regional Oncology Hospital',
    location: 'New York, NY',
    phone: '+1-555-0202',
    email: 'michael.chen@hospital.com',
    rating: 4.8,
    experience: 12,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    availability: 'Mon-Thu',
  },
  {
    id: '3',
    name: 'Dr. Emily Williams',
    specialty: 'Radiation Oncology',
    hospital: 'Memorial Cancer Institute',
    location: 'Brooklyn, NY',
    phone: '+1-555-0203',
    email: 'emily.williams@hospital.com',
    rating: 4.7,
    experience: 10,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face',
    availability: 'Tue-Sat',
  },
  {
    id: '4',
    name: 'Dr. James Anderson',
    specialty: 'Dermatologic Oncology',
    hospital: 'University Cancer Center',
    location: 'Manhattan, NY',
    phone: '+1-555-0204',
    email: 'james.anderson@hospital.com',
    rating: 4.9,
    experience: 18,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop&crop=face',
    availability: 'Mon-Fri',
  },
  {
    id: '5',
    name: 'Dr. Lisa Martinez',
    specialty: 'Surgical Oncology',
    hospital: 'Community Cancer Hospital',
    location: 'Queens, NY',
    phone: '+1-555-0205',
    email: 'lisa.martinez@hospital.com',
    rating: 4.6,
    experience: 8,
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=150&h=150&fit=crop&crop=face',
    availability: 'Wed-Sun',
  },
  {
    id: '6',
    name: 'Dr. Robert Taylor',
    specialty: 'Medical Oncology',
    hospital: 'City Cancer Center',
    location: 'New York, NY',
    phone: '+1-555-0206',
    email: 'robert.taylor@hospital.com',
    rating: 4.8,
    experience: 20,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face',
    availability: 'Mon-Thu',
  },
];

const specialties = ['All Specialties', 'Surgical Oncology', 'Medical Oncology', 'Radiation Oncology', 'Dermatologic Oncology'];
const locations = ['All Locations', 'New York, NY', 'Brooklyn, NY', 'Manhattan, NY', 'Queens, NY'];

const DoctorDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [sortBy, setSortBy] = useState<'rating' | 'experience'>('rating');

  const filteredDoctors = doctors
    .filter((doctor) => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'All Specialties' || doctor.specialty === selectedSpecialty;
      const matchesLocation = selectedLocation === 'All Locations' || doctor.location === selectedLocation;
      return matchesSearch && matchesSpecialty && matchesLocation;
    })
    .sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : b.experience - a.experience);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search doctors or hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Specialty" />
          </SelectTrigger>
          <SelectContent>
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(value: 'rating' | 'experience') => setSortBy(value)}>
          <SelectTrigger className="w-full md:w-[150px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Top Rated</SelectItem>
            <SelectItem value="experience">Most Experienced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
            <CardHeader className="pb-2">
              <div className="flex items-start gap-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                />
                <div className="flex-1">
                  <CardTitle className="text-lg">{doctor.name}</CardTitle>
                  <Badge variant="secondary" className="mt-1">{doctor.specialty}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{doctor.hospital}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 opacity-0" />
                <span>{doctor.location}</span>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{doctor.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">{doctor.experience} years exp.</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1" asChild>
                  <a href={`tel:${doctor.phone}`}>
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </a>
                </Button>
                <Button size="sm" variant="outline" className="flex-1" asChild>
                  <a href={`mailto:${doctor.email}`}>
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </a>
                </Button>
              </div>
              
              <p className="text-xs text-center text-muted-foreground">
                Available: {doctor.availability}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No doctors found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DoctorDirectory;
